class Dog {
    constructor(id) {
        this.id = id;
        this.happiness = 100;
        this.hunger = 100;
        this.energy = 100;
        this.isSleeping = false;
        this.updateBars();
        this.startStatusDecrease();
    }

    updateBars() {
        document.getElementById(`happiness-bar${this.id}`).style.width = `${this.happiness}%`;
        document.getElementById(`hunger-bar${this.id}`).style.width = `${this.hunger}%`;
        document.getElementById(`energy-bar${this.id}`).style.width = `${this.energy}%`;
        
        document.getElementById(`happiness-value${this.id}`).textContent = `${Math.round(this.happiness)}%`;
        document.getElementById(`hunger-value${this.id}`).textContent = `${Math.round(this.hunger)}%`;
        document.getElementById(`energy-value${this.id}`).textContent = `${Math.round(this.energy)}%`;
    }

    startStatusDecrease() {
        setInterval(() => {
            // Hlad klesá rychleji
            this.hunger = Math.max(0, this.hunger - 0.3);
            
            // Energie se pomalu doplňuje
            this.energy = Math.min(100, this.energy + 0.1);
            
            // Štěstí klesá rychleji když je pejsek hladový
            if (this.hunger < 30) {
                this.happiness = Math.max(0, this.happiness - 0.2);
            } else {
                this.happiness = Math.max(0, this.happiness - 0.05);
            }
            
            this.updateBars();
        }, 1000);
    }

    feed() {
        this.hunger = Math.min(100, this.hunger + 30);
        this.happiness = Math.min(100, this.happiness + 15);
        this.energy = Math.min(100, this.energy + 10);
        this.updateBars();
    }

    play() {
        this.happiness = Math.min(100, this.happiness + 25);
        this.energy = Math.max(0, this.energy - 15);
        this.hunger = Math.max(0, this.hunger - 5);
        this.updateBars();
        
        const dog = document.getElementById(`dog${this.id}`);
        dog.classList.add('playing');
        setTimeout(() => {
            dog.classList.remove('playing');
        }, 1000);
    }

    pet() {
        this.happiness = Math.min(100, this.happiness + 20);
        this.energy = Math.min(100, this.energy + 5);
        this.updateBars();
        
        const dog = document.getElementById(`dog${this.id}`);
        dog.classList.add('playing');
        setTimeout(() => {
            dog.classList.remove('playing');
        }, 500);
    }

    lick() {
        this.happiness = Math.min(100, this.happiness + 15);
        this.energy = Math.max(0, this.energy - 5);
        this.updateBars();
        
        const dog = document.getElementById(`dog${this.id}`);
        dog.classList.add('licking');
        setTimeout(() => {
            dog.classList.remove('licking');
        }, 1000);
    }

    sleep() {
        if (this.isSleeping) return;
        
        this.isSleeping = true;
        this.happiness = Math.min(100, this.happiness + 10);
        this.energy = Math.min(100, this.energy + 30);
        this.hunger = Math.max(0, this.hunger - 5);
        this.updateBars();
        
        const dog = document.getElementById(`dog${this.id}`);
        dog.classList.add('sleeping');
        
        setTimeout(() => {
            this.isSleeping = false;
            dog.classList.remove('sleeping');
        }, 5000); // Spí 5 sekund
    }
}

// Vytvoření tří pejsků
const dogs = {
    1: new Dog(1),
    2: new Dog(2),
    3: new Dog(3)
};

function feedDog(id) {
    dogs[id].feed();
}

function playWithDog(id) {
    dogs[id].play();
}

function petDog(id) {
    dogs[id].pet();
}

function getLicked(id) {
    dogs[id].lick();
}

function sleepDog(id) {
    dogs[id].sleep();
} 