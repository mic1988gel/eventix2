import { Telegraf, Markup } from 'telegraf';
import { message } from 'telegraf/filters';


const bot = new Telegraf(process.env.Vermariel_bot!);


bot.start((ctx) => { ctx.reply( '👋 Привет! Я Eventix — твой помощник по поиску событий.\n\n' + 'Я помогу найти компанию на концерт, выставку или митап 🎉', Markup.inlineKeyboard([ [Markup.button.webApp('🚀 Открыть Eventix', 'https://t.me/your_miniapp_url')] ]) ); });


bot.command('settings', (ctx) => { ctx.reply( '⚙️ Настройки:\n' + '• Уведомления /notifications\n' + '• Город /city\n' + '• Помощь /help' ); });


// Обработчик webhook (экспортируется для Express) export const webhookCallback = (bot: Telegraf) => { return bot.webhookCallback('/api/webhook'); };

