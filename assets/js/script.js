// object content
  // question: (array of questions)
  // options: (array of arrays of options)
  // answers: (array of correct answers)
var content = {
  questions: [
    'What is the purpose of the "this" keyword in JavaScript?',
    'What is the correct way to declare a variable in JavaScript?',
    'Which JavaScript method is used to add new elements to an array?',
    'What is the result of the following code: 1 + "2" + 3?',
    'What is the difference between "==" and "===" in JavaScript?'
  ],
  options: [
    ['To refer to the current object', 'To define a new variable', 'To create a loop', 'To compare two values'],
    ['x = 3', 'v x = 3', 'variable x = 3', 'var x = 3'],
    ['slice()', 'push()', 'pop()', 'shift()'],
    ['"123"', '6', '123', 'Syntax error'],
    ['"==" compares both the values and the data types of two variables, while "===" compares only the values.', '"===" compares both the values and the data types of two variables, while "==" compares only the values.', 'There is no difference, "==" and "===" are interchangeable.', '"===" is not a valid operator in JavaScript.']
  ],
  answers: [
    'To refer to the current object',
    'var x = 3',
    'push()',
    '"123"',
    '"===" compares both the values and the data types of two variables, while "==" compares only the values.'
  ]
};

// array of player highscores
    // players should be objects w/ name and score properties
var players = [];
var count = 60;

var timeDisplay = document.getElementById("count");
var main = document.querySelector("main");
var start = document.querySelector("#start-btn");

var questionNumber;

// function startGame
function startGame() {
  startTimer();

  questionNumber = 0;
  displayQuestion(questionNumber);
}

// function startTimer
function startTimer() {

  var timerInterval = setInterval(function() {
    timeDisplay.textContent = count;
    count--;

    if (count < 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

// function displayQuestion
    // changes html and displays content.question and content.options
    // addEventListener to buttons
    // if isCorrectAnswer append "Correct!" then return
    // if !isCorrectAnswer -15 timer append "Wrong!" then return
function displayQuestion(index) {
  console.log(index);
  main.innerHTML = '';

  var question = document.createElement("h2");
  question.textContent = content.questions[index];

  var listOfChoices = document.createElement("div");
  listOfChoices.classList.add("choices");
  var choice1 = document.createElement("button");
  var choice2 = document.createElement("button");
  var choice3 = document.createElement("button");
  var choice4 = document.createElement("button");

  choice1.textContent = content.options[index][0];
  choice2.textContent = content.options[index][1];
  choice3.textContent = content.options[index][2];
  choice4.textContent = content.options[index][3];

  main.appendChild(question);
  main.appendChild(listOfChoices);
  listOfChoices.appendChild(choice1);
  listOfChoices.appendChild(choice2);
  listOfChoices.appendChild(choice3);
  listOfChoices.appendChild(choice4);

  var buttons = main.querySelectorAll(".choices > button");
  buttons.forEach((button) => {
    var chosen = button.textContent;
    var correct = content.answers[index];
    button.addEventListener('click', () => {
      checkCorrectAnswer(chosen, correct);
      return;
    })});
};

// function checkCorrectAnswer 
    // if clicked === right answer return true
    // default return false
function checkCorrectAnswer(userAnswer, correctAnswer) {
  if (main.children[2] !== undefined) {
    main.removeChild(main.children[2]);
  }
  var message = document.createElement("p");
  if (userAnswer === correctAnswer) {
    message.textContent = "Correct!";
    message.classList.add("result");
    moveOn();
  } else {
    message.textContent = "Incorrect!";
    message.classList.add("result");
    moveOn();
  }
  main.appendChild(message);
}

function moveOn() {
  questionNumber++;
  if (questionNumber > 4) {
    console.log("done");
    return;
  }
  displayQuestion(questionNumber);
}

function endGame() {
  main.innerHTML = "";

  var message = document.createElement("h3");
  message.textContent = "Thanks for taking the quiz!";
  
  var form = document.createElement("form");
  var name = document.createElement("span");
  name.textContent = "Name: ";
  var textbox = document.createElement("INPUT");
  textbox.setAttribute("type", "text");
  var submit = document.createElement("INPUT");
  submit.setAttribute("type", "submit");

  form.appendChild(name);
  form.appendChild(textbox);
  form.appendChild(submit);
  main.appendChild(message);
  main.appendChild(form);
}

// function savePlayer
    // create object then save object to array
    // use local storage to update array

// function displayScores

endGame();