import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(apiKey),
      timestamp: new Date().toISOString()
    });
  });

  // API endpoint for AI recipe suggestions based on ingredients
  app.post('/api/generate-recipes', async (req, res) => {
    try {
      const {
        ingredients,
        pantryItems = [],
        maxTimeMinutes = 30,
        difficulty = 'Fácil',
        diet = 'Cualquiera',
        servings = 2,
      } = req.body;

      if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ error: 'Debes proporcionar al menos un ingrediente disponible.' });
      }

      if (!ai) {
        return res.status(503).json({
          error: 'Gemini no está configurado con clave API. Se utilizarán las recetas integradas.',
          fallback: true,
        });
      }

      const prompt = `Eres un chef profesional galardonado y especialista en cocina de aprovechamiento ("cocina fácil con lo que tienes").
El usuario tiene en su cocina los siguientes ingredientes disponibles:
${ingredients.join(', ')}.

Básicos de despensa que puede usar:
${pantryItems.length > 0 ? pantryItems.join(', ') : 'aceite de oliva o vegetal, sal, pimienta, agua, vinagre o azúcar'}.

Preferencias del usuario:
- Tiempo máximo total: ${maxTimeMinutes} minutos
- Nivel de dificultad: ${difficulty}
- Tipo de dieta/estilo: ${diet}
- Porciones recomendadas: ${servings}

Genera 3 recetas distintas, deliciosas, REALISTAS y FÁCILES de preparar que utilicen principalmente los ingredientes que tiene el usuario.
No inventes ingredientes extravagantes o difíciles de conseguir. Si falta algún ingrediente común para redondear la receta, indícalo claramente y ofrece un sustituto común.
Para cada receta incluye:
- Un título apetecible en español
- Breve descripción apetitosa (1 a 2 frases)
- Tiempos reales en minutos (prepTimeMinutes, cookTimeMinutes, totalTimeMinutes)
- Porciones
- Dificultad ("Muy fácil", "Fácil" o "Media")
- Lista de ingredientes con cantidades para las porciones dadas, indicando si es opcional y si tiene sustituto
- Pasos numerados muy claros y concisos, con duración estimada en minutos si aplica
- Un consejo del chef ("chefTip") para garantizar éxito
- Información nutricional aproximada (calorías, proteína, carbohidratos, grasas)
- Etiquetas descriptivas ("Rápido", "Vegetariano", "Sartén", etc.)`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recipes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    prepTimeMinutes: { type: Type.NUMBER },
                    cookTimeMinutes: { type: Type.NUMBER },
                    totalTimeMinutes: { type: Type.NUMBER },
                    servings: { type: Type.NUMBER },
                    difficulty: { type: Type.STRING },
                    matchingIngredients: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    missingIngredients: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    ingredientsWithAmounts: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: { type: Type.STRING },
                          amount: { type: Type.STRING },
                          isOptional: { type: Type.BOOLEAN },
                          substitute: { type: Type.STRING },
                        },
                        required: ['name', 'amount'],
                      },
                    },
                    steps: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          stepNumber: { type: Type.NUMBER },
                          instruction: { type: Type.STRING },
                          durationMinutes: { type: Type.NUMBER },
                          tip: { type: Type.STRING },
                        },
                        required: ['stepNumber', 'instruction'],
                      },
                    },
                    chefTip: { type: Type.STRING },
                    nutrition: {
                      type: Type.OBJECT,
                      properties: {
                        calories: { type: Type.NUMBER },
                        protein: { type: Type.STRING },
                        carbs: { type: Type.STRING },
                        fat: { type: Type.STRING },
                      },
                    },
                    tags: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                  },
                  required: [
                    'id',
                    'title',
                    'description',
                    'totalTimeMinutes',
                    'difficulty',
                    'ingredientsWithAmounts',
                    'steps',
                  ],
                },
              },
            },
            required: ['recipes'],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('La respuesta del modelo fue vacía.');
      }

      const parsed = JSON.parse(responseText);
      return res.json(parsed);
    } catch (err: any) {
      console.error('Error generating recipes:', err);
      return res.status(500).json({
        error: err?.message || 'Error al conectar con el asistente culinario.',
      });
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
