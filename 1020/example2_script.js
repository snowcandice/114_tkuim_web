// example2_script.js
// 變數宣告與基本型態操作

var text = '123';              // 字串
var num = 45;                  // 數字
var isPass = true;             // 布林
var emptyValue = null;         // 空值
var notAssigned;               // undefined（尚未指定）

// 型態檢查
var lines = '';
lines += 'text = ' + text + '，typeof: ' + (typeof text) + '\n';
lines += 'num = ' + num + '，typeof: ' + (typeof num) + '\n';
lines += 'isPass = ' + isPass + '，typeof: ' + (typeof isPass) + '\n';
lines += 'emptyValue = ' + emptyValue + '，typeof: ' + (typeof emptyValue) + '\n';
lines += 'notAssigned = ' + notAssigned + '，typeof: ' + (typeof notAssigned) + '\n\n';

// 轉型
var textToNumber = parseInt(text, 10); // 將 '123' → 123
lines += 'parseInt(\'123\') = ' + textToNumber + '\n';
lines += 'String(45) = ' + String(num) + '\n';

// 🔹 延伸練習：prompt() 讀入兩數並相加
// ----------------------------
var a = prompt('請輸入第一個數字：');
var b = prompt('請輸入第二個數字：');

// 將輸入的字串轉成數字
var numA = parseFloat(a);
var numB = parseFloat(b);

// 檢查是否為有效數字
if (isNaN(numA) || isNaN(numB)) {
  lines += '輸入錯誤，請輸入有效的數字！';
} else {
  var sum = numA + numB;
  lines += '您輸入的兩個數字相加結果為：' + sum;
}

document.getElementById('result').textContent = lines;
