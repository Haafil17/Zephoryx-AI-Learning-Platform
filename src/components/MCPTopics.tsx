import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plug, Server, Shield, ChevronRight, BookOpen, Workflow, Settings, Globe } from "lucide-react";
import { motion } from "framer-motion";

export const MCPTopics = () => {
  const mcpConcepts = [
    {
      title: "What is Model Context Protocol (MCP)?",
      description: "MCP is an open standard created by Anthropic (November 2024) that provides a universal way for AI models to connect to external data sources and tools. Think of it as a USB-C port for AI — one standardized interface instead of custom integrations for every tool. MCP defines how AI applications (clients) communicate with data providers (servers) through a JSON-RPC 2.0 protocol.",
      icon: Plug,
      keyPoints: [
        "Open-source protocol specification by Anthropic",
        "Replaces fragmented, custom API integrations",
        "Three primitives: Resources (data), Tools (actions), Prompts (templates)"
      ],
      learnMoreUrl: "https://modelcontextprotocol.io/"
    },
    {
      title: "MCP Architecture",
      description: "MCP uses a client-server architecture. The Host (e.g., Claude Desktop, VS Code) contains an MCP Client that maintains 1:1 connections with MCP Servers. Servers expose capabilities: Resources (read-only data like files, database records), Tools (executable functions like API calls, calculations), and Prompts (reusable templates). Communication happens over stdio (local) or HTTP with SSE (remote).",
      icon: Server,
      keyPoints: [
        "Host → Client → Server architecture",
        "Stdio transport for local servers, HTTP+SSE for remote",
        "Servers are lightweight processes, not heavy services"
      ],
      learnMoreUrl: "https://modelcontextprotocol.io/docs/concepts/architecture"
    },
    {
      title: "Building MCP Servers",
      description: "MCP servers can be built in TypeScript (official SDK: @modelcontextprotocol/sdk) or Python (mcp package). A server declares its capabilities — what resources it can read, what tools it can execute, what prompts it offers. Example: A GitHub MCP server might expose tools like 'create_issue', 'search_repos', and resources like 'repo_contents'. The SDK handles protocol negotiation automatically.",
      icon: Settings,
      keyPoints: [
        "TypeScript SDK: @modelcontextprotocol/sdk",
        "Python SDK: pip install mcp",
        "Declare tools with JSON Schema for parameters"
      ],
      learnMoreUrl: "https://modelcontextprotocol.io/docs/first-server/typescript"
    },
    {
      title: "MCP vs Function Calling",
      description: "Function calling (OpenAI, Anthropic tool use) defines tools inline with each API request. MCP externalizes tool definitions into standalone servers that any client can discover and use. Key difference: with function calling, every app reimplements every integration. With MCP, you build a server once and any MCP-compatible client can use it. MCP servers can also provide dynamic resources and prompt templates, which function calling cannot.",
      icon: Workflow,
      keyPoints: [
        "Function calling = per-request tool definitions",
        "MCP = reusable, discoverable tool servers",
        "MCP supports resources and prompts beyond just tools"
      ],
      learnMoreUrl: "https://modelcontextprotocol.io/docs/concepts/tools"
    },
    {
      title: "MCP Ecosystem & Servers",
      description: "The MCP ecosystem is growing rapidly. Official servers include: filesystem (read/write files), GitHub (repos, issues, PRs), Slack (messages, channels), Google Drive, PostgreSQL, Brave Search, and many more. Community servers cover everything from Jira to Notion to Kubernetes. Claude Desktop, Cursor, Windsurf, and Cline all support MCP natively. The registry at mcp.run catalogs available servers.",
      icon: Globe,
      keyPoints: [
        "50+ official and community MCP servers available",
        "Claude Desktop has native MCP support",
        "Cursor, Windsurf, Zed editors support MCP"
      ],
      learnMoreUrl: "https://github.com/modelcontextprotocol/servers"
    },
    {
      title: "MCP Security & Best Practices",
      description: "MCP servers handle sensitive operations and data access, making security critical. Best practices: Use principle of least privilege — servers should request only necessary permissions. Validate all tool inputs server-side. Use OAuth 2.0 for remote server authentication. Never expose secrets in tool responses. Implement rate limiting and audit logging. The protocol supports capability negotiation so clients only see what they're authorized to use.",
      icon: Shield,
      keyPoints: [
        "Principle of least privilege for server capabilities",
        "OAuth 2.0 support for remote authentication",
        "Input validation and output sanitization are essential"
      ],
      learnMoreUrl: "https://modelcontextprotocol.io/docs/concepts/security"
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200 border-0 px-4 py-1.5">
            <Plug className="w-4 h-4 mr-1" /> Anthropic Open Standard
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
            Model Context Protocol (MCP)
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            The open standard for connecting AI models to external tools and data sources. The "USB-C of AI" — one protocol to connect them all.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {mcpConcepts.map((concept, i) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-md">
                      <concept.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-display">{concept.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {concept.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Points:</h4>
                    <ul className="space-y-1.5">
                      {concept.keyPoints.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-2 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-900/30"
                    onClick={() => window.open(concept.learnMoreUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Official Documentation</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* MCP Code Example */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-6">Quick Example: MCP Server in TypeScript</h3>
          <pre className="text-sm overflow-x-auto bg-slate-800 rounded-xl p-6 font-mono leading-relaxed">
{`import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "weather", version: "1.0.0" });

// Define a tool
server.tool("get_weather",
  { city: z.string().describe("City name") },
  async ({ city }) => {
    const response = await fetch(
      \`https://api.weather.gov/points/...\`
    );
    const data = await response.json();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);`}
          </pre>
        </div>
      </div>
    </section>
  );
};
