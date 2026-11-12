import type { Site } from './types'

/**
 * Contenido del portafolio. Fuente: el CV (Claude Doc "CV — Libardo").
 * Lo marcado `REVISAR` falta confirmarlo; nunca se inventan cifras, fechas ni cargos.
 */
export const site: Site = {
  profile: {
    name: 'Libardo',
    fullName: 'Libardo José Acosta Garcia',
    role: 'Desarrollador Full Stack',
    // REVISAR: ciudad (si se quiere más precisa que el país)
    city: 'Colombia',
    whatsapp: '573045250172',
    email: 'libardojoseacostagarcia@gmail.com',
    // Se genera con `npm run cv:pdf` desde este mismo archivo.
    cvPdf: '/cv-libardo.pdf',
    photo: {
      src: '/images/libardo.jpg',
      alt: 'Foto de Libardo José Acosta Garcia',
      width: 900,
      height: 900
    },
    social: [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/libardo-jos%C3%A9-acosta-garcia-a045b03a4/'
      },
      { label: 'GitHub', url: 'https://github.com/Libardo19' }
    ]
  },

  seo: {
    title: 'Libardo · Desarrollador Full Stack (Next.js, Node.js, IA)',
    description:
      'Desarrollador full stack: interfaces con Next.js y React, APIs con Node.js, TypeScript y PostgreSQL, e integraciones con IA generativa.'
  },

  nav: [
    { label: 'Sobre mí', href: '/#presentacion' },
    { label: 'Experiencia', href: '/#experiencia' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'CV', href: '/cv' },
    { label: 'Contacto', href: '/#contacto' }
  ],

  hero: {
    eyebrow: 'Desarrollador Full Stack',
    greeting: 'Hola, soy Libardo.',
    title: 'Hola, soy Libardo. Construyo productos web con IA, de punta a punta.',
    text: 'Interfaces con Next.js y React, APIs con Node.js, TypeScript y PostgreSQL, e integraciones con servicios de IA generativa. Hoy, cofundador de JELIX.',
    primary: { label: 'Descargar CV', to: 'cv' },
    secondary: { label: 'Escríbeme', to: '/#contacto' },
    terminal: {
      request: 'GET /api/perfil',
      lines: [
        ['rol', '"Desarrollador Full Stack"'],
        ['stack', '["Next.js", "React", "Node.js", "TypeScript"]'],
        ['datos', '["PostgreSQL", "Redis", "BullMQ"]'],
        ['ia', '["HeyGen", "Claude"]'],
        ['ahora', '"Cofundador · JELIX"'],
        ['disponible', 'true']
      ]
    }
  },

  introduction: {
    eyebrow: 'Carta de presentación',
    title: 'De la base de datos a la interfaz, con el producto en la cabeza.',
    // REVISAR: el texto de la carta lo aprueba Libardo.
    letter: [
      'Soy desarrollador full stack. Me gusta llevar un producto de punta a punta: la interfaz que usa la gente, la API y la base de datos que la sostienen, y las integraciones con IA que lo hacen distinto.',
      'En finCreator construí un módulo de video con avatares de IA. En JELIX, que cofundé, diseño la API, la base de datos y el despliegue. Y para clientes he entregado sitios completos, frontend y backend, que hoy están en producción.',
      'Trabajo con contrato de API antes del código, revisión por PR y decisiones documentadas. Busco un equipo donde pueda aportar eso y seguir creciendo.'
    ],
    signature: 'Libardo',
    facts: [
      { label: 'Rol', value: 'Desarrollador Full Stack' },
      { label: 'Stack', value: 'Next.js · Node.js · TypeScript' },
      { label: 'Ahora', value: 'Cofundador de JELIX' }
    ],
    hint: 'Toca la tarjeta para leer mi carta'
  },

  sections: {
    experience: { eyebrow: 'Experiencia', title: 'Dónde he trabajado' },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Lo que he construido',
      text: 'Sin código ni datos privados de clientes: lo que hice y cómo lo resolví.'
    },
    skills: { eyebrow: 'Habilidades', title: 'Con qué trabajo' },
    contact: {
      eyebrow: 'Contacto',
      title: '¿Hablamos?',
      text: 'Escríbeme por el formulario y me llega al correo, o mándame un WhatsApp. También puedes descargar mi CV.'
    }
  },

  experience: [
    {
      role: 'Desarrollador Full Stack',
      company: 'finCreator',
      period: 'Ene. 2026 – actual',
      current: true,
      summary: 'Módulo de generación de video con avatares de IA, de punta a punta.',
      highlights: [
        'Modelo de datos en Prisma, colas BullMQ sobre Redis, workers, webhook y eventos en tiempo real por SSE.',
        'Limitador de concurrencia y circuit breaker en Redis; idempotencia de doble barrera.',
        'Webhooks verificados con firma HMAC-SHA256 y videos guardados en Google Cloud Storage.'
      ]
    },
    {
      role: 'Cofundador · Desarrollador Full Stack',
      company: 'JELIX',
      period: 'Oct. 2026 – actual',
      current: true,
      summary: 'Responsable de la API, la base de datos, la autenticación y el despliegue.',
      highlights: [
        'Express, Prisma, PostgreSQL en Neon, Railway y zod.',
        'Contrato de la API antes del código y revisión de todos los PR del frontend.'
      ]
    },
    {
      role: 'Desarrollador Full Stack',
      company: 'Freelance',
      // REVISAR: fechas exactas y si fueron trabajos pagos o colaboraciones
      period: '2026',
      summary: 'Sitios a la medida para clientes, de punta a punta.',
      highlights: [
        'Sitio del Dr. Yamith Cuello, frontend y backend: landing, portal del paciente, panel de administración, agenda y seguimiento. En producción.',
        'ZÉPHIR: backend de una tienda de perfumes con cierre por WhatsApp y panel de administración.'
      ]
    }
  ],

  projects: [
    {
      slug: 'video-ia',
      shortTitle: 'Video con IA',
      title: 'Módulo de video con avatares de IA',
      context: 'finCreator · caso de estudio',
      summary:
        'Generación asíncrona de videos con HeyGen: colas, workers, webhook firmado y avance en tiempo real.',
      description: [
        'El usuario pide un video y la API nunca espera al proveedor: encola el pedido y responde de inmediato.',
        'Un worker lo procesa con límite de concurrencia y circuit breaker; el resultado vuelve por webhook y llega al navegador por SSE.'
      ],
      stack: ['Node.js', 'TypeScript', 'BullMQ', 'Redis', 'Prisma', 'PostgreSQL', 'SSE'],
      href: '/proyectos/video-ia',
      hrefLabel: 'Ver caso de estudio',
      featured: true
    },
    {
      slug: 'yamith-cuello',
      shortTitle: 'Dr. Yamith Cuello',
      title: 'Sitio del Dr. Yamith Cuello',
      context: 'Freelance · full stack · en producción',
      summary:
        'Sitio completo, frontend y backend, para un cirujano plástico: landing, portal del paciente y panel de administración.',
      description: [
        'Frontend en Next.js: landing, registro e inicio de sesión, portal del paciente y panel de administración.',
        'Backend desde cero: cuentas por correo, agenda de citas, seguimiento con archivos privados, encuestas y galería. API y base de datos en Railway, frontend en Vercel.'
      ],
      stack: ['Next.js', 'React', 'Tailwind CSS', 'Express 5', 'Prisma 7', 'PostgreSQL', 'Railway'],
      href: 'https://cirujanoyamithcuello.com',
      hrefLabel: 'Ver sitio en vivo',
      image: {
        src: '/images/proyectos/yamith-cuello.jpg',
        alt: 'Página de inicio del sitio del Dr. Yamith Cuello en escritorio',
        width: 2160,
        height: 1350
      },
      imageMobile: {
        src: '/images/proyectos/yamith-cuello-movil.jpg',
        alt: 'El mismo sitio en un celular',
        width: 585,
        height: 1266
      },
      featured: true
    },
    {
      slug: 'rescate360',
      shortTitle: 'RESCATE360',
      title: 'RESCATE360',
      context: 'Universidad · Ingeniería de Software II · en equipo',
      summary:
        'Red de respuesta a emergencias en Valledupar: reportes con ubicación, solicitudes de ayuda priorizadas y alertas, incluso sin señal.',
      description: [
        'API en Python con FastAPI, PostgreSQL y Redis; tareas en segundo plano y programadas con Celery, todo en Docker.',
        'Panel web para los organismos de socorro y app móvil en Flutter para ciudadanos y voluntarios. Trabajé en la API, en funciones del panel y en la app.'
      ],
      stack: ['Python', 'FastAPI', 'Celery', 'Redis', 'PostgreSQL', 'Docker', 'React', 'Flutter'],
      image: {
        src: '/images/proyectos/rescate360.jpg',
        alt: 'Centro de mando del panel web de RESCATE360 con solicitudes, reportes y alertas',
        width: 2160,
        height: 1350
      },
      imageMobile: {
        src: '/images/proyectos/rescate360-movil.jpg',
        alt: 'Landing de RESCATE360 en un celular',
        width: 585,
        height: 1266
      },
      imageNote: 'Capturas en local con datos de prueba. Rediseño del panel web: Elkin Bacci.',
      featured: true
    },
    {
      slug: 'zephir',
      shortTitle: 'ZÉPHIR',
      title: 'ZÉPHIR',
      context: 'Freelance · tienda de perfumes · en equipo',
      summary: 'Backend de una tienda con cierre de venta por WhatsApp y panel de administración.',
      description: [
        'API en Express y Prisma: catálogo, pedidos y panel de administración.',
        'Infraestructura en Railway y Neon, en equipo con un desarrollador frontend.'
      ],
      stack: ['Express', 'Prisma', 'PostgreSQL', 'Railway', 'Neon'],
      image: {
        src: '/images/proyectos/zephir.jpg',
        alt: 'Página de inicio de la tienda ZÉPHIR en escritorio',
        width: 2160,
        height: 1350
      },
      imageMobile: {
        src: '/images/proyectos/zephir-movil.jpg',
        alt: 'La tienda ZÉPHIR en un celular',
        width: 585,
        height: 1266
      },
      imageNote: 'Captura en local, antes del lanzamiento. Frontend: Jean.'
    },
    {
      slug: 'jarvis',
      shortTitle: 'JARVIS',
      title: 'JARVIS',
      context: 'Proyecto personal',
      summary: 'Asistente de voz que conversa con varias IA y controla aplicaciones de Windows.',
      description: [
        'Servicio en Python que detecta la palabra clave "Jarvis" en español (Vosk y openWakeWord), con su propio banco de pruebas.',
        'Transcripción local con whisper.cpp sobre CUDA, interfaz en Electron y respuestas de Claude, Codex o Gemini.'
      ],
      stack: ['Node.js', 'TypeScript', 'Python', 'Electron', 'whisper.cpp']
    }
  ],

  skills: [
    {
      title: 'Backend',
      icon: 'server',
      summary:
        'APIs REST con el contrato definido antes del código, validación en la entrada y errores con un solo formato.',
      items: ['Node.js', 'TypeScript', 'Express', 'Prisma', 'zod', 'Python', 'FastAPI', 'Webhooks', 'SSE'],
      usedIn: ['video-ia', 'yamith-cuello', 'zephir', 'rescate360'],
      span: 2
    },
    {
      title: 'Datos y colas',
      icon: 'database',
      summary: 'Modelos relacionales, idempotencia y trabajo pesado fuera de la petición.',
      items: ['PostgreSQL', 'SQL Server', 'Redis', 'BullMQ', 'Celery'],
      usedIn: ['video-ia', 'rescate360']
    },
    {
      title: 'Frontend',
      icon: 'layout',
      summary: 'Interfaces que consumen mis propias APIs, rápidas y accesibles.',
      items: ['Next.js', 'React', 'Tailwind CSS', 'Flutter'],
      usedIn: ['yamith-cuello']
    },
    {
      title: 'Infraestructura',
      icon: 'cloud',
      summary:
        'Del repositorio a producción: contenedores, bases de datos administradas y despliegue continuo.',
      items: ['Docker', 'Railway', 'Neon', 'Vercel', 'Google Cloud Storage'],
      usedIn: ['yamith-cuello', 'video-ia', 'rescate360']
    },
    {
      title: 'IA',
      icon: 'sparkles',
      summary: 'Integración de proveedores de IA generativa y asistentes en el flujo de trabajo.',
      items: ['API de HeyGen', 'Claude Code', 'Claude, Codex y Gemini por CLI'],
      usedIn: ['video-ia', 'jarvis']
    },
    {
      title: 'Cómo trabajo',
      icon: 'git',
      summary: 'Equipo antes que héroe: todo pasa por revisión y las decisiones quedan escritas.',
      items: [
        'Git y GitHub',
        'Revisión por PR',
        'Conventional Commits',
        'Decisiones en ADR',
        'Tests con Playwright'
      ],
      span: 3
    }
  ],

  marquee: [
    'Node.js',
    'TypeScript',
    'Express',
    'Prisma',
    'PostgreSQL',
    'SQL Server',
    'Redis',
    'BullMQ',
    'Python',
    'FastAPI',
    'Celery',
    'Docker',
    'Railway',
    'Vercel',
    'Next.js',
    'React',
    'Tailwind CSS'
  ],

  caseStudy: {
    slug: 'video-ia',
    eyebrow: 'Caso de estudio · finCreator',
    title: 'Módulo de video con avatares de IA',
    lead: 'La API nunca espera a HeyGen: encola el pedido, un worker lo procesa y el resultado vuelve por webhook hasta el navegador en tiempo real.',
    context: [
      'finCreator es una plataforma de creación de contenido. El reto era generar videos con avatares de IA a través de la API de HeyGen, un proceso que tarda minutos y cobra por cada video.',
      'Una petición HTTP no puede quedarse esperando tanto tiempo, y un error o un reintento mal hecho podía cobrar dos veces el mismo video.'
    ],
    decisions: [
      {
        title: 'Cola en vez de esperar',
        text: 'La API valida, descuenta los tokens y encola el pedido en BullMQ sobre Redis. Responde enseguida y el trabajo pesado lo hace un worker.'
      },
      {
        title: 'Idempotencia en dos barreras',
        text: 'Una llave en Redis y una restricción única en la base de datos evitan que un doble clic o un reintento cree dos videos.'
      },
      {
        title: 'Proteger al proveedor',
        text: 'Un semáforo en Redis limita los videos en curso y un circuit breaker deja de llamar a HeyGen cuando falla seguido, y vuelve a probar después.'
      },
      {
        title: 'Webhook firmado',
        text: 'HeyGen avisa cuando el video está listo. Cada aviso se verifica con firma HMAC-SHA256 antes de cambiar el estado.'
      },
      {
        title: 'Tiempo real con SSE',
        text: 'Los cambios de estado se publican en Redis Pub/Sub y llegan al navegador por Server-Sent Events, sin que la página tenga que preguntar.'
      },
      {
        title: 'Almacenamiento propio',
        text: 'Un worker descarga el MP4 y lo guarda en Google Cloud Storage antes de que venza el enlace temporal del proveedor.'
      }
    ],
    result: [
      'Probado de punta a punta con HeyGen real: pedido, procesamiento, webhook, video guardado en almacenamiento propio y estado en vivo en el navegador.'
    ],
    stack: [
      'Node.js',
      'TypeScript',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Redis',
      'BullMQ',
      'SSE',
      'Google Cloud Storage'
    ],
    note: 'Por confidencialidad no se muestra código ni datos de finCreator.'
  },

  cv: {
    summary:
      'Desarrollador full stack que lleva productos web de punta a punta: interfaces con Next.js y React, y APIs en producción con Node.js, TypeScript y Prisma sobre PostgreSQL. Ha integrado proveedores de IA generativa con colas BullMQ, webhooks firmados y eventos en tiempo real. Cofundador de JELIX.',
    education: [
      {
        title: 'Ingeniería de Sistemas',
        place: 'Universidad Popular del Cesar',
        period: 'Sexto semestre · en curso'
      }
    ],
    languages: [
      { name: 'Español', level: 'Nativo' },
      { name: 'Inglés', level: 'B2 · intermedio alto' }
    ]
  },

  pages: {
    projects: {
      seo: {
        title: 'Proyectos · Libardo, Desarrollador Full Stack',
        description:
          'Proyectos full stack: video con IA, sitios para clientes, una API con tareas programadas y un asistente de voz.'
      },
      eyebrow: 'Proyectos',
      title: 'Todo lo que he construido',
      text: 'Del trabajo con clientes y empresas no muestro código ni datos privados: cuento qué hice y cómo lo resolví.'
    },
    cv: {
      seo: {
        title: 'CV · Libardo, Desarrollador Full Stack',
        description:
          'Hoja de vida de Libardo: desarrollador full stack con Next.js, React, Node.js, TypeScript, PostgreSQL e IA generativa.'
      },
      eyebrow: 'Hoja de vida',
      title: 'Currículum'
    },
    sent: {
      seo: { title: 'Mensaje enviado', description: 'Gracias por escribir.' },
      title: 'Mensaje enviado',
      text: 'Gracias por escribirme. Te respondo pronto al correo que dejaste.'
    }
  }
}
