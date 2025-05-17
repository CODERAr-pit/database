const TelegramBot = require('node-telegram-bot-api');
const token = '7785442298:AAHpQxkVCxu0iaPIEOe42LurZ7xsSjPo0wc'; // Replace with your own bot token
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === '/start') {
    bot.sendMessage(chatId, info);
  }
});