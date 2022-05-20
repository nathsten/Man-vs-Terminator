class Fighter{
    constructor(){
        this.plane = document.createElement("div");
        this.x = 50;
        this.y = 200;
        this.w = 200;
        this.h = 140;
        this.bulletsLeft = 50;
    }

    render(){
        this.plane.style.right = `${this.x}px`;
        this.plane.style.top = `${this.y}px`;
    }

    create(){
        this.plane.classList.add("plane");
        this.plane.style.width = `${this.w}px`;
        this.plane.style.height = `${this.h}px`;
        world.append(this.plane);
    }

    move(x, y){
        this.x = x;
        this.y = y;
        this.render();
    }
}

class Enemy{
    constructor() {
        this.enemy = document.createElement("div");
        this.x = 1000;
        this.y = 200;
        this.w = 200;
        this.h = 140;
        this.v = -1;
        this.health = 100;
    }

    render(){
        this.enemy.style.right = `${this.x}px`;
        this.enemy.style.top = `${this.y}px`;
    }

    create(){
        this.enemy.classList.add("enemy");
        this.enemy.style.width = `${this.w}px`;
        this.enemy.style.height = `${this.h}px`;
        world.append(this.enemy);
    }

    move(x, y){
        this.x += this.v;
        this.render();
    }
}

class Bullet{
    constructor(){
        this.bullet = document.createElement("div");
        this.x = 0;
        this.y = 0;
        this.w = 10;
        this.h = 5;
        this.v = 5;
    }

    render(){
        this.bullet.style.right = `${this.x}px`;
        this.bullet.style.top = `${this.y}px`;
    }

    create(){
        this.bullet.classList.add("bullet");
        this.bullet.style.width = `${this.w}px`;
        this.bullet.style.height = `${this.h}px`;
        world.append(this.bullet);
    }

    move(){
        this.x += this.v;
        this.render();
    }
}

class Explosion{
    constructor() {
        this.exp = document.createElement("div");
        this.x = 1000;
        this.y = 200;
        this.w = 200;
        this.h = 140;
    }

    render(){
        this.exp.style.right = `${this.x}px`;
        this.exp.style.top = `${this.y}px`;
    }

    create(){
        this.exp.classList.add("explotion");
        this.exp.style.width = `${this.w}px`;
        this.exp.style.height = `${this.h}px`;
        world.append(this.exp);
    }
}