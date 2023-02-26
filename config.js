const { GatewayIntentBits } = require("discord.js");

const intents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.MessageContent,
];

const settings = {
  model: "text-davinci-003",
  temperature: 0.9,
  max_tokens: 524,
  top_p: 0.7,
  frequency_penalty: 0.5,
  presence_penalty: 0.5,
};

module.exports = { intents, settings };
