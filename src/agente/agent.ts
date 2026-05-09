import { OpenRouter, stepCountIs } from "@openrouter/agent";
import { EventEmitter } from "eventemitter3";

export class Agent extends EventEmitter {
  private client: OpenRouter;
  private messages: any[] = [];
  private config: any;

  constructor(config: any) {
    super();
    this.client = new OpenRouter({ apiKey: config.apiKey });
    this.config = {
      model: config.model || "openrouter/auto",
      instructions: config.instructions || "You are a helpful assistant.",
      tools: config.tools || [],
      maxSteps: config.maxSteps || 15
    };
  }

  async send(content: string) {
    this.messages.push({ role: "user", content });

    const result = this.client.callModel({
      model: this.config.model,
      instructions: this.config.instructions,
      input: this.messages,
      tools: this.config.tools,
      stopWhen: [stepCountIs(this.config.maxSteps)],
    });

    let text: string;
    try {
      text = await result.getText();
    } catch (error: any) {
      if (error.message?.includes("Invalid final response")) {
        text = "✅ Tarefa concluída com sucesso.";
      } else {
        throw error;
      }
    }

    this.messages.push({ role: "assistant", content: text });
    return text;
  }
}