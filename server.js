import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Permitir payloads grandes para base64

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/analyze-quote', async (req, res) => {
  console.log("📸 Recibiendo imagen para analizar...");
  try {
    const { imageBase64 } = req.body;
    
    if (!imageBase64) {
      return res.status(400).json({ error: "No image provided" });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.2-11b-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: 'Actúa como un tasador mecánico estricto. Lee esta cotización y extrae: la marca del auto (si está), cada uno de los repuestos (precio original y un precio justo estimado) y la mano de obra. Para cada item asigna un "risk" estricto ("Alto", "Medio", "Bajo", o "Innecesario"). Importante: Tu única respuesta debe ser EXCLUSIVAMENTE un bloque JSON válido con el siguiente formato, no incluyas ningún otro texto introductorio: {"brand":"nombre","items":[{"name":"nombre repuesto","original":100,"fair":80,"risk":"Alto"}]}' 
            },
            { 
              type: "image_url", 
              image_url: { url: imageBase64 }
            }
          ]
        }
      ],
      temperature: 0.1
    });

    const aiText = completion.choices[0].message.content;
    console.log("🧠 Respuesta cruda de la IA:", aiText);
    
    // Limpiar markdown json si la IA lo envía
    const jsonStr = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(jsonStr);

    res.json(parsedData);
  } catch (error) {
    console.error("❌ Error from Groq:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor Backend Local corriendo en http://localhost:${PORT}`);
  console.log(`🔑 Usando API Key de Groq configurada.`);
});
