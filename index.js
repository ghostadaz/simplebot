const Telegraf = require('telegraf')

const bot = new Telegraf(process.env.5830036654:AAFPDip9UuBDEq5n-C4VGpWcBEO5dnFfmfs)

bot.start((ctx) => {
  ctx.reply('Hello!')
})

bot.launch()
