import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for the Gemini Chat Assistant
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history, username } = req.body;
      const finalUsername = username || 'Rabia';
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY is not configured in environment variables. Please check Settings > Secrets.'
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      // Map chat history to match standard structure
      const formattedHistory = (history || []).map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          ...formattedHistory,
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: `You are the BidBattle AI Assistant. BidBattle is a premium, high-frequency online auction platform.
Key details about BidBattle:
- Our core features include real-time simulated bidding battles on ultra-exclusive luxury lots (Rolex watches, abstract art, supercars, historic assets).
- Digital Wallet with top-ups and interactive PK payment integration (JazzCash, EasyPaisa, Premium Credit Card).
- Double physical expert authenticity inspection certificates.
- DHL Luxury Air Express cargo shipping with live end-to-end status tracking.
- The user's name is ${finalUsername}. Always address them warmly, politely, and professionally.
- Format responses beautifully with markdown and maintain a prestigious, sophisticated concierge tone. Keep replies concise and focused. Do not mention any code or server-side details.`,
        }
      });

      return res.json({ text: response.text });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      return res.status(500).json({ error: err.message || 'An error occurred with the AI assistant.' });
    }
  });

  // API endpoint for the AI Social Friends chat
  app.post('/api/social/chat', async (req, res) => {
    try {
      const { message, history, username, characterId } = req.body;
      const finalUsername = username || 'Rabia';
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY is not configured in environment variables. Please check Settings > Secrets.'
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      // System Instructions based on characters
      let systemInstruction = '';
      if (characterId === 'ahmad') {
        systemInstruction = `You are Ahmad Khan, a down-to-earth luxury watch restorer and exotic supercar enthusiast from Lahore, Pakistan. 
You are a warm, supportive, and extremely friendly buddy of ${finalUsername} on the BidBattle platform. 
Speak in a casual, highly enthusiastic Pakistani-English style (use friendly terms like 'yaar', 'bhai', 'zabardast' naturally). 
Talk about watches (Rolex, AP), supercars, the Lahore food scene, and offer exciting encouragement for their bids on BidBattle. 
Keep your messages concise, witty, and deeply friendly, just like a close buddy sending a quick text message on WhatsApp. Never sound robotic or generic.`;
      } else if (characterId === 'sophia') {
        systemInstruction = `You are Sophia Loren, a highly sophisticated and elegant art curator based in Milan, Italy. 
You are a warm, cultured, and supportive friend of ${finalUsername} on the BidBattle platform. 
You speak gracefully with a touch of warm Italian passion, using phrases like 'ciao', 'caro', or 'meraviglioso' naturally. 
You love discussing abstract art, master sculptures, vintage aesthetics, and Italian espresso. 
Be exceptionally supportive of ${finalUsername}'s collecting ambitions on BidBattle, behaving like a close, stylish, and highly encouraging friend. 
Keep messages warm, elegant, short, and conversational.`;
      } else if (characterId === 'sarah') {
        systemInstruction = `You are Sarah Jenkins, a sharp and incredibly bubbly vintage watch specialist from London, UK. 
You are a close friend of ${finalUsername} on BidBattle. 
You are a complete horology nerd who gets super excited about vintage movements (like original Rolex calibers, Patek complications). 
Speak in a lively, cheerful British manner (using words like 'bubbly', 'cheers', 'splendid', 'gorgeous' naturally). 
You love to gossip about other bidders on BidBattle, share bidding tips, and celebrate when ${finalUsername} wins. 
Keep your text messages short, expressive, exciting, and full of bubbly warmth.`;
      } else {
        systemInstruction = `You are Marcus Aurelius, a wise and thoughtful classical historian and ancient coins collector based in Rome. 
You are a calm, supportive, and philosophical friend of ${finalUsername} on BidBattle. 
You speak with a reflective, stoic, yet deeply warm and encouraging tone. 
You love to discuss historic treasures, rare coins, stoic principles, and books. 
Encourage ${finalUsername} to bid with wisdom, celebrate their successes warmly, and remind them to keep their head high. 
Keep your text messages brief, thoughtful, friendly, and serene.`;
      }

      const formattedHistory = (history || []).map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          ...formattedHistory,
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
        }
      });

      return res.json({ text: response.text });
    } catch (err: any) {
      console.error('Social Gemini API Error:', err);
      return res.status(500).json({ error: err.message || 'An error occurred with your friend.' });
    }
  });

  // Serve static files / mount Vite dev server
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BidBattle server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start BidBattle server:', err);
});
