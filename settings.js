/**
 * @param {number} temperature - Controls the creativity of the response (0-1)
 * @param {number} max_tokens - Maximum length of the response (1-4000)
 * @param {number} top_p - Controls the diversity of the response (0-1)
 * @param {number} frequency_penalty - Penalizes words that appear too often in the model (0-2)
 * @param {number} presence_penalty - Penalizes words that appear too often in the response (0-2)
 * @param {string} stop - Word at which the response will stop
 */

const settings = {
  model: "code-davinci-002",
  temperature: 0.53,
  max_tokens: 528,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
};

module.exports = settings;
