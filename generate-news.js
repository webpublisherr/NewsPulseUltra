// generate-news.js
const fs = require("fs");
const axios = require("axios");

async function generatePost() {
  const headline = "India’s AI Startups Raise $500M"; // Replace with dynamic headline
  const summary = "Indian AI firms attract global investors.";
  const content = "Startups in Bengaluru and Hyderabad have secured major funding...";
  const image = "https://source.unsplash.com/400x200/?ai";
  const category = "Tech";
  const subcategory = "AI";

  const newPost = {
    title: headline,
    date: new Date().toISOString().split("T")[0],
    summary,
    content,
    image,
    category,
    subcategory
  };

  const postsPath = "./posts.js";
  const postsData = fs.readFileSync(postsPath, "utf-8");
  const updated = postsData.replace(
    "const posts = [",
    `const posts = [\n  ${JSON.stringify(newPost)},`
  );

  fs.writeFileSync(postsPath, updated);
}

generatePost();
