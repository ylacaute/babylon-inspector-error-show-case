import {AdvancedDynamicTexture, LinearGradient, Rectangle} from "@babylonjs/gui";
import {Constants} from "../Constants";

export class GuiUtils {

  public static addBlackGradientBackground(advancedTexture: AdvancedDynamicTexture): void {
    const background: Rectangle = new Rectangle("gradiantBackground");
    const gradient: LinearGradient = new LinearGradient(0, 0, 0, 1000);
    gradient.addColorStop(0, Constants.COLOR_BLACK);
    gradient.addColorStop(1, "#000");
    background.backgroundGradient = gradient;
    background.color = "transparent";
    advancedTexture.addControl(background);
  }

}
