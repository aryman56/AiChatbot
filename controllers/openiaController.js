const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAIApi(configuration);

// exports.summaryController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { data } = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Summarize this \n${text}`,
//       max_tokens: 500,
//       temperature: 0.5,
//     });
//     if (data) {
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };
exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;

    // Generate chatbot response directly
    console.log(text, "question------");
    const token = apiKey;
    const apiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-0613',
        messages: [{ role: 'user', content:`Summarize this \n${text}` }],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(apiResponse, "chat------------------------apiResponse");

    // Return paragraph and chatbot response
    return res.status(200).json({
      paragraph: text, // Send the original text input as paragraph
      chatbotResponse: apiResponse.data.choices[0].message.content
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error."
    });
  }
};

exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;

    // Generate chatbot response directly
    console.log(text, "question------");
    const token = apiKey;
    const apiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-0613',
        messages: [{ role: 'user', content:`Write a paragraph on this \n${text}` }],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(apiResponse, "chat------------------------apiResponse");

    // Return paragraph and chatbot response
    return res.status(200).json({
      paragraph: text, // Send the original text input as paragraph
      chatbotResponse: apiResponse.data.choices[0].message.content
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error."
    });
  }
};

// exports.chatbotController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { data } = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Answer question similar to how yoda from star war would.
//       Me: 'what is your name?'
//       yoda: 'yoda is my name'
//       Me: ${text}`,
//       max_tokens: 300,
//       temperature: 0.7,
//     });
//     if (data) {
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };
exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;

    // Generate chatbot response directly
    console.log(text, "question------");
    const token = apiKey;
    const apiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-0613',
        messages: [{ role: 'user', content:`Write a paragraph on this \n${text}` }],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(apiResponse, "chat------------------------apiResponse");

    // Return paragraph and chatbot response
    return res.status(200).json({
      paragraph: text, // Send the original text input as paragraph
      chatbotResponse: apiResponse.data.choices[0].message.content
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error."
    });
  }
};

exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;

    // Generate chatbot response directly
    console.log(text, "question------");
    const token = apiKey;
    const apiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-0613',
        messages: [{ role: 'user', content: `convert these into javascript code \n${text}` }],
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(apiResponse, "chat------------------------apiResponse");

    // Return paragraph and chatbot response
    return res.status(200).json({
      paragraph: text, // Send the original text input as paragraph
      chatbotResponse: apiResponse.data.choices[0].message.content
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error."
    });
  }
};
// exports.jsconverterController = async (req, res) => {
//   try {
//     const { text } = req.body;
//     const { data } = await openai.createCompletion({
//       model: "text-davinci-002",
//       prompt: `/* convert these instruction into javascript code \n${text}`,
//       max_tokens: 400,
//       temperature: 0.25,
//     });
//     if (data) {
//       if (data.choices[0].text) {
//         return res.status(200).json(data.choices[0].text);
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(404).json({
//       message: err.message,
//     });
//   }
// };
exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const { data } = await openai.createImage({
      prompt: `generate a scifi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (data) {
      if (data.data[0].url) {
        return res.status(200).json(data.data[0].url);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
