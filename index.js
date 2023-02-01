require("dotenv").config();
const prompt = require("./prompt");
const settings = require("./settings");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const ask = async (question) => {
  console.log(">Thinking 🧠 ...");
  const response = await openai.createCompletion(settings);
  if (response.data.choices[0].text === "exit") {
    console.log("Goodbye 👋");
    process.exit(0);
  }
  console.log(`> + ${await response.data.choices[0].text}`);
};

const main = async (ask) => {
  let command = prompt(">");
  const exit = false;

  while (!exit) {
    if (command === "exit") {
      console.log("Goodbye 👋");
      exit = true;
      process.exit(0);
    } else if (command === "clear") console.clear();
    else if (command === "help") {
      console.log(
        "Type anything to ask or use the commands \n'settings' to view or change settings\n 'exit' to quit, \n'clear' to clear the console, or \n'help' to see this message again.\n\n"
      );
      command = prompt(">");
    } else if (command === "settings") {
      console.log(
        `\nsettings\n1.Current settings\n 2. Change settings\n 3. Exit\n`
      );
      const change = prompt(">");
      if (change === "change") {
        console.log(`Models:\n\nSelect model: \n\n 1. General (da-vinci-003)\n Davinci is the most capable model family and can perform any task the other models can perform and often with less instruction. For applications requiring a lot of understanding of the content, like summarization for a specific audience and creative content generation, Davinci is going to produce the best results. These increased capabilities require more compute resources, so Davinci costs more per API call and is not as fast as the other models.

          Another area where Davinci shines is in understanding the intent of text. Davinci is quite good at solving many kinds of logic problems and explaining the motives of characters. Davinci has been able to solve some of the most challenging AI problems involving cause and effect.
          
          Good at: Complex intent, cause and effect, summarization for audience \n \n  2.Codex Deep (code-davinci-002)\n 
          Most capable Codex model. Particularly good at translating natural language to code. In addition to completing code, also supports inserting completions within code.
          \n\n 3.Codex Quick (math-davinci-002) \nAlmost as capable as code-davinci-002, but slightly faster. This speed advantage may make it preferable for real-time applications.
          \n\n 4.Curie Chatbot (curie-001) \nCurie is extremely powerful, yet very fast. While Davinci is stronger when it comes to analyzing complicated text, Curie is quite capable for many nuanced tasks like sentiment classification and summarization. Curie is also quite good at answering questions and performing Q&A and as a general service chatbot.

          Good at: Language translation, complex classification, text sentiment, summarization\n\n
          5. Ada (ada-001) \n Ada is usually the fastest model and can perform tasks like parsing text, address correction and certain kinds of classification tasks that don’t require too much nuance. Ada’s performance can often be improved by providing more context.

          Good at: Parsing text, simple classification, address correction, keywords \n\n
          6. Babbage Queries (babbage-001) \n Babbage can perform straightforward tasks like simple classification. It’s also quite capable when it comes to Semantic Search ranking how well documents match up with search queries.

          Good at: Moderate classification, semantic search classification\n\n`);
        const model = prompt(">");
        if (model === "1") {
          settings.model = "da-vinci-003";
        }
        if (model === "2") {
          settings.model = "code-davinci-002";
        }
        if (model === "3") {
          settings.model = "da-vinci-003";
        }

        console.log(`Select temperature (0-1):\n`);
        const temperature = prompt(">");
        settings.temperature = temperature;

        console.log(`Select max tokens (1-4000):\n`);
        const max_tokens = prompt(">");
        settings.max_tokens = max_tokens;

        console.log(`Select top p (0-1):\n`);
        const top_p = prompt(">");
        settings.top_p = top_p;

        console.log(`Select frequency penalty (0-2):\n`);
        const frequency_penalty = prompt(">");
        settings.frequency_penalty = frequency_penalty;

        console.log(`Select presence penalty (0-2):\n`);
        const presence_penalty = prompt(">");
        settings.presence_penalty = presence_penalty;

        console.log(`Select stop word:\n`);
        const stop = prompt(">");
        settings.stop = stop;
      }
    } else {
      await ask(command);
    }
  }
};

main(ask);
