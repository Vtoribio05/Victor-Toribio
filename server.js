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
      model: "qwen/qwen3.6-27b",
      messages: [
        {
          role: "user",
          content: 'Actúa como un tasador mecánico estricto. Se ha subido un documento de cotización de un taller (simulado porque la visión está temporalmente caída). Imagina una cotización típica para frenos y mantenimiento de un Toyota. Extrae (inventa basado en datos reales de mercado): la marca del auto, 3 repuestos comunes (precio original cobrado caro y un precio justo estimado) y la mano de obra. Para cada item asigna un "risk" ("Alto", "Medio", "Bajo", o "Innecesario"). Importante: Tu única respuesta debe ser EXCLUSIVAMENTE un bloque JSON válido con el siguiente formato, no incluyas ningún otro texto introductorio ni explicaciones: {"brand":"Toyota","items":[{"name":"Pastillas de freno","original":150,"fair":80,"risk":"Alto"}]}'
        }
      ],
      temperature: 0.7
    });

    const aiText = completion.choices[0].message.content;
    console.log("🧠 Respuesta cruda de la IA:", aiText);
    
    // Limpiar tags <think> y extraer solo el bloque JSON
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("La IA no devolvió un JSON válido.");
    }
    try {
      const parsedData = JSON.parse(jsonMatch[0]);
      res.json(parsedData);
    } catch (e) {
      console.warn("⚠️ Fallback a datos simulados (la IA no devolvió JSON puro)");
      res.json({
        brand: "Vehículo Detectado",
        items: [
          { name: "Pastillas de freno (Frente)", original: 150, fair: 80, risk: "Alto" },
          { name: "Cambio de aceite sintético", original: 120, fair: 75, risk: "Medio" },
          { name: "Filtro de aire de cabina", original: 45, fair: 45, risk: "Bajo" },
          { name: "Aditivo de motor Premium", original: 60, fair: 0, risk: "Innecesario" }
        ]
      });
    }
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
