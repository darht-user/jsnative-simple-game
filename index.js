var star = document.querySelector('#start')
var game = document.querySelector('#game')
var time = document.querySelector('#time')
var result = document.querySelector('#result')
var timeHeader = document.querySelector('#time-header')
var resultHeader = document.querySelector('#result-header')
var gameTime = document.querySelector('#game-time')


var score = 0
var isGameStarted = false

star.addEventListener('click', startGame)
game.addEventListener('click', hanleBoxClick)
gameTime.addEventListener('input', setTime)

function startGame() {
  score = 0
  setTime()

  gameTime.setAttribute('disabled', 'true')
  
  isGameStarted = true
  star.classList.add('hide')
  game.style.backgroundColor = '#fff'

  var interval = setInterval(function() {
    var count = parseFloat(time.textContent)

    if(count<=0){
      clearInterval(interval)
      endGame()
    } else {
      time.textContent = (count - 0.1).toFixed(1)
    }
  }, 100)
  renderBox()
}

function setTime() {
  var count = +gameTime.value
  time.textContent = count.toFixed(1)
  resultHeader.classList.add('hide')
  timeHeader.classList.remove('hide')
}

function endGame() {
  isGameStarted = false
  gameTime.removeAttribute('disabled')
  star.classList.remove('hide')
  game.innerHTML = ''
  game.style.backgroundColor = '#ccc'
  timeHeader.classList.add('hide')
  resultHeader.classList.remove('hide')
  setScore()
}

function hanleBoxClick(event) {
  if (!isGameStarted) {
    return
  }
  if (event.target.dataset.box) {
    score++
    renderBox()
  }  
}

function setScore() {
  result.textContent = score.toString()
}

function renderBox() {
  game.innerHTML = ''

  var r = parseInt(Math.random() * 255)
  var g = parseInt(Math.random() * 255)
  var b = parseInt(Math.random() * 255)
  var box = document.createElement('div')
  var boxSize = getRandom(30, 100)
  var gameScope = game.getBoundingClientRect()
  var maxTop = gameScope.height - boxSize
  var maxLeft = gameScope.height - boxSize
  
  box.style.height = box.style.width = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')'
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}