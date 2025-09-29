# MCP 工具集

[![NPM Version](https://img.shields.io/npm/v/@mcp/tools.svg)](https://www.npmjs.com/package/@mcp/tools)
[![License](https://img.shields.io/npm/l/@mcp/tools.svg)](LICENSE)

一套用于自动化工作流程的 MCP 工具，帮助您更高效地管理工作环境。

## 功能

该工具包提供以下自动化功能：

- 关闭 Android Studio
- 关闭 iTerm
- 弹出挂载在 `/Volumes/alan` 的移动硬盘

提供两个主要工具命令：
- `start_work`: 开始一天的工作（当前与 end_work 功能相同）
- `end_work`: 结束一天的工作，自动清理工作环境

## 安装

### 通过 NPX 使用（推荐）

可以直接通过 npx 运行，无需安装：

```bash
npx -y @mcp/tools
```

### 全局安装

```bash
npm install -g @mcp/tools
```

## 使用方法

### 作为 MCP Server 使用

在支持 MCP 协议的客户端（如 Claude Desktop、GitHub Copilot 等）中配置：

```json
{
  "mcpServers": {
    "mcp-tools": {
      "command": "npx",
      "args": [
        "-y",
        "@mcp/tools"
      ]
    }
  }
}
```

### 直接运行

安装后，您也可以直接在终端中运行：

```bash
mcp-tools
```

## 开发

要构建项目，请运行：

```bash
npm run build
```

## 许可证

本项目采用 ISC 许可证。详情请见 [LICENSE](LICENSE) 文件。