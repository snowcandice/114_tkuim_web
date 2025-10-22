// 遊戲狀態變數
let targetNumber;
let guessCount;
let gameActive = false;
const MAX_NUMBER = 100;
const MIN_NUMBER = 1;

// --- 輔助函式：處理輸入與驗證 ---

/**
 * 初始化遊戲：設定目標數字、重置計數器和狀態。
 */
function initializeGame() {
    // 隨機產生 MIN_NUMBER 到 MAX_NUMBER 之間的整數
    targetNumber = Math.floor(Math.random() * MAX_NUMBER) + MIN_NUMBER;
    guessCount = 0;
    gameActive = true;
    console.log("答案 (僅供測試): " + targetNumber);
}

/**
 * 處理使用者輸入並進行驗證
 * @returns {number | null} - 有效的猜測數字，或 null (表示取消/無效輸入)
 */
function getValidGuess() {
    const guessInput = prompt(`請輸入一個 ${MIN_NUMBER} 到 ${MAX_NUMBER} 之間的數字：`);

    // 處理使用者點擊「取消」
    if (guessInput === null) {
        return null;
    }

    const guess = parseInt(guessInput.trim());

    // 驗證輸入是否為有效數字 (1-100)
    if (isNaN(guess) || guess < MIN_NUMBER || guess > MAX_NUMBER) {
        alert(`輸入無效。請輸入一個介於 ${MIN_NUMBER} 到 ${MAX_NUMBER} 之間的有效數字。`);
        document.getElementById('output').innerText = "輸入無效。請重新輸入。";
        // 遞迴呼叫自己，直到獲得有效輸入或使用者取消
        return getValidGuess(); 
    }

    return guess;
}

// --- 輔助函式：處理輸出與結果判斷 ---

/**
 * 根據猜測結果更新 DOM 和彈出提示。
 * @param {number} guess - 使用者的猜測數字
 * @returns {boolean} - true 表示猜中，false 表示未猜中
 */
function handleGuessResult(guess) {
    guessCount++;
    let message = "";
    let isCorrect = false;

    if (guess < targetNumber) {
        // 太小
        message = `你猜了 ${guess}。太小了！再大一點。`;
        document.getElementById('output').innerText = `${message} (這是你的第 ${guessCount} 次猜測)`;
        alert(message);
    } else if (guess > targetNumber) {
        // 太大
        message = `你猜了 ${guess}。太大了！再小一點。`;
        document.getElementById('output').innerText = `${message} (這是你的第 ${guessCount} 次猜測)`;
        alert(message);
    } else {
        // 猜中
        isCorrect = true;
        const finalMessage = `恭喜你！你猜對了！答案就是 ${targetNumber}。\n總共猜了 ${guessCount} 次！`;
        alert(finalMessage);
        document.getElementById('output').innerText = finalMessage + " 點擊「開始猜測」重新開始。";
    }
    
    return isCorrect;
}

/**
 * 處理猜測邏輯的主迴圈 (使用遞迴實現迴圈邏輯)
 */
function gameLoop() {
    if (!gameActive) {
        return; // 遊戲結束時停止執行
    }

    // 1. 取得使用者輸入 (使用拆分的函式)
    const guess = getValidGuess();

    // 2. 處理使用者點擊「取消」
    if (guess === null) {
        document.getElementById('output').innerText = "遊戲已取消。點擊「開始猜測」重新開始。";
        gameActive = false;
        return;
    }

    // 3. 判斷猜測結果 (使用拆分的函式)
    const isCorrect = handleGuessResult(guess);

    // 4. 根據結果決定是否繼續 (遞迴)
    if (isCorrect) {
        gameActive = false; // 猜對了，結束遊戲
    } else {
        // 繼續遊戲：遞迴呼叫 gameLoop
        gameLoop(); 
    }
}

// --- 主要流程控制函式 ---

function startGame() {
    initializeGame();
    document.getElementById('output').innerText = `遊戲開始！請在跳出的對話框中輸入你的猜測數字 (${MIN_NUMBER}-${MAX_NUMBER})。`;

    // 啟動主遊戲迴圈
    gameLoop();
}