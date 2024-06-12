const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/get-title', async (req, res) => {
  try {
    // Launch the browser
    const browser = await puppeteer.launch();
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
