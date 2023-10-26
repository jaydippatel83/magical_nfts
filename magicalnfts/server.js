const express = require("express");
require("dotenv").config({ path: 'next.config.js' });
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 5001;

const openai = new OpenAI({ apiKey: process.env.NEXT_APP_apiKey_ai, dangerouslyAllowBrowser: true });

app.post("/api", async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await openai.images.generate({
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

