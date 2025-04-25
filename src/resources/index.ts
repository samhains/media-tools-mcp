import { registerImageListResource } from "./imageList.js";
import { registerPreditionListResource } from "./predictionList.js";

export const registerAllResources = () => {
  registerImageListResource();
  registerPreditionListResource();
};
