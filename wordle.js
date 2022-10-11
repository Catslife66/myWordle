const answer = ['W', 'A', 'T', 'E', 'R'];
const guesses = 6;
const inputSquares = document.querySelectorAll('.square');
const keyBoard = document.querySelectorAll('.letter');
const resultDisplay = document.querySelector('.result');

const inputLength = 5;

let userInput = [];
let userGuess = 0;
let okToInput;
let checkingStage = false;
let enterPressed = false;
let guess = [];
let index = 0;
let winning;
let tie = false;


window.addEventListener("keydown", (event) => {
    let inputLetter = event.key
    inputLetter = inputLetter.toUpperCase()
    if(!tie && !winning){
        if(event.keyCode >= 65 && event.keyCode <= 90 && userInput.length < inputLength){
            userInput.push(inputLetter)
            inputSquares[(userGuess * 5) + (userInput.length-1)].innerHTML = inputLetter
            inputSquares[(userGuess * 5) + (userInput.length-1)].classList.add('write')
            keyBoard.forEach((element)=> {
                if(element.textContent == inputLetter){
                    element.classList.add('pressed')
                }
            })
        }
        if(event.keyCode == 8){
            let last = userInput.pop()
            inputSquares[userGuess * 5 + userInput.length].innerHTML = ""
            inputSquares[userGuess * 5 + userInput.length].classList.remove('write')
            keyBoard.forEach((element)=> {
                if(element.textContent == last){
                    element.classList.remove('pressed')
                }
            })
        }

        if(userInput.length == 5 && event.keyCode == 13){
            checkAnswer()
        }
        
    }
    
    if(tie){
        resultDisplay.textContent = `The answer is ${answer}`;
    }

})


function checkAnswer(){
    let i = 0;
    if(userInput[i] == answer[0] && 
        userInput[i+1] == answer[1] &&
        userInput[i+2] == answer[2] && 
        userInput[i+3]== answer[3] && 
        userInput[i+4] == answer[4]){
            inputSquares[userGuess * 5 + i].classList.add('green')
            inputSquares[userGuess * 5 + i+1].classList.add('green')
            inputSquares[userGuess * 5 + i+2].classList.add('green')
            inputSquares[userGuess * 5 + i+3].classList.add('green')
            inputSquares[userGuess * 5 + i+4].classList.add('green')
            resultDisplay.textContent = 'You Win!'
        }
    
    userInput.forEach((element, index) => {
        if(answer.includes(element)){
            inputSquares[userGuess * 5 + index].classList.add('yellow');
            keyBoard.forEach((e)=> {
                if(e.textContent == element){
                    e.classList.add('gold')
                }
            })
        }
    })

    for(i=0; i<5; i++){
        for(j=0; j<5; j++){
            if(answer.includes(userInput[j])){
                inputSquares[userGuess * 5 + j].classList.add('yellow');
                keyBoard.forEach((e)=> {
                    if(e.textContent == userInput[j]){
                        e.classList.add('gold')
                    }
                })
            }

            if(answer[i] == userInput[j] && i == j){
                inputSquares[userGuess * 5 + i].classList.add('green')
                keyBoard.forEach((e)=> {
                    if(e.textContent == answer[i]){
                        e.classList.add('green1')
                    }
                })
            }
        }
    }
    
    if(!winning){
        userGuess ++
        userInput = []
    }

    if(userGuess == guesses){
        tie = true
    }
    
}
