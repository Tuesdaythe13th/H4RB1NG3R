#!/usr/bin/env python3
"""
Star Chamber Consensus Engine

Implements multi-agent threshold authorization for high-risk actions.
Requires unanimous or supermajority consensus from specialized agents.

Implements the operational integrity consensus layer described in H4RB1NG3R v0.05.
"""

import json
import sys
from typing import Dict, List, Any, Optional
from enum import Enum
import hashlib
from datetime import datetime, timedelta


class ConsensusType(Enum):
    """Types of consensus requirements."""
    UNANIMOUS = "unanimous"          # 100% approval required
    SUPERMAJORITY = "supermajority"  # 2/3+ approval required
    SIMPLE_MAJORITY = "simple_majority"  # 50%+ approval required
    THRESHOLD = "threshold"          # N-of-M required (e.g., 3-of-5)


class AgentRole(Enum):
    """Specialized agent roles in the Star Chamber."""
    FORENSIC_PATHOLOGIST = "forensic_pathologist"
    CISO = "ciso"
    LEGAL_AUDITOR = "legal_auditor"
    COMPTROLLER = "comptroller"
    CULTURAL_SENTINEL = "cultural_sentinel"
    GUARDIAN = "guardian"
    RESEARCHER = "researcher"


class Vote:
    """Represents a single agent vote."""

    def __init__(self, agent_role: str, decision: str, rationale: str, confidence: float, signature: str):
        self.agent_role = agent_role
        self.decision = decision  # "approve", "reject", "abstain"
        self.rationale = rationale
        self.confidence = confidence  # 0.0 to 1.0
        self.signature = signature
        self.timestamp = datetime.utcnow().isoformat()

    def to_dict(self) -> Dict[str, Any]:
        return {
            'agent_role': self.agent_role,
            'decision': self.decision,
            'rationale': self.rationale,
            'confidence': self.confidence,
            'signature': self.signature,
            'timestamp': self.timestamp
        }


class StarChamber:
    """Manages multi-agent consensus for high-risk actions."""

    def __init__(
        self,
        action_id: str,
        action_description: str,
        required_agents: List[str],
        consensus_type: str = "supermajority",
        threshold: Optional[tuple] = None,
        timeout_seconds: int = 300
    ):
        self.action_id = action_id
        self.action_description = action_description
        self.required_agents = required_agents
        self.consensus_type = ConsensusType(consensus_type)
        self.threshold = threshold  # (required_approvals, total_agents)
        self.timeout_seconds = timeout_seconds

        self.votes: List[Vote] = []
        self.created_at = datetime.utcnow()
        self.resolved_at: Optional[datetime] = None
        self.final_decision: Optional[str] = None

    def add_vote(self, agent_role: str, decision: str, rationale: str, confidence: float) -> Dict[str, Any]:
        """Add a vote from an agent."""
        if agent_role not in self.required_agents:
            return {
                'success': False,
                'error': f'Agent {agent_role} not authorized to vote on this action',
                'authorized_agents': self.required_agents
            }

        # Check if agent already voted
        existing_vote = next((v for v in self.votes if v.agent_role == agent_role), None)
        if existing_vote:
            return {
                'success': False,
                'error': f'Agent {agent_role} has already voted',
                'existing_vote': existing_vote.to_dict()
            }

        # Generate cryptographic signature for vote
        vote_data = f"{agent_role}{decision}{rationale}{confidence}{self.action_id}"
        signature = hashlib.sha256(vote_data.encode()).hexdigest()[:32]

        vote = Vote(agent_role, decision, rationale, confidence, signature)
        self.votes.append(vote)

        # Check if consensus reached
        consensus_result = self.check_consensus()

        return {
            'success': True,
            'vote_recorded': vote.to_dict(),
            'votes_collected': len(self.votes),
            'votes_required': len(self.required_agents),
            'consensus_reached': consensus_result['consensus_reached'],
            'final_decision': consensus_result.get('decision')
        }

    def check_consensus(self) -> Dict[str, Any]:
        """Check if consensus has been reached."""
        if len(self.votes) < len(self.required_agents):
            # Not all votes collected yet
            return {
                'consensus_reached': False,
                'votes_pending': len(self.required_agents) - len(self.votes),
                'pending_agents': [a for a in self.required_agents if a not in [v.agent_role for v in self.votes]]
            }

        # All votes collected, determine consensus
        approvals = [v for v in self.votes if v.decision == "approve"]
        rejections = [v for v in self.votes if v.decision == "reject"]
        abstentions = [v for v in self.votes if v.decision == "abstain"]

        total_votes = len(self.votes)
        approval_count = len(approvals)
        rejection_count = len(rejections)

        decision = None
        consensus_met = False

        if self.consensus_type == ConsensusType.UNANIMOUS:
            # Requires 100% approval (no rejections)
            if rejection_count == 0 and abstentions == 0:
                decision = "APPROVED"
                consensus_met = True
            else:
                decision = "REJECTED"
                consensus_met = True

        elif self.consensus_type == ConsensusType.SUPERMAJORITY:
            # Requires 2/3+ approval
            required = (2 * total_votes) // 3 + 1
            if approval_count >= required:
                decision = "APPROVED"
                consensus_met = True
            elif rejection_count > total_votes - required:
                decision = "REJECTED"
                consensus_met = True

        elif self.consensus_type == ConsensusType.SIMPLE_MAJORITY:
            # Requires 50%+ approval
            if approval_count > total_votes / 2:
                decision = "APPROVED"
                consensus_met = True
            else:
                decision = "REJECTED"
                consensus_met = True

        elif self.consensus_type == ConsensusType.THRESHOLD:
            # Requires N-of-M (e.g., 3-of-5)
            if self.threshold:
                required_approvals, total_required = self.threshold
                if approval_count >= required_approvals:
                    decision = "APPROVED"
                    consensus_met = True
                elif rejection_count > total_required - required_approvals:
                    decision = "REJECTED"
                    consensus_met = True

        if consensus_met:
            self.final_decision = decision
            self.resolved_at = datetime.utcnow()

        return {
            'consensus_reached': consensus_met,
            'decision': decision,
            'approval_count': approval_count,
            'rejection_count': rejection_count,
            'abstention_count': len(abstentions),
            'consensus_type': self.consensus_type.value,
            'voting_record': [v.to_dict() for v in self.votes]
        }

    def check_timeout(self) -> bool:
        """Check if consensus window has timed out."""
        elapsed = (datetime.utcnow() - self.created_at).total_seconds()
        return elapsed > self.timeout_seconds

    def to_dict(self) -> Dict[str, Any]:
        """Export full Star Chamber state."""
        return {
            'action_id': self.action_id,
            'action_description': self.action_description,
            'required_agents': self.required_agents,
            'consensus_type': self.consensus_type.value,
            'threshold': self.threshold,
            'timeout_seconds': self.timeout_seconds,
            'created_at': self.created_at.isoformat(),
            'resolved_at': self.resolved_at.isoformat() if self.resolved_at else None,
            'final_decision': self.final_decision,
            'votes': [v.to_dict() for v in self.votes],
            'timed_out': self.check_timeout()
        }


def initiate_star_chamber(
    action_id: str,
    action_description: str,
    action_type: str,
    context: Dict[str, Any] = None
) -> Dict[str, Any]:
    """
    Initiate a Star Chamber consensus process.

    Args:
        action_id: Unique identifier for the action
        action_description: Human-readable description
        action_type: Type of action (determines required agents and consensus type)
        context: Optional additional context

    Returns:
        Dictionary containing Star Chamber session details
    """
    if context is None:
        context = {}

    # Determine required agents and consensus type based on action type
    action_configs = {
        'delete_evidence': {
            'agents': ['forensic_pathologist', 'legal_auditor', 'ciso'],
            'consensus_type': 'unanimous',
            'risk_level': 'CRITICAL'
        },
        'policy_override': {
            'agents': ['comptroller', 'ciso', 'guardian'],
            'consensus_type': 'supermajority',
            'risk_level': 'HIGH'
        },
        'data_export': {
            'agents': ['legal_auditor', 'ciso'],
            'consensus_type': 'unanimous',
            'risk_level': 'HIGH'
        },
        'external_api_call': {
            'agents': ['ciso', 'comptroller'],
            'consensus_type': 'simple_majority',
            'risk_level': 'MEDIUM'
        },
        'memory_modification': {
            'agents': ['forensic_pathologist', 'comptroller', 'guardian'],
            'consensus_type': 'supermajority',
            'risk_level': 'HIGH'
        }
    }

    config = action_configs.get(action_type, {
        'agents': ['comptroller', 'ciso'],
        'consensus_type': 'simple_majority',
        'risk_level': 'MEDIUM'
    })

    # Create Star Chamber instance
    chamber = StarChamber(
        action_id=action_id,
        action_description=action_description,
        required_agents=config['agents'],
        consensus_type=config['consensus_type'],
        timeout_seconds=context.get('timeout_seconds', 300)
    )

    # Generate evidence span
    evidence_span_id = hashlib.sha256(
        f"{action_id}{action_description}".encode()
    ).hexdigest()[:16]

    return {
        'success': True,
        'chamber_session': chamber.to_dict(),
        'action_type': action_type,
        'risk_level': config['risk_level'],
        'evidence_span_id': evidence_span_id,
        'instructions': 'Votes must be submitted from each required agent before action execution',
        'governance_state': 'CONSENSUS_REQUIRED'
    }


def main():
    """CLI interface for Star Chamber Consensus."""
    if len(sys.argv) < 2:
        print(json.dumps({
            'error': 'Usage: star_chamber_consensus.py <action> <parameters_json>',
            'actions': ['initiate', 'vote', 'check_status']
        }))
        sys.exit(1)

    action = sys.argv[1]
    params = json.loads(sys.argv[2]) if len(sys.argv) > 2 else {}

    if action == 'initiate':
        result = initiate_star_chamber(
            action_id=params.get('action_id', 'action_' + str(abs(hash(str(params))))),
            action_description=params.get('action_description', 'No description provided'),
            action_type=params.get('action_type', 'unknown'),
            context=params.get('context', {})
        )
    else:
        result = {'error': f'Unknown action: {action}', 'supported_actions': ['initiate', 'vote', 'check_status']}

    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
