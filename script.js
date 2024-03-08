// Generates a random choice
function getEnemyChoice () {
    const words = ['SWORD', 'AXE', 'LANCE'];
    const randomIndex = Math.floor(Math.random() * words.length);
    const enemyChoice = words[randomIndex];
    return enemyChoice;
}

function getRandomSfx (randomSfx) {
    const victorySfx = [
        'sfx/victory-sfx-1.mp3',
        'sfx/victory-sfx-2.mp3',
        'sfx/victory-sfx-3.mp3',
    ];

    const defeatSfx = [
        'sfx/defeat-sfx-1.mp3',
        'sfx/defeat-sfx-2.mp3',
        'sfx/defeat-sfx-3.mp3',
    ];
    const sfx = (randomSfx === 'victory') ? victorySfx : defeatSfx;
    const randomIndex = Math.floor(Math.random() * sfx.length);
    return sfx[randomIndex];
}

const bgMusic = document.querySelector("#bgMusic");
bgMusic.volume = 0.1;

const originalBgVolume = bgMusic.volume;

function reduceBgMusicVolume() {
    bgMusic.volume = originalBgVolume * 0.5;
}

function restoreBgMusicVolume() {
    bgMusic.volume = originalBgVolume;
}

const soundEffects = document.querySelectorAll(".sfx");

soundEffects.forEach((soundEffect) => {
    soundEffect.addEventListener('play', reduceBgMusicVolume);
    soundEffect.addEventListener('ended', restoreBgMusicVolume);
})

const endgameModal = document.querySelector("#endgameModal");
const endgameMsg = document.querySelector("#endgameMsg");


function stopRoundSfx() {
    roundSfx.currentTime = 0;
    roundSfx.pause();
};


function checkPlayerScore(playerScore) {
    if (playerScore == 5) {
        endgameModal.style.display = "block";
        endgameMsg.textContent = "You win";
        stopRoundSfx();
        victorySfx = document.querySelector("#victorySfx");
        victorySfx.src = getRandomSfx("victory");
        victorySfx.autoplay = true;
    }
};

function checkEnemyScore(enemyScore) {
    if (enemyScore == 5) {
        endgameModal.style.display = "block";
        endgameMsg.textContent = "You died";
        stopRoundSfx();
        defeatSfx = document.querySelector("#defeatSfx");
        defeatSfx.src = getRandomSfx("defeat");
        defeatSfx.autoplay = true;
    }
};

let playerScoreText = document.querySelector("#playerScore");
let enemyScoreText = document.querySelector("#enemyScore");
let playerScore = 0;
let enemyScore = 0;
let scoreInfo = document.querySelector(".score-info");
let scoreMessage = document.querySelector(".score-message");
let roundSfx = document.querySelector("#roundSfx");
roundSfx.volume = 0.05;
roundSfx.autoplay = true;

// Takes two inputs, from the Player, and the random one
function playGame (playerSelection, enemySelection) {
    if (playerSelection === enemySelection) {
        scoreInfo.textContent = "It's a tie!";
        scoreMessage.textContent = `${playerSelection} ties with ${enemySelection}`;
        roundSfx.setAttribute("src", "sfx/round-tie-sfx.mp3");
    } else if (enemySelection === "LANCE" && playerSelection === "SWORD" ||
    enemySelection === "SWORD" && playerSelection === "AXE" ||
    enemySelection === "AXE" && playerSelection === "LANCE") {
        scoreInfo.textContent = "You lose the round!";
        scoreMessage.textContent = `${playerSelection} is beaten by ${enemySelection}`;
        enemyScore++;
        enemyScoreText.textContent = `Enemy: ${enemyScore}`;
        checkEnemyScore(enemyScore);
        setRoundDefeatSfx();
    } else {
        scoreInfo.textContent = "You win the round!";
        scoreMessage.textContent = `${playerSelection} beats ${enemySelection}`;
        playerScore++;
        playerScoreText.textContent = `Player: ${playerScore}`;
        checkPlayerScore(playerScore);
        setRoundVictorySfx();
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

const weaponButtons = document.querySelector(".weapon-buttons");

const playerWeapon = document.querySelector("#playerWeapon");
const enemyWeapon = document.querySelector("#enemyWeapon");

function setRoundDefeatSfx() {
    if (enemyScore < 5) {
        roundSfx.setAttribute("src", "sfx/round-defeat-sfx.mp3");
    };
}

function setRoundVictorySfx() {
    if (playerScore < 5) {
        roundSfx.setAttribute("src", "sfx/round-win-sfx.mp3");
    };
}

function setEnemyWeaponImage(imageName) {
    enemyWeapon.setAttribute("src", `images/${imageName}.png`);
};

function setPlayerWeaponImage(imageName) {
    playerWeapon.setAttribute("src", `images/${imageName}.png`);
};

weaponButtons.addEventListener ("click", (event) => {
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

function stopMainSfx() {
    victorySfx.currentTime = defeatSfx.currentTime = 0;
    victorySfx.pause();
    defeatSfx.pause();
};


const endBtn = document.querySelector("#restartBtn");
endBtn.addEventListener("click", () => {
    playerScore = 0;
    enemyScore = 0;
    playerScoreText.textContent = `Player: ${playerScore}`;
    enemyScoreText.textContent = `Enemy: ${enemyScore}`;
    document.querySelector(".score-info").textContent = originalScoreInfo;
    document.querySelector(".score-message").textContent = originalScoreMessage;
    endgameModal.style.display = "none";
    setPlayerWeaponImage("select"), setEnemyWeaponImage("select");
    stopMainSfx();
});

const banners = document.querySelectorAll(".banners");
const themeChooser = document.querySelector("#themeChooser");

function changeBanner(bannerColor) {
    banners.forEach((banner) => {
        banner.setAttribute("src", `images/${bannerColor}-banner.png`);
    });
}

const modals = document.querySelectorAll(".modal-content");

function changeModalColor(borderColor, backgroundColor) {
    modals.forEach((modal) => {
        modal.style.borderColor = borderColor;
        modal.style.backgroundColor = backgroundColor;
    });
}

themeChooser.addEventListener("click", (event) => {
    let target = event.target;
    
    let header = document.querySelector("header");
    let body = document.querySelector("body");

    const blueFirst = getComputedStyle(document.body).getPropertyValue('--blue-first');
    const blueSecond = getComputedStyle(document.body).getPropertyValue('--blue-second');
    const redFirst = getComputedStyle(document.body).getPropertyValue('--red-first');
    const redSecond = getComputedStyle(document.body).getPropertyValue('--red-second');
    const yellowFirst = getComputedStyle(document.body).getPropertyValue('--yellow-first');
    const yellowSecond = getComputedStyle(document.body).getPropertyValue('--yellow-second');

    const blueHeaderBottom = getComputedStyle(document.body).getPropertyValue('--blue-header-bottom');
    const redHeaderBottom = getComputedStyle(document.body).getPropertyValue('--red-header-bottom');
    const yellowHeaderBottom = getComputedStyle(document.body).getPropertyValue('--yellow-header-bottom');

    const root = document.documentElement;

    const modalBlue = getComputedStyle(document.body).getPropertyValue('--modal-blue');
    const modalRed = getComputedStyle(document.body).getPropertyValue('--modal-red');
    const modalYellow = getComputedStyle(document.body).getPropertyValue('--modal-yellow');
    const blueThemeBtn = document.querySelector("#blueThemeBtn");
    const redThemeBtn = document.querySelector("#redThemeBtn");
    const yellowThemeBtn = document.querySelector("#yellowThemeBtn");

    switch(target.id) {
        case "blueThemeBtn":
            addInsetAndRemoveOthers(blueThemeBtn, [redThemeBtn, yellowThemeBtn])
            changeBanner("blue");
            header.style.backgroundColor = blueFirst;
            body.style.backgroundColor = blueSecond;
            header.style.borderBottomColor = blueHeaderBottom;
            changeModalColor(blueFirst, modalBlue);
            root.style.setProperty("--scrollbar-thumb-color", "#191970");
            playerScoreText.style.color = blueSecond;
            enemyScoreText.style.color = blueSecond;
            break;
        case "redThemeBtn":
            addInsetAndRemoveOthers(redThemeBtn, [blueThemeBtn, yellowThemeBtn])
            changeBanner("red")
            header.style.backgroundColor = redFirst;
            body.style.backgroundColor = redSecond;
            header.style.borderBottomColor = redHeaderBottom;
            changeModalColor(redFirst, modalRed);
            root.style.setProperty("--scrollbar-thumb-color", "#701919");
            playerScoreText.style.color = redSecond;
            enemyScoreText.style.color = redSecond;
            break;
        case "yellowThemeBtn":
            addInsetAndRemoveOthers(yellowThemeBtn, [redThemeBtn, blueThemeBtn])
            changeBanner("yellow")
            header.style.backgroundColor = yellowFirst;
            body.style.backgroundColor = yellowSecond;
            header.style.borderBottomColor = yellowHeaderBottom;
            changeModalColor(yellowFirst, modalYellow);
            root.style.setProperty("--scrollbar-thumb-color", "#A59719");
            playerScoreText.style.color = yellowSecond;
            enemyScoreText.style.color = yellowSecond;
            break;
    }
});

const bgmChooser = document.querySelector("#bgmChooser");

function changeBgm(bgm) {
    bgMusic.setAttribute("src", `sfx/${bgm}.mp3`);
}

let promiseBtn = document.querySelector("#promiseBtn")
let spiderwebsBtn = document.querySelector("#spiderwebsBtn")
let breezeBtn = document.querySelector("#breezeBtn")

function addFadeAndRemoveOthers(targetBtn, otherBtns) {
    targetBtn.classList.add('fa-fade');
    otherBtns.forEach(btn => btn.classList.remove('fa-fade'));
}

function addInsetAndRemoveOthers(targetBtn, otherBtns) {
    targetBtn.classList.add('theme-btn-active');
    otherBtns.forEach(btn => btn.classList.remove('theme-btn-active'));
}

bgmChooser.addEventListener('click', (event) => {
    let target = event.target;

    switch(target.id) {
        case "promiseBtn":
            changeBgm("promise");
            addFadeAndRemoveOthers(promiseBtn, [spiderwebsBtn, breezeBtn]);
            break;
        case "spiderwebsBtn":
            changeBgm("spiderwebs");
            addFadeAndRemoveOthers(spiderwebsBtn, [promiseBtn, breezeBtn]);
            break;
        case "breezeBtn":
            changeBgm("a-gentle-breeze");
            addFadeAndRemoveOthers(breezeBtn, [promiseBtn, spiderwebsBtn]);
            break;
    }    
})
