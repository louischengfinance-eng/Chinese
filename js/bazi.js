// 八字命理計算模組

class BaziCalculator {
    constructor() {
        // 天干
        this.tiangan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

        // 地支
        this.dizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

        // 時辰對應地支
        this.shichenDizhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

        // 五行
        this.wuxing = {
            '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
            '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
            '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
            '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
            '戌': '土', '亥': '水'
        };

        // 十神
        this.shishen = ['比肩', '劫財', '食神', '傷官', '偏財', '正財', '七殺', '正官', '偏印', '正印'];

        // 納音五行
        this.nayin = [
            '海中金', '爐中火', '大林木', '路旁土', '劍鋒金', '山頭火',
            '澗下水', '城頭土', '白蠟金', '楊柳木', '井泉水', '屋上土',
            '霹靂火', '松柏木', '長流水', '沙中金', '山下火', '平地木',
            '壁上土', '金箔金', '覆燈火', '天河水', '大驛土', '釵釧金',
            '桑柘木', '大溪水', '沙中土', '天上火', '石榴木', '大海水'
        ];
    }

    // 計算年柱
    getYearPillar(year) {
        // 以1984年（甲子年）為基準
        const baseYear = 1984;
        const diff = year - baseYear;
        const tianganIndex = (diff % 10 + 10) % 10;
        const dizhiIndex = (diff % 12 + 12) % 12;

        return this.tiangan[tianganIndex] + this.dizhi[dizhiIndex];
    }

    // 計算月柱
    getMonthPillar(year, month) {
        // 月干從年干推算（五虎遁月）
        const yearGan = this.getYearPillar(year)[0];
        const ganIndex = this.tiangan.indexOf(yearGan);

        // 月份地支（從寅月開始，即農曆正月）
        // 簡化處理，使用公曆月份
        const monthDizhiIndex = (month + 1) % 12;

        // 五虎遁月口訣計算
        let monthGanIndex;
        if (ganIndex === 0 || ganIndex === 5) { // 甲己年
            monthGanIndex = (month + 1) % 10;
        } else if (ganIndex === 1 || ganIndex === 6) { // 乙庚年
            monthGanIndex = (month + 3) % 10;
        } else if (ganIndex === 2 || ganIndex === 7) { // 丙辛年
            monthGanIndex = (month + 5) % 10;
        } else if (ganIndex === 3 || ganIndex === 8) { // 丁壬年
            monthGanIndex = (month + 7) % 10;
        } else { // 戊癸年
            monthGanIndex = (month + 9) % 10;
        }

        return this.tiangan[monthGanIndex] + this.dizhi[monthDizhiIndex];
    }

    // 計算日柱（簡化演算法）
    getDayPillar(year, month, day) {
        // 使用蔡勒公式計算日期序數
        const date = new Date(year, month - 1, day);
        const baseDate = new Date(1984, 0, 1); // 甲子日
        const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));

        const tianganIndex = (diffDays % 10 + 10) % 10;
        const dizhiIndex = (diffDays % 12 + 12) % 12;

        return this.tiangan[tianganIndex] + this.dizhi[dizhiIndex];
    }

    // 計算時柱
    getTimePillar(dayPillar, timeIndex) {
        const dayGan = dayPillar[0];
        const ganIndex = this.tiangan.indexOf(dayGan);

        // 五鼠遁日起時
        let timeGanIndex;
        if (ganIndex === 0 || ganIndex === 5) { // 甲己日
            timeGanIndex = timeIndex % 10;
        } else if (ganIndex === 1 || ganIndex === 6) { // 乙庚日
            timeGanIndex = (timeIndex + 2) % 10;
        } else if (ganIndex === 2 || ganIndex === 7) { // 丙辛日
            timeGanIndex = (timeIndex + 4) % 10;
        } else if (ganIndex === 3 || ganIndex === 8) { // 丁壬日
            timeGanIndex = (timeIndex + 6) % 10;
        } else { // 戊癸日
            timeGanIndex = (timeIndex + 8) % 10;
        }

        return this.tiangan[timeGanIndex] + this.shichenDizhi[timeIndex];
    }

    // 分析五行
    analyzeWuxing(bazi) {
        const wuxingCount = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };

        for (let pillar of bazi) {
            for (let char of pillar) {
                if (this.wuxing[char]) {
                    wuxingCount[this.wuxing[char]]++;
                }
            }
        }

        return wuxingCount;
    }

    // 分析命格
    analyzeMinggе(dayGan, wuxingCount) {
        const element = this.wuxing[dayGan];
        const descriptions = {
            '木': '木命之人，仁慈善良，性格溫和，富有同情心。適合從事教育、文化、藝術等工作。',
            '火': '火命之人，熱情開朗，積極向上，富有創造力。適合從事銷售、表演、創意等工作。',
            '土': '土命之人，穩重踏實，誠實守信，責任心強。適合從事管理、金融、房地產等工作。',
            '金': '金命之人，果斷堅毅，處事公正，重視原則。適合從事法律、金融、工程等工作。',
            '水': '水命之人，智慧靈活，善於變通，富有謀略。適合從事研究、策劃、商業等工作。'
        };

        return descriptions[element] || '命格特殊，需詳細分析。';
    }

    // 喜用神分析
    analyzeXiyongshen(wuxingCount) {
        const sorted = Object.entries(wuxingCount).sort((a, b) => a[1] - b[1]);
        const weak = sorted.slice(0, 2).map(x => x[0]);
        const strong = sorted.slice(-2).map(x => x[0]);

        return {
            xi: weak[0],
            yong: weak[1],
            ji: strong[0],
            description: `您的五行以${strong[0]}、${strong[1]}較旺，${weak[0]}、${weak[1]}較弱。建議補充${weak[0]}和${weak[1]}元素，可通過穿著、飾品、方位等調整。`
        };
    }

    // 主計算函數
    calculate(year, month, day, timeIndex) {
        const yearPillar = this.getYearPillar(year);
        const monthPillar = this.getMonthPillar(year, month);
        const dayPillar = this.getDayPillar(year, month, day);
        const timePillar = this.getTimePillar(dayPillar, timeIndex);

        const bazi = [yearPillar, monthPillar, dayPillar, timePillar];
        const wuxingCount = this.analyzeWuxing(bazi);
        const dayGan = dayPillar[0];
        const minggе = this.analyzeMinggе(dayGan, wuxingCount);
        const xiyongshen = this.analyzeXiyongshen(wuxingCount);

        return {
            bazi,
            yearPillar,
            monthPillar,
            dayPillar,
            timePillar,
            wuxingCount,
            dayGan,
            mingge: minggе,
            xiyongshen
        };
    }

    // 生成HTML結果
    generateHTML(result) {
        const { bazi, yearPillar, monthPillar, dayPillar, timePillar, wuxingCount, mingge, xiyongshen } = result;

        let html = `
            <div class="bazi-pillars">
                <div class="pillar">
                    <div class="pillar-title">年柱</div>
                    <div class="pillar-content">${yearPillar}</div>
                </div>
                <div class="pillar">
                    <div class="pillar-title">月柱</div>
                    <div class="pillar-content">${monthPillar}</div>
                </div>
                <div class="pillar">
                    <div class="pillar-title">日柱</div>
                    <div class="pillar-content">${dayPillar}</div>
                </div>
                <div class="pillar">
                    <div class="pillar-title">時柱</div>
                    <div class="pillar-content">${timePillar}</div>
                </div>
            </div>

            <p><strong>五行分析：</strong></p>
            <p>木：${wuxingCount['木']} | 火：${wuxingCount['火']} | 土：${wuxingCount['土']} | 金：${wuxingCount['金']} | 水：${wuxingCount['水']}</p>

            <p><strong>日主：</strong>${result.dayGan}（${this.wuxing[result.dayGan]}）</p>

            <p><strong>命格特點：</strong></p>
            <p>${mingge}</p>

            <p><strong>喜用神分析：</strong></p>
            <p>${xiyongshen.description}</p>
            <p>喜神：${xiyongshen.xi} | 用神：${xiyongshen.yong} | 忌神：${xiyongshen.ji}</p>
        `;

        return html;
    }
}
