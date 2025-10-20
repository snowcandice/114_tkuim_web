// example1_script.js
// 傳統語法：僅使用 var、function、字串串接

// 顯示提示窗
alert('歡迎來到 JavaScript！');

// 在 Console 顯示訊息
console.log('Hello JavaScript from console');

// 在頁面指定區域輸出文字
var el = document.getElementById('result');
el.textContent = '黎蔓霓 412630245';

// 🔹 延伸練習：監聽按鈕事件
var btn = document.getElementById('btnHello');
btn.addEventListener('click', function() {
  alert('嗨～這是按鈕觸發的訊息！');
});
