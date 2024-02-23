export const devAssessment = [
  {
    id: '1',
    content: `Question: What is one of the fundamental concepts in React?\n
    Choices: \n
    - Inheritance\n
    - Component-based Architecture\n
    - Stored Procedures\n
    - Web Server Compilation\n
    Correct Answer: Component-based Architecture\n`,
    metadata: {
      question_type: 'MULTIPLE_CHOICE',
      topic: 'React',
      difficulty: 'hard',
    },
  },
  {
    id: '2',
    content: `Question: What is 'JSX' in the context of React?\n
    Choices: \n
    - A new programming language\n
    - A styling library for React\n
    - A syntax extension for JavaScript\n
    - A package manager for React\n
    Correct Answer: A syntax extension for JavaScript\n`,
    metadata: {
      question_type: 'MULTIPLE_CHOICE',
      topic: 'React',
      difficulty: 'easy',
    },
  },
  {
    id: '3',
    content: `Question: How is the 'state' of a component in React defined?\n
    Correct Answer: The state of a component is defined as an object that holds some information that may change over the lifecycle of the component.\n`,
    metadata: {
      question_type: 'FREE_RESPONSE',
      topic: 'React',
      difficulty: 'easy',
    },
  },
  {
    id: '4',
    content: `Question: How do you typically ensure that your components only update when necessary?\n
    Correct Answer: By using shouldComponentUpdate() or PureComponent.\n`,
    metadata: {
      question_type: 'FREE_RESPONSE',
      topic: 'React',
      difficulty: 'medium',
    },
  },
  {
    id: '5',
    content: `Question: What is Goroutines in Golang?\n
    Choices: \n
    - A testing library for Golang\n
    - A Golang task handler function\n
    - Golang function that can run concurrently with others\n
    - A concurrency model in Golang\n
    Correct Answer: Golang function that can run concurrently with others\n`,
    metadata: {
      question_type: 'MULTIPLE_CHOICE',
      topic: 'Golang',
      difficulty: 'medium',
    },
  },
  {
    id: '6',
    content: `Question: Which keyword is used for exception handling in Golang?\n
    Choices: \n
    - try...catch\n
    - defer\n
    - finally\n
    - throws\n
    Correct Answer: defer\n`,
    metadata: {
      question_type: 'MULTIPLE_CHOICE',
      topic: 'Golang',
      difficulty: 'easy',
    },
  },
  {
    id: '7',
    content: `Question: How do you define a struct in Golang?\n
    Correct Answer: A struct is defined using the type keyword, followed by a name and the struct keyword. The fields of the struct are declared within curly braces. Each field has a name and a type.\n`,
    metadata: {
      question_type: 'FREE_RESPONSE',
      topic: 'Golang',
      difficulty: 'easy',
    },
  },
  {
    id: '8',
    content: `Question: How can you implement inheritance in Golang?\n
    Correct Answer: Inheritance in Golang can be implemented using embedded fields in structs.\n`,
    metadata: {
      question_type: 'FREE_RESPONSE',
      topic: 'Golang',
      difficulty: 'medium',
    },
  },
  {
    id: '9',
    content: `What is the usage of 'shouldComponentUpdate' method in React?\n
    Correct Answer: It's used to let React know if a component's output is not affected by the current change in state or props. It's a performance optimization.\n`,
    metadata: {
      question_type: 'FREE_RESPONSE',
      topic: 'react',
      difficulty: 'easy',
    },
  },
  {
    id: '10',
    content: `In Redux, how do you define an initial state?\n
    Correct Answer: The initial state is defined in the reducer function as the default parameter value.\n`,
    metadata: {
      question_type: 'FREE_RESPONSE',
      topic: 'redux',
      difficulty: 'easy',
    },
  },
  {
    id: '11',
    content: `What is 'thunk' in context of Redux?\n
    Correct Answer: Thunk is a middleware that lets you call action creators that return a function instead of an action object.\n`,
    metadata: {
      question_type: 'FREE_RESPONSE',
      topic: 'redux',
      difficulty: 'easy',
    },
  },
  {
    id: '12',
    content: `What is the use of 'Go routines' in Go programming?\n
    Correct Answer: Go routines are functions or methods that run concurrently with other functions or methods. They're used for concurrent programming.\n`,
    metadata: {
      question_type: 'FREE_RESPONSE',
      topic: 'golang',
      difficulty: 'easy',
    },
  },
  {
    id: '13',
    content: `How do you create a new component in React?\n
    Correct Answer: A new component can be created in React using either a function or a class, and it must return a React element.\n`,
    metadata: {
      question_type: 'FREE_RESPONSE',
      topic: 'react',
      difficulty: 'easy',
    },
  },
  {
    id: '14',
    content: `How do you handle side effects in Redux application?\n
    Correct Answer: Side effects in Redux application are handled using middleware, like thunk or saga.\n`,
    metadata: {
      question_type: 'FREE_RESPONSE',
      topic: 'redux',
      difficulty: 'easy',
    },
  },
  {
    id: '15',
    content: `What is zero value in Go programming and how is it different from null or undefined in JavaScript?\n
    Correct Answer: Zero value is a value that a variable holds when it is declared and not initialized. In Go, unlike null or undefined in JavaScript, zero values depend on the type of the variable.\n`,
    metadata: {
      question_type: 'FREE_RESPONSE',
      topic: 'golang',
      difficulty: 'easy',
    },
  },
  {
    id: '16',
    content: `In Python, what does the '__init__' method do in a class?\n
    Choices: \n
    - Initializes the class for the first use\n
    - Acts as a constructor for the class\n
    - De-allocates memory used by the class\n
    - All of the above\n
    Correct Answer: Acts as a constructor for the class\n`,
    metadata: {
      question_type: 'MULTIPLE_CHOICE',
      topic: 'python',
      difficulty: 'easy',
    },
  },
  {
    id: '17',
    content: `What does the 'yield' keyword do in Python?\n
    Choices: \n
    - Pauses a function, saving all its states\n
    - Terminates a function\n
    - Creates a new thread for function execution\n
    - None of the above\n
    Correct Answer: Pauses a function, saving all its states\n`,
    metadata: {
      question_type: 'MULTIPLE_CHOICE',
      topic: 'python',
      difficulty: 'easy',
    },
  },
  {
    id: '18',
    content: `Which of the following Python libraries can be used for web development?\n
    Choices: \n
    - NumPy\n
    - Pandas\n
    - FastAPI\n
    - TensorFlow\n
    Correct Answer: FastAPI\n`,
    metadata: {
      question_type: 'MULTIPLE_CHOICE',
      topic: 'python',
      difficulty: 'easy',
    },
  },
  {
    id: '19',
    content: `In FastAPI, what decorator is used to create an API endpoint?\n
    Choices: \n
    - @app.api\n
    - @app.route\n
    - @app.get or @app.post\n
    - @app.controller\n
    Correct Answer: @app.get or @app.post\n`,
    metadata: {
      question_type: 'MULTIPLE_CHOICE',
      topic: 'fastapi',
      difficulty: 'easy',
    },
  },
  {
    id: '20',
    content: `What makes FastAPI a fast framework for building APIs?\n
    Correct Answer: FastAPI is fast because it is based on Starlette for web routing and Pydantic for data validation. It's also based on async and await for concurrent code execution.\n`,
    metadata: {
      question_type: 'FREE_RESPONSE',
      topic: 'fastapi',
      difficulty: 'easy',
    },
  },
  {
    id: '21',
    content: `What are the four basic functions of persistent storage?\n
    Choices: \n
    - SELECT, ADD, UPDATE, DELETE\n
    - INSERT, SELECT, UPDATE, DELETE\n
    - INSERT, SELECT, MODIFY, REMOVE\n
    - ADD, SELECT, CHANGE, REMOVE\n
    Correct Answer: INSERT, SELECT, UPDATE, DELETE\n`,
    metadata: {
      question_type: 'MULTIPLE_CHOICE',
      topic: 'sql',
      difficulty: 'easy',
    },
  },
  {
    id: '22',
    content: `What does the SQL command 'JOIN' do?\n
    Choices: \n
    - Merges columns from two tables\n
    - Connects to the database\n
    - Steps through the execution of a query\n
    - Deletes records from a table\n
    Correct Answer: Merges columns from two tables\n`,
    metadata: {
      question_type: 'MULTIPLE_CHOICE',
      topic: 'sql',
      difficulty: 'easy',
    },
  },
  {
    id: '23',
    content: `What term is used to describe the removal of all data from a table?\n
    Choices: \n
    - Drop\n
    - Erase\n
    - Delete\n
    - Truncate\n
    Correct Answer: Truncate\n`,
    metadata: {
      question_type: 'MULTIPLE_CHOICE',
      topic: 'sql',
      difficulty: 'easy',
    },
  },
  {
    id: '24',
    content: `Which SQL command is used to extract data from a database?\n
    Choices: \n
    - GET\n
    - SELECT\n
    - EXTRACT\n
    - PULL\n
    Correct Answer: SELECT\n`,
    metadata: {
      question_type: 'MULTIPLE_CHOICE',
      topic: 'sql',
      difficulty: 'easy',
    },
  },
  {
    id: '25',
    content: `What is the default port number for a SQL server?\n
    Choices: \n
    - 8080\n
    - 3306\n
    - 1433\n
    - 80\n
    Correct Answer: 1433\n`,
    metadata: {
      question_type: 'MULTIPLE_CHOICE',
      topic: 'sql',
      difficulty: 'easy',
    },
  },
];

export const fakeDevsResumes = [
  `Desarrollador Full Stack - María Teresa Cervantes Robles Barcelona, España Github: github.com/mtcrobles LinkedIn: linkedin.com/in/maria-teresa-cervantes Email: mtcervantes.dev@gmail.com Tel: +34 612 345 678
  PERFIL ● Apasionada de la programación y el desarrollo web con más de 5 años de experiencia. ● Experta en full stack development, con sólidos conocimientos en front-end y back-end. ● Siempre buscando la excelencia en la calidad del código y optimización de procesos.
  TECHSTACK Principal Vue.js, Vuex, Nuxt.js, JavaScript ES6, HTML5, CSS3, SASS. Secondary Node.js, Express, MongoDB, MySQL, Docker, Nginx, AWS.
  EXPERIENCIA Desarrolladora Full Stack Barcelona, España Digital Dream - Agencia de Marketing Desde Enero 2020 ● Creación de aplicaciones web escalables y performantes para clientes de alto perfil en Vue.js y Nuxt.js. ● Implementación de soluciones backend con Node.js y servicios AWS.
  Desarrolladora Frontend Madrid, España Fintech Soluciones Junio 2017 - Diciembre 2019 ● Diseñó interfaces atractivas y responsivas utilizando Vue.js. ● Colaboración en un equipo ágil para entregar características de alta calidad.
  FORMACIÓN Universidad Politécnica de Cataluña Máster en Ingeniería Informática 2015 - 2017
  Universidad Pompeu Fabra Grado en Ingeniería del Software 2010 - 2014
  IDIOMAS Español - Nativo Inglés - Fluido Catalán - Avanzado
  LOGROS ● Líder de un equipo de desarrollo que lanzó una aplicación financiera que alcanzó a más de 100k usuarios en su primer año. ● Certificación AWS Certified Developer.`,
  `Desarrollador Backend - David López Gutiérrez Ciudad de México, México GitHub: github.com/dlcoder LinkedIn: linkedin.com/in/davidlópezgutierrez Email: davidbackenddev@example.com Tel: +52 55 7890 1234
  PERFIL ● Más de 8 años de experiencia especializándome en el desarrollo backend y sistemas distribuidos. ● Fuerte habilidad para colaborar en equipos multidisciplinarios y en el diseño de arquitecturas complejas. ● Comprometido con la implementación de buenas prácticas y el desarrollo ágil.
  TECHSTACK Principal Python, Django, Flask, Ruby on Rails, RESTful APIs, GraphQL. Secondary Java, Spring Boot, Kafka, Redis, Elasticsearch, Celery, RabbitMQ, Docker, Kubernetes.
  EXPERIENCIA Ingeniero Backend Senior Ciudad de México, México Innovatech Soluciones Septiembre 2019 - Actualidad ● Diseño y desarrollo de microservicios robustos y de alta disponibilidad para sistemas de ecommerce. ● Mejoró el rendimiento del sistema en un 40% optimizando consultas y estructuras de datos.
  Desarrollador de Software Monterrey, México TechAdvancers Marzo 2014 - Agosto 2019 ● Desarrolló APIs REST eficientes y seguras para aplicaciones móviles y web. ● Liderazgo de proyectos tecnológicos y mentoría a desarrolladores junior.
  FORMACIÓN Instituto Tecnológico Autónomo de México (ITAM) Maestría en Ciencias de la Computación 2012 - 2014
  Universidad Nacional Autónoma de México (UNAM) Licenciatura en Informática 2007 - 2011
  IDIOMAS Español - Nativo Inglés - Avanzado
  LOGROS ● Contribución al desarrollo de un sistema de pago en línea utilizado por más de 500 mil usuarios. ● Ponente en conferencias nacionales sobre arquitecturas de microservicios.`,
  `Desarrolladora de Juegos - Ana Sofía Ramírez López Buenos Aires, Argentina GitHub: github.com/sofidevgame LinkedIn: linkedin.com/in/anasofía-ramirezgame Email: asramirezgamedev@example.com Tel: +54 9 11 2345 6789
  PERFIL ● Creativa y técnica en el diseño y desarrollo de videojuegos con 6 años de experiencia. ● Especialista en Unity 3D, con habilidades en programación, arte y diseño de niveles. ● Comprometida con crear experiencias de juego envolventes y emocionantes para los jugadores.
  TECHSTACK Principal Unity3D, C#, Shader programming, Blender, Photoshop. Secondary Unreal Engine, ZBrush, Substance Painter, Machine Learning, VR/AR development.
  EXPERIENCIA Desarrolladora de Juegos Buenos Aires, Argentina Indie Game Studio Desde Julio 2018 ● Desarrollo de juegos indie aclamados por la crítica, desde la conceptualización hasta el lanzamiento. ● Impulsó la implementación de técnicas de IA para mejorar la inteligencia de los personajes del juego.
  Artista y Programadora de Juegos Córdoba, Argentina Creative Minds Games Enero 2015 - Junio 2018 ● Creación de assets 3D y animaciones para juegos móviles y de PC. ● Programación de mecánicas y flujos de juego innovadores.
  FORMACIÓN Universidad de Palermo Especialización en Diseño de Videojuegos 2012 - 2014
  Universidad de Buenos Aires Licenciatura en Ciencias de la Computación 2008 - 2012
  IDIOMAS Español - Nativo Inglés - Fluido
  LOGROS ● Juego principal galardonado en el Festival Internacional de Videojuegos Independientes. ● Haber construido una comunidad de juego activa y comprometida con más de 50k seguidores.
  Estos perfiles ficticios se pueden usar como referencia para tus pruebas de parseo de CV y para detectar las tecnologías y experiencias de los candidatos ficticios.`,
  `Desarrollador de Software - Enrique Soto Martínez Sevilla, España Github: github.com/enriquesm Blog: devthoughts.com/@enriquesm LinkedIn: linkedin.com/in/enrique-soto-martinez Email: enrique.soto.dev@example.com Tel: +34 655 321 987
  PERFIL ● Más de 7 años de experiencia en desarrollo de software y arquitectura de soluciones. ● Experto en desarrollo de sistemas backend y gestión de bases de datos escalables. ● Entusiasta de la automatización, CI/CD y la integración de sistemas.
  TECHSTACK Principal Go (Golang), Python, Java, Spring Framework, Microservices. Secundario Kubernetes, Terraform, AWS, Azure, PostgreSQL, Cassandra, Redis, GitLab CI/CD.
  EXPERIENCIA Ingeniero de Software Senior Sevilla, España Soluciones Integrales IT Desde Marzo 2018 ● Diseñar y desarrollar sistemas backend escalables utilizando Go, y microservicios. ● Implementar infraestructura como código y estrategias de CI/CD para mejorar la entrega de software.
  Desarrollador de Aplicaciones Granada, España Tech Innovate Agosto 2015 - Febrero 2018 ● Desarrollo de aplicaciones web basadas en Java y Spring, integrando sistemas de pago.
  FORMACIÓN Universidad de Sevilla Máster en Ingeniería de Software 2013 - 2015
  Universidad de Granada Grado en Informática 2008 - 2013
  IDIOMAS Español - Nativo Inglés - Avanzado
  LOGROS ● Automatización de procesos que redujeron en un 30% el tiempo de despliegue de nuevas versiones. ● Mentor de programadores junior y organizador de talleres internos sobre prácticas de desarrollo.`,
  `Desarrolladora Frontend - Paula Vázquez Jiménez Santiago, Chile GitHub: github.com/paulavjimenez Portfolio: paulavjimenez.dev Linkedin: linkedin.com/in/paulavjimenez Email: paulav.jimenez@example.com Tel: +56 9 8765 4321
  PERFIL ● Desarrolladora frontend con pasión por el diseño UI/UX y 4 años de experiencia. ● Experta en React, diseño adaptativo y rendimiento web. ● Colaboradora activa en proyectos de código abierto y comunidades de desarrollo.
  TECHSTACK Principal React, Redux, TypeScript, Webpack, Tailwind CSS, Jest. Secundario Angular, Vue.js, Svelte, Storybook, GraphQL, Firebase.
  EXPERIENCIA Ingeniera Frontend Santiago, Chile Digital Products Lab Desde Junio 2019 ● Liderar el desarrollo frontend de aplicaciones web utilizando React y TypeScript. ● Colaborar en la creación de librerías de componentes y garantizar la accesibilidad web.
  Diseñadora UI/UX y Desarrolladora Valparaíso, Chile Startup Journey Enero 2017 - Mayo 2019 ● Diseño de experiencias de usuario y desarrollo de interfaces para aplicaciones móviles.
  FORMACIÓN Universidad de Chile Professional en Diseño Gráfico 2012 - 2016
  IDIOMAS Español - Nativo Inglés - Fluido
  LOGROS ● Reconocida por diseñar una de las mejores interfaces del año en una competición nacional de diseño. ● Voluntaria en eventos de tecnología y mentora de programación para jóvenes estudiantes.`,
  `Ingeniero DevOps - Jorge Alberto Navarro Ciudad de Panamá, Panamá GitHub: github.com/jorgenavdevops Blog: cloudopsinsight.com/@jorgenavdevops LinkedIn: linkedin.com/in/jorge-alberto-navarro Email: jorge.navarro.devops@example.com Tel: +507 6789 1234
  PERFIL ● Ingeniero DevOps con más de 6 años de experiencia en automatización e infraestructuras en la nube. ● Especialista en la implementación de prácticas de DevOps y en la cultura de integración continua. ● Apasionado por la seguridad en la nube y la optimización de recursos.
  TECHSTACK Principal Docker, Ansible, Jenkins, Kubernetes, Prometheus, Grafana.​​Secundario Python, Bash, AWS, Google Cloud Platform, ELK Stack, Serverless.  
  EXPERIENCIA Líder DevOps Ciudad de Panamá, Panamá CloudTech Solutions Desde Abril 2018 ● Implementar y mantener pipelines de CI/CD y la infraestructura como servicio. ● Garantizar la seguridad y optimizar costes dentro de entornos basados en AWS y Google Cloud.
  Ingeniero de Sistemas San José, Costa Rica Enterprise IT Corp Mayo 2015 - Marzo 2018 ● Mantenimiento y escalado de infraestructuras tradicionales y transición a enfoques DevOps.
  FORMACIÓN Universidad Tecnológica de Panamá Máster en Gestión de Tecnologías de la Información 2013 - 2015
  Universidad de Costa Rica Licenciatura en Ingeniería en Sistemas 2008 - 2012
  IDIOMAS Español - Nativo Inglés - Avanzado
  LOGROS ● Diseñó y orquestó la migración completa de una infraestructura on-premise a la nube, logró reducir un 40% de costos anuales. ● Orador en conferencias sobre DevOps y automatización.
  Puedes utilizar estos casos creados como ejemplos para tus pruebas de parseo y evaluación de CVs de candidatos para posiciones en el ámbito del desarrollo y las operaciones de TI.`,
];

// feed to the database without requiring prisma
export const postDevProfiles = async () => {
  const req = async (resume: string) => {
    // this endpoint accepts either a file or a string an a description in the body
    const res = await fetch(
      'http://localhost:9000/api/candidate/parse_resume',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume,
          upsert: true,
        }),
      },
    );

    return res.json();
  };

  const PromiseAll = fakeDevsResumes.map(async (resume) => {
    return await req(resume);
  });

  return await Promise.all(PromiseAll);
};

postDevProfiles()
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.error(e);
  });
