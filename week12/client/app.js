// -------------------- 配置 API --------------------
const API_LOGIN = 'http://localhost:3001/auth/login';
const API_SIGNUP = 'http://localhost:3001/api/signup';

// -------------------- DOM --------------------
const loginSection = document.getElementById('loginSection');
const appSection = document.getElementById('appSection');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginMsg = document.getElementById('loginMsg');
const appMsg = document.getElementById('appMsg');
const list = document.getElementById('list');
const userInfo = document.getElementById('userInfo');
const logoutBtn = document.getElementById('logoutBtn');

// -------------------- 工具 --------------------
function getToken() {
  return localStorage.getItem('token');
}

function showLogin() {
  loginSection.style.display = 'block';
  appSection.style.display = 'none';
}

function showApp() {
  loginSection.style.display = 'none';
  appSection.style.display = 'block';
}

// -------------------- 初始化 --------------------
if (getToken()) {
  showApp();
  initApp();
} else {
  showLogin();
}

// -------------------- 登入 --------------------
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch(API_LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      loginMsg.textContent = data.error || '登入失敗';
      return;
    }

    // 存 token + user
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // 切換畫面
    showApp();
    initApp();
  } catch (err) {
    console.error(err);
    loginMsg.textContent = '登入過程發生錯誤';
  }
});

// -------------------- 登出 --------------------
logoutBtn.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

// -------------------- 初始化系統 --------------------
function initApp() {
  const user = JSON.parse(localStorage.getItem('user'));
  userInfo.textContent = `登入中：${user.email}（${user.role}）`;
  loadData();
}

// -------------------- 取得報名資料 --------------------
async function loadData() {
  list.innerHTML = '';
  appMsg.textContent = '';

  try {
    const res = await fetch(API_SIGNUP, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });

    if (res.status === 401) {
      alert('登入過期，請重新登入');
      localStorage.clear();
      location.reload();
      return;
    }

    const data = await res.json();

    if (data.data.length === 0) {
      list.innerHTML = '<li>目前沒有資料</li>';
      return;
    }

    data.data.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.name} (${p.email}) `;

      const btn = document.createElement('button');
      btn.textContent = '刪除';
      btn.onclick = async () => {
        if (!confirm('確定刪除？')) return;

        const r = await fetch(`${API_SIGNUP}/${p.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${getToken()}` }
        });

        if (r.ok) loadData();
        else alert('權限不足或操作失敗');
      };

      li.appendChild(btn);
      list.appendChild(li);
    });

  } catch (err) {
    console.error(err);
    appMsg.textContent = '資料載入失敗';
  }
}

// -------------------- 新增報名 --------------------
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const body = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value
  };

  try {
    const res = await fetch(API_SIGNUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const data = await res.json();
      appMsg.textContent = data.error || '新增失敗';
      return;
    }

    e.target.reset();
    loadData();
  } catch (err) {
    console.error(err);
    appMsg.textContent = '送出失敗';
  }
});
