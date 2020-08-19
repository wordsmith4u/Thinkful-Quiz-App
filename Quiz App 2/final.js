 //Question array with answers and explanation
 var questionArray = {
    questions: [

    {
        text: 'How many home runs did Sammy Sosa hit in his Cubs career?',
        choices: ['565', '557', '505', '545'],
        answer: 3,
        explanation: 'ANSWER: Sosa hit 545 homers as a Cub.'
    },

    {
        text: 'How many strikeouts did Kerry Wood have on May 6, 1998, tying the MLB record for most in a game?',
        choices: ['19', '18', '21', '20'],
        answer: 3,
        explanation: 'ANSWER: Wood struck out 20 Astros in his fifth start.'
    },

    {
        text: 'Including Jackie Robinson, how many Cubs have had their numbers retired?',
        choices: ['9', '10', '7', '8'],
        answer: 2,
        explanation: 'ANSWER: 7'
    },

    {
        text: 'Which team were the Cubs playing when Steve Bartman interfered with a foul ball?',
        choices: ['Braves', 'Marlins', 'Cardinals', 'Giants'],
        answer: 1,
        explanation: 'ANSWER: The foul came off the bat of a Marlins hitter.'
    },

    {
        text: 'Which street is Wrigley Field on?',
        choices: ['East Addison Street', 'Wilton Avenue', 'North Broadway', 'West Addison Street'],
        answer: 3,
        explanation: 'ANSWER: Corner of Clark and West Addison Street'
    },

    {
        text: 'How many years had the Cubs gone between World Series wins prior to 2016?',
        choices: ['108', '95', '131', '74'],
        answer: 0,
        explanation: 'ANSWER: It was 108 years sincle the last Series win!'
    }
    ],

    good: [
    "You Really Do Bleed Cubbie Blue!"],

    bad: [  
    "What Are You, A Cardinals Fan?"],

    //Track the score
    score: 0, 
    //Track the current question
    currentQuestionIndex: 0, 
    //Advance from page to page
    path: 'start', 
    //Used in the function to answer questions in function
    lastAnswerCorrect: false, 
    //Feedback from previous attempt
    feedbackRandom: 0, 

};

//Traverse the various pages
function setPath(questionArray, path) { 
    questionArray.path = path;
};

function resetGame(questionArray) {
    questionArray.score = 0;
    questionArray.currentQuestionIndex = 0;
    setPath(questionArray, 'start');
};

//Gives good or bad feedback after answers
function answerQuestion(questionArray, answer) {
    var currentQuestion = questionArray.questions[questionArray.currentQuestionIndex];
    questionArray.lastAnswerCorrect = currentQuestion.answer === answer;
    if (questionArray.lastAnswerCorrect) {
        questionArray.score++;
    }
    selectFeedback(questionArray);
    setPath(questionArray, 'answer-feedback');
};

function selectFeedback(questionArray) {
    questionArray.feedbackRandom = Math.random();
};

//if quiz is not over, it will continue
function advance(questionArray) {
    questionArray.currentQuestionIndex++;
    if(questionArray.currentQuestionIndex === questionArray.questions.length) {
        setPath(questionArray, 'final-feedback');
    }

    else {
        setPath(questionArray, 'question');
    }
};

//---RENDER FUNCTIONS--->//

//Function that will display quiz
   //Hide all pages, then displays current page using the path. If / Else function
function renderQuiz(questionArray, elements) {
    Object.keys(elements).forEach(function(path) {
        elements[path].hide();
    });

    elements[questionArray.path].show();

    if (questionArray.path === 'start') {
        renderStartPage(questionArray, elements[questionArray.path]);
    }

    //Set path to question page
    else if (questionArray.path === 'question') {
        renderQuestionPage(questionArray, elements[questionArray.path]); 
    }

    //Set path to feedback page
    else if (questionArray.path === 'answer-feedback') {
        renderAnswerFeedbackPage(questionArray, elements[questionArray.path]); 
    }

    //Set path to final feedback page
    else if (questionArray.path === 'final-feedback') {
        renderFinalFeedbackPage(questionArray, elements[questionArray.path]); 
    }
};

//This displays question page
function renderQuestionPage(questionArray, element) {
    renderQuestionCount(questionArray,  element.find('.question-count'));
    renderQuestionText(questionArray, element.find('.question-text'));
    renderChoices(questionArray,  element.find('.choices'));
};

//This displays feedback after each question and has 'next' button
function renderAnswerFeedbackPage(questionArray, element) {
    renderAnswerFeedbackHeader(questionArray, element.find('.feedback-header'));
    renderAnswerFeedbackText(questionArray, element.find('.feedback-text'));
    renderExplanation(questionArray, element.find('.explanation'));
    renderNextButtonText(questionArray, element.find('.see-next'));
    renderCurrentScore(questionArray, element.find('.current-score'));
};

//Display final feedback after the quiz
function renderFinalFeedbackPage(questionArray, element) {
    renderFinalFeedbackText(questionArray, element.find('.results-text'));
};

function renderQuestionCount(questionArray, element) {
    var text = (questionArray.currentQuestionIndex + 1) + "/" + questionArray.questions.length;

    element.text(text);
};

//Render the question
function renderQuestionText(questionArray, element) {
    var currentQuestion = questionArray.questions[questionArray.currentQuestionIndex];
    element.text(currentQuestion.text);
};

//Render the explanation
function renderExplanation(questionArray, element) {
    var currentQuestion = questionArray.questions[questionArray.currentQuestionIndex];
    element.text(currentQuestion.explanation);
};

//Render the current score
function renderCurrentScore(questionArray, element) {
    var score = questionArray.score;
    var currentQuestionIndex = questionArray.currentQuestionIndex;
    var scoreElement = $('.current-score'); 
    scoreElement.text("Your score is " + score + "/" + currentQuestionIndex);

};

//Render the choices
function renderChoices(questionArray, element){
    var currentQuestion = questionArray.questions[questionArray.currentQuestionIndex];
    var choices = currentQuestion.choices.map(function(choice, index) {
        return (
            '<li>'+
            '<input type="radio" name="user-answer" value="' + index + '" required>' +
            '<label>' + choice + '</label>' +
            '</li>'
            );  
    });

    element.html(choices);
};

function renderAnswerFeedbackHeader(questionArray, element) {
    var html = questionArray.lastAnswerCorrect ?
    "<h4 class='user-was-correct'>Correct</h4>" :
    "<h4 class='user-was-incorrect'>Wrong!</>";

    element.html(html);
};

function renderAnswerFeedbackText(questionArray, element) {
    var choices = questionArray.lastAnswerCorrect ? questionArray.good : questionArray.bad;
    var text = choices[Math.floor(questionArray.feedbackRandom * choices.length)];

    element.text(text);
};


function renderNextButtonText(questionArray, element) {
    var text = questionArray.currentQuestionIndex < questionArray.questions.length - 1 ? 
    "Next Inning" : "What's the score?";

    element.text(text);
};

//What will be displayed when quiz is completed
function renderFinalFeedbackText(questionArray,  element) {
    var text = "You got " + questionArray.score + " out of " + questionArray.questions.length + " questions right.";

    element.text(text);
};

//Page elements
var PAGE_ELEMENTS = {
    'start': $('.start-page'),
    'question': $('.questions-page'),
    'answer-feedback': $('.answer-feedback-page'),
    'final-feedback': $('.final-feedback-page'),
};

//Event to start quiz and go to first question
$(".game-start").submit(function(event) {
    event.preventDefault();
    setPath(questionArray, 'question');
    renderQuiz(questionArray, PAGE_ELEMENTS);
});

//Event to restart quiz
$('.restart-game').click(function(event) {
    event.preventDefault();
    resetGame(questionArray);
    renderQuiz(questionArray, PAGE_ELEMENTS);
});


//Receive choice from user
$("form[name='current-question']").submit(function(event) {
    event.preventDefault();
    var answer = $("input[name='user-answer']:checked").val();
    answer = parseInt(answer, 6);
    answerQuestion(questionArray, answer);
    renderQuiz(questionArray, PAGE_ELEMENTS);
});

$('.see-next').click(function(event) {
    advance(questionArray);
    renderQuiz(questionArray, PAGE_ELEMENTS);
});


$(function() {
    renderQuiz(questionArray, PAGE_ELEMENTS);
});



