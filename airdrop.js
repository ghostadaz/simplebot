const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const crypto = require('crypto')

const app = express()
app.use(bodyParser.json())

const users = new Map() // Map to store user information
const airdropAmount = 100 // Number of tokens to be distributed per airdrop
const airdropInterval = 10 * 60 * 1000 // Airdrop interval in milliseconds

app.post('/', (req, res) => {
  const { message } = req.body

  // Handle the message here
  if (message.text === '/start') {
    // Generate a unique user ID and store it in the map
    const userId = crypto.randomBytes(8).toString('hex')
    users.set(userId, {
      chatId: message.chat.id,
      lastAirdrop: 0
    })
    sendMessage(`Welcome to the airdrop bot! Your unique user ID is ${userId}.`, message.chat.id)
  } else if (message.text.startsWith('/claim')) {
    // Get the user ID from the message
    const userId = message.text.split(' ')[1]
    if (!users.has(userId)) {
      sendMessage(`Invalid user ID. Please make sure you have entered the correct ID.`, message.chat.id)
      return
    }
    const user = users.get(userId)
    const currentTime = Date.now()
    if (currentTime - user.lastAirdrop < airdropInterval) {
      sendMessage(`You have already claimed your airdrop. Please wait for the next airdrop.`, user.chatId)
    } else {
      // Distribute the tokens to the user
      // You can call a function here to perform the token transfer
      sendMessage(`You have claimed ${airdropAmount} tokens!`, user.chatId)
      user.lastAirdrop = currentTime
      users.set(userId, user)
    }
  }

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
