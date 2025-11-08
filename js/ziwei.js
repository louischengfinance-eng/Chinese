// 紫微斗數計算模組

class ZiweiCalculator {
    constructor() {
        // 十二宮位
        this.palaces = [
            '命宮', '兄弟宮', '夫妻宮', '子女宮', '財帛宮', '疾厄宮',
            '遷移宮', '交友宮', '事業宮', '田宅宮', '福德宮', '父母宮'
        ];

        // 十四主星
        this.mainStars = [
            '紫微', '天機', '太陽', '武曲', '天同', '廉貞', '天府',
            '太陰', '貪狼', '巨門', '天相', '天梁', '七殺', '破軍'
        ];

        // 地支
        this.dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

        // 五行局
        this.wuxingju = ['水二局', '木三局', '金四局', '土五局', '火六局'];

        // 星曜特性
        this.starTraits = {
            '紫微': '帝王星，主權威、領導力，性格高貴，有統御能力',
            '天機': '智慧星，主機智、變化，善於謀略，思維敏捷',
            '太陽': '光明星，主熱情、光明，個性開朗，樂於助人',
            '武曲': '財星，主財富、決斷，處事果斷，善於理財',
            '天同': '福星，主享受、和平，性格溫和，追求安逸',
            '廉貞': '化氣為囚，主桃花、囚禁，個性複雜，多才多藝',
            '天府': '財庫星，主穩重、保守，處事穩健，善於儲蓄',
            '太陰': '財星，主溫柔、內斂，性格柔和，心思細膩',
            '貪狼': '桃花星，主慾望、才藝，多才多藝，善於社交',
            '巨門': '暗星，主口才、是非，善於表達，易生口舌',
            '天相': '印星，主輔佐、服務，忠誠可靠，善於協調',
            '天梁': '蔭星，主解厄、長輩，穩重老成，有長者風範',
            '七殺': '將星，主威武、衝動，個性剛烈，勇往直前',
            '破軍': '耗星，主變化、破壞，勇於創新，善於改革'
        };
    }

    // 計算命宮位置
    getMingGongPosition(month, timeIndex) {
        // 從寅宮開始逆時針數到生月
        let position = (2 - month + 12) % 12;
        // 再從生月順時針數到生時
        position = (position + timeIndex) % 12;
        return position;
    }

    // 計算身宮位置
    getShenGongPosition(month, timeIndex) {
        // 從寅宮開始順時針數到生月
        let position = (month + 2) % 12;
        // 再從生月順時針數到生時
        position = (position + timeIndex) % 12;
        return position;
    }

    // 計算五行局（簡化版）
    getWuxingju(year) {
        const index = year % 5;
        return this.wuxingju[index];
    }

    // 安紫微星（簡化演算法）
    getZiweiPosition(day, wuxingju) {
        const juNumber = parseInt(wuxingju[wuxingju.length - 2]);
        const position = (day + juNumber - 1) % 12;
        return position;
    }

    // 排列主星（簡化版）
    arrangeMainStars(ziweiPos, mingGongPos) {
        const starPositions = {};

        // 紫微星系
        starPositions['紫微'] = ziweiPos;
        starPositions['天機'] = (ziweiPos + 1) % 12;
        starPositions['太陽'] = (ziweiPos + 2) % 12;
        starPositions['武曲'] = (ziweiPos + 3) % 12;
        starPositions['天同'] = (ziweiPos + 4) % 12;
        starPositions['廉貞'] = (ziweiPos + 5) % 12;

        // 天府星系
        const tianfuPos = (26 - ziweiPos) % 12;
        starPositions['天府'] = tianfuPos;
        starPositions['太陰'] = (tianfuPos + 1) % 12;
        starPositions['貪狼'] = (tianfuPos + 2) % 12;
        starPositions['巨門'] = (tianfuPos + 3) % 12;
        starPositions['天相'] = (tianfuPos + 4) % 12;
        starPositions['天梁'] = (tianfuPos + 5) % 12;
        starPositions['七殺'] = (tianfuPos + 6) % 12;
        starPositions['破軍'] = (tianfuPos + 8) % 12;

        return starPositions;
    }

    // 分析命宮主星
    analyzeMingGong(stars) {
        if (stars.length === 0) {
            return '命宮無主星，個性較為平和，易受環境影響，需借對宮之星來看。';
        }

        let analysis = `命宮主星為${stars.join('、')}。\n\n`;
        for (let star of stars) {
            if (this.starTraits[star]) {
                analysis += `${star}：${this.starTraits[star]}\n`;
            }
        }

        return analysis;
    }

    // 分析整體格局
    analyzePattern(starPositions, mingGongPos) {
        const mingGongStars = Object.entries(starPositions)
            .filter(([star, pos]) => pos === mingGongPos)
            .map(([star, pos]) => star);

        let pattern = '';

        if (mingGongStars.includes('紫微')) {
            pattern += '紫微坐命，天生領導格局，適合從事管理、政治或高階職位。\n';
        }

        if (mingGongStars.includes('武曲') || mingGongStars.includes('天府')) {
            pattern += '財星入命，財運佳，善於理財，適合從事金融、商業相關工作。\n';
        }

        if (mingGongStars.includes('貪狼') || mingGongStars.includes('廉貞')) {
            pattern += '桃花星入命，人緣好，多才多藝，適合從事社交、娛樂、藝術相關工作。\n';
        }

        if (mingGongStars.includes('天機')) {
            pattern += '智慧星入命，聰明機智，適合從事策劃、研究、教育相關工作。\n';
        }

        if (pattern === '') {
            pattern = '命格平穩，需綜合各宮位來看整體運勢。';
        }

        return pattern;
    }

    // 主計算函數
    calculate(year, month, day, timeIndex, gender) {
        const mingGongPos = this.getMingGongPosition(month, timeIndex);
        const shenGongPos = this.getShenGongPosition(month, timeIndex);
        const wuxingju = this.getWuxingju(year);
        const ziweiPos = this.getZiweiPosition(day, wuxingju);
        const starPositions = this.arrangeMainStars(ziweiPos, mingGongPos);

        // 獲取命宮主星
        const mingGongStars = Object.entries(starPositions)
            .filter(([star, pos]) => pos === mingGongPos)
            .map(([star, pos]) => star);

        const mingGongAnalysis = this.analyzeMingGong(mingGongStars);
        const patternAnalysis = this.analyzePattern(starPositions, mingGongPos);

        return {
            mingGongPos,
            shenGongPos,
            wuxingju,
            starPositions,
            mingGongStars,
            mingGongAnalysis,
            patternAnalysis
        };
    }

    // 生成HTML結果
    generateHTML(result) {
        const { mingGongPos, shenGongPos, wuxingju, starPositions, mingGongStars, mingGongAnalysis, patternAnalysis } = result;

        let html = `
            <p><strong>命宮位置：</strong>${this.palaces[mingGongPos]}（${this.dizhi[mingGongPos]}宮）</p>
            <p><strong>身宮位置：</strong>${this.palaces[shenGongPos]}（${this.dizhi[shenGongPos]}宮）</p>
            <p><strong>五行局：</strong>${wuxingju}</p>

            <div class="ziwei-grid">
        `;

        // 顯示十二宮位及主星
        for (let i = 0; i < 12; i++) {
            const palace = this.palaces[i];
            const stars = Object.entries(starPositions)
                .filter(([star, pos]) => pos === i)
                .map(([star, pos]) => star);

            let palaceClass = 'palace';
            if (i === mingGongPos) palaceClass += ' ming-gong';
            if (i === shenGongPos) palaceClass += ' shen-gong';

            html += `
                <div class="${palaceClass}">
                    <div class="palace-name">${palace}</div>
                    <div class="palace-stars">${stars.length > 0 ? stars.join('、') : '－'}</div>
                </div>
            `;
        }

        html += `
            </div>

            <p><strong>命宮主星：</strong>${mingGongStars.length > 0 ? mingGongStars.join('、') : '無主星'}</p>

            <p><strong>命宮分析：</strong></p>
            <p style="white-space: pre-line;">${mingGongAnalysis}</p>

            <p><strong>整體格局：</strong></p>
            <p style="white-space: pre-line;">${patternAnalysis}</p>
        `;

        return html;
    }
}
