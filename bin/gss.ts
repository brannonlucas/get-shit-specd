#!/usr/bin/env bun

import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";

const packageRoot = resolve(import.meta.dir, "..");
const packageJson = JSON.parse(
  readFileSync(join(packageRoot, "package.json"), "utf-8")
) as { version: string };
const VERSION = packageJson.version;

const command = process.argv[2];
const targetDir = process.cwd();

interface SpecConfig {
  audience: "solo" | "small_team" | "external";
  default_tier: "micro" | "standard" | "full";
  min_edge_cases: number;
  min_out_of_scope: number;
  max_open_questions: number;
  require_gherkin: boolean;
  agents: {
    micro_tier: string[];
    standard_tier: string[];
    full_tier: string[];
  };
}

function printHelp(): void {
  console.log(`
get-shit-specd v${VERSION}
Spec-first development workflow for Claude Code

USAGE:
  bunx get-shit-specd <command>
  npx get-shit-specd <command>

COMMANDS:
  init      Install GSS into current project's .claude/ directory
  update    Update GSS files to latest version (preserves spec-config.json)
  version   Show installed version

AFTER INSTALL:
  Use /gss:help in Claude Code to see available commands:
  - /gss:setup     Configure spec preferences
  - /gss:new-spec  Create a new spec package
  - /gss:review-spec <id>  Red-team a spec
  - /gss:handoff <id>      Generate engineering requirements
  - /gss:progress  Show spec inventory
`);
}

function init(update: boolean = false): void {
  const claudeDir = join(targetDir, ".claude");
  const planningDir = join(targetDir, ".planning");

  // Create directories if needed
  if (!existsSync(claudeDir)) {
    mkdirSync(claudeDir, { recursive: true });
  }
  if (!existsSync(planningDir)) {
    mkdirSync(planningDir, { recursive: true });
  }

  // Copy commands
  const commandsSrc = join(packageRoot, "claude", "commands", "gss");
  const commandsDest = join(claudeDir, "commands", "gss");
  if (existsSync(commandsSrc)) {
    mkdirSync(dirname(commandsDest), { recursive: true });
    cpSync(commandsSrc, commandsDest, { recursive: true });
    console.log("  + .claude/commands/gss/");
  }

  // Copy agents
  const agentsSrc = join(packageRoot, "claude", "agents");
  const agentsDest = join(claudeDir, "agents");
  if (existsSync(agentsSrc)) {
    mkdirSync(agentsDest, { recursive: true });
    cpSync(agentsSrc, agentsDest, { recursive: true });
    console.log("  + .claude/agents/gss-*");
  }

  // Copy get-shit-specd core
  const coreSrc = join(packageRoot, "claude", "get-shit-specd");
  const coreDest = join(claudeDir, "get-shit-specd");
  if (existsSync(coreSrc)) {
    cpSync(coreSrc, coreDest, { recursive: true });
    console.log("  + .claude/get-shit-specd/");
  }

  // Create default spec-config.json if not exists (skip on update)
  const configPath = join(planningDir, "spec-config.json");
  if (!existsSync(configPath) && !update) {
    const defaultConfig: SpecConfig = {
      audience: "solo",
      default_tier: "standard",
      min_edge_cases: 3,
      min_out_of_scope: 2,
      max_open_questions: 3,
      require_gherkin: false,
      agents: {
        micro_tier: [],
        standard_tier: ["acceptance-writer", "spec-checker"],
        full_tier: [
          "ux-designer",
          "data-modeler",
          "acceptance-writer",
          "synthesizer",
          "spec-checker",
        ],
      },
    };
    writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
    console.log("  + .planning/spec-config.json (default config)");
  } else if (existsSync(configPath)) {
    console.log("  ~ .planning/spec-config.json (preserved)");
  }

  // Create specs directory
  const specsDir = join(planningDir, "specs");
  if (!existsSync(specsDir)) {
    mkdirSync(specsDir, { recursive: true });
    console.log("  + .planning/specs/");
  }

  console.log(`
GSS ${update ? "updated" : "installed"} successfully!

Next steps:
  1. Run /gss:setup in Claude Code to configure preferences
  2. Run /gss:new-spec to create your first spec
  3. Run /gss:help for all available commands
`);
}

switch (command) {
  case "init":
    console.log(`\nInstalling get-shit-specd v${VERSION}...\n`);
    init(false);
    break;
  case "update":
    console.log(`\nUpdating get-shit-specd to v${VERSION}...\n`);
    init(true);
    break;
  case "version":
  case "-v":
  case "--version":
    console.log(`get-shit-specd v${VERSION}`);
    break;
  case "help":
  case "-h":
  case "--help":
  case undefined:
    printHelp();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}
