/**
 * @param {string} ids 
 * @returns {HTMLElement[]}
 */
const $ = ids => ids.split(" ").map(id => document.getElementById(id));

const [ world, scoretxt, LostShips, startBtn, MainMenu, GameOver, HiScore ] = $("world scoretxt LostShips start MainMenu GameOver HiScore");

const allBullets = [];
const allEnemies = [];
var TotalPoints = 0;
var HighScore = 0;
var lost = 0;

const plane = new Fighter();
plane.render();
plane.create();

const pew = new Audio("./Graphics/Pew.wav");
const bang = new Audio("./Graphics/bang.wav");


document.addEventListener("keydown", ({ key }) => {
    if(key === "ArrowDown"){
        const y = plane.y + 10;
        if(y > 724 - 100) return;
        plane.move(plane.x, y);
    }
    if(key === "ArrowUp"){
        const y = plane.y - 10;
        if(y <= 0) return;
        plane.move(plane.x, y);
    }
    if(key === "ArrowLeft"){
        const x = plane.x - 10;
        if(x <= 0) return;
        plane.move(x, plane.y);
    }
    if(key === "ArrowRight"){
        const x = plane.x + 10;
        if(x > 200) return;
        plane.move(x, plane.y);
    }
});

document.addEventListener("keyup", ({ key }) => {
    if(key === " ") Fire();
})

startBtn.addEventListener("click", () => {
    MainMenu.style.display = "none";
    GameOver.style.display = "none";
    start();
});

if(localStorage.getItem("highscore")){
    HighScore = JSON.parse(localStorage.getItem("highscore"));
    HiScore.innerHTML = `Hi: ${HighScore}`;
}