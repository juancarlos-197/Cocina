export interface PantryCategory {
  id: string;
  name: string;
  items: { id: string; name: string; icon: string }[];
}

export const COMMON_PANTRY_CATEGORIES: PantryCategory[] = [
  {
    id: 'frescos-verduras',
    name: 'Verduras y Frescos',
    items: [
      { id: 'patatas', name: 'Patatas', icon: '🥔' },
      { id: 'cebolla', name: 'Cebolla', icon: '🧅' },
      { id: 'ajo', name: 'Ajo', icon: '🧄' },
      { id: 'tomate', name: 'Tomate', icon: '🍅' },
      { id: 'zanahoria', name: 'Zanahoria', icon: '🥕' },
      { id: 'calabacin', name: 'Calabacín', icon: '🥒' },
      { id: 'espinacas', name: 'Espinacas', icon: '🥬' },
      { id: 'champinones', name: 'Champiñones', icon: '🍄' },
      { id: 'limon', name: 'Limón', icon: '🍋' },
    ],
  },
  {
    id: 'proteinas-lacteos',
    name: 'Proteínas y Lácteos',
    items: [
      { id: 'huevos', name: 'Huevos', icon: '🥚' },
      { id: 'queso', name: 'Queso', icon: '🧀' },
      { id: 'leche', name: 'Leche', icon: '🥛' },
      { id: 'atun', name: 'Atún en lata', icon: '🐟' },
      { id: 'pollo', name: 'Pechuga de pollo', icon: '🍗' },
      { id: 'jamon', name: 'Jamón serrano o cocido', icon: '🥓' },
      { id: 'yogur', name: 'Yogur natural', icon: '🥣' },
      { id: 'mantequilla', name: 'Mantequilla', icon: '🧈' },
    ],
  },
  {
    id: 'cereales-legumbres',
    name: 'Cereales y Legumbres',
    items: [
      { id: 'pasta', name: 'Pasta (espaguetis/macarrones)', icon: '🍝' },
      { id: 'arroz', name: 'Arroz blanco o integral', icon: '🍚' },
      { id: 'garbanzos', name: 'Garbanzos cocidos', icon: '🫘' },
      { id: 'lentejas', name: 'Lentejas cocidas', icon: '🍲' },
      { id: 'pan', name: 'Pan de molde o rústico', icon: '🍞' },
      { id: 'avena', name: 'Copos de avena', icon: '🌾' },
      { id: 'tortillas-trigo', name: 'Tortillas de trigo', icon: '🫓' },
    ],
  },
  {
    id: 'basicos-despensa',
    name: 'Básicos de Despensa (Siempre asumidos)',
    items: [
      { id: 'aceite-oliva', name: 'Aceite de oliva / vegetal', icon: '🫒' },
      { id: 'sal', name: 'Sal', icon: '🧂' },
      { id: 'pimienta', name: 'Pimienta negra', icon: '✨' },
      { id: 'oregano', name: 'Orégano / Hierbas provenzales', icon: '🌿' },
      { id: 'pimenton', name: 'Pimentón dulce', icon: '🌶️' },
      { id: 'vinagre', name: 'Vinagre', icon: '🍶' },
    ],
  },
];

export const PANTRY_PRESETS = [
  {
    id: 'estudiante',
    name: 'Básicos de Estudiante',
    description: 'Huevos, pasta, atún, tomate, cebolla y queso',
    ingredients: ['huevos', 'pasta', 'atun', 'tomate', 'cebolla', 'queso', 'ajo'],
  },
  {
    id: 'vegetariano',
    name: 'Huerto y Legumbres',
    description: 'Garbanzos, espinacas, calabacín, tomate, patatas y ajo',
    ingredients: ['garbanzos', 'espinacas', 'calabacin', 'tomate', 'patatas', 'ajo', 'cebolla'],
  },
  {
    id: 'cena-rapida',
    name: 'Cena Rápida en 15 Minutos',
    description: 'Huevos, pan, queso, tomate, atún y mantequilla',
    ingredients: ['huevos', 'pan', 'queso', 'tomate', 'atun', 'mantequilla'],
  },
];
