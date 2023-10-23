const timeEl = document.querySelector("#time");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const endButton = document.querySelector("#end");

const pomodoroEl = document.querySelector("#pomodoro");
const shortEl = document.querySelector("#short");
const longEl = document.querySelector("#long");

const messageEl = document.querySelector("#message");


const pomodoroTime = 25 * 60;
const shortTime = 5 * 60;
const longTime = 15 * 60;

let timer = pomodoroTime;

function timerTextContentCheck(){
    if(timer == pomodoroTime) timeEl.textContent = `25:00`;
    else if(timer == shortTime) timeEl.textContent = `05:00`;
    else timeEl.textContent = `15:00`;
}

timeEl.textContent = '25:00';

startTimer('pomodoro');

pomodoroEl.addEventListener('click', () => {
    pomodoroEl.classList.add("active");
    shortEl.classList.remove("active");
    longEl.classList.remove("active");
    timer = pomodoroTime;
    timerTextContentCheck();
    startTimer('pomodoro');
});

shortEl.addEventListener('click', () => {
    pomodoroEl.classList.remove("active");
    shortEl.classList.add("active");
    longEl.classList.remove("active");
    timer = shortTime;
    timerTextContentCheck();
    startTimer('short');
});

longEl.addEventListener('click', () => {
    pomodoroEl.classList.remove("active");
    shortEl.classList.remove("active");
    longEl.classList.add("active");
    timer = longTime;
    timerTextContentCheck();
    startTimer('long');
});

function startTimer(timerName){


    startButton.addEventListener('click', () => {

        messageEl.style.display = 'block';

        shortEl.style.pointerEvents = 'none';
        longEl.style.pointerEvents = 'none';
        pomodoroEl.style.pointerEvents = 'none';

        startButton.style.display = "none";
        pauseButton.style.display = "block";
        endButton.style.display = "block";
    
        let temp = timer
    
        const countdownTimer = setInterval(() => { 
    
            function endTimer(){
                clearInterval(countdownTimer);
                temp = timer;
                countdown(temp);
            
            
                startButton.style.display = "block";
                pauseButton.style.display = "none";
                endButton.style.display = "none";

                shortEl.style.pointerEvents = 'auto';
                longEl.style.pointerEvents = 'auto';
                pomodoroEl.style.pointerEvents = 'auto';

                messageEl.style.display = 'none';
            }
    
            temp--;
            countdown(temp);
    
            if(temp == -1){
                endTimer();
            }
    
            endButton.addEventListener('click', () => {
                endTimer();
            });
    
            }, 1000);
        
        function countdown(duration){
        
            let minutes = Math.floor(duration / 60);
            let seconds = duration % 60;
        
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
        
            timeEl.textContent = `${minutes}:${seconds}`;

            document.title = `${minutes}:${seconds}`;
        
        }
    });
}




function endTimer(){
    clearInterval(countdownTimer);
    pomodoro = pomodoroTime;
    countdown(pomodoro);


    startButton.style.display = "block";
    pauseButton.style.display = "none";
    endButton.style.display = "none";
}


