const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const passwordDisplay = document.getElementById('password');

lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
 });

    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        const includeUppercase = document.getElementById('uppercase').checked;
        const includeNumbers = document.getElementById('numbers').checked;
        const includeSymbols = document.getElementById('symbols').checked;

        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

            let chars = lowercase;
            if (includeUppercase) chars += uppercase;
            if (includeNumbers) chars += numbers;
            if (includeSymbols) chars += symbols;

            let password = '';
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                password += chars[randomIndex];
            }

            if (includeUppercase) {
                const pos = Math.floor(Math.random() * length);
                password = password.substring(0, pos) + 
                          uppercase[Math.floor(Math.random() * uppercase.length)] + 
                          password.substring(pos + 1);
            }
            if (includeNumbers) {
                const pos = Math.floor(Math.random() * length);
                password = password.substring(0, pos) + 
                          numbers[Math.floor(Math.random() * numbers.length)] + 
                          password.substring(pos + 1);
            }
            if (includeSymbols) {
                const pos = Math.floor(Math.random() * length);
                password = password.substring(0, pos) + 
                          symbols[Math.floor(Math.random() * symbols.length)] + 
                          password.substring(pos + 1);
            }

            passwordDisplay.textContent = password;
        }

        function copyPassword() {
            const password = passwordDisplay.textContent;
            if (password === 'Click generate to create password') return;
            
            navigator.clipboard.writeText(password)
                .then(() => {
                    const originalText = document.querySelector('.copy-btn').textContent;
                    document.querySelector('.copy-btn').textContent = 'Copied!';
                    setTimeout(() => {
                        document.querySelector('.copy-btn').textContent = originalText;
                    }, 1500);
                })
                .catch(err => {
                    console.error('Failed to copy password:', err);
                });
        }

        