const express = require('express');
const puppeteer = require('puppeteer');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/get-title', async (req, res) => {
  try {
    // Launch the browser
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    // Open a new page
    const page = await browser.newPage();
    // Go to google.com
    await page.goto('https://www.google.com');

    // Get the title of the page
    const title = await page.title();

    // Send the title in JSON format
    res.json({ title: title });

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
