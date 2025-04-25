import fs from "fs";

export async function audioBufferToBase64(buffer: Buffer) {
  return buffer.toString("base64");
}

export async function filePathToBase64(filePath: string) {
  try {
    const data = await fs.promises.readFile(filePath);
    return data.toString("base64");
  } catch (error) {
    throw new Error(`Error reading audio file: ${error}`);
  }
}