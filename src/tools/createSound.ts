import axios from "axios";
import path from "path";
import fs from "fs";
import { CreateSoundParams } from "../types/index.js";
import { handleError } from "../utils/error.js";
import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import os from "os";
import { CONFIG } from "../config/index.js";

export const registerCreateSoundTool = async (
  input: CreateSoundParams
): Promise<CallToolResult> => {
  try {
    const { text, duration_seconds, output_directory } = input;
    
    // Validate input
    if (duration_seconds < 0.5 || duration_seconds > 22) {
      throw new Error("Duration must be between 0.5 and 22 seconds");
    }
    
    // Determine output path
    const outputPath = output_directory || path.join(os.homedir(), "Desktop");
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
    
    // Create a unique filename based on description and timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const safeName = text.slice(0, 20).replace(/[^\w]/g, "_");
    const outputFileName = `sfx_${safeName}_${timestamp}.mp3`;
    const outputFilePath = path.join(outputPath, outputFileName);
    
    // Make API call to ElevenLabs
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      throw new Error("ELEVENLABS_API_KEY environment variable is not set");
    }
    
    const apiUrl = `${CONFIG.elevenlabsApiUrl}/sound-generation`;
    const response = await axios({
      method: "POST",
      url: apiUrl,
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      data: {
        text,
        duration_seconds,
        prompt_influence: 0.3,
        output_format: "mp3_44100_128",
      },
      responseType: "arraybuffer",
    });
    
    // Save the audio file
    fs.writeFileSync(outputFilePath, response.data);
    
    return {
      content: [
        {
          type: "text",
          text: `Success. Sound effect created and saved to: ${outputFilePath}`,
        },
      ],
    };
  } catch (error) {
    handleError(error);
  }
};