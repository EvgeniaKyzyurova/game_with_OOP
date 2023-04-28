const startBtn = document.querySelector('.start');
const fightBtn = document.querySelector('.fight');
const charactersList = document.querySelector('.characters-list');
const battleField = document.querySelector('.battle-field');
const maxHealth = 100;

class Unit { 
    constructor(img, name, healthPoints, attackDmg,damageReduction, attackSpeed) { 
        this.img = img; 
        this.name = name; 
        this.healthPoints = healthPoints; 
        this.attackDmg = attackDmg;
        this.damageReduction = damageReduction; 
        this.attackSpeed = attackSpeed; 
    } 
}

class Game{
    start(){
        startBtn.addEventListener('click',() => {
            alert('Choose your fighter');
            startBtn.classList.add('hidden');
            const display = new Display();
            display.renderHero();
            
        });
    }
}

class Display{
    renderHero(){
        /* eslint-disable no-magic-numbers */
        const hero1 = new Unit('arthas.jpg', 'Arthas', maxHealth, 30, 15, 1);
        /* eslint-disable no-magic-numbers */
        const hero2 = new Unit('boy.jpg', 'Elf', maxHealth, 50, 4, 1.3);
        /* eslint-disable no-magic-numbers */
        const hero3 = new Unit('girl.jpg', 'Night furia', maxHealth, 20, 8, 0.7);
        /* eslint-disable no-magic-numbers */
        const hero4 = new Unit('grommash.jpg', 'Grommash', maxHealth, 45, 3, 1.5);
        /* eslint-disable no-magic-numbers */
        const hero5 = new Unit('ilidan.jpg', 'Ilidan', maxHealth, 25, 13, 1.2);
        /* eslint-disable no-magic-numbers */
        const hero6 = new Unit('magician.jpg', 'Magician ork', maxHealth, 53, 12, 1.6);
        /* eslint-disable no-magic-numbers */
        const hero7 = new Unit('men.jpg', 'Цarrior', maxHealth, 37, 14, 0.9);
        /* eslint-disable no-magic-numbers */
        const hero8 = new Unit('nightelf.jpg', 'Night elf', maxHealth, 26, 11, 0.8);
        /* eslint-disable no-magic-numbers */
        const hero9 = new Unit('tirande.jpg', 'Tirande', maxHealth, 28, 10, 2);
        const herous = [hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8, hero9];
        this.creatingHero(herous);   
    }
    creatingHero(herous){
        for(let i=0; i<herous.length; i++){
            const box = document.createElement('div');
            box.className='hero';
            const img = document.createElement('img');
            img.src = `./img/${herous[i].img}`;
            const name = document.createElement('p');
            name.textContent = `Name: ${herous[i].name}`;
            const attackDmg = document.createElement('p');
            attackDmg.textContent = `Attack damage: ${herous[i].attackDmg}`;
            const attackSpeed = document.createElement('p');
            attackSpeed.textContent = `Attack speed: ${herous[i].attackSpeed}`;
            const damageReduction = document.createElement('p');
            damageReduction.textContent = `Damage reduction: ${herous[i].damageReduction}`;
    
            box.appendChild(img);
            box.appendChild(name);
            box.appendChild(attackDmg);
            box.appendChild(attackSpeed);
            box.appendChild(damageReduction);

            if(charactersList.classList.contains('hidden')){
                const health = document.createElement('progress');
                const healthTitle = document.createElement('p');
                health.setAttribute('value', herous[i].healthPoints);
                health.setAttribute('max', maxHealth);
                healthTitle.textContent = `Health: ${herous[i].healthPoints}`;
                box.appendChild(healthTitle);
                box.appendChild(health);
                battleField.appendChild(box);
                
            }else{
                charactersList.appendChild(box);
            }
            
            box.addEventListener('click',() => {
                charactersList.classList.add('hidden');
                const userHero = herous[i];
                alert(`you have chosen a hero ${userHero.name}`);
                this.creatingHero([userHero]);
                const newHerous = herous.filter((el) => {
                    if(userHero.name !== el.name){
                        return el;
                    }
                    return el;
                });
                const randomHero = Math.round(Math.random()*newHerous.length);
                this.creatingHero([newHerous[randomHero]]);
                fightBtn.classList.remove('hidden');
                fightBtn.addEventListener('click',() => {
                    const sec = 1000;
                    let timerId = setInterval(() => this.fight(userHero, newHerous[randomHero], timerId), sec);
                    timerId;
                })
                
            });
        }
    }
    
    fight(userHero, randomHero, timerId){
        let userHerosHealth = userHero.healthPoints;
        let randomHerosHealth = randomHero.healthPoints;

        userHerosHealth = Math.min(userHerosHealth - 
            (randomHero.attackDmg/randomHero.attackSpeed - userHero.damageReduction), maxHealth);
        userHero.healthPoints = Math.max(Math.round(userHerosHealth), 0);


        randomHerosHealth = Math.min(randomHerosHealth - 
            (userHero.attackDmg/userHero.attackSpeed - randomHero.damageReduction), maxHealth);
        randomHero.healthPoints = Math.max(Math.round(randomHerosHealth),0);
        
        const herousList = [userHero, randomHero];
        battleField.textContent = '';
        this.creatingHero(herousList);
        if(userHerosHealth <= 0){
            clearInterval(timerId);
            console.log('fight end');
            alert(`Hero ${randomHero.name} is a winner`);
            location.reload();
        }else if(randomHerosHealth <= 0){
            clearInterval(timerId);
            console.log('fight end');
            alert(`Hero ${userHero.name} is a winner`);
            location.reload();
        }
        
    }
}

const startGame = new Game();
startGame.start();