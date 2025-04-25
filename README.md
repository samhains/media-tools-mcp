# Media Tools MCP

![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue)
![Model Context Protocol](https://img.shields.io/badge/MCP-Enabled-purple)
[![smithery badge](https://smithery.ai/badge/@awkoy/media-tools-mcp)](https://smithery.ai/server/@awkoy/media-tools-mcp)
![NPM Downloads](https://img.shields.io/npm/dw/media-tools-mcp)
![Stars](https://img.shields.io/github/stars/awkoy/media-tools-mcp)

<a href="https://glama.ai/mcp/servers/ss8n1knen8">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/ss8n1knen8/badge" />
</a>

**Media Tools MCP** is an advanced Model Context Protocol (MCP) server that empowers AI assistants to generate high-quality images. Leveraging [Black Forest Labs' Flux Schnell model](https://replicate.com/black-forest-labs/flux-schnell) for raster images via the Replicate API.

## 📑 Table of Contents

- [Getting Started & Integration](#-getting-started--integration)
  - [Setup Process](#setup-process)
  - [Cursor Integration](#cursor-integration)
  - [Claude Desktop Integration](#claude-desktop-integration)
  - [Smithery Integration](#smithery-integration)
  - [Glama.ai Integration](#glamaai-integration)
- [Features](#-features)
- [Documentation](#-documentation)
  - [Available Tools](#available-tools)
  - [Available Resources](#available-resources)
- [Development](#-development)
- [Technical Details](#-technical-details)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Resources](#-resources)
- [Examples](#-examples)

## 🚀 Getting Started & Integration

### Setup Process

1. **Obtain a Replicate API Token**
   - Sign up at [Replicate](https://replicate.com/)
   - Create an API token in your account settings

2. **Choose Your Integration Method**
   - Follow one of the integration options below based on your preferred MCP client

3. **Ask Your AI Assistant to Generate an Image**
   - Simply ask naturally: "Can you generate an image of a serene mountain landscape at sunset?"
   - Or be more specific: "Please create an image showing a peaceful mountain scene with a lake reflecting the sunset colors in the foreground"

4. **Explore Advanced Features**
   - Try different parameter settings for customized results
   - Experiment with SVG generation using `generate_svg`
   - Use batch image generation or variant generation features

### Cursor Integration

#### Method 1: Using mcp.json

1. Create or edit the `.cursor/mcp.json` file in your project directory:

```json
{
  "mcpServers": {
    "media-tools-mcp": {
      "command": "env REPLICATE_API_TOKEN=YOUR_TOKEN npx",
      "args": ["-y", "media-tools-mcp"]
    }
  }
}
```

2. Replace `YOUR_TOKEN` with your actual Replicate API token
3. Restart Cursor to apply the changes

#### Method 2: Manual Mode

1. Open Cursor and go to Settings
2. Navigate to the "MCP" or "Model Context Protocol" section
3. Click "Add Server" or equivalent
4. Enter the following command in the appropriate field:

```
env REPLICATE_API_TOKEN=YOUR_TOKEN npx -y media-tools-mcp
```

5. Replace `YOUR_TOKEN` with your actual Replicate API token
6. Save the settings and restart Cursor if necessary

### Claude Desktop Integration

1. Create or edit the `mcp.json` file in your configuration directory:

```json
{
  "mcpServers": {
    "media-tools-mcp": {
      "command": "npx",
      "args": ["-y", "media-tools-mcp"],
      "env": {
        "REPLICATE_API_TOKEN": "YOUR TOKEN"
      }
    }
  }
}
```

2. Replace `YOUR_TOKEN` with your actual Replicate API token
3. Restart Claude Desktop to apply the changes

### Smithery Integration

This MCP server is available as a hosted service on Smithery, allowing you to use it without setting up your own server.

1. Visit [Smithery](https://smithery.ai/) and create an account if you don't have one
2. Navigate to the [Media Tools MCP server page](https://smithery.ai/server/@awkoy/media-tools-mcp)
3. Click "Add to Workspace" to add the server to your Smithery workspace
4. Configure your MCP client (Cursor, Claude Desktop, etc.) to use your Smithery workspace URL

For more information on using Smithery with your MCP clients, visit the [Smithery documentation](https://smithery.ai/docs).

### Glama.ai Integration

This MCP server is also available as a hosted service on Glama.ai, providing another option to use it without local setup.

1. Visit [Glama.ai](https://glama.ai/) and create an account if you don't have one
2. Go to the [Media Tools MCP server page](https://glama.ai/mcp/servers/ss8n1knen8)
3. Click "Install Server" to add the server to your workspace
4. Configure your MCP client to use your Glama.ai workspace

For more information, visit the [Glama.ai MCP servers documentation](https://glama.ai/mcp/servers).

## 🌟 Features

- **🖼️ High-Quality Image Generation** - Create stunning images using Flux Schnell, a state-of-the-art AI model
- **🤖 AI Assistant Integration** - Seamlessly enable AI assistants like Claude to generate visual content
- **🎛️ Advanced Customization** - Fine-tune generation with controls for aspect ratio, quality, resolution, and more
- **🔌 Universal MCP Compatibility** - Works with all MCP clients including Cursor, Claude Desktop, Cline, and Zed
- **🔒 Secure Local Processing** - All requests are processed locally for enhanced privacy and security
- **🔍 Comprehensive History Management** - Track, view, and retrieve your complete generation history

## 📚 Documentation

### Available Tools

#### `generate_image`

Generates an image based on a text prompt using the Flux Schnell model.

```typescript
{
  prompt: string;                // Required: Text description of the image to generate
  seed?: number;                 // Optional: Random seed for reproducible generation
  go_fast?: boolean;             // Optional: Run faster predictions with optimized model (default: true)
  megapixels?: "1" | "0.25";     // Optional: Image resolution (default: "1")
  num_outputs?: number;          // Optional: Number of images to generate (1-4) (default: 1)
  aspect_ratio?: string;         // Optional: Aspect ratio (e.g., "16:9", "4:3") (default: "1:1")
  output_format?: string;        // Optional: Output format ("webp", "jpg", "png") (default: "webp")
  output_quality?: number;       // Optional: Image quality (0-100) (default: 80)
  num_inference_steps?: number;  // Optional: Number of denoising steps (1-4) (default: 4)
  disable_safety_checker?: boolean; // Optional: Disable safety filter (default: false)
}
```


#### `get_prediction`

Gets detailed information about a specific prediction.

```typescript
{
  predictionId: string;  // Required: ID of the prediction to retrieve
}
```

### Available Resources

#### `imagelist`

Browse your history of generated images created with the Flux Schnell model.


#### `predictionlist`

Browse all your Replicate predictions history.

## 💻 Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/media-tools-mcp.git
cd media-tools-mcp
```

2. Install dependencies:

```bash
npm install
```

3. Start development mode:

```bash
npm run dev
```

4. Build the project:

```bash
npm run build
```

5. Connect to Client:

```json
{
  "mcpServers": {
    "image-generation-mcp": {
      "command": "npx",
      "args": [
        "/Users/{USERNAME}/{PATH_TO}/media-tools-mcp/build/index.js"
      ],
      "env": {
        "REPLICATE_API_TOKEN": "YOUR REPLICATE API TOKEN"
      }
    }
  }
}
```

## ⚙️ Technical Details

### Stack

- **Model Context Protocol SDK** - Core MCP functionality for tool and resource management
- **Replicate API** - Provides access to state-of-the-art AI image generation models
- **TypeScript** - Ensures type safety and leverages modern JavaScript features
- **Zod** - Implements runtime type validation for robust API interactions

### Configuration

The server can be configured by modifying the `CONFIG` object in `src/config/index.ts`:

```javascript
const CONFIG = {
  serverName: "media-tools-mcp",
  serverVersion: "0.1.2",
  imageModelId: "black-forest-labs/flux-schnell",
  pollingAttempts: 25,
  pollingInterval: 2000, // ms
};
```

## 🔍 Troubleshooting

### Common Issues

#### Authentication Error
- Ensure your `REPLICATE_API_TOKEN` is correctly set in the environment
- Verify your token is valid by testing it with the Replicate API directly

#### Safety Filter Triggered
- The model has a built-in safety filter that may block certain prompts
- Try modifying your prompt to avoid potentially problematic content

#### Timeout Error
- For larger images or busy servers, you might need to increase `pollingAttempts` or `pollingInterval` in the configuration
- Default settings should work for most use cases

## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For feature requests or bug reports, please create a GitHub issue. If you like this project, consider starring the repository!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [Replicate API Documentation](https://replicate.com/docs)
- [Flux Schnell Model](https://replicate.com/black-forest-labs/flux-schnell)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Smithery Documentation](https://smithery.ai/docs)
- [Glama.ai MCP Servers](https://glama.ai/mcp/servers)

## 🎨 Examples

![Demo](https://github.com/user-attachments/assets/ad6db606-ae3a-48db-a1cc-e1f88847769e)

Here's an example of how to use the image generation tool:

```json
{
  "prompt": "A beautiful mountain landscape with a lake, in the style of a watercolor painting",
  "aspect_ratio": "16:9",
  "output_format": "png"
}
```


---

Made with ❤️ by Yaroslav Boiko

