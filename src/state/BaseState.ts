import {ActionManager, Engine} from '@babylonjs/core';
import {Scene} from "@babylonjs/core/scene";
import {EventDispatcher} from "../utils/EventUtils";
import {AppEventMap} from "../App";
import {Constants} from "../Constants";

export abstract class BaseState {

  private readonly _name: string;
  private readonly _eventDispatcher: EventDispatcher<AppEventMap>;
  private readonly _engine: Engine;
  private readonly _scene: Scene;
  private readonly _actionManager: ActionManager;

  protected constructor(
      name: string,
      eventDispatcher: EventDispatcher<AppEventMap>,
      engine: Engine) {
    this._name = name;
    this._eventDispatcher = eventDispatcher;
    this._engine = engine;
    this._scene = new Scene(engine);
    this._actionManager = new ActionManager(this._scene);

  }

  get name(): string {
    return this._name;
  }

  get eventDispatcher(): EventDispatcher<AppEventMap> {
    return this._eventDispatcher;
  }

  get scene(): Scene {
    return this._scene;
  }

  get canvas(): HTMLCanvasElement {
    return this._engine.getRenderingCanvas() as HTMLCanvasElement;
  }

  get engine(): Engine {
    return this._engine;
  }

  get actionManager(): ActionManager {
    return this._actionManager;
  }

  onEnterState(): void {
    if (Constants.INSPECTOR_ENABLED) {
      this._scene.debugLayer.show({
        showInspector: true,
        embedMode: true,
      });
    }
  }

  onExitState(): void {
    if (Constants.INSPECTOR_ENABLED) {
      this._scene.debugLayer.hide();
    }
  }

  render(): void {
    this._scene.render();
  }

  dispose(): void {
    // PROBLEM1: If we dispose, it breaks the inspector
    this._scene.dispose();
  }

}
