import { Recipe } from '../types/recipe';

export const CURATED_RECIPES: Recipe[] = [
  {
    id: 'tortilla-patatas-clasica',
    title: 'Tortilla de Patatas Tradicional',
    description: 'El clásico español por excelencia: patatas pochadas lentamente en aceite de oliva, cebolla tierna y huevos jugosos en su punto.',
    imageUrl: '/src/assets/images/recipe_tortilla_espanola_1790130347391.jpg',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    totalTimeMinutes: 30,
    servings: 4,
    difficulty: 'Fácil',
    requiredIngredients: ['patatas', 'huevos', 'cebolla', 'aceite-oliva', 'sal'],
    ingredientsWithAmounts: [
      { name: 'Patatas medianas', amount: '4 unidades (600g)', substitute: 'Patatas de bolsa congeladas o incluso patatas fritas de bolsa en versión exprés' },
      { name: 'Huevos grandes', amount: '5 unidades' },
      { name: 'Cebolla dulce', amount: '1 mediana', isOptional: true, substitute: 'Puedes prescindir si prefieres tortilla "sin cebolla"' },
      { name: 'Aceite de oliva virgen extra', amount: '200 ml (para pochar)', substitute: 'Aceite de girasol suave' },
      { name: 'Sal fina', amount: '1 cucharadita' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Pela las patatas y córtalas en rodajas finas (de unos 3 mm). Corta la cebolla en juliana fina.',
        durationMinutes: 5,
        tip: 'Cortar todas las rodajas de grosor similar asegura una cocción uniforme.'
      },
      {
        stepNumber: 2,
        instruction: 'Calienta abundante aceite en una sartén amplia a fuego medio-bajo. Añade las patatas y la cebolla con una pizca de sal. Pocha durante 15-18 minutos hasta que estén tiernas y ligeramente doradas.',
        durationMinutes: 16,
        tip: 'No queremos freír a fuego fuerte, sino confitar suavemente hasta que se puedan deshacer con el tenedor.'
      },
      {
        stepNumber: 3,
        instruction: 'Escurre bien el aceite reservando un poco para la sartén. En un bol amplio bate los huevos con sal y vierte las patatas calientes. Deja reposar la mezcla 3 minutos para que absorba el huevo.',
        durationMinutes: 3,
        tip: 'El reposo es el secreto de los mejores bares para una tortilla cremosa y jugosa.'
      },
      {
        stepNumber: 4,
        instruction: 'Calienta la sartén a fuego medio con 1 cucharada del aceite reservado. Vierte la mezcla, cuaja 2 minutos moviendo en círculos, da la vuelta con ayuda de un plato plano y cocina 1-2 minutos más por el otro lado.',
        durationMinutes: 4,
        tip: 'Si te gusta bien jugosa, retírala en cuanto dore la superficie.'
      }
    ],
    chefTip: 'Utiliza un plato llano más ancho que la sartén y humedécelo ligeramente con agua antes de voltear para que la tortilla resbale con total facilidad.',
    nutrition: {
      calories: 340,
      protein: '11g',
      carbs: '28g',
      fat: '21g'
    },
    tags: ['Tradicional', 'Vegetariana', 'Sin gluten', 'Icono español'],
    utensils: ['Sartén antiadherente', 'Plato llano para voltear', 'Bol grande']
  },
  {
    id: 'pasta-aglio-olio',
    title: 'Espaguetis al Ajo, Aceite y Guindilla',
    description: 'La reina de las pastas rápidas italianas. Solo necesitas pasta, ajos laminados dorados a fuego lento, buen aceite y un toque picante.',
    imageUrl: '/src/assets/images/recipe_pasta_ajo_aceite_1790130361677.jpg',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    totalTimeMinutes: 15,
    servings: 2,
    difficulty: 'Muy fácil',
    requiredIngredients: ['pasta', 'ajo', 'aceite-oliva', 'sal'],
    ingredientsWithAmounts: [
      { name: 'Espaguetis u otra pasta larga', amount: '200g', substitute: 'Macarrones o cualquier pasta que tengas' },
      { name: 'Dientes de ajo', amount: '4 unidades laminadas' },
      { name: 'Aceite de oliva virgen extra', amount: '4 cucharadas (60 ml)' },
      { name: 'Guindilla o copos de chile / pimentón', amount: '1 pizca', isOptional: true, substitute: 'Pimienta negra molida' },
      { name: 'Sal para el agua de cocción', amount: '1 cucharada' },
      { name: 'Perejil picado o queso rallado', amount: 'Al gusto', isOptional: true }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Pon a hervir abundante agua con sal en una olla. Cuando rompa a hervir, añade la pasta y cocina según el tiempo del paquete menos 1 minuto para dejarla al dente.',
        durationMinutes: 8,
        tip: 'Reserva siempre media taza del agua de cocción antes de escurrir; su almidón creará la emulsión sedosa.'
      },
      {
        stepNumber: 2,
        instruction: 'Mientras hierve la pasta, calienta el aceite en una sartén grande a fuego muy suave. Añade el ajo laminado y la guindilla. Dora lentamente hasta que el ajo esté rubio y fragante (sin quemarse).',
        durationMinutes: 4,
        tip: 'Si el ajo se quema amarga; apaga el fuego si notas que dora demasiado rápido.'
      },
      {
        stepNumber: 3,
        instruction: 'Añade la pasta escurrida directamente a la sartén con el aceite y vierte 3 cucharadas del agua de cocción reservada. Saltea con vigor durante 1 minuto a fuego medio hasta crear una salsa brillante.',
        durationMinutes: 2,
        tip: 'El movimiento continuo emulsiona el aceite con el agua de cocción.'
      }
    ],
    chefTip: 'La clave de este plato de pocos ingredientes es no apresurar el dorado del ajo: el fuego bajo permite que el aceite se perfume completamente.',
    nutrition: {
      calories: 420,
      protein: '12g',
      carbs: '68g',
      fat: '11g'
    },
    tags: ['Ultra rápida', 'Económica', 'Vegetariana', 'Solo 15 min'],
    utensils: ['Olla para pasta', 'Sartén amplia']
  },
  {
    id: 'huevos-shakshuka-tomate',
    title: 'Huevos Pochados en Salsa de Tomate y Especias',
    description: 'Inspirada en la shakshuka mediterránea: huevos tiernos cocinados directamente en un sofrito espeso de tomate, cebolla, ajo y pimentón.',
    imageUrl: '/src/assets/images/recipe_shakshuka_huevos_1790130374504.jpg',
    prepTimeMinutes: 5,
    cookTimeMinutes: 15,
    totalTimeMinutes: 20,
    servings: 2,
    difficulty: 'Muy fácil',
    requiredIngredients: ['huevos', 'tomate', 'cebolla', 'ajo', 'aceite-oliva', 'sal'],
    ingredientsWithAmounts: [
      { name: 'Huevos camperos', amount: '4 unidades' },
      { name: 'Tomate triturado o tomates maduros picados', amount: '400g (1 lata)', substitute: 'Tomate frito ya preparado o salsa de tomate casera' },
      { name: 'Cebolla picada', amount: '1/2 unidad' },
      { name: 'Diente de ajo', amount: '1 picado finamente' },
      { name: 'Pimentón dulce o comino', amount: '1/2 cucharadita', isOptional: true },
      { name: 'Aceite de oliva virgen extra', amount: '2 cucharadas' },
      { name: 'Pan para mojar', amount: 'Unas rebanadas', isOptional: true }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'En una sartén mediana, calienta el aceite y sofríe la cebolla y el ajo con una pizca de sal a fuego medio durante 4-5 minutos hasta que estén tiernos y transparentes.',
        durationMinutes: 5,
        tip: 'Si tienes pimiento o calabacín a mano, puedes añadirlo en este paso.'
      },
      {
        stepNumber: 2,
        instruction: 'Agrega el pimentón y de inmediato el tomate. Cocina a fuego medio-bajo durante 7-8 minutos hasta que la salsa reduzca y espese un poco.',
        durationMinutes: 8,
        tip: 'Prueba la salsa de tomate: si notas acidez, añade una pizca de azúcar.'
      },
      {
        stepNumber: 3,
        instruction: 'Con una cuchara haz 4 huecos en la salsa. Casca un huevo dentro de cada hueco. Tapa la sartén y cocina a fuego bajo durante 4-6 minutos, hasta que las claras estén cuajadas pero las yemas sigan líquidas.',
        durationMinutes: 5,
        tip: 'Tapar la sartén es crucial para que el vapor cuaje la parte superior del huevo sin quemar la base.'
      }
    ],
    chefTip: 'Sirve la sartén directamente en el salvamanteles en la mesa con pan crujiente para mojar en la yema y la salsa caliente.',
    nutrition: {
      calories: 275,
      protein: '16g',
      carbs: '14g',
      fat: '17g'
    },
    tags: ['Saludable', 'Sin gluten', 'Vegetariana', 'Sartén única'],
    utensils: ['Sartén con tapa']
  },
  {
    id: 'ensalada-mediterranea-garbanzos',
    title: 'Ensalada Mediterránea de Garbanzos y Frescos',
    description: 'Plato completo sin encender fuego: garbanzos tiernos combinados con tomate jugoso, cebolla crujiente, limón, aceite de oliva y hierbas.',
    imageUrl: '/src/assets/images/recipe_ensalada_mediterranea_1790130384867.jpg',
    prepTimeMinutes: 10,
    cookTimeMinutes: 0,
    totalTimeMinutes: 10,
    servings: 2,
    difficulty: 'Muy fácil',
    requiredIngredients: ['garbanzos', 'tomate', 'cebolla', 'aceite-oliva', 'sal'],
    ingredientsWithAmounts: [
      { name: 'Garbanzos cocidos en conserva', amount: '1 bote (400g)', substitute: 'Lentejas cocidas o alubias blancas' },
      { name: 'Tomates maduros o cherry', amount: '2 medianos picados' },
      { name: 'Cebolla morada o dulce', amount: '1/4 finamente picada' },
      { name: 'Atún o queso en dados (opcional)', amount: '1 lata o 50g', isOptional: true },
      { name: 'Zumo de limón o vinagre', amount: '1 cucharada' },
      { name: 'Aceite de oliva virgen extra', amount: '3 cucharadas' },
      { name: 'Sal y orégano', amount: 'Al gusto' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Vierte los garbanzos en un colador y enjuágalos bien bajo el chorro de agua fría para retirar el líquido de conservación. Escurre por completo.',
        durationMinutes: 2,
        tip: 'Secar bien las legumbres hace que el aliño se adhiera mucho mejor.'
      },
      {
        stepNumber: 2,
        instruction: 'Corta el tomate en cubos pequeños y la cebolla en brunoise fina. Si tienes pepino, aceitunas o queso, córtalos del mismo tamaño.',
        durationMinutes: 5,
        tip: 'Si la cebolla es muy fuerte, déjala en agua fría con un chorrito de vinagre 5 minutos antes de añadirla.'
      },
      {
        stepNumber: 3,
        instruction: 'En una ensaladera mezcla los garbanzos, las verduras y el atún/queso si usas. Aliña con sal, el zumo de limón, aceite de oliva y orégano. Remueve bien y sirve fresco.',
        durationMinutes: 3,
        tip: 'Gana aún más sabor si reposa 10 minutos en la nevera antes de comer.'
      }
    ],
    chefTip: 'Es perfecta para llevar en táper a la oficina o la universidad porque no se ablanda como las ensaladas de lechuga.',
    nutrition: {
      calories: 310,
      protein: '15g',
      carbs: '38g',
      fat: '11g'
    },
    tags: ['Sin fuego', 'Proteína vegetal', 'En 10 minutos', 'Apta táper'],
    utensils: ['Colador', 'Ensaladera']
  },
  {
    id: 'arroz-frito-casero-huevo',
    title: 'Arroz Salteado Exprés con Huevo y Verduras',
    description: 'La solución perfecta para aprovechar arroz blanco del día anterior o preparar en 15 minutos con huevo revuelto y verduras crujientes.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    totalTimeMinutes: 15,
    servings: 2,
    difficulty: 'Muy fácil',
    requiredIngredients: ['arroz', 'huevos', 'ajo', 'cebolla', 'aceite-oliva', 'sal'],
    ingredientsWithAmounts: [
      { name: 'Arroz blanco cocido (del día anterior ideal)', amount: '2 tazas (300g)', substitute: 'Arroz de vasito para microondas de 1 minuto' },
      { name: 'Huevos', amount: '2 unidades batidas' },
      { name: 'Dientes de ajo', amount: '2 picados' },
      { name: 'Cebolla o zanahoria', amount: '1/2 unidad picada fina' },
      { name: 'Aceite vegetal o de oliva', amount: '2 cucharadas' },
      { name: 'Salsa de soja o sal y pimienta', amount: '1 cucharada', isOptional: true }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'En una sartén grande o wok calienta 1 cucharada de aceite a fuego vivo. Vierte los huevos batidos, remueve durante 40 segundos para hacer un revuelto tierno y retira a un plato.',
        durationMinutes: 2,
        tip: 'Retirar el huevo a medio cuajar evita que quede seco al integrarlo después.'
      },
      {
        stepNumber: 2,
        instruction: 'En la misma sartén añade la otra cucharada de aceite y saltea el ajo picado con la cebolla o verdura durante 3 minutos a fuego alto.',
        durationMinutes: 3,
        tip: 'El fuego vivo es el secreto del auténtico arroz salteado casero.'
      },
      {
        stepNumber: 3,
        instruction: 'Añade el arroz cocido separando los granos con la espátula. Saltea durante 3-4 minutos hasta que el arroz esté bien caliente y ligeramente tostado. Incorpora el huevo y salsa de soja o sal.',
        durationMinutes: 4,
        tip: 'Si el arroz estaba en la nevera, romperá mejor los grumos al calentarse.'
      }
    ],
    chefTip: 'El arroz frío de la nevera tiene menos humedad en la superficie, lo que evita que se apelmace y logra que quede suelto y delicioso.',
    nutrition: {
      calories: 360,
      protein: '11g',
      carbs: '52g',
      fat: '12g'
    },
    tags: ['Aprovechamiento', 'Sartén única', 'Económica', 'En 15 min'],
    utensils: ['Sartén amplia o wok', 'Espátula']
  },
  {
    id: 'quesadillas-doradas-queso',
    title: 'Quesadillas Doradas con Queso Fundido y Champiñones',
    description: 'Tortillas de trigo crujientes y doradas por fuera, rellenas de queso fundente y champiñones o atún salteados con ajo.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 8,
    totalTimeMinutes: 13,
    servings: 2,
    difficulty: 'Muy fácil',
    requiredIngredients: ['tortillas-trigo', 'queso', 'champinones', 'aceite-oliva', 'sal'],
    ingredientsWithAmounts: [
      { name: 'Tortillas de trigo o maíz', amount: '4 unidades', substitute: 'Rebanadas de pan de molde tipo sándwich' },
      { name: 'Queso rallado o en lonchas que funda bien', amount: '120g (mozzarella, gouda, havarti)' },
      { name: 'Champiñones laminados', amount: '100g', isOptional: true, substitute: 'Jamón, atún o tomate en rodajas' },
      { name: 'Diente de ajo', amount: '1 pequeño', isOptional: true },
      { name: 'Mantequilla o aceite', amount: '1 cucharadita para engrasar la sartén' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Si usas champiñones, saltéalos en una sartén con unas gotas de aceite, ajo picado y una pizca de sal durante 3 minutos hasta que suelten su agua.',
        durationMinutes: 3,
        tip: 'Saltear los champiñones antes evita que humedezcan la tortilla.'
      },
      {
        stepNumber: 2,
        instruction: 'Coloca una tortilla en la sartén a fuego medio. Cubre una mitad con queso rallado, los champiñones salteados y otra capa de queso. Dobla la tortilla por la mitad.',
        durationMinutes: 2,
        tip: 'Poner queso abajo y arriba actúa como "pegamento" perfecto.'
      },
      {
        stepNumber: 3,
        instruction: 'Cocina a fuego medio-bajo 2-3 minutos por lado presionando ligeramente con la espátula, hasta que esté dorada y crujiente y el queso se derrita por completo.',
        durationMinutes: 3,
        tip: 'Mantén fuego moderado para que el queso funda antes de que se queme la tortilla.'
      }
    ],
    chefTip: 'Corta cada quesadilla en 2 o 3 triángulos con un cuchillo afilado de chef nada más sacarla para un corte limpio y tentador.',
    nutrition: {
      calories: 380,
      protein: '16g',
      carbs: '34g',
      fat: '19g'
    },
    tags: ['Cena rápida', 'Comfort food', 'Vegetariana', 'Menos de 15 min'],
    utensils: ['Sartén antiadherente', 'Espátula']
  },
  {
    id: 'crema-suave-calabacin',
    title: 'Crema Sedosa de Calabacín y Patata',
    description: 'Reconfortante, ligera y delicada. Una crema que solo pide calabacín, patata, cebolla y una pizca de aceite o queso cremoso.',
    prepTimeMinutes: 10,
    cookTimeMinutes: 18,
    totalTimeMinutes: 28,
    servings: 3,
    difficulty: 'Fácil',
    requiredIngredients: ['calabacin', 'patatas', 'cebolla', 'aceite-oliva', 'sal'],
    ingredientsWithAmounts: [
      { name: 'Calabacines medianos', amount: '2 unidades (500g)' },
      { name: 'Patata mediana', amount: '1 unidad (200g)', substitute: 'Aumenta la cantidad de calabacín si buscas versión keto/baja en carbohidratos' },
      { name: 'Cebolla o puerro', amount: '1 unidad' },
      { name: 'Agua o caldo de verduras', amount: '400 ml' },
      { name: 'Quesitos o 2 cucharadas de queso crema', amount: '2 unidades', isOptional: true, substitute: 'Un chorrito de leche o aceite de oliva extra' },
      { name: 'Aceite de oliva virgen extra', amount: '2 cucharadas' },
      { name: 'Sal y pimienta', amount: 'Al gusto' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Pela la patata y la cebolla y córtalas en dados. Lava el calabacín y córtalo en rodajas sin pelar (la piel aporta un verde vibrante y nutrientes).',
        durationMinutes: 5,
        tip: 'Si quieres un color verde más claro y suave, puedes pelar uno de los calabacines.'
      },
      {
        stepNumber: 2,
        instruction: 'En una olla calienta el aceite y rehoga la cebolla durante 4 minutos. Añade el calabacín y la patata, cubre con el agua o caldo justo al ras de las verduras y pon a hervir 15 minutos.',
        durationMinutes: 15,
        tip: 'No pongas demasiada agua para que la crema quede con cuerpo y textura densa.'
      },
      {
        stepNumber: 3,
        instruction: 'Retira del fuego. Añade los quesitos o una cucharada de aceite crudo, sal y pimienta. Tritura con la batidora a máxima potencia durante 2 minutos hasta obtener una textura aterciopelada.',
        durationMinutes: 3,
        tip: 'Triturar bien oxigena la crema y le otorga una emulsión suave sin necesidad de natas.'
      }
    ],
    chefTip: 'Añade una pizca de nuez moscada o unas gotas de aceite de oliva crudo por encima justo al servir para un aroma espectacular.',
    nutrition: {
      calories: 165,
      protein: '4g',
      carbs: '22g',
      fat: '7g'
    },
    tags: ['Saludable', 'Ligera', 'Baja en calorías', 'Vegetariana'],
    utensils: ['Olla mediana', 'Batidora de mano']
  },
  {
    id: 'tostas-atun-tomate-queso',
    title: 'Tostas Crujientes de Atún, Tomate y Queso Gratinado',
    description: 'La cena rápida definitiva cuando la nevera parece vacía: pan tostado con tomate fresco rallado, atún jugoso, orégano y queso derretido.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 7,
    totalTimeMinutes: 12,
    servings: 2,
    difficulty: 'Muy fácil',
    requiredIngredients: ['pan', 'atun', 'tomate', 'queso', 'aceite-oliva', 'oregano'],
    ingredientsWithAmounts: [
      { name: 'Rebanadas de pan rústico o de molde', amount: '4 rebanadas' },
      { name: 'Atún en lata escurrido', amount: '2 latas pequeñas (160g)' },
      { name: 'Tomate maduro', amount: '1 grande rallado o en rodajas muy finas' },
      { name: 'Queso rallado o lonchas', amount: '80g' },
      { name: 'Aceite de oliva virgen extra', amount: '1 cucharada' },
      { name: 'Orégano seco y sal', amount: '1 pizca' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Tuesta ligeramente las rebanadas de pan en tostadora, sartén o bandeja de horno.',
        durationMinutes: 2,
        tip: 'Tostar antes evita que el pan se ablande al colocar el tomate.'
      },
      {
        stepNumber: 2,
        instruction: 'Ralla el tomate y mézclalo con sal y media cucharada de aceite. Unta generosamente sobre las tostas. Reparte el atún desmenuzado por encima.',
        durationMinutes: 3,
        tip: 'Si no tienes rallador, corta el tomate por la mitad y frótalo directamente contra la miga del pan tostado.'
      },
      {
        stepNumber: 3,
        instruction: 'Cubre con el queso rallado y espolvorea orégano. Gratina en el horno a 200°C o en una sartén tapada a fuego bajo durante 4 minutos hasta fundir el queso.',
        durationMinutes: 4,
        tip: 'La sartén tapada funciona como mini horno y no gasta electricidad innecesaria.'
      }
    ],
    chefTip: 'Unas gotas de vinagre de Jerez o limón sobre el atún antes de poner el queso realzan la frescura del pescado.',
    nutrition: {
      calories: 320,
      protein: '22g',
      carbs: '28g',
      fat: '13g'
    },
    tags: ['Ultra rápida', 'Alta proteína', 'Económica', 'Sin complicaciones'],
    utensils: ['Tostadora o sartén con tapa']
  },
  {
    id: 'tortilla-francesa-espinacas-queso',
    title: 'Tortilla Francesa Rellena de Espinacas y Queso',
    description: 'En solo 8 minutos: una tortilla jugosa y tierna enrollada con espinacas salteadas al ajo y queso derretido en su interior.',
    prepTimeMinutes: 3,
    cookTimeMinutes: 5,
    totalTimeMinutes: 8,
    servings: 1,
    difficulty: 'Muy fácil',
    requiredIngredients: ['huevos', 'espinacas', 'queso', 'ajo', 'aceite-oliva', 'sal'],
    ingredientsWithAmounts: [
      { name: 'Huevos', amount: '2 unidades' },
      { name: 'Espinacas frescas o congeladas descongeladas', amount: '1 puñado generoso (60g)' },
      { name: 'Queso rallado o feta en dados', amount: '30g' },
      { name: 'Diente de ajo laminado', amount: '1/2 unidad', isOptional: true },
      { name: 'Aceite de oliva o mantequilla', amount: '1 cucharadita' },
      { name: 'Sal y pimienta', amount: 'Al gusto' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'En una sartén antiadherente pequeña saltea las espinacas con unas gotas de aceite y el ajo durante 1 minuto hasta que reduzcan. Reserva.',
        durationMinutes: 1,
        tip: 'Las espinacas se cocinan en segundos: no las dejes más tiempo para que no pierdan su color verde brillante.'
      },
      {
        stepNumber: 2,
        instruction: 'Bate los huevos con sal y pimienta sin excederte para no meter demasiado aire. Calienta la sartén con la cucharadita de aceite o mantequilla a fuego medio-alto y vierte los huevos.',
        durationMinutes: 1,
        tip: 'Mueve la sartén en vaivén con una mano mientras remueves con la espátula los primeros 20 segundos.'
      },
      {
        stepNumber: 3,
        instruction: 'Coloca en el centro las espinacas salteadas y el queso. Con ayuda de la espátula pliega un lado sobre el centro y rueda la tortilla sobre sí misma.',
        durationMinutes: 2,
        tip: 'El calor residual terminará de fundir el queso en el plato manteniendo el huevo jugoso.'
      }
    ],
    chefTip: 'Añadir media cucharadita de agua o leche al batir los huevos relaja las proteínas y deja la tortilla notablemente más esponjosa.',
    nutrition: {
      calories: 240,
      protein: '17g',
      carbs: '2g',
      fat: '18g'
    },
    tags: ['Keto', 'Sin gluten', 'Vegetariana', 'Menos de 10 min'],
    utensils: ['Sartén antiadherente pequeña', 'Espátula']
  },
  {
    id: 'garbanzos-espinacas-andaluces',
    title: 'Guiso Rápido de Garbanzos con Espinacas al Pimentón',
    description: 'La mítica tapa andaluza en versión exprés de 15 minutos usando garbanzos de bote, espinacas y un majado aromático de ajo y comino.',
    prepTimeMinutes: 5,
    cookTimeMinutes: 12,
    totalTimeMinutes: 17,
    servings: 2,
    difficulty: 'Fácil',
    requiredIngredients: ['garbanzos', 'espinacas', 'ajo', 'pan', 'aceite-oliva', 'pimenton', 'sal'],
    ingredientsWithAmounts: [
      { name: 'Garbanzos cocidos en conserva', amount: '1 bote (400g)' },
      { name: 'Espinacas frescas o congeladas', amount: '200g' },
      { name: 'Dientes de ajo', amount: '3 unidades peladas' },
      { name: 'Rebanada de pan del día anterior', amount: '1 unidad' },
      { name: 'Pimentón dulce', amount: '1 cucharadita rasa' },
      { name: 'Comino molido', amount: '1/2 cucharadita', isOptional: true },
      { name: 'Vinagre de vino', amount: '1 cucharada' },
      { name: 'Aceite de oliva virgen extra', amount: '3 cucharadas' },
      { name: 'Agua o caldo', amount: '100 ml' }
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'En una sartén calienta el aceite y fríe los dientes de ajo enteros y la rebanada de pan hasta que doren. Pásalos a un mortero o vaso de batidora con el comino, vinagre y un chorrito de agua y tritura.',
        durationMinutes: 4,
        tip: 'Este majado tradicional es el secreto de la salsa espesa y aromática.'
      },
      {
        stepNumber: 2,
        instruction: 'En el aceite restante de la sartén rehoga las espinacas 2 minutos. Añade el pimentón fuera del fuego para que no se queme, remueve y vierte los garbanzos escurridos.',
        durationMinutes: 3,
        tip: 'Apartar la sartén del fuego al echar el pimentón evita que amargue.'
      },
      {
        stepNumber: 3,
        instruction: 'Incorpora el majado triturado y los 100 ml de agua. Cocina a fuego suave durante 6-7 minutos haciendo chup-chup hasta que la salsa ligue y quede melosa.',
        durationMinutes: 7,
        tip: 'Chafa 3 o 4 garbanzos contra el fondo de la sartén con la cuchara para espesar aún más.'
      }
    ],
    chefTip: 'Un clásico de taberna sevillana que sabe aún mejor recalentado al día siguiente.',
    nutrition: {
      calories: 340,
      protein: '14g',
      carbs: '44g',
      fat: '12g'
    },
    tags: ['Tradicional', 'Vegana', 'Alto en fibra', 'Sabor casero'],
    utensils: ['Sartén honda o cacerola', 'Mortero o batidora']
  }
];
