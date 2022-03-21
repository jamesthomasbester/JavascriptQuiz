
//declearing an object with all the questions and answers in the quiz
const quizQuestions =[
    {
        question: "Which of the following is NOT an operator in Javascript?",
        choices: {
            a: "*",
            b: "%",
            c: "@",
            d: "&"
        },
        answer: "c"
    },
    {
        question: "Which of the following is used for Multi-line comments in javascript?",
        choices: {
            a: "/* */",
            b: "//",
            c: "!!",
            d: "''"
        },
        answer: "a"
    },
    {
        question: "If i Console.log or return a variable without a value it will return?",
        choices: {
            a: "0",
            b: "null",
            c: "undefined",
            d: "error"
        },
        answer: "c"
    },
    {
        question: "Which array prototype adds one or more elements to the end of an array",
        choices: {
            a: "shift()",
            b: "push()",
            c: "pop()",
            d: "entries()"
        },
        answer: "b"
    },
];

var highscore = 
[
    {
        name: "John Doe",
        score: 32
    },
    {
        name: "Jane Smith",
        score: 66
    }

]
//declearing global variables
var index = 0;
var highscoreToggle = false;
var score = 0;
var count = 60;
var start = false;
var stopMultipleInputs = 0;
const QC = document.getElementById('question-card');
const HC = document.getElementById('highscores-list');


/*
this is the initial function that is called when the start button is clicked,
 */
function quiz(){
    start = true;
    createQuestionCard();
    document.getElementById("start-card").style.display="none";
    QC.style.display="block";
}

/*
    an onclick listener for the view highscores button that displays a highscores card with 2 auto-generated scores,
    as well as any new scores entered. that are cached in localstoraged.
*/
document.getElementById('highscores').addEventListener('click', function(){
    let alpha;
    if (!highscoreToggle){
        HC.style.display = "inline";
        highscoreToggle = true;
    }else{
        HC.style.display = "none";
        highscoreToggle = false;
    }
    HC.innerHTML = "";
    if(JSON.parse(localStorage.getItem('highscores')) == null){
        alpha = highscore;
        console.log("null");
    }else{
        alpha = JSON.parse(localStorage.getItem('highscores'));
        console.log(alpha);
    }
    let beta = [];
    alpha.forEach(element => {
        beta.push(
            `
            <li>
                <p>${element.name}</p>
                <p>${element.score}</p>
            </li>
            `
        )
        HC.innerHTML += beta[beta.length -1];
    });

})

// timer function that counts down from 60 seconds when timer gets to 0, timer is cleared and game is ended
window.timer = setInterval(function(){
    if (start){
        count--;
    }
    document.getElementById('time-left').innerHTML = count.toString();
    if (count == 0){
        window.alert("game over! \n you ran out of time, \n try again");
        window.location.reload();
        window.clearInterval(window.timer);
    }
}, 1000);


/*
function that dynamically creates elements using template literals, via pushing objects into arrays
and then defining the inner html of a empty div to be the position in that array via index.
*/
function createQuestionCard(){
    const output = [];

    quizQuestions.forEach((currentQuestion, i) => {

        const choices = [];
        for(x in currentQuestion.choices){
            choices.push(
                `<label>
                <input type="radio" id="check" class="check" name="question${i}" value="${x}">
                  ${x} :
                <p>${currentQuestion.choices[x]}</p>
              </label>`
            )}

        output.push(
            `<div class="question"> ${currentQuestion.question}</div>
            <div class="choices"> ${choices.join('')} </div>
            <button onclick="evalAnswers()" id="submit-button">submit</button>`
        );
    });
    QC.innerHTML = output[index];
    /*  
        i am reseting the stopMultipleInputs with the creation of a new question card, 
        this only allows the user to select one answer otherwise user can select multiple answers
     */
    stopMultipleInputs = 1;
}

//a simple sleep function that takes a milliseconds parameter and waits for that amount of time
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*
this function is evaluating the checked answer against the answer in the quizQuestions object
changing the color of the selected answer according whether it was right or wrong,
waiting for 3 seconds to allow the use to see if they got the answer right or wrong,
incrementing the index value to keep track of which question they are on.
finally checking if the user has completed all the questions, if the user has completed all the questions
the function displays the final score screen.
*/
async function evalAnswers(){
    if(stopMultipleInputs == 1){
        if(document.querySelector('.check:checked')){
            if(document.querySelector('#check:checked').value == quizQuestions[index].answer){
                stopMultipleInputs = 2;
                score += count;
                let correct = document.querySelector('.check:checked').closest("label");
                correct.style.color = "Green";
                await sleep(3000);
                count += 3;
                index++;
                moveon();
            }else if(document.querySelector('.check:checked').value != quizQuestions[index].answer){
                stopMultipleInputs = 2;
                let wrong = document.querySelector('.check:checked').closest("label");
                wrong.style.color = "red";
                await sleep(3000);
                count += 3;
                index++;
                moveon();
            }
        }else{
            let op = document.createElement("h4");
            op.innerText = "Please select a value";
            QC.append(op);
            await sleep(1000);
            QC.removeChild(QC.lastChild);
            return;
        }
    }else{
        return;
    }
}


/*
    this function was part of the evalAnswers function so i have seperated it into two functions. for the purpose making the code easier to read,
    added highscore functionality that is pulling and storing data into localstorage.
*/
function moveon(){
    if(index != quizQuestions.length){
        createQuestionCard();
    }else{
        window.clearInterval(window.timer);
        document.getElementById('question-card').innerHTML = 
        `<h1>congratz</h1>
        <h2>Your Score was: ${score}!</h2>
        <label for ="score-name" >Enter your name for highscores</label>
        <input id="score-name" type='text'> </input>
        <button id="return-button" >submit</button>
        `;
        document.getElementById("return-button").addEventListener('click', () => { 
            let tempArray;
            if(JSON.parse(localStorage.getItem('highscores')) == null){
                tempArray = highscore;
            }else{
                tempArray = JSON.parse(localStorage.getItem('highscores'));
            }
            tempArray.push({"name": document.getElementById("score-name").value, "score": score});
            localStorage.setItem('highscores', JSON.stringify(tempArray));
            window.location.reload();
        })
    }
}
    