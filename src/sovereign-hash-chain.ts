import { createHash } from "crypto";

export interface HashChainEvent {
  type: string;
  payload: unknown;
  ts: string;
}

export class SovereignHashChain {
  private lastHash: string | null = null;
  private chain: string[] = [];

  append(event: HashChainEvent): string {
    const hash = createHash("sha256")
      .update(JSON.stringify(event) + (this.lastHash ?? ""))
      .digest("hex");

    this.lastHash = hash;
    this.chain.push(hash);
    return hash;
  }

  verify(events: HashChainEvent[]): boolean {
    if (events.length !== this.chain.length) {
      return false;
    }

    let prev: string | null = null;
    for (const [index, event] of events.entries()) {
      const hash = createHash("sha256")
        .update(JSON.stringify(event) + (prev ?? ""))
        .digest("hex");
      if (hash !== this.chain[index]) {
        return false;
      }
      prev = hash;
    }
    return true;
  }

  getLastHash() {
    return this.lastHash;
  }
}
