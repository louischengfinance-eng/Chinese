// 奇門遁甲計算模組

class QimenCalculator {
    constructor() {
        // 天干
        this.tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

        // 地支
        this.dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

        // 八門
        this.bamen = ['休門', '死門', '傷門', '杜門', '開門', '驚門', '生門', '景門'];

        // 九星
        this.jiuxing = ['天蓬星', '天芮星', '天沖星', '天輔星', '天禽星', '天心星', '天柱星', '天任星', '天英星'];

        // 八神
        this.bashen = ['值符', '騰蛇', '太陰', '六合', '白虎', '玄武', '九地', '九天'];

        // 九宮
        this.jiugong = ['坎一宮', '坤二宮', '震三宮', '巽四宮', '中五宮', '乾六宮', '兌七宮', '艮八宮', '離九宮'];

        // 八門含義
        this.bamenMeaning = {
            '休門': '休養生息，宜休息、旅遊、尋醫問藥。利於養生，不利於進取。',
            '生門': '生生不息，大吉之門。宜求財、謀事、開業、婚嫁。萬事皆宜。',
            '傷門': '破財損傷，凶門。不宜投資、出行，易有口舌是非。宜收賬討債。',
            '杜門': '閉塞不通，宜隱藏、藏匿。不宜求財、謀事。適合修煉、學習。',
            '景門': '光明景象，吉門。宜考試、宣傳、表演。利文不利武。',
            '死門': '死氣沉沉，大凶之門。諸事不宜，唯弔喪、打獵、捕捉可用。',
            '驚門': '驚恐不安，凶門。易有驚嚇、官司、口舌。宜鳴鑼擊鼓、捕捉。',
            '開門': '開通順達，大吉之門。宜開業、出行、求財、謀事。百事皆宜。'
        };

        // 九星含義
        this.jiuxingMeaning = {
            '天蓬星': '主智謀盜賊，為水星。利於暗中行事，不利光明正大之事。',
            '天芮星': '主疾病陰私，為土星。需注意健康，防範小人。',
            '天沖星': '主衝動急躁，為木星。宜速戰速決，不宜拖延。',
            '天輔星': '主文化教育，為木星。利考試、學習、求學。大吉之星。',
            '天禽星': '主中央土德，為土星。中正平和，可以任意為之。',
            '天心星': '主醫療謀略，為金星。利於治病、策劃、求醫。吉星。',
            '天柱星': '主官司爭訟，為金星。易有是非糾紛，需謹慎行事。',
            '天任星': '主富貴財帛，為土星。利於求財、經商。大吉之星。',
            '天英星': '主文書印信，為火星。利於考試、求名、文書之事。'
        };

        // 局數（根據節氣和時辰確定）
        this.juShu = ['陽遁一局', '陽遁二局', '陽遁三局', '陽遁四局', '陽遁五局',
                      '陽遁六局', '陽遁七局', '陽遁八局', '陽遁九局',
                      '陰遁一局', '陰遁二局', '陰遁三局', '陰遁四局', '陰遁五局',
                      '陰遁六局', '陰遁七局', '陰遁八局', '陰遁九局'];
    }

    // 計算值符（根據時辰）
    getZhifu(timeIndex) {
        return this.bashen[timeIndex % 8];
    }

    // 計算值使（根據時辰）
    getZhishi(timeIndex) {
        return this.bamen[timeIndex % 8];
    }

    // 計算局數（簡化版，基於月份和日期）
    getJuShu(month, day) {
        const isYang = month >= 2 && month <= 7; // 春夏為陽遁
        const baseNum = (month + day) % 9;
        const offset = isYang ? 0 : 9;
        return this.juShu[baseNum + offset];
    }

    // 排九宮格局
    arrangeJiuGong(timeIndex, month, day) {
        const jiuGongData = [];

        for (let i = 0; i < 9; i++) {
            const gong = {
                name: this.jiugong[i],
                position: i + 1,
                star: this.jiuxing[(i + timeIndex) % 9],
                door: this.bamen[(i + timeIndex) % 8],
                shen: this.bashen[(i + timeIndex) % 8],
                tiangan: this.tiangan[(i + timeIndex + month) % 10],
                dizhi: this.dizhi[(i + timeIndex + day) % 12]
            };
            jiuGongData.push(gong);
        }

        return jiuGongData;
    }

    // 分析用神宮位
    analyzeYongshen(jiuGongData, question) {
        // 根據問題類型選擇用神宮位
        let yongshenIndex = 0;

        if (question.includes('財') || question.includes('錢') || question.includes('投資')) {
            yongshenIndex = 6; // 生門主財
        } else if (question.includes('工作') || question.includes('事業') || question.includes('升職')) {
            yongshenIndex = 4; // 開門主事業
        } else if (question.includes('感情') || question.includes('婚姻') || question.includes('戀愛')) {
            yongshenIndex = 5; // 六合主婚姻
        } else if (question.includes('考試') || question.includes('學習') || question.includes('讀書')) {
            yongshenIndex = 7; // 景門主文書
        } else if (question.includes('健康') || question.includes('疾病') || question.includes('醫療')) {
            yongshenIndex = 5; // 天心主醫療
        } else {
            yongshenIndex = 4; // 默認看開門
        }

        const yongshenGong = jiuGongData[yongshenIndex];
        return yongshenGong;
    }

    // 判斷吉凶
    analyzeJixiong(gong) {
        const door = gong.door;
        const star = gong.star;

        let jixiong = '';
        let score = 0;

        // 吉門
        if (['開門', '生門', '休門', '景門'].includes(door)) {
            score += 2;
        }
        // 凶門
        if (['死門', '傷門', '驚門'].includes(door)) {
            score -= 2;
        }

        // 吉星
        if (['天輔星', '天心星', '天任星', '天英星'].includes(star)) {
            score += 1;
        }
        // 凶星
        if (['天蓬星', '天芮星'].includes(star)) {
            score -= 1;
        }

        if (score >= 3) {
            jixiong = '大吉';
        } else if (score >= 1) {
            jixiong = '小吉';
        } else if (score >= -1) {
            jixiong = '平';
        } else if (score >= -3) {
            jixiong = '小凶';
        } else {
            jixiong = '大凶';
        }

        return { jixiong, score };
    }

    // 生成建議
    generateAdvice(yongshenGong, jixiongResult) {
        const { jixiong } = jixiongResult;
        const door = yongshenGong.door;
        const star = yongshenGong.star;

        let advice = '';

        if (jixiong === '大吉' || jixiong === '小吉') {
            advice = `目前時局有利，${this.bamenMeaning[door]}\n`;
            advice += `${star}照臨，${this.jiuxingMeaning[star]}\n`;
            advice += `建議：把握時機，積極行動，順勢而為，必有所成。`;
        } else if (jixiong === '平') {
            advice = `時局平穩，吉凶參半。${this.bamenMeaning[door]}\n`;
            advice += `${star}照臨，${this.jiuxingMeaning[star]}\n`;
            advice += `建議：謹慎行事，穩紮穩打，不宜冒進也不必過於保守。`;
        } else {
            advice = `目前時局不利，${this.bamenMeaning[door]}\n`;
            advice += `${star}照臨，${this.jiuxingMeaning[star]}\n`;
            advice += `建議：暫緩行動，養精蓄銳，等待時機。可多做準備工作。`;
        }

        return advice;
    }

    // 主計算函數
    calculate(year, month, day, timeIndex, question = '') {
        const zhifu = this.getZhifu(timeIndex);
        const zhishi = this.getZhishi(timeIndex);
        const juShu = this.getJuShu(month, day);
        const jiuGongData = this.arrangeJiuGong(timeIndex, month, day);
        const yongshenGong = this.analyzeYongshen(jiuGongData, question);
        const jixiongResult = this.analyzeJixiong(yongshenGong);
        const advice = this.generateAdvice(yongshenGong, jixiongResult);

        return {
            zhifu,
            zhishi,
            juShu,
            jiuGongData,
            yongshenGong,
            jixiongResult,
            advice,
            question
        };
    }

    // 生成HTML結果
    generateHTML(result) {
        const { zhifu, zhishi, juShu, jiuGongData, yongshenGong, jixiongResult, advice, question } = result;

        let html = '';

        if (question) {
            html += `<p><strong>問事：</strong>${question}</p><br>`;
        }

        html += `
            <div class="qimen-info">
                <p><strong>時局：</strong>${juShu}</p>
                <p><strong>值符：</strong>${zhifu} | <strong>值使：</strong>${zhishi}</p>
            </div>

            <h4 style="margin-top: 25px; margin-bottom: 15px; color: #667eea;">九宮格局</h4>
            <div class="qimen-grid">
        `;

        // 九宮格排列順序：4 9 2 / 3 5 7 / 8 1 6 (洛書順序)
        const luoshuOrder = [3, 8, 1, 2, 4, 6, 7, 0, 5];

        for (let i = 0; i < 9; i++) {
            const gongIndex = luoshuOrder[i];
            const gong = jiuGongData[gongIndex];
            const isYongshen = gong.name === yongshenGong.name;

            html += `
                <div class="qimen-palace ${isYongshen ? 'yongshen-palace' : ''}">
                    <div class="palace-title">${gong.name}</div>
                    <div class="palace-content">
                        <div class="palace-item"><span class="label">星：</span>${gong.star}</div>
                        <div class="palace-item"><span class="label">門：</span>${gong.door}</div>
                        <div class="palace-item"><span class="label">神：</span>${gong.shen}</div>
                        <div class="palace-item small">${gong.tiangan}${gong.dizhi}</div>
                    </div>
                </div>
            `;
        }

        html += `
            </div>

            <div class="qimen-result">
                <h4>用神宮位分析</h4>
                <p><strong>用神落宮：</strong>${yongshenGong.name}</p>
                <p><strong>吉凶判斷：</strong><span class="jixiong ${jixiongResult.jixiong}">${jixiongResult.jixiong}</span></p>

                <h4 style="margin-top: 20px;">宮位詳情</h4>
                <p><strong>九星：</strong>${yongshenGong.star}</p>
                <p><strong>八門：</strong>${yongshenGong.door}</p>
                <p><strong>八神：</strong>${yongshenGong.shen}</p>
                <p><strong>天干地支：</strong>${yongshenGong.tiangan}${yongshenGong.dizhi}</p>

                <h4 style="margin-top: 20px;">奇門建議</h4>
                <p style="white-space: pre-line; line-height: 1.8;">${advice}</p>
            </div>
        `;

        return html;
    }
}
