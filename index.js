require("dotenv").config();
const prompt = require("./prompt");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
let questionsLimit = 2;

const ask = async () => {
  const question = prompt(">");
  console.log(">Thinking 🧠 ...");
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 200,
    temperature: 0,
    top_p: 1,
    n: 1,
    stream: false,
    logprobs: null,
  });
  questionsLimit--;
  console.log(await response.data.choices[0].text);
};

ask();
