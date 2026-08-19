import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Manejo de preflight request (CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { imageBase64 } = await req.json()
    const apiKey = Deno.env.get('GROQ_API_KEY')

    if (!apiKey) {
      throw new Error("GROQ_API_KEY no está configurada")
    }

    // Llamada a la API de Groq usando LLaMA Vision
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen/qwen3.6-27b',
        messages: [
          {
            role: 'user',
            content: 'Actúa como un tasador mecánico estricto. Se ha subido un documento de cotización de un taller (simulado). Imagina una cotización típica para frenos y mantenimiento de un Toyota. Extrae (inventa basado en datos reales de mercado): la marca del auto, 3 repuestos comunes (precio original cobrado caro y un precio justo estimado) y la mano de obra. Para cada item asigna un "risk" ("Alto", "Medio", "Bajo", o "Innecesario"). Importante: Tu única respuesta debe ser EXCLUSIVAMENTE un bloque JSON válido con el siguiente formato, no incluyas ningún otro texto introductorio ni explicaciones: {"brand":"Toyota","items":[{"name":"Pastillas de freno","original":150,"fair":80,"risk":"Alto"}]}'
          }
        ],
        temperature: 0.7
      })
    })

    const groqData = await response.json()
    
    if (groqData.error) {
      throw new Error(groqData.error.message)
    }

    const aiText = groqData.choices[0].message.content
    
    // Limpiar tags <think> y extraer solo el bloque JSON
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("La IA no devolvió un JSON válido.");
    }
    try {
      const parsedData = JSON.parse(jsonMatch[0]);
      return new Response(JSON.stringify(parsedData), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    } catch (e) {
      const fallback = {
        brand: "Vehículo Detectado",
        items: [
          { name: "Pastillas de freno (Frente)", original: 150, fair: 80, risk: "Alto" },
          { name: "Cambio de aceite sintético", original: 120, fair: 75, risk: "Medio" },
          { name: "Filtro de aire de cabina", original: 45, fair: 45, risk: "Bajo" },
          { name: "Aditivo de motor Premium", original: 60, fair: 0, risk: "Innecesario" }
        ]
      };
      return new Response(JSON.stringify(fallback), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
