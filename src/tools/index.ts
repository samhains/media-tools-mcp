import { getPredictionSchema } from "../types/index.js";

import { server } from "../server/index.js";
import { imageGenerationSchema } from "../types/index.js";
import { registerGetPredictionTool } from "./getPrediction.js";
import { registerGenerateImageTool } from "./generateImage.js";
import { createPredictionSchema } from "../types/index.js";
import { registerCreatePredictionTool } from "./createPrediction.js";

export const registerAllTools = () => {
  server.tool(
    "generate_image",
    "Generate an image from a text prompt using Flux Schnell model",
    imageGenerationSchema,
    registerGenerateImageTool
  );
  server.tool(
    "get_prediction",
    "Get details of a specific prediction by ID",
    getPredictionSchema,
    registerGetPredictionTool
  );
  server.tool(
    "create_prediction",
    "Generate an prediction from a text prompt using Flux Schnell model",
    createPredictionSchema,
    registerCreatePredictionTool
  );
};
