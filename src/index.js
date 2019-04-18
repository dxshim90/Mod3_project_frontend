document.addEventListener("DOMContentLoaded", function() {
  renderCategories();
  renderScores()
});

//pull category from API
const api = "http://localhost:3000/categories";
const quizBar = document.getElementById("quiz-bar");
const quizbox = document.querySelector("#quiz-summary-container");
const leaderTable = document.querySelector("#table");

const state = {
  selectedCategory: null,
  currentScore: 0,
  currentRound: null,
  currentQuestion: null,
  answers: [],
  lives: 3,
  currentUser: null
};

function getCategory() {
  return fetch(api).then(response => response.json());
}

function addCategoryToBar(category) {
  divEl = document.createElement("div");
  divEl.className = "card";
  divEl.dataset.id = category.id;
  divEl.innerHTML = `
<p>${category.name} </p>
<img src='${category.image_url}'/>
`;
  quizBar.appendChild(divEl);
  divEl.addEventListener("click", event => {
    state.selectedCategory = category;
    showQuiz(category);
  });
}

function getQuestion() {
  let number = Math.floor(Math.random() * Math.floor(15));
  const newnumber = number + 1;

  return fetch(`http://localhost:3000/questions/${newnumber}`)
    .then(resp => resp.json())
    .then(question => {
      // if (question.endOfRound) {
      //   myEndRoundFunction()
      // } else {
      //   renderQuestion(question)
      // }

      if (state.answers.length > 10) {
        endRound();
      } else {
        renderQuestion(question);
      }
    });
}

function endRound() {
  createUser()
  quizbox.innerHTML = `<h2>End of Game. Select a category to restart the quiz.</h2>
  `;
  console.log("end of game");
  addScore(score)
  state.currentUser = null
  state.currentScore = 0
  state.lives = 3

}

function showQuiz(category) {
  quizbox.innerHTML = `
  <h2>${category.name}</h2>

<button class='start-quiz' type="button">Start Quiz!</button>
`;
  const startBtn = document.querySelector(".start-quiz");
  startBtn.addEventListener("click", event => {
    newRound();
    getQuestion();
  });
}

// function quiz(category) {
//   liEl = document.createElement('li')
//   liEl.innerHTML = `
//   ${category.questions[0].content}
//   <br>  <br>  <br>  <br>
//   <form action="">
//   <input type="radio" value= 'correct'> ${category.questions[0].answer}<br>
//   <input type="radio" value= 'incorrect'> ${category.questions[0].incorrect_1}<br>
// </form>
//   `
// }

function renderCategories() {
  getCategory().then(categories => categories.forEach(addCategoryToBar));
}

function renderQuestion(question) {
  quizbox.innerHTML = `
  <p>${question.content}</p>
  <form id="form">
  <input type="radio" name="test" value='correct'>   ${
    question.answer
  }<br>
  <input type="radio" name="test" value='incorrect'> ${
    question.incorrect_1
  }<br>
  </form>
  <br><br><br><br><br>

  <p>Current score: ${state.currentScore}</p>
  <p>Current Lives: ${state.lives}</p>
  `;

  const submitBtn = document.createElement("button");
  submitBtn.className = "submit";
  submitBtn.setAttribute("type", "submit");
  submitBtn.innerText = "Submit Answers";
  quizbox.append(submitBtn);

  submitBtn.addEventListener("click", event => {
    const providedAnswer = form.test.value;
    createAnswer(providedAnswer, question);
    if (providedAnswer === "incorrect") {
      --state.lives
    } else {
      ++state.currentScore
    }
    if (state.lives === 0) {
      endRound()
    } else {
      getQuestion()
    }

  });
}

// function newQuestion() {
//   getQuestion().then(question => renderQuestion(question))
// }

function newRound() {
  let text;
  const player = prompt("Please Enter Your Name");
  if (player == null || player == "") {
    text = "Please enter a name";
  } else {
    text = `Hello ${player}`;
  }
  state.currentUser = player
  createRound(player);
  //state.currentRound = Round.id
}

// post new player to api
function createRound(player) {
  return fetch("http://localhost:3000/rounds", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ playername: player })
  }).then(resp => resp.json());
}

function createAnswer(providedAnswer, question) {
  return fetch("http://localhost:3000/answers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ answer: providedAnswer, question_id: question.id })
  })
    .then(resp => resp.json())
    .then(resp => state.answers.push(resp.answer));
}

function createUser() {
  return fetch("http://localhost:3000/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ name: state.currentUser, points: state.currentScore })
  })
    .then(resp => resp.json())
}


function checkAnswers() {
  console.log(form.test.value);
}

function addScore(score) {
const li = document.createElement('li')
li.innerHTML = `
${score.name} Scored ${score.points}
`
leaderTable.append(li)
}

function getScores() {
  return fetch('http://localhost:3000/scores')
  .then(resp => resp.json())
}

function renderScores() {
getScores().then(scores => scores.forEach(addScore));
}



//   quizbox.innerHTML = state.selectedCategory.questions
//     .map(function(e) {
//       return `<li id='${e.id}'>
//   <label> ${e.content} </label>
//   <form id="form${e.id}">
//   <input type="radio" name="test" value='correct'>   ${e.answer}<br>
//   <input type="radio" name="test" value='incorrect'> ${e.incorrect_1}<br>
// </form>
//   </li>
//   <br>`;
//     })
//     .join("");

// const submitBtn = document.createElement("button");
// submitBtn.className = "submit";
// submitBtn.setAttribute("type", "submit");
// submitBtn.innerText = "Submit Answers";
// quizbox.append(submitBtn);
// submitBtn.addEventListener("click", e => {
//   checkAnswers();
//   console.log(state.currentScore);
