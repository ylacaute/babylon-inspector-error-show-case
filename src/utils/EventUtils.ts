export class Event {
}

export class EntityEvent<T> extends Event {

  private readonly _entity: T;

  constructor(entity: T) {
    super();
    this._entity = entity;
  }

  get entity(): T {
    return this._entity;
  }

}

export type EventMap = {
  [key: string]: Event;
}

export type EventListenerMap<T extends EventMap> = {
  [K in keyof T]: Array<(event: T[K]) => any>;
}

export class EventDispatcher<E extends EventMap> {

  private listeners: EventListenerMap<E> = {} as EventListenerMap<E>;

  public addEventListener<K extends keyof E>(
      type: K,
      listener: (event: E[K]) => any): void {

    if (!this.listeners[type]) {
      this.listeners[type] = [] as EventListenerMap<E>[K];
    }
    this.listeners[type].push(listener);
  }

  public removeEventListener<K extends keyof E>(
      type: K,
      listener: (event: E[K]) => any): void {

    if (this.listeners[type]) {
      const index: number = this.listeners[type].indexOf(listener);
      if (index !== -1) {
        this.listeners[type].splice(index, 1);
      }
    }
  }

  public dispatchEvent<K extends keyof E>(type: K, event: E[K]): void {
    if (this.listeners[type]) {
      this
          .listeners[type]
          .forEach((listener): void => {
            listener(event);
          });
    }
  }

}

