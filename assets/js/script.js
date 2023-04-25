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

var timeDisplay = document.getElementById("count");
var main = document.querySelector("main");

// function startGame
    
// function startTimer
function startTimer() {
  var count = 60;

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
}

main.addEventListener('click', function(event) {
  var parentElement = event.target.parentElement;
  if (parentElement.classList.contains("choices")) {
    checkCorrectAnswer();
  }
});

// function checkCorrectAnswer 
    // if clicked === right answer return true
    // default return false


// function endGame
    // displays end screen

// function savePlayer
    // create object then save object to array
    // use local storage to update array

// function displayScores
