const timeEl = document.querySelector("#time");

let pomodoro = .25 * 60;
let short = 5 * 60;
let long = 15 * 60;

// while(pomodoro > 0){
//     setInterval(() => { 
//         countdown(pomodoro);
//         pomodoro--;
//        }, 1000);
// }

const countdownTimer = setInterval(() => { 
    countdown(pomodoro);
    if(pomodoro == -1){
        clearInterval(countdownTimer);
        pomodoro = .25 * 60;
        countdown(pomodoro);
    }
    pomodoro--;
    }, 1000);

function countdown(duration){

    let minutes = Math.floor(duration / 60);
    let seconds = duration % 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    timeEl.textContent = `${minutes}:${seconds}`;

}

