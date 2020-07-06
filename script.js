// VARIABLES

var qnumber = 0;
var score = 0;
var totalQ = questionaire.length;
var usranswer = 0;
var startBtn = "";
var timeLeft = 20;
var highScore = [];
var userarray = [];
var scoreUser = [];

// DOM EVENTS

var container = document.querySelector(".container");
var timer = document.getElementById("counter");
var questNumber = document.getElementById("number");
var questPar = document.getElementById("question");
var quesNumber = document.getElementById("qnumb");
var answerType = document.getElementById("answer-type");
var opt1 = document.querySelector("#optbtn1");
var opt2 = document.querySelector("#optbtn2");
var opt3 = document.querySelector("#optbtn3");
var opt4 = document.querySelector("#optbtn4");
var timerLoad = document.querySelector("#time1");
var quesNumber2 = document.querySelector("#numberQst");
var userGrade = document.getElementById("grade");
var finalsc = document.getElementById("finalscore");
var cleanlist = document.querySelector("quizBlock");
var elements = [opt1, opt2, opt3, opt4];

//FUNCTIONS

function prepareLoadQuestion() {
  var timeInterval = setInterval(function () {
    timerLoad.textContent = timeLeft + " seconds remaining";
    timeLeft--;
    LoadQuestion(qnumber);

    if (timeLeft === 0) {
      timerLoad.textContent = "";
      clearInterval(timeInterval);
      window.location.href = "index.html";
    }
  }, 1000);
}

function LoadQuestion(questionNumber) {
  if (qnumber < totalQ) {
    var q = questionaire[questionNumber];
    questPar.textContent = q.questionquiz;
    opt1.textContent = q.option1;
    opt2.textContent = q.option2;
    opt3.textContent = q.option3;
    opt4.textContent = q.option4;
    quesNumber2.textContent = qnumber + 1;
  } else if (qnumber === totalQ) {
    loadScore();
  }
}

opt1.addEventListener("click", function (event) {
  event.preventDefault();
  var correctanswer = questionaire.answer;
  usranswer = 1;
  checkanswer(qnumber, usranswer);
});

opt2.addEventListener("click", function (event) {
  event.preventDefault();
  var correctanswer = questionaire.answer;
  checkanswer(qnumber, usranswer);
});

opt3.addEventListener("click", function (event) {
  event.preventDefault();
  var correctanswer = questionaire.answer;
  usranswer = 3;
  checkanswer(qnumber, usranswer);
});

opt4.addEventListener("click", function (event) {
  event.preventDefault();
  var correctanswer = questionaire.answer;
  usranswer = 4;
  checkanswer(qnumber, usranswer);
});

// Function to check if the user answer and the answer correct answer martch
function checkanswer(q, user) {
  if (qnumber < totalQ) {
    var q = questionaire[q];
    var checking = q.answer;
    if ("option" + user === checking) {
      console.log("Correct");
      score += 1;
      //userGrade.textContent = "Correct!";
    } else {
      console.log("Wrong :", score);
    }
    //console.log(score); //need to do something
    qnumber += 1;
    LoadQuestion(qnumber);
  }
}

function loadScore() {
  var elementCont = document.querySelector(".quizBlock");
  elementCont.parentNode.removeChild(elementCont);
  var header2 = document.createElement("div");
  header2.className = "newblock";
  header2.innerHTML =
    "<p>Final Score : " +
    score +
    "</p>Enter your Name : <input id=usrname> <button id=submit>Submit</button>";
  container.appendChild(header2);

  var submitBtn = document.getElementById("submit");
  var userName1 = document.querySelector("#usrname");

  submitBtn.addEventListener("click", function () {
    if (usrname.value != null) {
      const usrArray = localStorage.getItem("userdata");
      let names;
      let scoreU;
      if (usrArray === null) {
        names = [];
        scoreU = [];
      } else {
        names = JSON.parse(usrArray);
      }

      scoreU = JSON.stringify(score);
      names.push(userName1.value);
      names.push(scoreU);

      localStorage.setItem("userdata", JSON.stringify(names));

      console.log("names : ", names);

      // continuation after local storage
      var elementCont = document.querySelector(".newblock");
      elementCont.parentNode.removeChild(elementCont);
      var header3 = document.createElement("div");
      header3.className = "newblock2";
      header3.innerHTML =
        "<p>High Scores</p> <div class=list><ul class=finallist></ul></div>";

      container.appendChild(header3);
      var header4 = document.createElement("div");
      header4.className = "newblock3";
      header4.innerHTML =
        "<button id=quizagain>Quiz Again</button><button id=clearhighScores>Clear High Scores</button>";
      container.appendChild(header4);
      startBtn = document.getElementById("quizagain");
      var itemstolist = document.querySelector(".itemslist"),
        items = names.length;
      var parent = document.getElementById("finallist");
      var el = document.createElement("LI");
      console.log("items : ", items);

      for (var j = 0; j < items; j += 2) {
        console.log("i'm in : ", names[j], names[j + 1], el);
        var stringU = names[j] + names[j + 1];
        var strw = document.createTextNode(stringU);
        el.appendChild(strw);
        document.querySelector(".finallist").appendChild(el);
        el = document.createElement("LI");
      }

      startBtn.addEventListener("click", function () {
        qnumber = 0;
        window.location.href = "index.html";
      });

      var clickClrBtn = document.querySelector("#clearhighScores");
      clickClrBtn.addEventListener("click", function () {
        localStorage.clear("userdata");
      });
    }
  });
}

prepareLoadQuestion();
