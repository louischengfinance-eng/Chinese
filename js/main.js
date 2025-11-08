// 主程序 - 整合所有算命模組

// 初始化所有計算器
const baziCalculator = new BaziCalculator();
const ziweiCalculator = new ZiweiCalculator();
const yijingCalculator = new YijingCalculator();
const qimenCalculator = new QimenCalculator();

// 表單提交處理
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 獲取用戶輸入
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const birthDate = document.getElementById('birthDate').value;
    const birthTime = parseInt(document.getElementById('birthTime').value);
    const question = document.getElementById('question').value;

    // 解析出生日期
    const dateObj = new Date(birthDate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    // 顯示燒符動畫
    showTalismanAnimation(() => {
        // 燒符完成後顯示加載提示
        showLoading();

        // 模擬計算延遲
        setTimeout(() => {
            // 計算八字
            const baziResult = baziCalculator.calculate(year, month, day, birthTime);
            const baziHTML = baziCalculator.generateHTML(baziResult);
            document.getElementById('baziResult').innerHTML = baziHTML;

            // 計算紫微斗數
            const ziweiResult = ziweiCalculator.calculate(year, month, day, birthTime, gender);
            const ziweiHTML = ziweiCalculator.generateHTML(ziweiResult);
            document.getElementById('ziweiResult').innerHTML = ziweiHTML;

            // 計算易經六爻
            const yijingResult = yijingCalculator.calculate(year, month, day, birthTime, question);
            const yijingHTML = yijingCalculator.generateHTML(yijingResult);
            document.getElementById('yijingResult').innerHTML = yijingHTML;

            // 計算奇門遁甲
            const qimenResult = qimenCalculator.calculate(year, month, day, birthTime, question);
            const qimenHTML = qimenCalculator.generateHTML(qimenResult);
            document.getElementById('qimenResult').innerHTML = qimenHTML;

            // 隱藏輸入區域，顯示結果
            document.querySelector('.input-section').style.display = 'none';
            document.getElementById('resultSection').style.display = 'block';

            // 滾動到結果區域
            setTimeout(() => {
                document.getElementById('resultSection').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);

            hideLoading();
        }, 1000);
    });
});

// 重新算命
function resetForm() {
    document.querySelector('.input-section').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('userForm').reset();

    // 滾動到頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 燒符動畫
function showTalismanAnimation(callback) {
    // 創建燒符容器
    const talismanContainer = document.createElement('div');
    talismanContainer.className = 'talisman-container';

    talismanContainer.innerHTML = `
        <div class="talisman">
            <div class="talisman-text">
                勅令<br>
                天地玄黃<br>
                宇宙洪荒<br>
                日月盈昃<br>
                辰宿列張<br>
                急急如律令
            </div>
            <div class="fire-effect" id="fireEffect"></div>
        </div>
    `;

    document.body.appendChild(talismanContainer);

    // 延遲添加火焰效果
    setTimeout(() => {
        const fireEffect = document.getElementById('fireEffect');

        // 創建多個火焰
        for (let i = 0; i < 15; i++) {
            const flame = document.createElement('div');
            flame.className = 'flame';
            flame.style.left = `${Math.random() * 100}%`;
            flame.style.animationDelay = `${Math.random() * 0.5}s`;
            flame.style.animationDuration = `${0.1 + Math.random() * 0.2}s`;

            // 隨機高度
            flame.style.height = `${40 + Math.random() * 40}px`;

            // 延遲顯示火焰
            setTimeout(() => {
                flame.style.opacity = '1';
            }, i * 50);

            fireEffect.appendChild(flame);
        }

        // 符紙燃燒效果
        const talisman = talismanContainer.querySelector('.talisman');
        setTimeout(() => {
            talisman.style.transition = 'all 1.5s ease-out';
            talisman.style.opacity = '0';
            talisman.style.transform = 'scale(0.5)';
            talisman.style.filter = 'brightness(2) blur(3px)';
        }, 1500);

    }, 800);

    // 2.5秒後移除動畫並執行回調
    setTimeout(() => {
        talismanContainer.style.opacity = '0';
        setTimeout(() => {
            talismanContainer.remove();
            if (callback) callback();
        }, 300);
    }, 2800);
}

// 顯示加載動畫
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingOverlay';
    loadingDiv.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0, 0, 0, 0.85); display: flex; justify-content: center;
                    align-items: center; z-index: 9999; backdrop-filter: blur(5px);">
            <div style="background: white; padding: 40px; border-radius: 20px; text-align: center;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); animation: pulse 1.5s ease-in-out infinite;">
                <div style="font-size: 4em; margin-bottom: 20px; animation: rotate 2s linear infinite;">🔮</div>
                <div style="font-size: 1.3em; color: #667eea; font-weight: 600; margin-bottom: 10px;">
                    正在為您推算命理...
                </div>
                <div style="color: #999; font-size: 0.95em;">觀星象，察命數，請稍候</div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingDiv);

    // 添加動畫樣式
    if (!document.getElementById('loadingStyles')) {
        const style = document.createElement('style');
        style.id = 'loadingStyles';
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// 隱藏加載動畫
function hideLoading() {
    const loadingDiv = document.getElementById('loadingOverlay');
    if (loadingDiv) {
        loadingDiv.style.opacity = '0';
        setTimeout(() => {
            loadingDiv.remove();
        }, 300);
    }
}

// 頁面加載完成後的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔮 線上算命系統已準備就緒');

    // 添加輸入框交互效果
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // 添加按鈕點擊波紋效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 添加卡片進入動畫
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 觀察所有結果卡片
    setTimeout(() => {
        const cards = document.querySelectorAll('.result-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    }, 100);
});

// 添加波紋效果的CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
