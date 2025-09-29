#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { execSync } from 'child_process';

const START_WORK = {
    name: "start_work",
    description: "开始一天的工作"
};

const END_WORK = {
    name: "end_work",
    description: "结束一天的工作"
};

const MY_TOOLS = [START_WORK, END_WORK];

const start_work = async () => {
    const content = [];
    try {
        // 开启 MonoProxyMac
        try {
            execSync('open -a MonoProxyMac', { stdio: 'ignore' });
            content.push({
                type: "text",
                text: "MonoProxyMac 已开启"
            });

        } catch (error) {
            content.push({
                type: "text",
                text: `开启 MonoProxyMac 失败，原因为: ${error.message}`
            });
        }
        
        // 开启 iTerm
        try {
            execSync('open -a iTerm', { stdio: 'ignore' });
            content.push({
                type: "text",
                text: "iTerm 已开启"
            });

        } catch (error) {
            content.push({
                type: "text",
                text: `开启 iTerm 失败，原因为: ${error.message}`
            });
        }
        
        // 开启飞书
        try {
            execSync('open -a Lark', { stdio: 'ignore' });
            content.push({
                type: "text",
                text: "飞书已开启"
            });

        } catch (error) {
            content.push({
                type: "text",
                text: `开启 飞书 失败，原因为: ${error.message}`
            });
        }
        
        // 开启 Android Studio
        try {
            execSync('open -a "Android Studio"', { stdio: 'ignore' });
            content.push({
                type: "text",
                text: "Android Studio 已开启"
            });

        } catch (error) {
            content.push({
                type: "text",
                text: `开启 Android Studio 失败，原因为: ${error.message}`
            });
        }
        
        return { content, isError: false };

    } catch (error) {
        content.push({
            type: "text",
            text: `执行失败: ${error.message}`
        });
        return { content, isError: true };
    }
};

const end_work = async () => {
    const content = [];
    try {
        // 关闭 Android Studio
        try {
            execSync('pkill -f "Android Studio"', { stdio: 'ignore' });
            content.push({
                type: "text",
                text: "Android Studio 已关闭"
            });

        } catch (error) {
            content.push({
                type: "text",
                text: `Android Studio 关闭失败，原因为: ${error.message}`
            });
            return { content, isError: true };
        }

        // 关闭 iTerm
        try {
            execSync('pkill -f "iTerm"', { stdio: 'ignore' });
            content.push({
                type: "text",
                text: "iTerm 已关闭"
            });

        } catch (error) {
            content.push({
                type: "text",
                text: `iTerm 关闭失败，原因为: ${error.message}`
            });
            return { content, isError: true };
        }

        // 弹出移动硬盘
        try {
            execSync('diskutil eject /Volumes/alan', { stdio: 'ignore' });
            content.push({
                type: "text",
                text: "移动硬盘已弹出"
            });

        } catch (error) {
            content.push({
                type: "text",
                text: `弹出移动硬盘失败，原因为: ${error.message}`
            });
            return { content, isError: true };
        }
        return { content, isError: false };

    } catch (error) {
        content.push({
            type: "text",
            text: `执行失败: ${error.message}`
        });
        return { content, isError: true };
    }
};

// Server setup
const server = new Server({
    name: "@mcp/tools",
    version: "0.0.1",
}, {
    capabilities: {
        tools: {},
    },
});

// Set up request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: MY_TOOLS,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
        switch (request.params.name) {
            case "start_work": {
                return await start_work();
            }
            case "end_work": {
                return await end_work();
            }
            default:
                return {
                    content: [{
                        type: "text",
                        text: `Unknown tool: ${request.params.name}`
                    }],
                    isError: true
                };
        }
    }
    catch (error) {
        return {
            content: [{
                type: "text",
                text: `Error: ${error instanceof Error ? error.message : String(error)}`
            }],
            isError: true
        };
    }
});

const runServer = async () => {
    const transport = new StdioServerTransport();
    await server.connect(transport);
};

runServer().catch((error) => {
    process.exit(1);
});