import { z } from "zod";

export const createPredictionSchema = {
  prompt: z.string().min(1).describe("Prompt for generated image"),
  seed: z
    .number()
    .int()
    .optional()
    .describe("Random seed. Set for reproducible generation"),
  go_fast: z
    .boolean()
    .default(true)
    .describe(
      "Run faster predictions with model optimized for speed (currently fp8 quantized); disable to run in original bf16"
    ),
  megapixels: z
    .enum(["1", "0.25"])
    .default("1")
    .describe("Approximate number of megapixels for generated image"),
  num_outputs: z
    .number()
    .int()
    .min(1)
    .max(4)
    .default(1)
    .describe("Number of outputs to generate"),
  aspect_ratio: z
    .enum([
      "1:1",
      "16:9",
      "21:9",
      "3:2",
      "2:3",
      "4:5",
      "5:4",
      "3:4",
      "4:3",
      "9:16",
      "9:21",
    ])
    .default("1:1")
    .describe("Aspect ratio for the generated image"),
  output_format: z
    .enum(["webp", "jpg", "png"])
    .default("webp")
    .describe("Format of the output images"),
  output_quality: z
    .number()
    .int()
    .min(0)
    .max(100)
    .default(80)
    .describe(
      "Quality when saving the output images, from 0 to 100. 100 is best quality, 0 is lowest quality. Not relevant for .png outputs"
    ),
  num_inference_steps: z
    .number()
    .int()
    .min(1)
    .max(4)
    .default(4)
    .describe(
      "Number of denoising steps. 4 is recommended, and lower number of steps produce lower quality outputs, faster."
    ),
  disable_safety_checker: z
    .boolean()
    .default(false)
    .describe("Disable safety checker for generated images."),
};
const createPredictionObjectSchema = z.object(createPredictionSchema);
export type CreatePredictionParams = z.infer<
  typeof createPredictionObjectSchema
>;

export const imageGenerationSchema = {
  ...createPredictionSchema,
  support_image_mcp_response_type: z
    .boolean()
    .default(true)
    .describe(
      "Disable if the image type is not supported in the response, if it's Cursor app for example"
    ),
};
const imageGenerationObjectSchema = z.object(imageGenerationSchema);
export type ImageGenerationParams = z.infer<typeof imageGenerationObjectSchema>;

export const getPredictionSchema = {
  predictionId: z.string().min(1).describe("ID of the prediction to retrieve"),
};
const getPredictionObjectSchema = z.object(getPredictionSchema);
export type GetPredictionParams = z.infer<typeof getPredictionObjectSchema>;

export const createSoundSchema = {
  text: z.string().min(1).describe("Text description of the sound effect"),
  duration_seconds: z
    .number()
    .min(0.5)
    .max(22)
    .default(2.0)
    .describe("Duration of the sound effect in seconds"),
  output_directory: z
    .string()
    .optional()
    .describe("Directory where sound file should be saved. Defaults to $HOME/Desktop if not provided"),
};
const createSoundObjectSchema = z.object(createSoundSchema);
export type CreateSoundParams = z.infer<typeof createSoundObjectSchema>;

