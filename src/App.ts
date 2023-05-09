import {Engine} from '@babylonjs/core';
import {BaseState} from './state/BaseState';
import {EntityEvent, EventDispatcher} from "./utils/EventUtils";

// import '@babylonjs/loaders/glTF';
// import '@babylonjs/core/Materials/standardMaterial';
// import '@babylonjs/core/Materials/Textures/Loaders/envTextureLoader';

import "@babylonjs/inspector";
import {LoadGameState} from "./state/LoadGameState";
import {ShowMainMenuState} from "./state/ShowMainMenuState";

export enum StateEventType {
  PUSH_NEW,
  POP_CURRENT,
  REPLACE_CURRENT
}

export class StateChangeEvent extends EntityEvent<BaseState> {

  private readonly _type: StateEventType;

  constructor(state: BaseState, stateEventType: StateEventType) {
    super(state);
    this._type = stateEventType;
  }

  get type(): StateEventType {
    return this._type;
  }

}

export type AppEventMap = {
  "onStateChangeEvent": StateChangeEvent,
}

export class App {

  private readonly _engine: Engine;
  private readonly _eventDispatcher: EventDispatcher<AppEventMap>;
  private readonly _stateStack: BaseState[];

  constructor() {
    console.info("App: constructor");
    this._eventDispatcher = new EventDispatcher<AppEventMap>();
    this._eventDispatcher.addEventListener(
        "onStateChangeEvent",
        this.onStateChangeEvent.bind(this));
    this._stateStack = [];
    this._engine = new Engine(
        document.getElementById('renderCanvas') as HTMLCanvasElement,
        true,
        {});
    window.onresize = (): void => this._engine.resize();

    // Target
    // const loadMainMenuState: ShowGameLogoState = new ShowGameLogoState(this._eventDispatcher, this._engine);
    // this.pushState(loadMainMenuState);

    // Tmp
    const showMainMenuState: ShowMainMenuState = new ShowMainMenuState(this._eventDispatcher, this._engine);
    this.pushState(showMainMenuState);

    // Tmp
    // const loadGameState: LoadGameState = new LoadGameState(this._eventDispatcher, this._engine);
    // this._currentState = loadGameState;
    // this.pushState(loadGameState);
  }

  onStateChangeEvent(event: StateChangeEvent): void {
    switch (event.type) {
      case StateEventType.POP_CURRENT:
        this.popState().dispose();
        break;
      case StateEventType.PUSH_NEW:
        this.pushState(event.entity);
        break;
      case StateEventType.REPLACE_CURRENT:
        this.replaceState(event.entity);
        break;
      default:
        throw new Error(`App: Unknown event type ${event.type}`);
    }
  }

  initialize(): void {
    this._engine.runRenderLoop((): void => {
      this.currentState.render();
    });
  }

  popState(): BaseState {
    console.info(`App: popState ${this.currentState.name}`);
    this.currentState.onExitState();
    return this._stateStack.pop();
  }

  pushState(state: BaseState): void {
    console.info(`App: pushState ${state.name}`);
    this._stateStack.push(state);
    this.currentState.onEnterState();
  }

  replaceState(newState: BaseState): void {
    let oldState: BaseState = this.popState();
    this.pushState(newState);
    let timeoutId: number = setTimeout((): void => {
      oldState.dispose();
      clearTimeout(timeoutId);
    }, 0);
  }

  get currentState(): BaseState {
    return this._stateStack[this._stateStack.length - 1];
  }

}
