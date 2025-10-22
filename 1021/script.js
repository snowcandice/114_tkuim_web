// --- 邏輯拆分：獨立的轉換函式 ---

// 攝氏 (C) 轉 華氏 (F)
function convertCToF(celsius) {
    return celsius * 9 / 5 + 32;
}

// 華氏 (F) 轉 攝氏 (C)
function convertFToC(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

// 攝氏 (C) 轉 開氏 (K)
function convertCToK(celsius) {
    // 絕對零度約為 -273.15°C
    return celsius + 273.15; 
}

// 開氏 (K) 轉 攝氏 (C)
function convertKToC(kelvin) {
    return kelvin - 273.15;
}

// --- 主要流程函式 (包含巢狀條件與多重迴圈) ---

function processConversion(temp, unit) {
    let resultText = "";
    let convertedTemp;

    // 巢狀條件檢查：判斷來源單位
    if (unit === "C") {
        // C 轉 F
        convertedTemp = convertCToF(temp);
        resultText += `${temp}°C = ${convertedTemp.toFixed(2)}°F\n`;
        // C 轉 K
        convertedTemp = convertCToK(temp);
        resultText += `${temp}°C = ${convertedTemp.toFixed(2)}K`;

    } else if (unit === "F") {
        // F 轉 C
        convertedTemp = convertFToC(temp);
        resultText += `${temp}°F = ${convertedTemp.toFixed(2)}°C\n`;
        // F 轉 K (間接轉換: F -> C -> K)
        let tempC = convertFToC(temp);
        convertedTemp = convertCToK(tempC);
        resultText += `${temp}°F = ${convertedTemp.toFixed(2)}K`;

    } else if (unit === "K") {
        // K 轉 C
        convertedTemp = convertKToC(temp);
        resultText += `${temp}K = ${convertedTemp.toFixed(2)}°C\n`;
        // K 轉 F (間接轉換: K -> C -> F)
        let tempC = convertKToC(temp);
        convertedTemp = convertCToF(tempC);
        resultText += `${temp}K = ${convertedTemp.toFixed(2)}°F`;
        
    } else {
        resultText = "單位輸入錯誤，請輸入 C, F, 或 K！";
    }

    return resultText;
}

function startConverter() {
    let outputElement = document.getElementById("output");
    let continueLoop = true;
    let history = "--- 轉換歷史 ---\n";

    // 多重迴圈 (while)：持續讓使用者進行轉換
    while (continueLoop) {
        let tempInput = prompt("請輸入溫度數值 (輸入 EXIT 或點擊取消退出)：");

        // 檢查退出條件
        if (tempInput === null || tempInput.toUpperCase() === 'EXIT') {
            continueLoop = false;
            break;
        }

        let temp = parseFloat(tempInput);
        if (isNaN(temp)) {
            alert("數值輸入錯誤，請重新輸入！");
            continue; // 跳過當前迴圈，重新開始
        }
        
        // 內層邏輯：要求輸入單位
        let unitInput = prompt(`請輸入 ${temp} 的單位 (C, F, 或 K)：`);
        if (unitInput === null) {
            continueLoop = false;
            break;
        }
        let unit = unitInput.toUpperCase().trim();

        // 執行轉換，使用拆分的函式
        let currentResult = processConversion(temp, unit);

        alert("轉換結果:\n" + currentResult);
        
        // 更新歷史紀錄
        history += `\n輸入: ${temp}°${unit}\n${currentResult}\n--------------------\n`;
        outputElement.innerText = history;

    } // 迴圈結束

    // 退出後顯示最終訊息
    history += "\n轉換器已退出。點擊按鈕重新啟動。";
    outputElement.innerText = history;
}
