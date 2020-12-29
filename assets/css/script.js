var quizWrapper = document.querySelector("#id-quiz-wrapper");
var startBtn = document.querySelector("#id-btn-start-quiz");
var startPage = document.querySelector("#id-quiz-start-page-container");
var quizPage = document.querySelector("#id-quiz-content");
var quizPageQuestions = document.querySelector("#id-quiz-content-question");
var quizPageButtons = document.querySelector("#id-quiz-content-buttons-container");
var userAnswerResult = document.querySelector("#id-user-answer");
var submitPage = document.querySelector("#id-submit-page");
var submitPageContainer = document.querySelector("#id-submit-page-container");
var highScorePage = document.querySelector("#id-high-scores");
var userHighScore = document.querySelector("#id-play-score");
var highScoreButtons = document.querySelector("#id-high-scores-buttons");
var playTime = document.querySelector("#id-play-time");
const START = "start";
const USERANSWERS = "userAnswers";
const SUBMIT = "submit";
const HIGHSCORES = "viewHighScores";
const GOBACK = "goBack";
const CLRHIGHSCORES = "clrHighScores";
const CORRECT = "Correct!";
const WRONG = "Wrong!";
const BTNCLICKED = "BUTTON CLICKED!";
var questions = {
  question1: {question: '1The condition in an if / else statement is enclosed with _____.', ans1: 'paranthesis', ans2: 'square brackets', ans3: 'quotes', ans4: 'curly brackets', answer: 'paranthesis'},
  question2: {question: '2Commonly used data types DO Not Include:', ans1: 'numbers', ans2: 'strings', ans3: 'booleans', ans4: 'alerts', answer: 'numbers'},
  question3: {question: '3The condition in an if / else statement is enclosed with _____.', ans1: 'paranthesis', ans2: 'square brackets', ans3: 'quotes', ans4: 'curly brackets', answer: 'paranthesis'},
  question4: {question: '4Commonly used data types DO Not Include:', ans1: 'numbers', ans2: 'strings', ans3: 'booleans', ans4: 'alerts', answer: 'numbers'},
  question5: {question: '5The condition in an if / else statement is enclosed with _____.', ans1: 'paranthesis', ans2: 'square brackets', ans3: 'quotes', ans4: 'curly brackets', answer: 'paranthesis'},
  question6: {question: '6Commonly used data types DO Not Include:', ans1: 'numbers', ans2: 'strings', ans3: 'booleans', ans4: 'alerts', answer: 'numbers'},
  question7: {question: '7The condition in an if / else statement is enclosed with _____.', ans1: 'paranthesis', ans2: 'square brackets', ans3: 'quotes', ans4: 'curly brackets', answer: 'paranthesis'},
  question8: {question: '8Commonly used data types DO Not Include:', ans1: 'numbers', ans2: 'strings', ans3: 'booleans', ans4: 'alerts', answer: 'numbers'},
  question9: {question: '9The condition in an if / else statement is enclosed with _____.', ans1: 'paranthesis', ans2: 'square brackets', ans3: 'quotes', ans4: 'curly brackets', answer: 'paranthesis'},
  question10: {question: '10Commonly used data types DO Not Include:', ans1: 'numbers', ans2: 'strings', ans3: 'booleans', ans4: 'alerts', answer: 'numbers'}
}
var questionBank = [];
for(var key in questions) {
  questionBank.push(questions[key]);
}



var userScore = 0;
var questionNumber = 0;
var userAnswerResultStatus = false;
var startTime = 15; //in seconds
const QUESTIONS = 4;
const ANSWERS = 0;
const USERINPUT = 0;

var gameTimer = setInterval(function() {
  if(startTime <= 0) {
    clearInterval(gameTimer);
    playTime.innerText = 0;
    getSubmitPage();
  }
  playTime.innerText = startTime;
  startTime--;
  

}, 1000);

function removeAllChildNodes(parent) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

function clearPage(parent) {
  if(parent.hasChildNodes()) {
    parent.remove();
  }
};

function getStartPage() {
  removeAllChildNodes(quizWrapper);
  questionNumber = 0;
  userScore = 0;
  startTime = 100; // in seconds
  quizWrapper.append(startPage);
};
function getPages() {

  
  if (questionNumber < questionBank.length) {
    startPage.remove(); 
    getQuestionPage();
  }
  else {
    quizPage.remove();
    getSubmitPage();
  }
   
};


/** questions*********************************************************** */
function getQuestionPage(){
  // get a random question
  
  removeAllChildNodes(quizPageQuestions);
  var question = document.createElement("h1");
  question.className = "questions-items";
  question.innerHTML = questionBank[questionNumber].question;
  quizPageQuestions.append(question);

  
  var x, i = 1;
  removeAllChildNodes(quizPageButtons);
  for(x in questionBank[questionNumber]) {
    if(x === 'ans1' ||x === 'ans2' ||x === 'ans3' ||x === 'ans4') {
      var btnItem = document.createElement("button");
      btnItem.className = "btn-ans";
      btnItem.innerHTML = i + ". " +questionBank[questionNumber][x];
      btnItem.setAttribute("data-btn-ans", questionBank[questionNumber][x]);
      btnItem.setAttribute("data-btn", USERANSWERS);
      quizPageButtons.appendChild(btnItem);
      quizWrapper.append(quizPage);
      btnItem.addEventListener("click",btnHandler);
      i++;
    }
  }

  quizWrapper.insertBefore(quizPageButtons, quizWrapper.firstChild);
  quizWrapper.insertBefore(quizPageQuestions, quizWrapper.firstChild);
  
};

function checkAnswer(userAnswer) {
  var result = false;
  if(userAnswer === questionBank[questionNumber].answer){
    result = true;
    userScore++;
  }
  else {
    result = false;
    startTime -= 10; 
  }
  printResult(result);
}

/** questions*********************************************************** */
function printResult(userAnswerStatus){

  removeAllChildNodes(userAnswerResult);
  var userAnswerStatusContent = document.createElement("h3");
  userAnswerStatusContent.className = "user-answer-status-content";
  
  if(userAnswerStatus === true) {
    userAnswerStatusContent.innerHTML = CORRECT;
  }
  else {  
    userAnswerStatusContent.innerHTML = WRONG;

  }
  userAnswerResult.append(userAnswerStatusContent);
  questionNumber++;
};

function getSubmitPage() {
  
  removeAllChildNodes(submitPageContainer);
  removeAllChildNodes(submitPage);
  removeAllChildNodes(quizWrapper);
  
  var submitPageHeading = document.createElement("h2");
  submitPageHeading.innerHTML = "All done!";

  
  var submitPageInfo = document.createElement("p");
  submitPageInfo.innerHTML = "Your final score is <span id='id-user-score'>"+String(userScore)+"</span>";
  
  var submitPageBoxContainer = document.createElement("form");
  submitPageBoxContainer.className = "submit-page-box-container";
  submitPageBoxContainer.setAttribute("id", "id-submit-page-box-container");
  submitPageBoxContainer.innerHTML =
    "Enter initials: "+
    "<input type='text' id='userInitial'>" +
    "<input type='submit' id='id-btn-submit' class='btn' value='submit' data-btn='submit'>";
  
  

  submitPageContainer.append(submitPageHeading, submitPageInfo, submitPageBoxContainer);
  quizWrapper.append(submitPageContainer);


  document.querySelector("#id-btn-submit").addEventListener("click", btnHandler);  
};


function getHighScorePage() {
  var userScoreInfo = document.querySelector("input[id='userInitial']").value;
  console.dir(userScoreInfo);
  removeAllChildNodes(highScoreButtons);
  removeAllChildNodes(highScorePage);
  removeAllChildNodes(quizWrapper);
  
  

  var highScoresHeading = document.createElement("h2");
  highScoresHeading.innerHTML = "High scores";

  var highScoreLists = document.createElement("ol");
  highScoreLists.setAttribute("id", "id-high-score-lists")
  highScoreLists.innerText = userScoreInfo;

  var goBackBtn = document.createElement("button");
  goBackBtn.className = "btn";
  goBackBtn.innerText = "Go back";
  goBackBtn.setAttribute("data-btn",GOBACK);

  var clearHighScoresBtn = document.createElement("button");
  clearHighScoresBtn.className = "btn";
  clearHighScoresBtn.innerText = "Clear high scores";
  clearHighScoresBtn.setAttribute("data-btn",CLRHIGHSCORES);


  highScorePage.insertBefore(highScoresHeading, highScorePage.firstChild);
  highScorePage.append(highScoreLists);
  highScoreButtons.append(goBackBtn, clearHighScoresBtn);
  highScorePage.append(highScoreButtons);
  quizWrapper.append(highScorePage);

  goBackBtn.addEventListener("click",btnHandler);
  clearHighScoresBtn.addEventListener("click",btnHandler);
};
function clearHighScore() {
  var highscores = document.querySelector("#id-high-score-lists");
  removeAllChildNodes(highscores);
};
/** button handler*********************************************************** */
function btnHandler(event) {
    event.preventDefault();
  var userBtnStatus = event.target.getAttribute("data-btn");
  var userBtnAns = event.target.getAttribute("data-btn-ans");
  switch(userBtnStatus) {
    case START:
      getPages();
      break;
    case USERANSWERS:
      userAnswerResultStatus = checkAnswer(userBtnAns);
      getPages();
      break;
    case SUBMIT:
      getHighScorePage();
      break;
    case HIGHSCORES:
      break;
    case GOBACK:
      getStartPage();
      break;
    case CLRHIGHSCORES:
      clearHighScore();
      break;
    default :
      break;                            
  }
}
/** button handler*********************************************************** */

startBtn.addEventListener("click",btnHandler);