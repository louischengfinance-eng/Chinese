// 主程序 - 整合所有算命模組

// 初始化所有計算器
const baziCalculator = new BaziCalculator();
const ziweiCalculator = new ZiweiCalculator();
const yijingCalculator = new YijingCalculator();

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

    // 顯示加載動畫
    showLoading();

    // 模擬計算延遲（增加儀式感）
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

        // 隱藏輸入區域，顯示結果
        document.querySelector('.input-section').style.display = 'none';
        document.getElementById('resultSection').style.display = 'block';

        // 滾動到結果區域
        document.getElementById('resultSection').scrollIntoView({ behavior: 'smooth' });

        hideLoading();
    }, 1500);
});

// 重新算命
function resetForm() {
    document.querySelector('.input-section').style.display = 'block';
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('userForm').reset();

    // 滾動到頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 顯示加載動畫
function showLoading() {
    // 創建加載遮罩
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingOverlay';
    loadingDiv.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0, 0, 0, 0.7); display: flex; justify-content: center;
                    align-items: center; z-index: 9999;">
            <div style="background: white; padding: 30px; border-radius: 15px; text-align: center;">
                <div style="font-size: 3em; margin-bottom: 20px;">🔮</div>
                <div style="font-size: 1.2em; color: #667eea;">正在為您推算命理...</div>
                <div style="margin-top: 15px; color: #999;">請稍候</div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingDiv);
}

// 隱藏加載動畫
function hideLoading() {
    const loadingDiv = document.getElementById('loadingOverlay');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// 頁面加載完成後的初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('算命系統已準備就緒');

    // 設置默認日期為今天
    const today = new Date();
    const defaultDate = today.toISOString().split('T')[0];
    // 不自動設置，讓用戶手動選擇

    // 添加一些交互提示
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
        });

        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// 添加一些額外的CSS樣式（通過JavaScript）
const style = document.createElement('style');
style.textContent = `
    .ming-gong {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        color: white !important;
    }

    .ming-gong .palace-name,
    .ming-gong .palace-stars {
        color: white !important;
    }

    .shen-gong {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%) !important;
        color: white !important;
    }

    .shen-gong .palace-name,
    .shen-gong .palace-stars {
        color: white !important;
    }

    input, select, textarea {
        transition: transform 0.2s ease;
    }

    @media print {
        .input-section,
        .btn-secondary,
        header {
            display: none !important;
        }

        .result-section {
            display: block !important;
        }
    }
`;
document.head.appendChild(style);
