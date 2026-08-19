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
        model: 'llama-3.2-11b-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { 
                type: 'text', 
                text: 'Actúa como un tasador mecánico estricto. Lee esta cotización y extrae: la marca del auto (si está), cada uno de los repuestos (precio original y un precio justo estimado) y la mano de obra. Para cada item asigna un "risk" estricto ("Alto", "Medio", "Bajo", o "Innecesario"). Importante: Tu única respuesta debe ser EXCLUSIVAMENTE un bloque JSON válido con el siguiente formato, no incluyas ningún otro texto introductorio: {"brand":"nombre","items":[{"name":"nombre repuesto","original":100,"fair":80,"risk":"Alto"}]}' 
              },
              { 
                type: 'image_url', 
                image_url: { url: imageBase64 } 
              }
            ]
          }
        ],
        temperature: 0.1
      })
    })

    const groqData = await response.json()
    
    if (groqData.error) {
      throw new Error(groqData.error.message)
    }

    const aiText = groqData.choices[0].message.content
    
    // Limpiar markdown si el LLM devuelve formato de código
    const jsonStr = aiText.replace(/```json/g, '').replace(/```/g, '').trim()
    const parsedData = JSON.parse(jsonStr)

    return new Response(JSON.stringify(parsedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
