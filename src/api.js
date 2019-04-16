const categoriesURL = 'http://localhost:3000/categories'

function getQuizData() {
  fetch(categoriesURL)
  .then(resp => resp.json())
}
