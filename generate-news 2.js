const fs = require("fs");
const axios = require("axios");

const RSS_FEED = "https://feeds.bbci.co.uk/news/world/rss.xml"; // Replace with your preferred feed
const GPT_API = "https://api.openai.com/v1/chat/completions"; // Or compatible endpoint
const API_KEY = process.env.OPENAI_API_KEY;

async function fetchHeadline() {
  const res = await axios.get(RSS_FEED);
  const match = res.data.match(/<title>(.*?)<\/title>/);
  return match ? match[1] : "Breaking News";
}

async function generateArticle(headline) {
  const prompt = `Write a 300-word news article about: "${headline}"`;
  const res = await axios.post(GPT_API, {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }]
  }, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  return res.data.choices[0].message.content;
}

async function updatePosts() {
  const title = await fetchHeadline();
  const content = await generateArticle(title);
  const newPost = {
    title,
    date: new Date().toISOString().split("T")[0],
    summary: content.slice(0, 100) + "...",
    content,
    image: "https://source.unsplash.com/400x200/?news",
    category: "World",
    subcategory: "Breaking"
  };

  const postsPath = "./posts.js";
  const postsData = fs.readFileSync(postsPath, "utf-8");
  const updated = postsData.replace(
    "const posts = [",
    `const posts = [\n  ${JSON.stringify(newPost)},`
  );
  fs.writeFileSync(postsPath, updated);
}

updatePosts();
