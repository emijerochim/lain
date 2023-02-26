const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const { Client, Events } = require("discord.js");
const { intents, settings } = require("./config.js");

//OPENAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//DISCORD
const client = new Client({
  intents: intents,
});
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    if (message.content.startsWith("!ask ")) {
      const response = await openai.createCompletion(...[settings], {
        prompt: message.content.slice(5),
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

client.login(process.env.DISCORD_TOKEN);
