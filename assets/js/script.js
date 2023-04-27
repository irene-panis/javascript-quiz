// any one index of a property corresponds to same index in other properties
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
var leaderboard = document.querySelector('#highscores-link');

var questionNumber;
var timerInterval;

// function startGame
function startGame() {
  startTimer();

  questionNumber = 0;
  displayQuestion(questionNumber);
}

// function startTimer
function startTimer() {

  timerInterval = setInterval(function() {
    timeDisplay.textContent = count;
    count--;

    if (count <= 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  endGame();
}

// function displayQuestion
    // changes html and displays content.question and content.options
    // addEventListener to buttons
    // if isCorrectAnswer turn current button green then return
    // if !isCorrectAnswer turn current button red then return
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

  var buttons = main.querySelectorAll(".choices > button");
  buttons.forEach((button) => { // add event listener to all options
    var chosen = button.textContent; // variables containing user answer and corrrect answer for later comparison
    var correct = content.answers[index];
    button.addEventListener('click', () => {
      var result = checkCorrectAnswer(chosen, correct);
      if (result === 1) {
        button.classList.add('correct'); // makes button green
      } else {
        button.classList.add('incorrect'); // makes button red
      }
      return;
    })});
};

// function checkCorrectAnswer 
    // if userAnswer === correctAnswer move on
    // if userAnswer !== correctAnswer -15 on clock then move on
    function checkCorrectAnswer(userAnswer, correctAnswer) {
      if (userAnswer === correctAnswer) {
        setTimeout(moveOn, 1000); // setTimeout to allow for color change animation to play
        return 1; // return 1 if correct
      } else {
        count -= 15;
        timeDisplay.textContent = count; // updates display immediately because interval func waits until next second to update count
        if (count < 0) { // if answer is incorrect and subtracting 15 brings score below 0, set score to 0 and end game
          count = 0;
          timeDisplay.textContent = count;
          setTimeout(endGame, 1000);
          return 0; // return 0 if incorrect
        }
        setTimeout(moveOn, 1000);
        return 0; // return 0 if incorrect
      }
    }

function moveOn() {
  questionNumber++;
  if (questionNumber > 4) { // if we run out of questions stop game
    stopTimer();
    return;
  }
  displayQuestion(questionNumber);
}

function savePlayer(name, score) {
  var player = {
    name: name,
    score: score
  }

  players.push(player); // add player obj to our running list of players
  players.sort(function(a, b) { // sort players in array from highest to lowest scores
    return b.score - a.score;
  });
  localStorage.setItem("players", JSON.stringify(players)); // store updated array in local
}

function displayScores() {
  main.innerHTML = '';

  var message = document.createElement("h3");
  message.textContent = "High Scores";

  var list = document.createElement("ol");
  list.classList.add('leaderboard');

  var highscores = JSON.parse(localStorage.getItem("players"));
  if (highscores !== null) { // if highscores array isn't empty list players on page
    for (let i = 0; i < highscores.length; i++) {
      var entry = document.createElement("li");
      entry.textContent = `${highscores[i].name} - ${highscores[i].score}`;
      list.appendChild(entry);
    }
  }

  var mainMenu = document.createElement("button");
  mainMenu.textContent = "Main menu";
  mainMenu.classList.add('endscreen-btn')
  mainMenu.addEventListener('click', function() {
    count = 60; 
    location.href = "";
  });

  var back = document.createElement("button");
  back.textContent = "Play again";
  back.classList.add('endscreen-btn')
  back.addEventListener('click', function() {
    count = 60; // reset count to 60 to allow user to play again
    startGame();
  });

  main.appendChild(message);
  main.appendChild(list);
  main.appendChild(mainMenu);
  main.appendChild(back);
}

function endGame() {
  main.innerHTML = '';

  var message = document.createElement("h3");
  message.textContent = "Thanks for playing!";

  var score = document.createElement("p");
  count = timeDisplay.textContent;
  score.textContent = `Your final score is ${count}.`;
  
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
  main.appendChild(score);
  main.appendChild(form);

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    savePlayer(textbox.value, count);
    displayScores();
  });
}

function init() {
  players = JSON.parse(localStorage.getItem("players")); // tries to get players from local storage
  if (players === null) { // if theres nothing in local storage just set players to empty array
    players = [];
  }
}

leaderboard.addEventListener('click', function() {
  clearInterval(timerInterval);
  timeDisplay.textContent = '';
  displayScores();
});

start.addEventListener('click', startGame);

init();