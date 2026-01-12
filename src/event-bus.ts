import { EventEmitter } from "events";

export interface BusEvent<T = unknown> {
  type: string;
  payload: T;
  timestamp: number;
}

export class EventBus {
  private emitter = new EventEmitter();

  publish<T>(event: BusEvent<T>) {
    this.emitter.emit(event.type, event);
    this.emitter.emit("*", event);
  }

  subscribe<T>(eventType: string, handler: (event: BusEvent<T>) => void) {
    this.emitter.on(eventType, handler as any);
    return () => this.emitter.off(eventType, handler as any);
  }
}

export const eventBus = new EventBus();
