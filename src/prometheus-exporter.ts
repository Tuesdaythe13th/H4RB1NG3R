export class MetricRegistry {
  private counters = new Map<string, number>();
  private gauges = new Map<string, number>();

  incCounter(name: string, value = 1) {
    const current = this.counters.get(name) ?? 0;
    this.counters.set(name, current + value);
  }

  setGauge(name: string, value: number) {
    this.gauges.set(name, value);
  }

  render(): string {
    const lines: string[] = [];
    for (const [name, value] of this.counters.entries()) {
      lines.push(`# TYPE ${name} counter`);
      lines.push(`${name} ${value}`);
    }
    for (const [name, value] of this.gauges.entries()) {
      lines.push(`# TYPE ${name} gauge`);
      lines.push(`${name} ${value}`);
    }
    return lines.join("\n");
  }
}

export const metrics = new MetricRegistry();
