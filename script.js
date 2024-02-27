// Generates a random choice
function getEnemyChoice () {
    const words = ['SWORD', 'AXE', 'LANCE'];
    const randomIndex = Math.floor(Math.random() * words.length);
    const enemyChoice = words[randomIndex];
    return enemyChoice;
}

const endgameModal = document.querySelector("#endgameModal");
const endgameMsg = document.querySelector("#endgameMsg");

function checkPlayerScore(playerScore) {
    if (playerScore == 5) {
        endgameModal.style.display = "block";
        endgameMsg.textContent = "You win";
        removeButtonSelect();
    }
};

function checkEnemyScore(enemyScore) {
    if (enemyScore == 5) {
        endgameModal.style.display = "block";
        endgameMsg.textContent = "You died";
        removeButtonSelect();
    }
};

function removeButtonSelect() {
    buttons.removeEventListener("click", buttonSelect);
}

let playerScoreText = document.querySelector("#playerScore");
let enemyScoreText = document.querySelector("#enemyScore");
let playerScore = 0;
let enemyScore = 0;
let scoreInfo = document.querySelector(".score-info");
let scoreMessage = document.querySelector(".score-message");

// Takes two inputs, from the Player, and the random one
function playGame (playerSelection, enemySelection) {
    if (playerSelection === enemySelection) {
        scoreInfo.textContent = "It's a tie!";
        scoreMessage.textContent = `${playerSelection} ties with ${enemySelection}`;
    } else if (enemySelection === "LANCE" && playerSelection === "SWORD" ||
    enemySelection === "SWORD" && playerSelection === "AXE" ||
    enemySelection === "AXE" && playerSelection === "LANCE") {
        scoreInfo.textContent = "You lose the round!";
        scoreMessage.textContent = `${playerSelection} is beaten by ${enemySelection}`;
        enemyScore++;
        enemyScoreText.textContent = `Enemy: ${enemyScore}`;
        checkEnemyScore(enemyScore);
    } else {
        scoreInfo.textContent = "You win the round!";
        scoreMessage.textContent = `${playerSelection} beats ${enemySelection}`;
        playerScore++;
        playerScoreText.textContent = `Player: ${playerScore}`;
        checkPlayerScore(playerScore);
    }

    switch(enemySelection) {
        case 'SWORD':
            setEnemyWeaponImage("sword");
            break;
        case 'AXE':
            setEnemyWeaponImage("axe");
            break;
        case 'LANCE':
            setEnemyWeaponImage("lance");
            break;
    }
};

const buttons = document.querySelector(".buttons");

const playerWeapon = document.querySelector("#playerWeapon");
const enemyWeapon = document.querySelector("#enemyWeapon");

function setEnemyWeaponImage(imageName) {
    enemyWeapon.setAttribute("src", `images/${imageName}.png`);
};

function setPlayerWeaponImage(imageName) {
    playerWeapon.setAttribute("src", `images/${imageName}.png`);
};

buttons.addEventListener ("click", (event) => {
    let target = event.target;
    let playerSelection, enemySelection;
    switch(target.id) {
        case 'swordBtn':
            playerSelection = "SWORD";
            enemySelection = getEnemyChoice();
            playGame(playerSelection, enemySelection);
            setPlayerWeaponImage("sword");
            break;
        case 'axeBtn':
            playerSelection = "AXE";
            enemySelection = getEnemyChoice();
            playGame(playerSelection, enemySelection);
            setPlayerWeaponImage("axe");
            break;
        case 'lanceBtn':
            playerSelection = "LANCE";
            enemySelection = getEnemyChoice();
            playGame(playerSelection, enemySelection);
            setPlayerWeaponImage("lance");
            break;
    }
});

const howtoModal = document.querySelector("#howtoModal");
const closeBtn = document.querySelector(".close");

window.addEventListener("load", () => {
    howtoModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    howtoModal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if ((event.target == howtoModal)) {
        howtoModal.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const areas = document.querySelectorAll('map[name="triangle-map"] area');
    const infoBox = document.querySelector("#info-box");

    areas.forEach((area) => {
        area.addEventListener("mouseover", () => {
            const info = area.dataset.info;
            infoBox.textContent = info;
        });

        area.addEventListener("mouseout", () => {
            infoBox.textContent = "Hover for details"
        });
    });
});

const originalScoreInfo = document.querySelector(".score-info").textContent;
const originalScoreMessage = document.querySelector(".score-message").textContent;

const endBtn = document.querySelector("#restartBtn");
endBtn.addEventListener("click", () => {
    playerScore = 0;
    enemyScore = 0;
    playerScoreText.textContent = `Player: ${playerScore}`;
    enemyScoreText.textContent = `Enemy: ${enemyScore}`;
    document.querySelector(".score-info").textContent = originalScoreInfo;
    document.querySelector(".score-message").textContent = originalScoreMessage;
    endgameModal.style.display = "none";
    buttons.addEventListener('click', buttonSelect);    
});

/* Add bg; Add music; Add colors and better layout; Add sfx; */