const gameBox = document.getElementById("gameBox");

const bestDisplay = document.getElementById("best");
const averageDisplay = document.getElementById("average");
const attemptsDisplay = document.getElementById("attempts");


let startTime;

let timeout;

let gameStarted = false;
let waiting = false;

let bestTime = null;

let attempts = 0;

let times = [];



// Start game

gameBox.addEventListener("click", function(){

     if(waiting){
        clearTimeout(timeout);
        gameBox.textContent="TOO SOON!";
        gameBox.style.background="#800020";
        waiting=false;
        return;
     }

    if(gameStarted){
        
        let reactionTime = Date.now() - startTime;
         let rating = "";

         if(reactionTime < 200){
             rating = "⚡ Lightning Reflex!";
    }
         else if(reactionTime < 300){
             rating = "🔥 Fast!";
    }
         else if(reactionTime < 500){
               rating = "🙂 Good!";
    }
         else{
             rating = "🐢 Keep Practicing!";
    }

        gameBox.textContent = reactionTime + " ms ⚡" + rating;

        gameBox.style.background = "#800020";


        attempts++;

        attemptsDisplay.textContent = attempts;



        times.push(reactionTime);


        let total = times.reduce((a,b)=> a+b,0);

        let average = Math.round(total / times.length);


        averageDisplay.textContent = average;



        if(bestTime === null || reactionTime < bestTime){

            bestTime = reactionTime;

            bestDisplay.textContent = bestTime;

            localStorage.setItem("bestTime", bestTime);

        }   
        gameStarted = false;


        return;

    }



    gameBox.textContent="WAIT...";

    gameBox.style.background="#b22222";

     waiting = true;

    let randomTime = Math.random()*3000 + 2000;



    timeout = setTimeout(()=>{

        waiting = false;
        gameBox.textContent="CLICK!";

        gameBox.style.background="#228B22";


        startTime = Date.now();


        gameStarted=true;



    }, randomTime);


});

let savedBest = localStorage.getItem("bestTime");
if(savedBest){
    bestTime = savedBest;
    bestDisplay.textContent = savedBest;
}