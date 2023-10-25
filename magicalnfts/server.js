const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 5001;
const configuration = new Configuration({
    apiKey: process.env.apiKey, // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

app.post("/api", async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "256x256",
        });
        res.send(response.data[0].url);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

