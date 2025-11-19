const form = document.querySelector('#signup-form');
const resultEl = document.querySelector('#result');
const btnList = document.querySelector('#btn-list');


async function submitSignup(data) {
const res = await fetch('http://localhost:3001/api/signup', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
});
const json = await res.json();
if (!res.ok) throw new Error(json.error || '報名失敗');
return json;
}


form.addEventListener('submit', async (e) => {
e.preventDefault();


const formData = new FormData(form);
const payload = Object.fromEntries(formData.entries());


payload.password = payload.confirmPassword = 'demoPass99';
payload.interests = ['後端入門'];
payload.terms = true;


try {
resultEl.textContent = '送出中...';
const result = await submitSignup(payload);
resultEl.textContent = JSON.stringify(result, null, 2);
form.reset();
} catch (err) {
resultEl.textContent = `錯誤：${err.message}`;
}
});


btnList.addEventListener('click', async () => {
resultEl.textContent = '讀取中...';
const res = await fetch('http://localhost:3001/api/signup');
const data = await res.json();
resultEl.textContent = JSON.stringify(data, null, 2);
});

