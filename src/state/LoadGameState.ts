import {BaseState} from "./BaseState";
import {EventDispatcher} from "../utils/EventUtils";
import {AppEventMap} from "../App";
import {ArcRotateCamera, Engine, HemisphericLight} from "@babylonjs/core";
import {AdvancedDynamicTexture, Control, Rectangle} from "@babylonjs/gui";
import {GuiUtils} from "../utils/GuiUtils";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {GameState} from "./GameState";
import {Constants} from "../Constants";
import {Scene} from "@babylonjs/core/scene";

export class LoadGameState extends BaseState {

  public static STATE_NAME: string = "LoadGameState";

  private readonly _loadingBar: Rectangle;
  private _progress: number = 50;

  constructor(
      eventDispatcher: EventDispatcher<AppEventMap>,
      engine: Engine) {
    super(LoadGameState.STATE_NAME, eventDispatcher, engine);

    // PROBLEM2: WE CAN'T CREATE A NEW SCENE LIKE THIS ! otherwise it change the current rendering scene.
    //new Scene(this.engine);

    // SOLUTION :
    setTimeout(() => {
      new Scene(engine);
    }, 0);

    this._loadingBar = this.createLoadingBar();
    this.initializeLoadingScene();
  }

  initializeLoadingScene(): void {
    const camera: ArcRotateCamera = new ArcRotateCamera(
        "Camera",
        -Math.PI / 2,
        Math.PI / 2,
        4, Vector3.Zero(), this.scene);
    const light: HemisphericLight = new HemisphericLight(
        "light",
        new Vector3(1, 1, 0), this.scene);

    const advancedTexture: AdvancedDynamicTexture = AdvancedDynamicTexture
        .CreateFullscreenUI("UI", false);
    GuiUtils.addBlackGradientBackground(advancedTexture);
    advancedTexture.addControl(this._loadingBar);

    // Fake loading
    let interval = setInterval(() => {
      this._progress += 5;
      this.onProgressChange();
    }, 100);
  }

  createLoadingBar(): Rectangle {
    const loadingBar: Rectangle = new Rectangle("loadingBar");
    loadingBar.background = Constants.COLOR_RED;
    loadingBar.color = Constants.COLOR_RED;
    loadingBar.width = this._progress + "%";
    loadingBar.height = "30px";
    loadingBar.paddingBottom = "0";
    loadingBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    loadingBar.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    return loadingBar;
  }

  onProgressChange(): void {
    this._loadingBar.width = this._progress + "%";
    if (this._progress == 100) {
      this.onGameReady();
    }
  }

  onGameReady(): void {
    // ...
  }

}
