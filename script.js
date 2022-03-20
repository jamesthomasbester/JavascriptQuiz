
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

//declearing global variables
var index = 0;
var score = 0;
var count = 60;

/*
this is the initial function that is called when the start button is clicked,

 */
function quiz(){
    timer();
    createQuestionCard();
    document.getElementById("start-card").style.display="none";
    document.getElementById("question-card").style.display="block";
}


// timer function that counts down from 60 seconds when timer gets to 0, timer is cleared and game is ended
const timer = () =>{  window.setInterval(function(){
    count--;
    console.log(count);
    document.getElementById('time-left').innerHTML = count.toString();
    if (count == 0){
        window.alert("game over! \n you ran out of time, \n try again");
        window.location.reload();
        
        window.clearInterval(timer());
    }
}, 1000);
}
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
    document.getElementById('question-card').innerHTML = output[index];
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
    if(document.querySelector('.check:checked').value == quizQuestions[index].answer){
        score += count;
        let correct = document.querySelector('.check:checked').closest("label");
        correct.style.color = "Green";
    }else{
        let wrong = document.querySelector('.check:checked').closest("label");
        wrong.style.color = "red";
    }
    await sleep(3000);
    count += 3;
    index++;
    if(index != quizQuestions.length){
        console.log(score);
        createQuestionCard();
    }else{
        window.clearInterval(timer());
        document.getElementById('question-card').innerHTML = 
        `<h1>congratz</h1>
        <h2>Your Score was: ${score}!</h2>
        <button id="return-button" >Return</button>
        `;
        document.getElementById("return-button").addEventListener('click', () => {window.location.reload();})
    }
}
    