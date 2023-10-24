const timeEl = document.querySelector("#time");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const resumeButton = document.querySelector("#resume");
const endButton = document.querySelector("#end");

const pomodoroEl = document.querySelector("#pomodoro");
const shortEl = document.querySelector("#short");
const longEl = document.querySelector("#long");

const messageEl = document.querySelector("#message");


const pomodoroTime = 25 * 60;
const shortTime = 5 * 60;
const longTime = 15 * 60;

let timer = pomodoroTime;

let pauseTemp = timer;

let temp = timer - 1;

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
});

shortEl.addEventListener('click', () => {
    pomodoroEl.classList.remove("active");
    shortEl.classList.add("active");
    longEl.classList.remove("active");
    timer = shortTime;
    temp = timer;
    timerTextContentCheck();
});

longEl.addEventListener('click', () => {
    pomodoroEl.classList.remove("active");
    shortEl.classList.remove("active");
    longEl.classList.add("active");
    timer = longTime;
    temp = timer;
    timerTextContentCheck();
});

startButton.addEventListener('click', () => {
    temp = timer;
    startTimer();
});


function pauseTimer(timerName, timerTime){
            clearInterval(timerName);
            temp = timerTime;
            countdown(temp);
}

function startTimer(){

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
    startTimer();
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
    endButton.style.display = "none";

    shortEl.style.pointerEvents = 'auto';
    longEl.style.pointerEvents = 'auto';
    pomodoroEl.style.pointerEvents = 'auto';

    messageEl.style.display = 'none';
}

