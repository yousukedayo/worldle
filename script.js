const wordList = ["APPLE", "CODES", "SMART", "JAVAS", "UNITY"];
const correctWord = wordList[Math.floor(Math.random() * wordList.length)];
let attempts = 0;
let currentWord = "";

document.addEventListener("DOMContentLoaded", () => {
    createGrid();
});

function createGrid() {
    const board = document.getElementById("game-board");
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div");
            box.classList.add("letter-box");
            box.setAttribute("id", `box-${i}-${j}`);
            board.appendChild(box);
        }
    }
}

function handleKeyClick(key) {
    if (key === "Enter") {
        checkWord();
    } else if (key === "Backspace") {
        currentWord = currentWord.slice(0, -1);
    } else {
        if (currentWord.length < 5) {
            currentWord += key;
        }
    }
    updateGrid();
}

function updateGrid() {
    for (let i = 0; i < 5; i++) {
        let box = document.getElementById(`box-${attempts}-${i}`);
        box.textContent = currentWord[i] || "";
    }
}

function checkWord() {
    if (currentWord.length !== 5) {
        alert("Please enter a 5-letter word!");
        return;
    }

    let correct = correctWord.split("");

    for (let i = 0; i < 5; i++) {
        let box = document.getElementById(`box-${attempts}-${i}`);
        let key = document.getElementById(`key-${currentWord[i]}`);

        if (currentWord[i] === correct[i]) {
            box.classList.add("correct"); // 緑（正解）
            key.classList.add("correct");
        } else if (correct.includes(currentWord[i])) {
            box.classList.add("close"); // 黄色（位置違い）
            if (!key.classList.contains("correct")) {
                key.classList.add("close");
            }
        } else {
            box.classList.add("wrong"); // 灰色（不正解）
            if (!key.classList.contains("correct") && !key.classList.contains("close")) {
                key.classList.add("wrong");
            }
        }
    }

    if (currentWord === correctWord) {
        alert("Congratulations! 🎉 You guessed the word!");
    } else if (attempts >= 5) {
        alert("Game Over! The correct word was " + correctWord);
    }

    attempts++;
    currentWord = "";
}
