const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: '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',
});

const model = 'gpt-4.1-nano-2025-04-14';

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: message }],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ error: 'Failed to process your request' });
  }
});

module.exports = router;