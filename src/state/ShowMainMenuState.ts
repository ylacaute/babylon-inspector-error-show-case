import {BaseState} from "./BaseState";
import {ArcRotateCamera, Engine, HemisphericLight} from "@babylonjs/core";
import {EventDispatcher} from "../utils/EventUtils";
import {AppEventMap, StateChangeEvent, StateEventType} from "../App";
import {AdvancedDynamicTexture, Button, Control, StackPanel} from "@babylonjs/gui";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {Constants} from "../Constants";
import {GuiUtils} from "../utils/GuiUtils";
import {LoadGameState} from "./LoadGameState";

export class ShowMainMenuState extends BaseState {

  public static STATE_NAME: string = "MainMenuState";

  constructor(
      eventDispatcher: EventDispatcher<AppEventMap>,
      engine: Engine,
  ) {
    super(ShowMainMenuState.STATE_NAME, eventDispatcher, engine);
    this.initializeScene();
  }

  initializeScene(): void {
    new ArcRotateCamera(
        "Camera",
        -Math.PI / 2,
        Math.PI / 3,
        25,
        Vector3.Zero());
    new HemisphericLight(
        "light",
        new Vector3(1, 1, 0),
        this.scene);

    const advancedTexture: AdvancedDynamicTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    GuiUtils.addBlackGradientBackground(advancedTexture);

    const mainMenuPanel: StackPanel = new StackPanel("mainMenuButtonPanel");
    mainMenuPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    mainMenuPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    mainMenuPanel.setPaddingInPixels(30, 30, 30, 30);
    mainMenuPanel.width = "500px";
    mainMenuPanel.height = "50%";
    mainMenuPanel.isVertical = true;
    advancedTexture.addControl(mainMenuPanel);

    const newGameButton: Button = Button.CreateSimpleButton("newGameButton", "New game");
    this.styleMainMenuButton(newGameButton);
    newGameButton.onPointerUpObservable.add((): void => {
      const loadGameState: LoadGameState = new LoadGameState(this.eventDispatcher, this.engine);
      this.eventDispatcher.dispatchEvent(
          "onStateChangeEvent",
          new StateChangeEvent(loadGameState, StateEventType.REPLACE_CURRENT))
    });
    const optionsButton: Button = Button.CreateSimpleButton("optionsButton", "Options");
    this.styleMainMenuButton(optionsButton);
    optionsButton.onPointerUpObservable.add((): void => {
      alert("Show options...");
    });
    const creditsButton: Button = Button.CreateSimpleButton("creditsButton", "Credits");
    this.styleMainMenuButton(creditsButton);
    creditsButton.onPointerUpObservable.add((): void => {
      alert("Show credits...");
    });
    mainMenuPanel.addControl(newGameButton);
    mainMenuPanel.addControl(optionsButton);
    mainMenuPanel.addControl(creditsButton);
  }

  private styleMainMenuButton(button: Button): void {
    button.fontSize = "60";
    button.color = Constants.COLOR_RED;
    button.cornerRadius = 20;
    button.background = "black";
    button.fontFamily = "Abel";
    button.shadowColor = Constants.COLOR_RED;
    button.shadowBlur = 20;
    button.width = "300px";
    button.height = "150px";
    button.setPaddingInPixels(50, 0, 0, 0);
  }

}
