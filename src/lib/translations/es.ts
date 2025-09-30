export const es = {
  broadcast: {
    end: "Finalizar Transmisión",
    live: "En Vivo",
    start: "Iniciar Transmisión"
  },
  header: {
    title: "Acerca de",
    about: "Este es un proyecto que pretende demostrar cómo usar la API en tiempo real de OpenAI con WebRTC en un proyecto moderno de Next 15. Tiene componentes shadcn/ui ya instalados y el hook de sesión de audio WebRTC ya implementado. Clona el proyecto y define tus propias herramientas.",
    banner: "🎉 ¡Descubre la nueva biblioteca OpenAI Realtime Blocks UI para Next.js!",
    bannerLink: "Saber más →",
    beta: "Beta",
    dark: "Oscuro",
    github: "Estrella en GitHub",
    language: "Idioma",
    light: "Claro",
    logo: "OpenAI Realtime Starter",
    system: "Sistema",
    theme: "Cambiar tema",
    twitter: "Seguir en",
    home: "Inicio",
    realEstate: "Bienes Raíces",
    adminPanel: "Panel de Administración",
    development: "Desarrollo",
    propertySearch: "Búsqueda y Compra de Propiedades",
    systemManagement: "Gestión del Sistema",
    developmentTools: "Herramientas de Desarrollo",
    browseProperties: "Explorar Propiedades",
    smartSearch: "Búsqueda Inteligente",
    compareProperties: "Comparar Propiedades",
    contactAgent: "Contactar Agente",
    bookViewing: "Reservar Visita",
    replicasManagement: "Gestión de Réplicas",
    aiTraining: "Entrenamiento de IA",
    databaseManagement: "Gestión de Base de Datos",
    settings: "Configuración",
    apiKeys: "Claves API",
    chatHistory: "Historial de Chat",
    experimentalApi: "API Experimental",
    activeReplica: "Réplica Activa",
    refreshReplicas: "Actualizar Réplicas",
    noReplicasAvailable: "No hay réplicas disponibles",
    loadingReplicas: "Cargando réplicas...",
    selectReplica: "Seleccionar Réplica",
    hideAiAssistant: "Ocultar Asistente de IA",
    showAiAssistant: "Mostrar Asistente de IA"
  },
  hero: {
    badge: "Next.js + shadcn/ui",
    subtitle: "Haga una demostración haciendo clic en el botón de abajo y pruebe las herramientas disponibles",
    title: "API en tiempo real de OpenAI (WebRTC)"
  },
  messageControls: {
    content: "Contenido",
    filter: "Filtrar por tipo",
    log: "Registrar en Consola",
    logs: "Registros de Conversación",
    search: "Buscar mensajes...",
    type: "Tipo",
    view: "Ver Registros"
  },
  status: {
    error: "¡Ups!",
    info: "Alternando Asistente de Voz...",
    language: "Idioma cambiado de",
    session: "Sesión establecida",
    success: "¡Estamos en vivo!",
    toggle: "Alternando Asistente de Voz..."
  },
  tokenUsage: {
    input: "Tokens de Entrada",
    output: "Tokens de Salida",
    total: "Tokens Totales",
    usage: "Uso de Tokens"
  },
  tools: {
    availableTools: {
      title: "Herramientas Disponibles",
      copyFn: {
        description: 'Di "Copiar eso al portapapeles" para pegarlo en algún lugar.',
        name: "Función Copiar"
      },
      getTime: {
        description: 'Pregunta "¿Qué hora es?" para obtener la hora actual.',
        name: "Obtener Hora"
      },
      launchWebsite: {
        description: '"Llévame a [sitio web]" para abrir un sitio en una nueva pestaña.',
        name: "Abrir Sitio Web"
      },
      partyMode: {
        description: '¡Di "Iniciar modo fiesta" para una animación dinámica de confeti!',
        name: "Modo Fiesta"
      },
      themeSwitcher: {
        description: 'Di "Cambiar fondo" o "Cambiar a modo oscuro" o "Cambiar a modo claro".',
        name: "Cambiar Tema"
      },
            scrapeWebsite: {
                name: "Extractor de Sitios Web",
                description: 'Di "Extraer contenido de [URL del sitio]" para obtener contenido de una página web.'
            },
            navigateToPage: {
                name: "Navegar a Página",
                description: 'Di "Ir a [página]" o "Abrir [URL]" para navegar a una página específica.'
            }
    },
    clipboard: {
      description: "Ahora puedes pegarlo en algún lugar.",
      success: "Texto copiado al portapapeles. Pide al usuario que lo pegue en algún lugar.",
      toast: "¡Texto copiado al portapapeles!"
    },
    launchWebsite: {
      description: "Error al abrir el sitio web",
      success: "¡Sitio web abierto! Informa al usuario que se ha abierto.",
      toast: "Abriendo sitio web "
    },
    partyMode: {
      description: "Error al activar el modo fiesta",
      success: "Modo fiesta activado",
      toast: "¡Modo fiesta!"
    },
    switchTheme: "Tema cambiado a ",
    themeFailed: "Error al cambiar el tema",
    time: "Anunciar al usuario: La hora actual es ",
    scrapeWebsite: {
      success: "Contenido del sitio web extraído exitosamente",
      description: "Error al extraer contenido del sitio web",
      toast: "Extrayendo contenido del sitio web..."
    }
  },
  transcriber: {
    title: "Transcripción en Vivo"
  },
  voice: {
    select: "Seleccionar una voz",
    ash: "Ash - Suave y Profesional",
    ballad: "Ballad - Cálida y Cautivadora",
    coral: "Coral - Clara y Amigable",
    sage: "Sage - Autoritaria y Tranquila",
    verse: "Verse - Dinámica y Expresiva"
  },
  chatTabs: {
    textChat: "Chat de Texto",
    voiceChat: "Chat de Voz"
  },
  voiceChat: {
    selectReplica: "Seleccionar Réplica",
    loadingReplicas: "Cargando réplicas...",
    selectVoice: "Seleccionar Voz"
  },
  language: "Spanish",
  languagePrompt: "Habla y responde solo en español. Es crucial que mantengas tus respuestas en español. Si el usuario habla en otros idiomas, deberías responder en español. (Spanish only)",
  quiz: {
    title: "Encuentra inmuebles con IO",
    intro: {
      title: "Bienvenido al Quiz de Propiedades IO",
      subtitle: "¡Encontremos tu propiedad perfecta juntos! Te guiaré a través de algunas preguntas para entender tus necesidades.",
      discover: {
        title: "Lo que descubriremos:",
        items: [
          "Preferencia de alquiler o compra",
          "Rango de presupuesto",
          "Preferencias de tipo de propiedad",
          "Ubicación ideal",
          "Características imprescindibles"
        ]
      },
      aiPowered: {
        title: "Guía impulsada por IA:",
        items: [
          "Chat de voz o texto",
          "Recomendaciones personalizadas",
          "Búsqueda de propiedades en tiempo real",
          "Consejos de expertos"
        ]
      },
      ready: "¿Listo para encontrar tu propiedad ideal? ¡Comencemos el viaje!"
    },
    steps: {
      purpose: {
        title: "¿Alquilar o Comprar?",
        subtitle: "¿Estás buscando alquilar una propiedad o comprarla? Esto me ayudará a adaptar las recomendaciones.",
        rent: {
          title: "Alquilar",
          description: "Vida flexible, costos iniciales más bajos, prueba antes de comprar"
        },
        buy: {
          title: "Comprar",
          description: "Inversión a largo plazo, construir patrimonio, crear tu hogar para siempre"
        }
      },
      budget: {
        title: "Rango de Presupuesto",
        subtitle: "¿Cuál es tu presupuesto para alquiler/compra?",
        custom: "Personalizado"
      },
      propertyType: {
        title: "Tipo de Propiedad",
        subtitle: "¿Qué tipo de propiedad te interesa? Selecciona todas las que apliquen.",
        selected: "Seleccionado:"
      },
      location: {
        title: "Ubicación",
        subtitle: "¿Dónde te gustaría vivir? Elige tu área preferida."
      },
      features: {
        title: "Características Imprescindibles",
        subtitle: "Selecciona características que son importantes para ti. Puedes elegir múltiples opciones."
      },
      results: {
        title: "¡Perfecto! Aquí está tu Perfil",
        subtitle: "Basado en tus preferencias, esto es lo que buscas:",
        purpose: "Propósito",
        budget: "Presupuesto",
        propertyTypes: "Tipos de Propiedad",
        location: "Ubicación",
        features: "Características Imprescindibles",
        notSpecified: "No especificado",
        noFeatures: "No se seleccionaron características",
        searchMessage: "Ahora déjame buscar propiedades que coincidan con tus criterios...",
        startOver: "Empezar de Nuevo",
        searchProperties: "Buscar Propiedades"
      }
    },
    navigation: {
      prev: "Anterior",
      next: "Siguiente",
      skip: "Omitir",
      step: "Paso"
    },
    properties: {
      allAvailable: "Todas las Propiedades Disponibles",
      byPurpose: "Propiedades por Propósito",
      byBudget: "Propiedades en tu Presupuesto",
      byType: "Propiedades por Tipo",
      byArea: "Propiedades en tu Área",
      byFeatures: "Propiedades con tus Características",
      perfectMatches: "Tus Coincidencias Perfectas",
      matching: "Propiedades Coincidentes",
      found: "encontradas",
      property: "propiedad",
      properties: "propiedades",
      noProperties: "No se encontraron propiedades",
      completeSteps: "Completa más pasos para ver recomendaciones personalizadas",
      adjustPreferences: "Intenta ajustar tus preferencias para ver más resultados",
      selected: "Seleccionado",
      featured: "Destacado",
      verified: "Verificado",
      rent: "Alquiler",
      sale: "Venta",
      perMonth: "por mes",
      views: "vistas",
      reviews: "reseñas",
      view: "Ver"
    }
  },
  homepage: {
    title: "Encuentra tu Propiedad Ideal con IA",
    hero: {
      title: "Encuentra tu Propiedad Ideal con IA",
      subtitle: "Descubre propiedades con asistencia inteligente de IA",
      callToAction: "Llamar para Reservar tu Propiedad",
      locationPlaceholder: "Las ubicaciones estarán disponibles después de agregar propiedades",
      propertyLogos: ["Lujo", "Moderno", "Clásico", "Villa", "Penthouse", "Casa Adosada", "Mansión", "Propiedad"]
    },
    popularTypes: {
      title: "Tipos de Propiedades Populares",
      placeholder: "Los tipos de propiedades estarán disponibles después de agregar propiedades",
      objects: "objetos"
    },
    trending: {
      title: "Direcciones en Tendencia: Mejores Ubicaciones",
      placeholder: "Los datos de ciudades estarán disponibles después de agregar propiedades inmobiliarias",
      objects: "objetos",
      from: "Desde"
    },
    features: {
      title: "Por Qué Elegirnos",
      convenientSearch: {
        title: "Búsqueda Conveniente",
        description: "Proceso de búsqueda de propiedades intuitivo con IA. Obtén recomendaciones personalizadas e instantáneas de grandes ofertas."
      },
      secureTransactions: {
        title: "Transacciones Seguras",
        description: "Verificación exhaustiva, términos transparentes y documentación completa. Propiedades verificadas y servicios seguros confiables."
      },
      smartNavigation: {
        title: "Navegación Inteligente",
        description: "Análisis de ubicaciones con IA e investigación detallada de vecindarios para encontrar la propiedad perfecta, haciendo que el proceso de búsqueda sea simple y agradable."
      }
    },
    testimonials: {
      title: "Reseñas de Usuarios",
      reviews: [
        {
          name: "Olivia Parker",
          handle: "@oliviaparker",
          text: "¡Mejor Experiencia de Búsqueda de Propiedades! La interfaz de IA es intuitiva, facilitando encontrar la propiedad ideal... ¡Altamente recomendado!"
        },
        {
          name: "Emma Thompson",
          handle: "@emmathompson",
          text: "¡Una Experiencia Perfecta! Esta plataforma hizo que encontrar propiedades fuera fácil... ¡Servicio de 5 estrellas!"
        },
        {
          name: "Sophia Rodriguez",
          handle: "@sophiarodriguez",
          text: "¡Confiable y Asequible! He usado varias plataformas de propiedades antes, pero esta destaca... Volveré para todas mis búsquedas futuras."
        },
        {
          name: "Daniel Johnson",
          handle: "@danieljohnson",
          text: "¡Servicio Excepcional! Desde la búsqueda hasta el cierre, todo fue suave y fácil... ¡Definitivamente recomendaré a amigos!"
        }
      ]
    },
    cta: {
      title: "¡Tu viaje al mundo inmobiliario comienza aquí. ¡Desbloquea infinitas posibilidades!",
      button: "Ver Propiedades >"
    },
    footer: {
      company: "Sensay.io",
      sections: {
        destinations: "Destinos",
        destinationsItems: ["Propiedades de Playa", "Distritos Históricos", "Vida Urbana", "Resorts de Montaña", "Villas de Lujo", "Propiedades de Inversión"],
        resources: "Recursos",
        resourcesItems: ["Blog", "Guía de Bienes Raíces", "Análisis de Mercado", "Consejos de Inversión", "Tipos de Propiedades"],
        policies: "Políticas",
        policiesItems: ["Privacidad", "Términos de Uso", "Configuración de Cookies"],
        newsletter: "Boletín",
        newsletterText: "¡Únete a nuestra comunidad! Obtén ofertas exclusivas y análisis de mercado.",
        newsletterPlaceholder: "you@domain.com",
        newsletterButton: "Suscribirse"
      },
      copyright: "El código fuente está disponible en GitHub.",
      phone: "Teléfono"
    }
  },
  properties: {
    title: "Propiedades Inmobiliarias",
    foundCount: "Propiedades encontradas: {count}",
    errorLoading: "Ocurrió un error al cargar las propiedades",
    errorTitle: "Error de Carga",
    tryAgain: "Intentar de Nuevo",
    loadMore: "Cargar Más",
    loading: "Cargando..."
  },
  propertyFilters: {
    searchPlaceholder: "Buscar propiedades...",
    title: "Filtros",
    clear: "Limpiar",
    operationType: "Tipo de Operación",
    selectOperationType: "Seleccionar tipo",
    allTypes: "Todos los Tipos",
    rent: "Alquiler",
    sale: "Venta",
    both: "Alquiler y Venta",
    city: "Ciudad",
    selectCity: "Seleccionar ciudad",
    allCities: "Todas las Ciudades",
    loading: "Cargando...",
    priceRange: "Rango de Precios",
    from: "Desde",
    to: "Hasta"
  },
  propertyGrid: {
    noResults: "No se encontraron propiedades",
    tryDifferentFilters: "Intenta cambiar tus parámetros de búsqueda",
    pricePerMonth: "/mes",
    priceNotSpecified: "Precio no especificado"
  }
} 