import axios from "axios";

export default async function handler (req, res) {

    const url = 'https://api.openai.com/v1/chat/completions';
    const API_KEY = process.env.OPENAI_KEY;

    try {
        const response = await axios.post(url, {
            model: "gpt-3.5-turbo",  // Check for the latest model on the OpenAI API documentation
            messages: [{ role: "user", content: req.body.text }],
          }, {
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json'
            }
          });

          res.status(200).json(response.data.choices[0].message.content);

    } catch (error) {
        console.log(error)
    }
}