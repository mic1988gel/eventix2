import { Markup, Telegraf } from "telegraf";

export function registerCommands(bot: Telegraf) {
  bot.start((ctx) =>
    ctx.reply(
      "Добро пожаловать в Eventix! Находите события рядом и создавайте встречи.",
      Markup.inlineKeyboard([
        Markup.button.webApp("Открыть Eventix", process.env.MINI_APP_URL || "https://example.com")
      ])
    )
  );

  bot.command("settings", (ctx) =>
    ctx.reply("Настройки: уведомления, город и помощь будут расширены в следующих версиях MVP.")
  );
}
