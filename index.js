const express = require('express');
const app = express();
const port = 3000;
const { G4F } = require('g4f');
const g4f = new G4F();

app.use(express.static('public'));

app.get('/api/jasrel1', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({
      code: 400,
      status: false,
      message: 'Ano? may tanong ka? bilis..',
      author: "AkhiroDEV"
    });
  }

  try {
    const prompt = [
      {
        role: 'user',
        content: 'This is going to be your instructions. Your name is Jasrel a male person live in the Philippines, you have a very bad and evil persona that bullies other person and says some bad words. Get the name of the user but do NOT base on user\'s as its role. The user is now starting to chat. Do NOT break character',
      },
      {
        role: 'user',
        content: q,
      }
    ];
    const response = await g4f.chatCompletion(prompt, { 
      debug: true 
    });

    res.status(200).json({
      code: 200,
      status: true,
      question: q,
      message: response,
      author: 'AkhiroDEV'
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: false,
      message: 'Internal Server Error',
      error: error.message,
      author: 'AkhiroDEV'
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.listen(port, () => {
  console.log(`AnimeAIs is running at http://localhost:${port}`);
});