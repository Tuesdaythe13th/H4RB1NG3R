#!/usr/bin/env python3
"""
Wazuh-MCP Bridge

Compiles natural language security intent into Wazuh SIEM rules and queries.
Implements operational integrity enforcement via SIEM integration.

This is the operational security binding layer described in H4RB1NG3R v0.05.
"""

import json
import sys
from typing import Dict, List, Any
import hashlib
from datetime import datetime


class WazuhRuleCompiler:
    """Compiles security intent into Wazuh rule format."""

    # Intent-to-rule mapping templates
    INTENT_TEMPLATES = {
        'block_ip': {
            'rule_template': '<rule id="{id}" level="10"><if_group>web</if_group><srcip>{ip}</srcip><description>Blocked IP: {ip} - Reason: {reason}</description><options>no_email_alert,no_log</options><action>deny</action></rule>',
            'category': 'firewall',
            'severity': 10
        },
        'detect_anomaly': {
            'rule_template': '<rule id="{id}" level="7"><if_group>threat_detection</if_group><match>{pattern}</match><description>Anomaly detected: {description}</description></rule>',
            'category': 'detection',
            'severity': 7
        },
        'rate_limit': {
            'rule_template': '<rule id="{id}" level="8" frequency="10" timeframe="60"><if_matched_sid>{parent_id}</if_matched_sid><description>Rate limit exceeded: {resource} - {description}</description><action>throttle</action></rule>',
            'category': 'rate_limiting',
            'severity': 8
        },
        'privilege_escalation': {
            'rule_template': '<rule id="{id}" level="12"><if_group>authentication</if_group><match>privilege.*escalation|sudo|root</match><description>Privilege escalation attempt: {description}</description><action>alert</action></rule>',
            'category': 'security',
            'severity': 12
        },
        'data_exfiltration': {
            'rule_template': '<rule id="{id}" level="11"><if_group>data_loss</if_group><match>upload|exfil|transfer.*large</match><description>Potential data exfiltration: {description}</description><action>block</action></rule>',
            'category': 'dlp',
            'severity': 11
        }
    }

    @staticmethod
    def generate_rule_id() -> str:
        """Generate a unique Wazuh rule ID."""
        timestamp = datetime.utcnow().isoformat()
        return str(100000 + abs(hash(timestamp)) % 900000)

    @classmethod
    def compile_intent(cls, intent: str, parameters: Dict[str, Any]) -> Dict[str, Any]:
        """
        Compile natural language intent into Wazuh rule.

        Args:
            intent: Intent type (e.g., 'block_ip', 'detect_anomaly')
            parameters: Intent-specific parameters

        Returns:
            Dictionary containing compiled rule and metadata
        """
        if intent not in cls.INTENT_TEMPLATES:
            return {
                'success': False,
                'error': f'Unknown intent type: {intent}',
                'supported_intents': list(cls.INTENT_TEMPLATES.keys())
            }

        template_config = cls.INTENT_TEMPLATES[intent]
        rule_id = cls.generate_rule_id()

        # Populate template
        rule_params = {
            'id': rule_id,
            **parameters
        }

        try:
            rule_xml = template_config['rule_template'].format(**rule_params)
        except KeyError as e:
            return {
                'success': False,
                'error': f'Missing required parameter: {e}',
                'required_params': cls.get_required_params(intent)
            }

        return {
            'success': True,
            'rule_id': rule_id,
            'rule_xml': rule_xml,
            'category': template_config['category'],
            'severity': template_config['severity'],
            'intent': intent,
            'parameters': parameters
        }

    @classmethod
    def get_required_params(cls, intent: str) -> List[str]:
        """Get required parameters for an intent type."""
        if intent not in cls.INTENT_TEMPLATES:
            return []

        template = cls.INTENT_TEMPLATES[intent]['rule_template']
        # Extract {param} placeholders (excluding 'id')
        import re
        params = re.findall(r'\{(\w+)\}', template)
        return [p for p in params if p != 'id']


def compile_nl_to_siem(
    natural_language_intent: str,
    context: Dict[str, Any] = None
) -> Dict[str, Any]:
    """
    Main function to compile natural language into SIEM rules.

    Args:
        natural_language_intent: Natural language description of security intent
        context: Optional context information

    Returns:
        Dictionary containing compiled rules and enforcement plan
    """
    if context is None:
        context = {}

    # Parse intent from natural language (simplified - would use NLP in production)
    intent_mapping = {
        'block': ('block_ip', lambda: {'ip': context.get('ip', '0.0.0.0'), 'reason': context.get('reason', 'security_policy')}),
        'detect': ('detect_anomaly', lambda: {'pattern': context.get('pattern', '.*'), 'description': natural_language_intent}),
        'limit': ('rate_limit', lambda: {'resource': context.get('resource', 'api'), 'parent_id': '10001', 'description': natural_language_intent}),
        'privilege': ('privilege_escalation', lambda: {'description': natural_language_intent}),
        'exfil': ('data_exfiltration', lambda: {'description': natural_language_intent})
    }

    detected_intent = None
    parameters = {}

    for keyword, (intent_type, param_fn) in intent_mapping.items():
        if keyword in natural_language_intent.lower():
            detected_intent = intent_type
            parameters = param_fn()
            break

    if not detected_intent:
        return {
            'success': False,
            'error': 'Could not parse intent from natural language',
            'input': natural_language_intent,
            'suggestion': 'Try using keywords like: block, detect, limit, privilege, exfil'
        }

    # Compile the rule
    compilation_result = WazuhRuleCompiler.compile_intent(detected_intent, parameters)

    if not compilation_result['success']:
        return compilation_result

    # Generate deployment plan
    deployment_plan = {
        'step_1': 'Validate rule syntax',
        'step_2': 'Deploy to Wazuh manager',
        'step_3': 'Restart Wazuh service',
        'step_4': 'Verify rule activation',
        'step_5': 'Log deployment to audit trail'
    }

    # Generate evidence span
    evidence_span_id = hashlib.sha256(
        f"{natural_language_intent}{compilation_result['rule_id']}".encode()
    ).hexdigest()[:16]

    return {
        'success': True,
        'natural_language_intent': natural_language_intent,
        'parsed_intent': detected_intent,
        'compiled_rule': compilation_result,
        'deployment_plan': deployment_plan,
        'enforcement_mode': context.get('enforcement_mode', 'audit'),
        'evidence_span_id': evidence_span_id,
        'safety_warning': 'CRITICAL: Direct execution of SIEM rules requires authorization. This is a preview only.',
        'requires_approval': True,
        'approval_type': 'star_chamber'
    }


def query_siem_logs(
    query_intent: str,
    time_range: Dict[str, Any] = None,
    filters: Dict[str, Any] = None
) -> Dict[str, Any]:
    """
    Compile natural language into Wazuh query.

    Args:
        query_intent: Natural language query description
        time_range: Time range for query
        filters: Additional filters

    Returns:
        Dictionary containing compiled query
    """
    if time_range is None:
        time_range = {'last': '24h'}
    if filters is None:
        filters = {}

    # Map common query intents to Wazuh API queries
    query_templates = {
        'failed_logins': {
            'endpoint': '/security_events',
            'query': 'rule.groups=authentication_failed',
            'fields': ['agent.name', 'rule.description', 'timestamp']
        },
        'high_severity': {
            'endpoint': '/alerts',
            'query': 'rule.level>=10',
            'fields': ['rule.id', 'rule.description', 'agent.name', 'timestamp']
        },
        'anomalies': {
            'endpoint': '/security_events',
            'query': 'rule.groups=threat_detection',
            'fields': ['rule.description', 'data.srcip', 'timestamp']
        }
    }

    # Simple keyword matching (would use NLP in production)
    detected_template = None
    for keyword, template in query_templates.items():
        if keyword.replace('_', ' ') in query_intent.lower():
            detected_template = template
            break

    if not detected_template:
        detected_template = {
            'endpoint': '/security_events',
            'query': f'description~{query_intent}',
            'fields': ['*']
        }

    # Build full query
    full_query = {
        'endpoint': detected_template['endpoint'],
        'query': detected_template['query'],
        'fields': detected_template['fields'],
        'time_range': time_range,
        'filters': filters,
        'limit': filters.get('limit', 100)
    }

    return {
        'success': True,
        'query_intent': query_intent,
        'compiled_query': full_query,
        'execution_mode': 'read_only',
        'estimated_results': 'unknown'
    }


def main():
    """CLI interface for the Wazuh-MCP Bridge."""
    if len(sys.argv) < 2:
        print(json.dumps({
            'error': 'Usage: wazuh_mcp_bridge.py <mode> <intent> [context_json]',
            'modes': ['compile', 'query']
        }))
        sys.exit(1)

    mode = sys.argv[1]
    intent = sys.argv[2] if len(sys.argv) > 2 else ''
    context = json.loads(sys.argv[3]) if len(sys.argv) > 3 else {}

    if mode == 'compile':
        result = compile_nl_to_siem(intent, context)
    elif mode == 'query':
        result = query_siem_logs(intent, context.get('time_range'), context.get('filters'))
    else:
        result = {'error': f'Unknown mode: {mode}', 'supported_modes': ['compile', 'query']}

    print(json.dumps(result, indent=2))


if __name__ == '__main__':
    main()
