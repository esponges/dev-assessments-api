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
