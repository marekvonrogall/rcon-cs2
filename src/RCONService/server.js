const { Rcon } = require('rcon-client');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/rcon', async (req, res) => {
  const { host, port, password, command } = req.body;

  if (!host || !port || !password || !command) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const rcon = await Rcon.connect({ host, port, password });
    const response = await rcon.send(command);
    await rcon.end();
    res.json({ response });
  } catch (error) {
    console.error('RCON error:', error);
    res.status(500).json({ error: 'RCON connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
