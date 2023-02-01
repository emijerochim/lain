const dotenv = require("dotenv");
dotenv.config();
let prompt = require("prompt-sync")();
const settings = require("./settings");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function ask(question) {
  console.log("🧠...");

  let completion = await openai.createCompletion({
    engine: settings.model,
    prompt: question,
    maxTokens: settings.max_tokens,
    temperature: settings.temperature,
    topP: settings.top_p,
    frequencyPenalty: settings.frequency_penalty,
    presencePenalty: settings.presence_penalty,
    stop: settings.stop,
  });

  response = await completion.data.choices[0].text;

  console.log(`< ${response}`);
}

async function main() {
  let command = "help";
  while (command !== "exit") {
    console.log(
      "Type anything to ask or use the commands \n'settings' to view or change settings\n 'exit' to quit, \n'clear' to clear the console, or \n'help' to see this message again.\n\n"
    );
    command = prompt(">");
    switch (command) {
      case "clear": {
        console.clear();
        break;
      }
      case "help": {
        console.log(
          "Type anything to ask or use the commands \n'settings' to view or change settings\n 'exit' to quit, \n'clear' to clear the console, or \n'help' to see this message again.\n\n"
        );
        command = prompt(">");
        break;
      }
      case "settings": {
        console.log(
          `\nsettings\n1.Current settings\n 2. Change settings\n 3. Exit\n`
        );
        const change = prompt(">");
        switch (change) {
          case "change":
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
            switch (model) {
              case "1":
                settings.model = "da-vinci-003";

              case "2":
                settings.model = "code-davinci-002";

              case "3":
                settings.model = "da-vinci-003";

              case "4":
                settings.model = "curie-001";

              case "5":
                settings.model = "ada-001";

              case "6":
                settings.model = "babbage-001";

              default:
                console.log("\nInvalid model\n");
                break;
            }

            console.log(`\nSelect temperature (0-1):\n`);
            const temperature = prompt(">");
            settings.temperature = temperature;

            console.log(`Select max tokens (1-4000):\n`);
            const max_tokens = prompt(">");
            settings.max_tokens = max_tokens;

            break;
        }
      } /*
      default: {
        await ask(command);
        command = prompt("\n>");
        break;
      }*/
    }
  }
}

main();
