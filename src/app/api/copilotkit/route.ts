import {
    CopilotRuntime,
    GroqAdapter,
    copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import Groq from "groq-sdk";
import { NextRequest } from "next/server";

const groq = new Groq({ apiKey: process.env["GROQ_API_KEY"] });

const copilotKit = new CopilotRuntime();

// @ts-ignore
const serviceAdapter = new GroqAdapter({ groq, model: "llama3-groq-8b-8192-tool-use-preview" });

export const POST = async (req: NextRequest) => {
    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
        runtime: copilotKit,
        serviceAdapter,
        endpoint: "/api/copilotkit",
    });

    return handleRequest(req);
};