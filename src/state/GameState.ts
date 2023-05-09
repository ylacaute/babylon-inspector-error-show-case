import {BaseState} from "./BaseState";
import {EventDispatcher} from "../utils/EventUtils";
import {AppEventMap} from "../App";
import {Engine} from "@babylonjs/core";

export class GameState extends BaseState {

  public static STATE_NAME: string = "GameState";

  constructor(
      eventDispatcher: EventDispatcher<AppEventMap>,
      engine: Engine) {
    super(GameState.STATE_NAME, eventDispatcher, engine);
    this.initializeScene();
  }

  initializeScene(): void {

  }

}
