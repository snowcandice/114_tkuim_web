// example3_script.js
// 使用 prompt 取得輸入，並做基本運算

var name = prompt('請輸入你的名字：');
if (!name) {
  name = '同學';
}

var a = prompt('請輸入數字 A：');
var b = prompt('請輸入數字 B：');

var numA = parseFloat(a);
var numB = parseFloat(b);

var output = '';
output += '哈囉，' + name + '！\n\n';
output += 'A = ' + numA + ', B = ' + numB + '\n';
output += 'A + B = ' + (numA + numB) + '\n';
output += 'A - B = ' + (numA - numB) + '\n';
output += 'A * B = ' + (numA * numB) + '\n';
output += 'A / B = ' + (numA / numB) + '\n';
output += 'A > B ? ' + (numA > numB) + '\n';
output += 'A == B ? ' + (numA == numB) + '（僅比較值）\n';
output += 'A === B ? ' + (numA === numB) + '（比較值與型態）\n';
output += 'A % B = ' + (numA % numB) + '（餘數運算）\n'; // 延伸範例
//用途:
// 1.判斷奇偶數：if (n % 2 === 0) → 偶數
//2.重複週期運算：例如輪播、排班、或顏色切換
//3.控制遊戲中「每幾次觸發某事件」
       
alert('計算完成，請看頁面結果與 Console');
console.log(output);
document.getElementById('result').textContent = output;
