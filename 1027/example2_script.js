// example2_script.js
// 驗證 Email 與手機欄位，拋出自訂訊息後再提示使用者

const form = document.getElementById('contact-form');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

function showValidity(input) {
  if (input.validity.valueMissing) {
    input.setCustomValidity('這個欄位必填');
  } else if (input.validity.typeMismatch) {
    input.setCustomValidity('格式不正確，請確認輸入內容');
  } else if (input.validity.patternMismatch) {
    input.setCustomValidity(input.title || '格式不正確');
  } else {
    input.setCustomValidity('');
  }
  return input.reportValidity();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const emailValue = email.value.trim();
  const allowedDomain = "@o365.tku.edu.tw";

  if (!emailValue.endsWith(allowedDomain)) {
    email.setCustomValidity(`Email 必須以 ${allowedDomain} 結尾`);
    email.reportValidity(); // 顯示錯誤提示
    return; // 停止送出
  } else {
    email.setCustomValidity(''); // 清除錯誤
  }

  const emailOk = showValidity(email);
  const phoneOk = showValidity(phone);
  if (emailOk && phoneOk) {
    alert('表單驗證成功，準備送出資料');
    form.reset();
  }
});

email.addEventListener('blur', () => {
  // 若不是 o365.tku.edu.tw 也馬上提示
  const emailValue = email.value.trim();
  const allowedDomain = "@o365.tku.edu.tw";
  if (emailValue && !emailValue.endsWith(allowedDomain)) {
    email.setCustomValidity(`Email 必須以 ${allowedDomain} 結尾`);
  } else {
    email.setCustomValidity('');
  }
  showValidity(email);
});

phone.addEventListener('blur', () => {
  showValidity(phone);
});
