const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    if (message.content.startsWith("!ask ")) {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0.9,
        max_tokens: 524,
        top_p: 0.7,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        prompt: message.content,
      });

      await message.reply(response.data.choices[0].text);
      return;
    }
  } catch (error) {
    console.error(error);
  }
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);
