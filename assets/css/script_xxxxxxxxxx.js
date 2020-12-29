var playTime = document.querySelector('#id-play-time');
var quizWrapper = document.querySelector('#id-quiz-start-page-wrapper');
var quizStartPage = document.querySelector('#id-quiz-start-page-container');
var startBtn = document.querySelector('#id-btn-start-quiz');
var START = "start";
var USERANSWERS = "userAnswers";
var SUBMIT = "submit";
var HIGHSCORES = "viewHighScores";
var GOBACK = "goBack";
var CLRHIGHSCORES = "clrHighScores";

var QUESTIONS = 4;
var ANSWERS = 0;
var questionCount = 0;
var quizzes;
var answers;
var userAnswerStatus = false;
var questionsBank = [
  ["paranthesis", "quotes", "curly brackets", "square brackets", "The condition in an if / else statement is enclosed with _____."],
  ["numbers", "strings", "booleans", "alerts", "Commonly used data types DO Not Include:"],
  ["paranthesis", "quotes", "curly brackets", "square brackets", "The condition in an if / else statement is enclosed with _____."],
  ["numbers", "strings", "booleans", "alerts", "Commonly used data types DO Not Include:"],
  ["paranthesis", "quotes", "curly brackets", "square brackets", "The condition in an if / else statement is enclosed with _____."],
  ["numbers", "strings", "booleans", "alerts", "Commonly used data types DO Not Include:"],
  ["paranthesis", "quotes", "curly brackets", "square brackets", "The condition in an if / else statement is enclosed with _____."],
  ["numbers", "strings", "booleans", "alerts", "Commonly used data types DO Not Include:"],
  ["paranthesis", "quotes", "curly brackets", "square brackets", "The condition in an if / else statement is enclosed with _____."],
  ["numbers", "strings", "booleans", "alerts", "Commonly used data types DO Not Include:"]
];

function btnHandler(btnStatus) {
  console.log("in button handler");
  switch(btnStatus) {
    case START:
      startQuiz;
      console.log("in start status");
      break;
    case USERANSWERS:
      break;
    case SUBMIT:
      break;
    case HIGHSCORES:
      break;
    case GOBACK:
      break;
    case CLRHIGHSCORES:
      break;
    default :
      break;
                                            
  }
  var START = "start";
  var USERANSWERS = "userAnswers";
  var SUBMIT = "submit";
  var HIGHSCORES = "viewHighScores";
  var GOBACK = "goBack";
  var CLRHIGHSCORES = "clrHighScores";
  
}

function getRandomQuestion() {
  var result = questionCount;//Math.floor(Math.random()*questionsBank.length);

  return result;
};



function getSubmitScorePage() {
  console.log("submitpage");
};


function getQuestionPage(){
  // get a random question
  var questionNumber = getRandomQuestion();


  // print question
  var questionContainer = document.createElement("div");
  questionContainer.className = "questions-container";
  var randomQuestion = document.createElement("div");
  randomQuestion.className = "questions";
  randomQuestion.innerHTML =
    "<h1 class='questions-items'>" + questionsBank[questionNumber][QUESTIONS] +"</h1>";

    
  questionContainer.append(randomQuestion);
  quizWrapper.append(questionContainer);

  // print 4 random buttons
  var tmpBank = questionsBank.slice();
  console.log(tmpBank);
  for(var i = 1; i <= 4; i++) {
    var randomAnswers = Math.floor(Math.random()*((tmpBank[questionNumber].length-1)));
    var btnItem = document.createElement("button");
    btnItem.className = "btn-ans";
    if(tmpBank[questionNumber][randomAnswers] === questionsBank[questionNumber][ANSWERS]){
      btnItem.setAttribute("data-btn-ans","correct");
    }
    else {
      btnItem.setAttribute("data-btn-ans", "wrong");
    }
    btnItem.innerHTML = 
    i + ". " + questionsBank[questionNumber][randomAnswers];
    questionContainer.appendChild(btnItem);
    tmpBank.splice((questionNumber,randomAnswers),1);

  }
  return questionContainer;
};

function startQuiz(){

  quizStartPage.remove();
  var x = 5;
  var y = 5;

  if (x === y){
  quizzes = getQuestionPage();
  }

  

};
function printRightOrWrong(userAnswerStatus){
  var userAnswerStatusContainer = document.createElement("div");
  userAnswerStatusContainer.className = "user-answer-status-container";
  var userAnswerStatusContent = document.createElement("h3");
  userAnswerStatusContent.className = "user-answer-status-content";
  
  if(userAnswerStatus) {
    userAnswerStatusContent.innerHTML = "Correct!";
  }
  else {
    userAnswerStatusContent.innerHTML = "Wrong!";
  }
  userAnswerStatusContainer.append(userAnswerStatusContent);
  quizWrapper.append(userAnswerStatusContainer);

  return userAnswerStatusContainer;
};

function checkAnswer(event){
  if (questionCount >= questionsBank.length) {
    getSubmitScorePage();
  }
  else {
    quizzes.remove();
    quizzes = getQuestionPage();
  }


  var targetEl = event.target;

  if (targetEl.matches(".btn-ans")) {
    var userAnswer = targetEl.getAttribute("data-btn-ans");

    if (userAnswer === "correct") {
      userAnswerStatus = true;
      //answers.remove();
      answers = printRightOrWrong(userAnswerStatus);
    }
    else {
      userAnswerStatus = false;
      //answers.remove();
      answers = printRightOrWrong(userAnswerStatus);
    }
    
  } 


}

startBtn.addEventListener('click', startQuiz);

// var btnArray = [];
// var questionArray = [];
// var questionNumber = 0;
// var limit = questionsBank.length;
// for (var i = 0; i < questionsBank.length; i++) {
//   var question = document.createElement("div");
//   question.className = "quiz-page";
//   question.setAttribute("id", "quiz-page-id");

//   var questionHeading = document.createElement("h1");
//   questionHeading.setAttribute("id", "questionsHead");
//   questionHeading.className = "questions-items";
//   questionHeading.innerText = questionsBank[i][CONST_QUESTIONS];

//   question.append(questionHeading);
  
//   for (var j = 1; j <= 4; j++) {
//     var btnAnswers = document.createElement("button");
//     btnAnswers.className = "btns";
//     btnAnswers.setAttribute("id", j);
//     btnAnswers.innerText = 
//       j + ". " + questionsBank[i][j];
//     question.append(btnAnswers);
//   };

//   questionArray.push(question);
// };

// function nextQuestion(questionNumber) {
//   if(questionNumber < limit){
//     console.log(questionNumber);
//     var tmpQues = document.getElementById("questionsHead");
//     tmpQues.innerText = questionsBank[questionNumber][CONST_QUESTIONS];
//     document.getElementsByClassName("questionsHead").innerText = tmpQues.innerText;
//     for (var i = 1; i <= 4; i++) {
//       var tmpBtn = document.getElementById(i);
//       tmpBtn.innerText =
//         i + ". " + questionsBank[questionNumber][i];
//       document.getElementById(i).innerText = tmpBtn.innerText;
//     }
//     checkAnswer;
//   }
// }
// function submitScore() {
//   document.getElementById("quiz-page-id").remove();

//   var submitDiv = document.createElement("div");
//   submitDiv.className = "quiz-start-container";

//   var submitHeading = document.createElement("h1");
//   submitHeading.innerText = "All done!";

//   var submitScoreText = document.createElement("p");
//   submitScoreText.innerText = "Your final score is 22"

//   var submitScoreBox = document.createElement("form");
//   submitScoreBox.className = "score-box";
//   submitScoreBox.innerHTML = 
//     "<p>Enter initials: </p>" + 
//     "<input type='text'></input>" + 
//     "<button id='idBtnSubmit' class='btnSubmit' type='submit'>Submit</button>";

//   document.getElementById("idBtnSubmit").addEventListener("submit", formSubmit);

//   submitDiv.append(submitHeading);
//   submitDiv.append(submitScoreText);
//   submitDiv.append(submitScoreBox);
//   quizContent.append(submitDiv);

// }

// function formSubmit() {
//   console.log(1);
// }

// function checkAnswer() {
//   if(questionNumber < limit){
//     var userAnswer = this.innerText.slice(3);
//     var questionAnswer = questionsBank[questionNumber][CONST_QUESTIONS_ANSWERS];

//     questionNumber++;
//     nextQuestion(questionNumber);

//     if (userAnswer === questionAnswer) {
//       console.log("you are right");
//     }
//     else {
//       console.log("you are wrong");
//     }
//   }
//   else {
//     submitScore();
//   }
// }; 


// /*********************************************************************************/
// function startQuiz(){
//   quizStartPage.remove();
//   quizContent.append(questionArray[questionNumber]);

//   var x = document.getElementsByClassName("btns");

//   for(var i =0; i < 4; i++){
//     x[i].addEventListener("click", checkAnswer);
//   }
// };


// // x.addEventListener("click", hello);
// btnStart.addEventListener("click", startQuiz);

// var btnStart = document.querySelector("#btn-start-quiz");
// var startPage = document.querySelector("#quiz-start-page");
// var quizTime = document.querySelector("#play-time");
// var quizContent = document.querySelector('#quiz-content');
// var answerBtn = document.querySelector("#btn-questions-answers");
// var QUIZ_START_TIME = 10;
// var CONST_QUESTIONS = 0;
// var CONST_QUESTIONS_ANSWERS = 1;
// var questionsBank = [
//   ["Commonly used data types DO Not Include:", "numbers", "strings", "booleans", "alerts"],
//   ["The condition in an if / else statement is enclosed with _____.", "paranthesis", "quotes", "curly brackets", "square brackets"]
// ];
// for(var i=1;i<5;i++){
//   var btnItem = document.createElement("button");
//   btnItem.className = "btn";
//   btnItem.setAttribute("id", JSON.stringify(i));  
// }


// var startTime = function() {
//   quizTime.innerHTML=1;

// };


// var createQuestions = function(questionsNumber) {
//   var questions = document.createElement("div");
//   questions.className = "questions";
//   questions.innerHTML = 
//     "<h1 class='questions-items'>" + questionsBank[questionsNumber][CONST_QUESTIONS] +"</h1>";
//   quizContent.appendChild(questions);
// };

// var createBtn = function(i, questionsNumber, randomQuestions) {

//   btnItem.innerHTML = 
//     i + ". " + questionsBank[questionsNumber][randomQuestions];

//   quizContent.appendChild(btnItem);

// };

// var getQuestions = function() {
//   var questionsNumber = Math.floor(Math.random()*questionsBank.length);
//   createQuestions(questionsNumber);


//   var questionsAnswer = questionsBank[questionsNumber][CONST_QUESTIONS_ANSWERS];

//   // print random answer buttons
//   for(var i = 1; i <= 4; i++) {
//     var randomQuestions = Math.floor(Math.random()*(questionsBank[questionsNumber].length-2)) + 1;
//     createBtn(i, questionsNumber, randomQuestions);
//     questionsBank[questionsNumber].splice(randomQuestions,1);
//   }
// };

// var checkAnswer = function() {
//   console.log(btnItem.1);
// };


// var startQuiz = function() {
//   startPage.remove();
//   getQuestions();
// };

// btnStart.addEventListener("click", startQuiz);
// btnItem.addEventListener("click", checkAnswer);