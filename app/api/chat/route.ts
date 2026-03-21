import { type NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
  model?: string;
  stream?: boolean;
}

async function generateAIResponse(
  messages: ChatMessage[],
  selectedModel: string = "codellama:latest"
): Promise<{ response: string; tokens: number; model: string }> {
  // Map UI models to Ollama models
  let ollamaModel = "codellama:latest";
  if (selectedModel === "gpt-6" || selectedModel === "gpt-oss") {
    ollamaModel = "gpt-oss:latest";
  } else if (selectedModel === "codellama") {
    ollamaModel = "codellama:latest";
  } else if (selectedModel === "llama2") {
    ollamaModel = "llama2:latest";
  }

  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: ollamaModel,
        messages: messages,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 1000,
          top_p: 0.9,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      const errorMsg = errorData.error || `HTTP ${response.status}`;
      console.error("Ollama API error:", errorMsg);
      throw new Error(`Ollama error: ${errorMsg}`);
    }

    const data = await response.json();
    if (!data.message || !data.message.content) {
      throw new Error("No response content from AI Model");
    }

    const totalTokens = (data.prompt_eval_count || 0) + (data.eval_count || 0);

    return {
      response: data.message.content.trim(),
      tokens: totalTokens,
      model: data.model || ollamaModel,
    };
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message, history = [], model } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a helpful AI coding assistant. You help developers with:
   - Code explanations and debugging
   - Best practices and architecture advice
   - Writing clean, efficient code
   - Troubleshooting errors
   - Code reviews and optimizations
   
Always provide clear, practical answers. Use proper code formatting when showing examples.`;

    // Construct full messages array for Ollama
    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...history.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      })),
      { role: "user", content: message },
    ];

    // Generate ai response
    const result = await generateAIResponse(messages, model);

    return NextResponse.json({
      response: result.response,
      tokens: result.tokens,
      model: result.model,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown Error";

    return NextResponse.json(
      {
        error: "Failed to generate AI response",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}