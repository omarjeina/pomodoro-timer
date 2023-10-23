const timeEl = document.querySelector("#time");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const endButton = document.querySelector("#end");


const pomodoroTime = .25 * 60;
const shortTime = 5 * 60;
const longTime = 15 * 60;

let pomodoro = pomodoroTime;
let short = shortTime;
let long = longTime;

timeEl.textContent = `00:15`;

startButton.addEventListener('click', () => {

    startButton.style.display = "none";
    pauseButton.style.display = "block";
    endButton.style.display = "block";

    const countdownTimer = setInterval(() => { 

        function endTimer(){
            clearInterval(countdownTimer);
            pomodoro = pomodoroTime;
            countdown(pomodoro);
        
        
            startButton.style.display = "block";
            pauseButton.style.display = "none";
            endButton.style.display = "none";
        }

        pomodoro--;
        countdown(pomodoro);

        if(pomodoro == -1){
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
    
    }
});




function endTimer(){
    clearInterval(countdownTimer);
    pomodoro = pomodoroTime;
    countdown(pomodoro);


    startButton.style.display = "block";
    pauseButton.style.display = "none";
    endButton.style.display = "none";
}


