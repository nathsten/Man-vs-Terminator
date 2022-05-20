var bulletInterval, enemyInterval

// Bullet logic

const Fire = () => {
    if(plane.bulletsLeft <= 0) return;
    const bullet = new Bullet();
    bullet.x = plane.x + 142;
    bullet.y = plane.y + 49;
    bullet.render();
    bullet.create();
    allBullets.push(bullet);
    pew.play();
    plane.bulletsLeft--;
}

(() => {
    let i;
    bulletInterval = setInterval(() => {
        for(i=0; i<allBullets.length; ++i){
            const b = allBullets[i];
            b.move();
            if(b.x > 1356){
                allBullets.splice(i, 1);
            }
        }
        checkHit();
        checkCrash();
        if(plane.bulletsLeft <= 0){
            plane.plane.classList.add("reload");
            setTimeout(() => {
                plane.bulletsLeft = 50;
                plane.plane.classList.remove("reload");    
            }, 2000);
        }
    }, 20);
})();

const checkHit = () => {
    for(let i=0; i<allBullets.length; ++i){
        const b = allBullets[i];
        for(let j=0; j<allEnemies.length; ++j){
            const e = allEnemies[j];
            if(b.x - 50 >= e.x && b.x <= e.x + 180 && b.y + 40 >= e.y && b.y <= e.y + 100){
                e.health -= 20;
                if(e.health <= 0){
                    allEnemies.splice(j, 1);
                    world.removeChild(e.enemy);
                    TotalPoints += 200;
                    const expl = new Explosion();
                    expl.x = e.x;
                    expl.y = e.y;
                    expl.render();
                    expl.create();
                    bang.play();
                    world.classList.add("shake");
                    setTimeout(() => {
                        world.removeChild(expl.exp);
                    }, 100);
                    setTimeout(() => {
                        world.classList.remove("shake");
                    }, 500);
                }
                allBullets.splice(i, 1);
                world.removeChild(b.bullet)
            }
        }
    }
    scoretxt.innerHTML = `Score: ${TotalPoints}`;
    LostShips.innerHTML = `Lost: ${lost}/10`;
}

// Crash logic

const checkCrash = () => {
    for(let i=0; i<allEnemies.length; ++i){
        const e = allEnemies[i];
        if(plane.x + 140 >= e.x && plane.x <= e.x + 100 && plane.y + 40 >= e.y && plane.y <= e.y + 100){
            allEnemies.splice(i, 1);
            world.removeChild(e.enemy);
            world.removeChild(plane.plane);
            const expl = new Explosion();
            expl.x = e.x-100;
            expl.y = e.y;
            expl.render();
            expl.create();
            world.classList.add("shake");
            setTimeout(() => {
                world.removeChild(expl.exp);
                clearInterval(enemyInterval);
                GameOver.style.display = "block";
                GameOver.innerHTML = `
                    <h1>You crashed!</h1>
                    <button id="restart" onclick="location.reload()" style="top: 4rem" class="blink">Start Over</button>
                `;
            }, 150);
            setTimeout(() => {
                world.classList.remove("shake");
            }, 500);
            if(TotalPoints > HighScore){
                HighScore = TotalPoints;
                localStorage.setItem("highscore", JSON.stringify(HighScore));
                HiScore.innerHTML = `Hi: ${HighScore}`;
            }
        }
    }
}

// Enemy logic
let maxE = 8;
const generateEnemies = () => {
    if(allEnemies.length < 8){
        for(let i=0; i < maxE - allEnemies.length; ++i){
            const enemy = new Enemy();
            enemy.x = Math.floor(Math.random() * 1000 ) + 1400;
            enemy.y = Math.floor(Math.random() * 600 );
            if(TotalPoints >= 5000) enemy.v = -2;
            if(TotalPoints >= 10000) {
                enemy.v = -3
                maxE = 9;
            };
            if(TotalPoints >= 15000) {
                enemy.v = -4;
                maxE = 10;
                enemy.health = 140;
            }
            if(TotalPoints >= 20000) {
                enemy.v = -5;
                maxE = 10;
                enemy.health = 160;
            }
            if(TotalPoints >= 25000) {
                enemy.v = -5;
                maxE = 12;
                enemy.health = 200;
            }
            if(TotalPoints >= 25000) {
                enemy.v = -6;
                maxE = 12;
                enemy.health = 240;
            }
            enemy.render();
            enemy.create();
            allEnemies.push(enemy);
        }
    }
}

const start = () => {
    let i;
    enemyInterval = setInterval(() => {
        generateEnemies();
        for(i=0; i<allEnemies.length; ++i){
            const e = allEnemies[i];
            e.move();
            if(e.x < - 200){
                allEnemies.splice(i, 1);
                TotalPoints -= 500;
                lost += 1;
            }
        }
        if(lost >= 10){
            clearInterval(enemyInterval);
      
            GameOver.style.display = "block";
            GameOver.innerHTML = `
                <h1>Mission failed!</h1>
                <p>You let more than 10 terminator ships pass you! <br> Mankind is now history thanks to you!</p>
                <button id="restart" onclick="location.reload()" style="top: 4rem" class="blink">Start Over</button>
            `;
            if(TotalPoints > HighScore){
                HighScore = TotalPoints;
                localStorage.setItem("highscore", JSON.stringify(HighScore));
                HiScore.innerHTML = `Hi: ${HiScore}`;
            }
        } 
    }, 20);
};