import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CONFIG } from "../config/index.js";

export const server = new McpServer(
  {
    name: CONFIG.serverName,
    version: CONFIG.serverVersion,
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
    instructions: `
    MCP server for media generation.
    It is used to generate images from text prompts using Replicate models
    and sound effects from text descriptions using ElevenLabs API.
    `,
  }
);

export async function startServer() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(
      `${CONFIG.serverName} v${CONFIG.serverVersion} running on stdio`
    );
  } catch (error) {
    console.error(
      "Server initialization error:",
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}
