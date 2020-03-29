
const startBtn = document.querySelector(".start-btn");
const drawnNumberP = document.querySelector(".drawn-number");
const progress = document.querySelector(".progress");
const inputNumber = document.querySelector(".enter-number-field");
const confirmBtn = document.querySelector(".confirm-answer-btn");
const levelP = document.querySelector(".level");
const correctAnswerP = document.querySelector(".correct-answer");
const userAnswerP = document.querySelector(".user-answer");
const nextLevelBtn = document.querySelector(".next-level-btn");
const tryAgainBtn = document.querySelector(".try-again-btn");



const startGameContainer = document.querySelector(".start-game-container");
const showNumberContainer = document.querySelector(".show-number-container");
const enterNumberContainer = document.querySelector(".enter-number-container");
const answerContainer = document.querySelector(".answer-container");

let level;
let drawnNumber;

startBtn.addEventListener('click', startGame);
confirmBtn.addEventListener('click', checkCorrectAnwer);
nextLevelBtn.addEventListener('click', nextLevel);
tryAgainBtn.addEventListener('click', tryAgain);

function startGame(){
    level = 1;
    startGameContainer.classList.add("hidden");

    drawnNumber = generateRandomNumber(level);
    drawnNumberP.textContent = drawnNumber;
    showNumberContainer.classList.remove("hidden");
    runInterval(15);
}

function nextLevel(){
    level++;
    drawnNumber = generateRandomNumber(level);
    drawnNumberP.textContent = drawnNumber;
    answerContainer.classList.add("hidden");
    showNumberContainer.classList.remove("hidden");
    runInterval(17+level);
}

function tryAgain(){
    answerContainer.classList.add("hidden");
    startGame();
}

function checkCorrectAnwer(){
    let userAnswer = inputNumber.value;

    correctAnswerP.textContent = drawnNumber;
    userAnswerP.textContent = userAnswer;

    enterNumberContainer.classList.add("hidden");
    answerContainer.classList.remove("hidden");
    levelP.textContent = "LEVEL " + level;
    inputNumber.value = "";

    if(userAnswer == drawnNumber){
        nextLevelBtn.classList.remove("hidden");
        nextLevelBtn.focus();
    }else{
        nextLevelBtn.classList.add("hidden");
        tryAgainBtn.classList.remove("hidden");
        tryAgainBtn.focus();
    }  


}

function generateRandomNumber(length){
    let randomNumber;
    let result = '';

    for(let i = 0; i<length; i++){
        randomNumber = Math.floor(Math.random() * 9) + 1;
        result += randomNumber;
    }
    return result;
}

function runInterval(time){

    let interval = setInterval(() => {
        let progressWidth = progress.offsetWidth;

        if(progressWidth == 0){
            clearInterval(interval);
            showNumberContainer.classList.add("hidden");
            enterNumberContainer.classList.remove("hidden");
            inputNumber.focus();
            addKeyUpToInput();
            progress.style.width = "150px";
        }else{
            progressWidth--;
            progress.style.width = progressWidth + "px";
        }
    },time);
}

function addKeyUpToInput(){
    inputNumber.addEventListener('keyup', enterPress);
}

function enterPress(e) {
    if(e.keyCode == 13) {
        confirmBtn.click();
        inputNumber.removeEventListener('keyup', enterPress);
    }
}