import { Telegraf } from "telegraf";
import { registerCommands } from "./commands.js";
export function createBot() {
    const token = process.env.BOT_TOKEN;
    if (!token)
        return null;
    const bot = new Telegraf(token);
    registerCommands(bot);
    return bot;
}
