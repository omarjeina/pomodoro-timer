const timeEl = document.querySelector("#time");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resumeButton = document.querySelector("#resume");
const endButton = document.querySelector("#end");
const editButton = document.querySelector("#edit");
const confirmButton = document.querySelector("#confirm");
const timeInputEl = document.querySelector("#edit-time");

const pomodoroEl = document.querySelector("#pomodoro");
const shortEl = document.querySelector("#short");
const longEl = document.querySelector("#long");

const messageEl = document.querySelector("#message");
const messageEl2 = document.querySelector("#message-2");

const pomodoroTime = 25 * 60;
const shortTime = 5 * 60;
const longTime = 15 * 60;

let timer = pomodoroTime;

let pauseTemp = timer;

let temp = timer - 1;

function editCheck(check){
    if(!check){
        editButton.style.display = 'block';
        confirmButton.style.display = 'none';
    } else{
        editButton.style.display = 'none';
        confirmButton.style.display = 'none';
    }
}

timeInputEl.addEventListener('focus', () => {
    messageEl2.style.display = 'block';
});

timeInputEl.addEventListener('focusout', () => {
    messageEl2.style.display = 'none';
});

editButton.addEventListener('click', () => {
    confirmButton.style.display =  'block';
    editButton.style.display = 'none';
    timeInputEl.style.display = 'block';
    timeEl.style.display = 'none';
    startButton.style.display = 'none';
    document.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            confirmTime();
        }
    });
});

confirmButton.addEventListener('click', () => {
    confirmTime();
});

function confirmTime(){
    confirmButton.style.display =  'none';
    editButton.style.display = 'block';
    let editedTime = timeInputEl.value;
    timeInputEl.style.display = 'none';
    timeEl.style.display = 'block';
    if(editedTime != ''){
        let editedTimeDisplay = parseInt(editedTime) < 10 ? `0${editedTime}` : editedTime;
        timeEl.textContent = `${editedTimeDisplay}:00`;
        timer = parseInt(editedTime) * 60;
    } else{
        timer = pomodoroTime;
    }
    startButton.style.display = 'block';
}


function timerTextContentCheck(){
    if(timer == pomodoroTime) timeEl.textContent = `25:00`;
    else if(timer == shortTime) timeEl.textContent = `05:00`;
    else timeEl.textContent = `15:00`;
}

timeEl.textContent = '25:00';

pomodoroEl.addEventListener('click', () => {
    pomodoroEl.classList.add("active");
    shortEl.classList.remove("active");
    longEl.classList.remove("active");
    timer = pomodoroTime;
    temp = timer;
    timerTextContentCheck();
    editCheck(false);
    confirmButton.style.display = 'none';
});

shortEl.addEventListener('click', () => {
    pomodoroEl.classList.remove("active");
    shortEl.classList.add("active");
    longEl.classList.remove("active");
    timer = shortTime;
    temp = timer;
    timerTextContentCheck();
    editCheck(true);
});

longEl.addEventListener('click', () => {
    pomodoroEl.classList.remove("active");
    shortEl.classList.remove("active");
    longEl.classList.add("active");
    timer = longTime;
    temp = timer;
    timerTextContentCheck();
    editCheck(true);
});

startButton.addEventListener('click', () => {
    editCheck(true);
    temp = timer;
    if(shortEl.classList.contains("active") || longEl.classList.contains("active")){
        startTimer(true);
    } else{
        startTimer(false)
    }
});


function pauseTimer(timerName, timerTime){
            clearInterval(timerName);
            temp = timerTime;
            countdown(temp);
}

function editCheckTab(tab){
    if(tab){
        editCheck(true);
    } else{
        editCheck(false);
    }
}

function startTimer(tab){

    const startTimerVar = setInterval(() => {

        afterStartButtons()

        temp--;
        countdown(temp)

        if(temp == -1){
            pauseTimer(startTimerVar, timer);
            backToNormal();
        }

        endButton.addEventListener('click', () => {
            pauseTimer(startTimerVar, timer);
            backToNormal();
            editCheckTab(tab);
        });

        pauseButton.addEventListener('click', () => {
            pauseTimer(startTimerVar, temp); 
            pauseButton.style.display = 'none';   
            resumeButton.style.display = 'block';   
        });

    }, 1000)
}

resumeButton.addEventListener('click', () => {
    pauseButton.style.display = 'display';   
    resumeButton.style.display = 'none';   
    startTimer(true);
});


function countdown(duration){
        
    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    timeEl.textContent = `${minutes}:${seconds}`;

    document.title = `${minutes}:${seconds}`;

}


function afterStartButtons(){
    messageEl.style.display = 'block';
    
    shortEl.style.pointerEvents = 'none';
    longEl.style.pointerEvents = 'none';
    pomodoroEl.style.pointerEvents = 'none';
    startButton.style.display = "none";
    pauseButton.style.display = "block";
    endButton.style.display = "block";
}


function backToNormal(){
    startButton.style.display = "block";
    pauseButton.style.display = "none";
    resumeButton.style.display = 'none';
    endButton.style.display = "none";

    shortEl.style.pointerEvents = 'auto';
    longEl.style.pointerEvents = 'auto';
    pomodoroEl.style.pointerEvents = 'auto';

    messageEl.style.display = 'none';
}

