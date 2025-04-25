import { z } from 'zod';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import os from 'os';

const inputSchema = z.object({
  text: z.string().describe('The text that will get converted into a sound effect'),
  duration_seconds: z.number().min(0.5).max(22).optional().describe('The duration of the sound in seconds (0.5-22)'),
  prompt_influence: z.number().min(0).max(1).optional().describe('How closely to follow the prompt (0-1)'),
  output_format: z.enum([
    'mp3_44100_128',
    'mp3_44100_192',
    'mp3_44100_32',
    'mp3_22050_32',
    'mp3_22050_64',
    'mp3_22050_96',
    'mp3_22050_128',
    'mp3_22050_192',
    'pcm_44100',
    'pcm_22050',
    'ulaw_8000',
    'ulaw_16000',
    'ulaw_22050',
    'ulaw_44100',
    'mp3_44100_64',
    'mp3_44100_96',
    'mp3_44100_32',
    'mp3_44100_256'
  ]).optional().describe('Output format of the generated audio'),
  output_directory: z.string().optional().describe('Directory where the generated sound will be saved')
});

type Input = z.infer<typeof inputSchema>;

export const registerCreateSoundTool = async (
  input: Input
): Promise<CallToolResult> => {
  const { text, duration_seconds, prompt_influence, output_format, output_directory } = input;
  
  if (!process.env.ELEVENLABS_API_KEY) {
    throw new Error('ELEVENLABS_API_KEY environment variable is required');
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

  const response = await axios({
    method: 'POST',
    url: 'https://api.elevenlabs.io/v1/sound-generation',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
    },
    data: {
      text,
      ...(duration_seconds && { duration_seconds }),
      ...(prompt_influence && { prompt_influence }),
      ...(output_format && { output_format }),
    },
    responseType: 'arraybuffer',
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
}; 