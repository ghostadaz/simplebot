const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/', (req, res) => {
  const { message } = req.body

  // Handle the message here
  // You can use the message text and sender information
  // to perform different actions or send messages

  // For example, send a reply to the message
  const reply = `Merci pour votre message : ${message.text}`
  sendMessage(reply, message.chat.id)

  res.sendStatus(200)
})

// Function to send a message to Telegram
const sendMessage = (text, chatId) => {
  axios.post(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
    {
      chat_id: chatId,
      text
    }
  )
}

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${server.address().port}`)
})
