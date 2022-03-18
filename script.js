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
var index = 0;
var score = 0;
var count = 60;

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
            <button onclick="test()" id="submit-button">submit</button>`
        );
    });
    document.getElementById('question-card').innerHTML = output[index];
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function test(){
    console.log(quizQuestions.length);
    console.log(index);
    if(index + 1 != quizQuestions.length){
        if(document.querySelector('.check:checked').value == quizQuestions[index].answer){
            score += count;
            var correct = document.querySelector('.check:checked').closest("label");
            correct.style.color = "Green";
        }else{
            var correct = document.querySelector('.check:checked').closest("label");
            correct.style.color = "red";
        }
        await sleep(5000);
        count += 5;
        index++;
        console.log(score);
        createQuestionCard();
    }else{
        document.getElementById('question-card').innerHTML = 
        `<h1>congratz</h1>
        <h2>Your Score was: ${score}!</h2>
        <button>Return</button>
        ` 
    }
}

function main(){
    
}



function quiz(){
    // timer function that counts down from 60 seconds when timer gets to 0, timer is cleared and game is ended
    var timer = window.setInterval(function(){
        count--;
        document.getElementById('time-left').innerHTML = count.toString();
        if (count == 0){
            window.alert("game over! \n you ran out of time, \n try again");
            window.location.reload();
            window.clearInterval(timer);
        }
    }, 1000);
    createQuestionCard();
    document.getElementById("start-card").style.display="none";
    //main function
}
    