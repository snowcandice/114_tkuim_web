document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const interestsContainer = document.getElementById('interestsContainer');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    let isSubmitting = false; // 防重送旗標

    /**
     * @description: 獲取欄位自定義錯誤訊息的中文內容
     * @param {HTMLInputElement} inputElement
     * @returns {string} 錯誤訊息
     */
    const getCustomErrorMessage = (input) => {
        if (input.validity.valueMissing) {
            return '此欄位為必填。';
        }
        if (input.name === 'email' && input.validity.typeMismatch) {
            return '請輸入有效的 Email 格式。';
        }
        if (input.name === 'phone' && input.validity.patternMismatch) {
            return '手機號碼必須是 10 碼數字。';
        }
        if (input.name === 'password' && input.validity.tooShort) {
            return `密碼長度不足，至少需要 ${input.minLength} 碼。`;
        }
        if (input.name === 'password' && input.value && !/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(input.value)) {
            return '密碼必須包含英文字母和數字。';
        }
        if (input.name === 'confirmPassword' && input.value !== passwordInput.value) {
            return '兩次輸入的密碼不一致。';
        }
        if (input.name === 'terms' && input.validity.customError) {
            return '您必須同意服務條款才能註冊。';
        }
        return '';
    };

    /**
     * @description: 顯示或清除錯誤訊息，並更新 aria-invalid 狀態。
     * @param {HTMLInputElement} input
     * @param {string} message 錯誤訊息
     */
    const displayError = (input, message) => {
        const errorElement = document.getElementById(input.getAttribute('aria-describedby'));
        if (!errorElement) return;

        input.setCustomValidity(message ? 'Invalid' : ''); // Constraint Validation API
        errorElement.textContent = message;
        input.classList.toggle('invalid', !!message); // CSS 樣式控制
        input.setAttribute('aria-invalid', !!message); // 可及性

        // 處理 checkbox 的特殊情況 (因為它沒有 aria-describedby)
        if (input.type === 'checkbox') {
            const checkboxError = document.getElementById('terms-error');
            if(checkboxError) checkboxError.textContent = message;
        }
    };

    /**
     * @description: 驗證單個欄位，並顯示錯誤訊息。
     * @param {HTMLInputElement} input
     * @returns {boolean} 驗證結果
     */
    const validateField = (input) => {
        let message = '';
        input.setCustomValidity(''); // 每次驗證前清除舊的自定義訊息

        if (!input.checkValidity()) {
            message = getCustomErrorMessage(input);
        } else {
            // 處理自定義邏輯（如英數混合密碼、確認密碼）
            message = getCustomErrorMessage(input);
        }

        displayError(input, message);
        return !message;
    };

    /**
     * @description: 計算密碼強度 (加分項)
     * @param {string} password
     */
    const updatePasswordStrength = (password) => {
        const strengthBar = document.getElementById('password-strength');
        const strengthText = strengthBar.querySelector('.strength-text');
        let score = 0;
        let level = 'none';

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score < 2) { level = 'weak'; strengthText.textContent = '弱'; }
        else if (score < 4) { level = 'medium'; strengthText.textContent = '中'; }
        else if (score >= 4) { level = 'strong'; strengthText.textContent = '強'; }
        else { level = 'none'; strengthText.textContent = '無'; }

        strengthBar.setAttribute('data-level', password ? level : 'none');
    };

    // --- 事件監聽器 ---

    // 1. 即時驗證 (blur & input)
    form.querySelectorAll('input:not([type="checkbox"])').forEach(input => {
        // blur 後才啟用完整的錯誤提示
        input.addEventListener('blur', () => {
            validateField(input);
            // 處理 localStorage 暫存 (加分項)
            localStorage.setItem(input.name, input.value);
        });

        // input 時即時清除或更新提示
        input.addEventListener('input', () => {
            // 如果欄位已經有錯誤 (表示 blur 過)，則即時驗證
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
            // 密碼強度即時更新 (加分項)
            if (input.name === 'password') {
                updatePasswordStrength(input.value);
                // 也要檢查確認密碼，因為密碼的改變會影響它
                validateField(confirmPasswordInput);
            }
        });
    });

    // 2. 興趣標籤 (事件委派)
    interestsContainer.addEventListener('click', (e) => {
        const tag = e.target.closest('.interest-tag');
        if (!tag) return;

        tag.classList.toggle('selected');
        validateInterests();
    });

    // 興趣標籤驗證邏輯
    const validateInterests = () => {
        const selectedTags = interestsContainer.querySelectorAll('.interest-tag.selected').length;
        const errorElement = document.getElementById('interests-error');
        const required = interestsContainer.dataset.required === 'true';

        if (required && selectedTags === 0) {
            errorElement.textContent = '請至少選擇一個興趣標籤。';
            interestsContainer.setAttribute('aria-invalid', 'true');
            return false;
        } else {
            errorElement.textContent = '';
            interestsContainer.setAttribute('aria-invalid', 'false');
            return true;
        }
    };
    
    // 服務條款 (Checkbox) 驗證
    const termsCheckbox = document.getElementById('terms');
    termsCheckbox.addEventListener('change', () => {
        validateField(termsCheckbox);
        localStorage.setItem('terms', termsCheckbox.checked); // 暫存
    });
    termsCheckbox.addEventListener('blur', () => {
        validateField(termsCheckbox);
    });

    // 3. 送出攔截 (submit)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (isSubmitting) return; // 防重送檢查

        const allInputs = Array.from(form.querySelectorAll('input, button[data-interest]'));
        let isValid = true;
        let firstErrorInput = null;

        // 遍歷所有欄位進行最終驗證
        form.querySelectorAll('input[required]').forEach(input => {
            if (!validateField(input)) {
                isValid = false;
                if (!firstErrorInput) firstErrorInput = input;
            }
        });

        // 驗證興趣標籤
        if (!validateInterests()) {
            isValid = false;
        }

        if (!isValid) {
            // 聚焦第一個錯誤欄位
            if (firstErrorInput) {
                firstErrorInput.focus();
            }
            return;
        }

        // --- 成功：模擬送出與防重送機制 ---
        isSubmitting = true;
        submitBtn.disabled = true;
        submitBtn.textContent = '送出中';

        // 模擬 AJAX 延遲 1 秒
        setTimeout(() => {
            isSubmitting = false;
            submitBtn.disabled = false;
            submitBtn.textContent = '註冊';

            // 顯示成功訊息
            document.getElementById('successMessage').style.display = 'block';

            // 清除暫存 (加分項)
            localStorage.clear();

            // 重設表單狀態
            //form.reset(); // 清除欄位內容
            form.querySelectorAll('.error-message').forEach(p => p.textContent = '');
            form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
            document.querySelectorAll('.interest-tag.selected').forEach(tag => tag.classList.remove('selected'));
            updatePasswordStrength('');

            // 成功訊息 3 秒後消失
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 3000);

        }, 1000);
    });

    // 4. 重設按鈕 (加分項)
    resetBtn.addEventListener('click', () => {
        form.reset();
        localStorage.clear(); // 清除 localStorage
        form.querySelectorAll('.error-message').forEach(p => p.textContent = '');
        form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
        document.querySelectorAll('.interest-tag.selected').forEach(tag => tag.classList.remove('selected'));
        updatePasswordStrength('');
        document.getElementById('successMessage').style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.textContent = '註冊';
        isSubmitting = false;
    });

    // 5. 恢復暫存資料 (加分項)
    const restoreFormData = () => {
        const fields = ['name', 'email', 'phone', 'password', 'confirmPassword'];
        fields.forEach(name => {
            const value = localStorage.getItem(name);
            if (value !== null) {
                const input = document.getElementById(name);
                if (input) input.value = value;
            }
        });

        // 恢復 checkbox
        const termsChecked = localStorage.getItem('terms') === 'true';
        if (termsCheckbox) termsCheckbox.checked = termsChecked;

        // 恢復密碼強度條
        if (passwordInput.value) {
            updatePasswordStrength(passwordInput.value);
        }
    };
    restoreFormData();
});

