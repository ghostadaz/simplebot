import datetime
from telegram.ext import Updater, CommandHandler

def start(update, context):
    current_time = datetime.datetime.now().time()
    if current_time > datetime.time(6) and current_time < datetime.time(12):
        update.message.reply_text("Bonjour!")
    elif current_time > datetime.time(18) and current_time < datetime.time(23):
        update.message.reply_text("Bonsoir!")
    else:
        update.message.reply_text("Salut!")

def main():
    updater = Updater("5830036654:AAFPDip9UuBDEq5n-C4VGpWcBEO5dnFfmfs", use_context=True)
    dp = updater.dispatcher
    dp.add_handler(CommandHandler("start", start))
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
