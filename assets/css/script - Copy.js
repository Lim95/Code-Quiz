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
var highScoreLists = document.querySelector("#id-high-scores-lists");
var highScoreButtons = document.querySelector("#id-high-scores-buttons");

const START = "start";
const USERANSWERS = "userAnswers";
const SUBMIT = "submit";
const HIGHSCORES = "viewHighScores";
const GOBACK = "goBack";
const CLRHIGHSCORES = "clrHighScores";
const CORRECT = "Correct!";
const WRONG = "Wrong!";
var questionsBank = [
  ["paranthesis", "quotes", "curly brackets", "square brackets", "1The condition in an if / else statement is enclosed with _____."],
  ["numbers", "strings", "booleans", "alerts", "2Commonly used data types DO Not Include:"],
  ["paranthesis", "quotes", "curly brackets", "square brackets", "3The condition in an if / else statement is enclosed with _____."],
  ["numbers", "strings", "booleans", "alerts", "4Commonly used data types DO Not Include:"],
  ["paranthesis", "quotes", "curly brackets", "square brackets", "5The condition in an if / else statement is enclosed with _____."],
  ["numbers", "strings", "booleans", "alerts", "6Commonly used data types DO Not Include:"],
  ["paranthesis", "quotes", "curly brackets", "square brackets", "7The condition in an if / else statement is enclosed with _____."],
  ["numbers", "strings", "booleans", "alerts", "8Commonly used data types DO Not Include:"],
  ["paranthesis", "quotes", "curly brackets", "square brackets", "9The condition in an if / else statement is enclosed with _____."],
  ["numbers", "strings", "booleans", "alerts", "10Commonly used data types DO Not Include:"]
];
var userScore = 0;
var questionCount = 0;
var userAnswerResultStatus = false;
const QUESTIONS = 4;
const ANSWERS = 0;
const USERINPUT = 0;
var tmpBank = questionsBank.slice();

function removeAllChildNodes(parent) {
  while(parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

// var submitPage = document.querySelector("#id-submit-page");
// var submitPageContainer = document.querySelector("#id-submit-page-container");

function getPages() {

  
  if (questionCount < questionsBank.length) {
    startPage.remove(); 
    getQuestionPage();
  }
  else {
    quizPage.remove();
    getSubmitPage();
  }
   
};


/** questions*********************************************************** */
function getRandomQuestion() {
  var result = questionCount;//Math.floor(Math.random()*questionsBank.length);

  return result;
};
function getQuestionPage(){
  // get a random question
  
  var questionNumber = getRandomQuestion();
  // print question
  console.log(questionsBank);
  var randomQuestion = document.createElement("h1");
  if (quizPageQuestions.hasChildNodes()) {
    quizPageQuestions.removeChild(quizPageQuestions.firstChild);
  }
  randomQuestion.className = "questions-items";
  randomQuestion.innerHTML = questionsBank[questionNumber][QUESTIONS];
  quizPageQuestions.append(randomQuestion);
  questionCount++;
  // print 4 random buttons
  var tmpBankQ = tmpBank[questionNumber];
  for(var i = 0; i < 4; i++) {
    var randomAnswers = Math.floor(Math.random()*(tmpBankQ.length-1));
    var btnItem = document.createElement("button");
    btnItem.className = "btn-ans";
    btnItem.setAttribute("data-btn",USERANSWERS);
    if(tmpBankQ[randomAnswers] === questionsBank[questionNumber][ANSWERS]){
      btnItem.setAttribute("data-btn-ans",CORRECT);
    }
    else {
      btnItem.setAttribute("data-btn-ans", WRONG);      
    }
    btnItem.innerHTML = 
    (i+1) + ". " + tmpBankQ[randomAnswers];
    if (quizPageButtons.childElementCount >= 4) {
      quizPageButtons.removeChild(quizPageButtons.firstChild);
    }
    quizPageButtons.appendChild(btnItem);
    tmpBankQ.splice(randomAnswers,1);
    quizWrapper.append(quizPage);
    btnItem.addEventListener("click",btnHandler);
  }

};
/** questions*********************************************************** */
function printRightOrWrong(userAnswerStatus){

  var userAnswerStatusContent = document.createElement("h3");
  userAnswerStatusContent.className = "user-answer-status-content";
  
  if(userAnswerStatus === CORRECT) {
    userAnswerStatusContent.innerHTML = CORRECT;
    userScore += 1;
  }
  else {  
    userAnswerStatusContent.innerHTML = WRONG;

  }
  if (userAnswerResult.hasChildNodes()) {
    userAnswerResult.removeChild(userAnswerResult.firstChild);
  }
  userAnswerResult.append(userAnswerStatusContent);
};

function getUserAnswerResult (userBtnAnswer) {
  if(userBtnAnswer === CORRECT) {
    printRightOrWrong(CORRECT);   
  }
  else {
    printRightOrWrong(WRONG);
  }
};
function clearPage(parent) {
  if(parent.hasChildNodes()) {
    parent.remove();
  }
};
function getHighScorePage(event) {
  event.preventDefault();
  //    var taskNameInput = document.querySelector("input[name='task-name']").value;

  var userInput = document.querySelector("#id-submit-page-box-container")[USERINPUT].value;
  

  clearPage(startPage);
  clearPage(quizPage);
  clearPage(submitPage);
  clearPage(userAnswerResult);
  //removeAllChildNodes(submitPageBoxContainer);
  //removeAllChildNodes(submitPageContainer);
 
  var highScoresHeading = document.createElement("h2");
  highScoresHeading.innerHTML = "High scores";

  var goBackBtn = document.createElement("button");
  goBackBtn.className = "btn";
  goBackBtn.innerText = "Go back";
  goBackBtn.setAttribute("data-btn",GOBACK);

  var clearHighScoresBtn = document.createElement("button");
  clearHighScoresBtn.className = "btn";
  clearHighScoresBtn.innerText = "Clear high scores";
  clearHighScoresBtn.setAttribute("data-btn",CLRHIGHSCORES);

  highScorePage.insertBefore(highScoresHeading, highScorePage.firstChild);
  highScoreLists.append(userInput);
  highScoreButtons.append(goBackBtn, clearHighScoresBtn);



  goBackBtn.addEventListener("click",btnHandler);
  clearHighScoresBtn.addEventListener("click",btnHandler);
};
function getSubmitPage() {
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
    "<input type='submit' value='submit'>";
  
  submitPageContainer.append(submitPageHeading, submitPageInfo, submitPageBoxContainer);
  
};
function getStartPage() {
  clearPage(highScorePage);
  clearPage(quizPage);
  clearPage(submitPage);
  clearPage(userAnswerResult);
  questionCount = 0;
  quizWrapper.append(startPage);
};

function submitScore() {
  console.log(1);
}

/** button handler*********************************************************** */
function btnHandler(event) {
  var userBtnStatus = event.target.getAttribute("data-btn");
  var userBtnAns = event.target.getAttribute("data-btn-ans");
  switch(userBtnStatus) {
    case START:
      getPages();
      break;
    case USERANSWERS:
      getUserAnswerResult(userBtnAns);
      getPages();
      break;
    case SUBMIT:
      submitScore();
      getHighScorePage();
      break;
    case HIGHSCORES:
      break;
    case GOBACK:
      getStartPage();
      break;
    case CLRHIGHSCORES:
      break;
    default :
      break;                            
  }
}
/** button handler*********************************************************** */

startBtn.addEventListener("click",btnHandler);
submitPage.addEventListener("submit", getHighScorePage);