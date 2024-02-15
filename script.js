// Generates a random choice
function getComputerChoice () {
    const words = ['ROCK', 'PAPER', 'SCISSORS'];
    const randomIndex = Math.floor(Math.random() * words.length);
    const computerChoice = words[randomIndex];
    return computerChoice;
}
// Takes two inputs, the random one, and from the Player
function playRound (playerSelection, computerSelection) {
    if (!['ROCK', 'PAPER', 'SCISSORS'].includes(playerSelection)) {
        return "Invalid Selection."
    }

    if (playerSelection === computerSelection) {
        return "It's a tie.";
    } else if (computerSelection === "ROCK" && playerSelection === "SCISSORS" ||
    computerSelection === "PAPER" && playerSelection === "ROCK" ||
    computerSelection === "SCISSORS" && playerSelection === "PAPER") {
        return `You lose! ${computerSelection} beats ${playerSelection}.`;
    } else {
        return `You win! ${playerSelection} beats ${computerSelection}.`;
    }
}
// Loops it over 5 times to make a round system
function playGame () {
    let playerScore = 0;
    let computerScore = 0;  
    for (let i = 1; i <= 5; i++) {
        let computerSelection = getComputerChoice();
        let playerSelection = prompt("ROCK, PAPER, or SCISSORS?");
        playerSelection = playerSelection.toUpperCase();
        console.log(playRound(playerSelection, computerSelection));
        let result = playRound(playerSelection, computerSelection);
        if (result.includes("win")) {
            playerScore++;
        } else if (result.includes("lose")) {;
            computerScore++;
        } 
    }
    if (playerScore > computerScore) {
        console.log(`Game Over! You won the game with ${playerScore} points.`)
    } else if (playerScore < computerScore) {
        console.log(`Game Over! You lost the game by ${computerScore} points. Better luck next time.`)
    } else {
        console.log("Tie!")
    }
}

playGame();