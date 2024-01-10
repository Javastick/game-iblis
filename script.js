let xp = 0;
let health = 100;
let gold = 150;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stik"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    { name: 'stik', power: 5 },
    { name: 'pedang', power: 30 },
    { name: 'cocot', power: 50 },
    { name: 'kekuasaan', power: 100 }
];
const monsters = [
    {
        name: "tarjuddin",
        level: 2,
        health: 70,
        appeal: 'tjatt.png',
        attack: 'tjatt.png',
        hit: 'tjhit.png',
        miss: 'tjmiss.png',
        dodge: 'tjdodge.png',
        defeat: 'tjdef.png',
    },
    {
        name: "megawatt",
        level: 8,
        health: 20,
        appeal: 'megawatt.png',
        attack: 'megawatt.png',
        hit: 'megawatt.png',
        miss: 'megawatt.png',
        dodge: 'megawatt.png',
        defeat: 'megawatt.png',
    },
    {
        name: "Iblis Hitam",
        level: 13,
        health: 100,
        appeal: 'devil/appeal.png',
        hit: 'devil/hit.png',
        miss: 'devil/miss.png',
        dodge: 'devil/dodge.png',
    }
]
const locations = [
    {
        name: "town square",
        "button text": ["Pergi ke toko", "Pergi ke goa", "Gelut sama iblis"],
        "button functions": [goStore, goCave, fightDragon],
        place: "village.jpg",
        text: "Kamu sedang berada di Alun-alun Kota."
    },
    {
        name: "store",
        "button text": ["Beli Nyawa (Bayar 10 duit)", "Upgrade Senjata (30 duit)", "Kembali Ke Kota"],
        "button functions": [buyHealth, buyWeapon, goTown],
        place: "store.png",
        text: "Anda memasuki toko."
    },
    {
        name: "cave",
        "button text": ["Bunuh Megawatt", "Lawan Tarjuddin", "Kembali ke Kota"],
        "button functions": [fightMegawatt, fightTarjuddin, goTown],
        place: "cave.jpg",
        text: "Kamu masuk ke goa dan ternyata bukanya celsi yang kamu temukan melainkan dua ekor monster. Uuuu takut kalo kata guwe teh."
    },
    {
        name: "fight",
        "button text": ["Serang", "Tangkis", "Kabur cuyy, aku terlalu lemah untuk kamu yang wahh"],
        "button functions": [attack, dodge, goTown],
        text: "Ayo kamu pasti bisa mengalahkanya!!"
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["Mulai dari 0 lagi yah", "Emang bisa kaya dulu lagi?", "Respawn"],
        "button functions": [restart, restart, restart],
        text: "Yah kamu mati. ☠️",
        place: "over.jpg"
    },
    {
        name: "win",
        "button text": ["Terimakasih <3", "Tamat", "Main Lagi?"],
        "button functions": [restart, restart, restart],
        text: "Kamu menang!!!! Dengan mengalahkan Iblis hitam ini maka kamu telah menamatkan game tidak jelas ini! 🎉 Terimakasih telah memainkan game ini, ayo dukung saya dengan memberikan bintang di repo github saya, klik nama saya dibawah!",
        place: 'devil/defeat.png'
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";
    button2.style.display = "inline";
    button3.style.display = "inline";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
    document.getElementById("img").src = "img/"+location.place;
}
function youWin(){
    monsterStats.style.display = "none";
    button1.innerText = "Kembali ke Kota";
    button2.style.display = "none";
    button3.style.display = "none";
    button1.onclick = goTown;
    text.innerText = "Lah "+ monsters[fighting].name + " mati cuy, kasian sih, tapi lebih kasian aku...";
    document.getElementById("img").src = "img/" + monsters[fighting].defeat;
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "Duit anda tidak cukup untuk membeli nyawa.";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "Sekarang senjatamu adalah " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " Senjata di tas: " + inventory;
        } else {
            text.innerText = "Duit anda kurang untuk membeli sanjata.";
        }
    } else {
        text.innerText = "Kamu tidak bisa upgrade senjata lagi karena telah mendapatkan senjata paling kuat di galaksi!! Senjatamu sekarang adalah " + weapons[currentWeapon].name;
        button2.innerText = "Jual senjata dan dapatkan 15 duit";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}

function fightTarjuddin() {
    fighting = 0;
    goFight();
}

function fightMegawatt() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
    document.getElementById("img").src = "img/" + monsters[fighting].appeal;
}

function attack() {
    text.innerText = "Kamu menyerang menggunakan " + weapons[currentWeapon].name + ". Tapi,"+" ";
    text.innerText += monsters[fighting].name + " menyerangmu balik.";
    health -= getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
        document.getElementById("img").src = "img/" + monsters[fighting].hit;
    } else {
        text.innerText = " Eits gakena.";
        document.getElementById("img").src = "img/" + monsters[fighting].miss;
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
}

function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit > 0 ? hit : 0;
}

function isMonsterHit() {
    return Math.random() > .2 || health < 50;
}

function dodge() {
    text.innerText = "Kamu menangkis serangan pamungkas dari " + monsters[fighting].name;
    document.getElementById("img").src = "img/" + monsters[fighting].dodge;
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    youWin();
}
function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }
    if (numbers.indexOf(guess) !== -1) {
        text.innerText += "Right! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!";
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        }
    }
}