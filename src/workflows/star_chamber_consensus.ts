import { createHmac } from "crypto";

export interface StarChamberBallot {
  agent_id: string;
  decision: "approve" | "reject";
  signature: string;
}

export interface StarChamberResult {
  quorum: number;
  approvals: number;
  rejections: number;
  consensus: boolean;
  invalid_signatures: string[];
}

function verifySignature(agentId: string, decision: string, signature: string) {
  const secret = process.env.HARBINGER_STAR_CHAMBER_KEY ?? "harbinger-star-chamber";
  const expected = createHmac("sha256", secret).update(`${agentId}:${decision}`).digest("hex");
  return expected === signature;
}

export function runStarChamberConsensus(ballots: StarChamberBallot[], quorum = 3): StarChamberResult {
  const invalid: string[] = [];
  const approvals = ballots.filter((ballot) => {
    const valid = verifySignature(ballot.agent_id, ballot.decision, ballot.signature);
    if (!valid) {
      invalid.push(ballot.agent_id);
    }
    return valid && ballot.decision === "approve";
  }).length;

  const rejections = ballots.filter((ballot) => {
    const valid = verifySignature(ballot.agent_id, ballot.decision, ballot.signature);
    if (!valid && !invalid.includes(ballot.agent_id)) {
      invalid.push(ballot.agent_id);
    }
    return valid && ballot.decision === "reject";
  }).length;

  const consensus = approvals >= quorum && rejections === 0 && invalid.length === 0;

  return {
    quorum,
    approvals,
    rejections,
    consensus,
    invalid_signatures: invalid,
  };
}
