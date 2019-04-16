document.addEventListener("DOMContentLoaded", function() {
  renderCategories();
});

//pull category from API
const api = "http://localhost:3000/categories";
const quizBar = document.getElementById("quiz-bar");
const quizbox = document.querySelector("#quiz-summary-container");

const state = {
  selectedCategory: null,
  currentScore: 0
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
`
  quizBar.appendChild(divEl);
  divEl.addEventListener("click", event => {
    state.selectedCategory = category;
    showQuiz(category);
  });
}


function getQuestion() {
  let number = Math.floor(Math.random() * Math.floor(4))
  const newnumber = number + 1

  return fetch(`http://localhost:3000/questions/${newnumber}`)
  .then(resp => resp.json())
  .then(question => renderQuestion(question))
}


function showQuiz(category) {
  quizbox.innerHTML = `
  <h2>${category.name}</h2>

<button class='start-quiz' type="button">Start Quiz!</button>
`;
  const startBtn = document.querySelector(".start-quiz");
  startBtn.addEventListener("click", event => {
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
  debugger
  // quizbox.innerHTML =
  // `
  //
  // `

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

function checkAnswers() {
  //debugger;
  console.log(form.test.value);
}






// const submitBtn = document.createElement("button");
// submitBtn.className = "submit";
// submitBtn.setAttribute("type", "submit");
// submitBtn.innerText = "Submit Answers";
// quizbox.append(submitBtn);
// submitBtn.addEventListener("click", e => {
//   checkAnswers();
//   console.log(state.currentScore);
