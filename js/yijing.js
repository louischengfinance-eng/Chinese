// 易經六爻計算模組

class YijingCalculator {
    constructor() {
        // 六十四卦
        this.hexagrams = {
            '111111': { name: '乾', number: 1, description: '天行健，君子以自強不息' },
            '000000': { name: '坤', number: 2, description: '地勢坤，君子以厚德載物' },
            '010001': { name: '屯', number: 3, description: '雲雷屯，君子以經綸' },
            '100010': { name: '蒙', number: 4, description: '山水蒙，君子以果行育德' },
            '010111': { name: '需', number: 5, description: '雲天需，君子以飲食宴樂' },
            '111010': { name: '訟', number: 6, description: '天水訟，君子以作事謀始' },
            '000010': { name: '師', number: 7, description: '地水師，君子以容民畜眾' },
            '010000': { name: '比', number: 8, description: '水地比，建萬國親諸侯' },
            '110111': { name: '小畜', number: 9, description: '風天小畜，君子以懿文德' },
            '111011': { name: '履', number: 10, description: '天澤履，君子以辨上下定民志' },
            '000111': { name: '泰', number: 11, description: '天地泰，后以財成天地之道' },
            '111000': { name: '否', number: 12, description: '天地否，君子以儉德辟難' },
            '111101': { name: '同人', number: 13, description: '天火同人，君子以類族辨物' },
            '101111': { name: '大有', number: 14, description: '火天大有，君子以遏惡揚善' },
            '000100': { name: '謙', number: 15, description: '地山謙，君子以裒多益寡' },
            '001000': { name: '豫', number: 16, description: '雷地豫，先王以作樂崇德' },
            '011001': { name: '隨', number: 17, description: '澤雷隨，君子以嚮晦入宴息' },
            '100110': { name: '蠱', number: 18, description: '山風蠱，君子以振民育德' },
            '000011': { name: '臨', number: 19, description: '地澤臨，君子以教思無窮' },
            '110000': { name: '觀', number: 20, description: '風地觀，先王以省方觀民設教' },
            '101001': { name: '噬嗑', number: 21, description: '火雷噬嗑，先王以明罰敕法' },
            '100101': { name: '賁', number: 22, description: '山火賁，君子以明庶政無敢折獄' },
            '100000': { name: '剝', number: 23, description: '山地剝，上以厚下安宅' },
            '000001': { name: '復', number: 24, description: '地雷復，先王以至日閉關' },
            '111001': { name: '無妄', number: 25, description: '天雷無妄，先王以茂對時育萬物' },
            '100111': { name: '大畜', number: 26, description: '山天大畜，君子以多識前言往行' },
            '100001': { name: '頤', number: 27, description: '山雷頤，君子以慎言語節飲食' },
            '011110': { name: '大過', number: 28, description: '澤風大過，君子以獨立不懼' },
            '010010': { name: '坎', number: 29, description: '水洊至，習坎，君子以常德行' },
            '101101': { name: '離', number: 30, description: '明兩作，離，大人以繼明照于四方' },
            '011100': { name: '咸', number: 31, description: '山澤咸，君子以虛受人' },
            '001110': { name: '恆', number: 32, description: '雷風恆，君子以立不易方' },
            '111100': { name: '遯', number: 33, description: '天山遯，君子以遠小人不惡而嚴' },
            '001111': { name: '大壯', number: 34, description: '雷天大壯，君子以非禮弗履' },
            '101000': { name: '晉', number: 35, description: '火地晉，君子以自昭明德' },
            '000101': { name: '明夷', number: 36, description: '地火明夷，君子以蒞眾用晦而明' },
            '110101': { name: '家人', number: 37, description: '風火家人，君子以言有物而行有恆' },
            '101011': { name: '睽', number: 38, description: '火澤睽，君子以同而異' },
            '010100': { name: '蹇', number: 39, description: '山水蹇，君子以反身修德' },
            '001010': { name: '解', number: 40, description: '雷水解，君子以赦過宥罪' },
            '100011': { name: '損', number: 41, description: '山澤損，君子以懲忿窒慾' },
            '110001': { name: '益', number: 42, description: '風雷益，君子以見善則遷有過則改' },
            '011111': { name: '夬', number: 43, description: '澤天夬，君子以施祿及下居德則忌' },
            '111110': { name: '姤', number: 44, description: '天風姤，后以施命誥四方' },
            '011000': { name: '萃', number: 45, description: '澤地萃，君子以除戎器戒不虞' },
            '000110': { name: '升', number: 46, description: '地風升，君子以順德積小以高大' },
            '011010': { name: '困', number: 47, description: '澤水困，君子以致命遂志' },
            '010110': { name: '井', number: 48, description: '水風井，君子以勞民勸相' },
            '011101': { name: '革', number: 49, description: '澤火革，君子以治歷明時' },
            '101110': { name: '鼎', number: 50, description: '火風鼎，君子以正位凝命' },
            '001001': { name: '震', number: 51, description: '洊雷震，君子以恐懼修省' },
            '100100': { name: '艮', number: 52, description: '兼山艮，君子以思不出其位' },
            '110100': { name: '漸', number: 53, description: '風山漸，君子以居賢德善俗' },
            '001011': { name: '歸妹', number: 54, description: '雷澤歸妹，君子以永終知敝' },
            '001101': { name: '豐', number: 55, description: '雷火豐，君子以折獄致刑' },
            '101100': { name: '旅', number: 56, description: '火山旅，君子以明慎用刑而不留獄' },
            '110110': { name: '巽', number: 57, description: '隨風巽，君子以申命行事' },
            '011011': { name: '兌', number: 58, description: '麗澤兌，君子以朋友講習' },
            '110010': { name: '渙', number: 59, description: '風水渙，先王以享于帝立廟' },
            '010011': { name: '節', number: 60, description: '水澤節，君子以制數度議德行' },
            '110011': { name: '中孚', number: 61, description: '風澤中孚，君子以議獄緩死' },
            '001100': { name: '小過', number: 62, description: '雷山小過，君子以行過乎恭' },
            '010101': { name: '既濟', number: 63, description: '水火既濟，君子以思患而豫防之' },
            '101010': { name: '未濟', number: 64, description: '火水未濟，君子以慎辨物居方' }
        };

        // 卦辭解釋（簡化版）
        this.hexagramInterpretations = {
            '乾': {
                general: '大吉大利之卦。剛健中正，自強不息。事業發展順利，但需持之以恆。',
                career: '事業運勢極佳，適合創業或開拓新業務。保持進取心，必有所成。',
                wealth: '財運亨通，投資理財皆有收穫。但需謹慎理財，不可過於冒進。',
                love: '感情方面主動積極，容易獲得成功。單身者桃花旺盛。',
                health: '身體健康，精力充沛。注意不要過度勞累。'
            },
            '坤': {
                general: '柔順之卦。以柔克剛，厚德載物。宜順勢而為，不宜強出頭。',
                career: '事業發展穩健，適合輔佐他人。耐心等待，時機自會到來。',
                wealth: '財運平穩，守成有餘，開拓不足。宜保守理財。',
                love: '感情溫和穩定，適合細水長流。宜主動配合對方。',
                health: '身體狀況良好，注意調養脾胃。'
            },
            '屯': {
                general: '初始困難之卦。萬事開頭難，需要突破困境。',
                career: '創業初期會遇到困難，需堅持不懈，尋求貴人相助。',
                wealth: '財運初期不佳，需謹慎投資，積累經驗。',
                love: '感情發展有阻礙，需要耐心經營。',
                health: '注意預防疾病，加強鍛煉。'
            },
            '蒙': {
                general: '啟蒙教化之卦。宜學習進修，求師問道。',
                career: '適合學習新技能，提升自我。不宜急於求成。',
                wealth: '財運需要積累，投資宜謹慎，多學習理財知識。',
                love: '感情需要培養，相互了解很重要。',
                health: '身體無大礙，注意養生保健。'
            }
            // 可以繼續添加其他卦的解釋...
        };

        // 默認解釋
        this.defaultInterpretation = {
            general: '此卦吉凶參半，需要謹慎行事，順應天時。',
            career: '事業發展需要耐心和智慧，不宜急躁冒進。',
            wealth: '財運平穩，理財需謹慎，不宜大額投資。',
            love: '感情發展需要真誠對待，用心經營。',
            health: '身體狀況尚可，注意勞逸結合。'
        };
    }

    // 生成隨機爻（0為陰爻，1為陽爻）
    generateYao() {
        return Math.random() > 0.5 ? 1 : 0;
    }

    // 根據生辰生成六爻（使用時間作為隨機種子）
    generateHexagram(year, month, day, timeIndex) {
        // 使用生辰資訊作為隨機種子
        const seed = (year + month * 100 + day * 10000 + timeIndex * 1000000) % 64;

        // 基於種子生成六爻
        let binary = seed.toString(2).padStart(6, '0');

        // 確保生成有效的六位二進制
        if (binary.length > 6) {
            binary = binary.slice(-6);
        }

        return binary.split('').map(b => parseInt(b));
    }

    // 獲取卦象信息
    getHexagramInfo(yaoArray) {
        const binaryString = yaoArray.join('');

        // 查找對應的卦
        let hexagram = this.hexagrams[binaryString];

        // 如果找不到，使用最接近的卦
        if (!hexagram) {
            const keys = Object.keys(this.hexagrams);
            const closestKey = keys.reduce((prev, curr) => {
                const prevDiff = this.hammingDistance(binaryString, prev);
                const currDiff = this.hammingDistance(binaryString, curr);
                return currDiff < prevDiff ? curr : prev;
            });
            hexagram = this.hexagrams[closestKey];
        }

        return hexagram;
    }

    // 計算漢明距離
    hammingDistance(str1, str2) {
        let distance = 0;
        for (let i = 0; i < str1.length; i++) {
            if (str1[i] !== str2[i]) distance++;
        }
        return distance;
    }

    // 獲取卦辭解釋
    getInterpretation(hexagramName) {
        return this.hexagramInterpretations[hexagramName] || this.defaultInterpretation;
    }

    // 分析六爻
    analyzeYao(yaoArray) {
        const yangCount = yaoArray.filter(y => y === 1).length;
        const yinCount = 6 - yangCount;

        let analysis = `陽爻數量：${yangCount}，陰爻數量：${yinCount}\n\n`;

        if (yangCount > yinCount) {
            analysis += '陽氣較盛，宜主動進取，把握機會。';
        } else if (yangCount < yinCount) {
            analysis += '陰氣較重，宜以柔克剛，順勢而為。';
        } else {
            analysis += '陰陽平衡，宜中庸之道，穩健前行。';
        }

        return analysis;
    }

    // 主計算函數
    calculate(year, month, day, timeIndex, question = '') {
        const yaoArray = this.generateHexagram(year, month, day, timeIndex);
        const hexagram = this.getHexagramInfo(yaoArray);
        const interpretation = this.getInterpretation(hexagram.name);
        const yaoAnalysis = this.analyzeYao(yaoArray);

        return {
            yaoArray,
            hexagram,
            interpretation,
            yaoAnalysis,
            question
        };
    }

    // 生成HTML結果
    generateHTML(result) {
        const { yaoArray, hexagram, interpretation, yaoAnalysis, question } = result;

        let html = '';

        if (question) {
            html += `<p><strong>問卜問題：</strong>${question}</p><br>`;
        }

        html += `
            <div class="hexagram">
                <div class="hexagram-lines">
        `;

        // 從上到下顯示六爻（數組是從下到上）
        for (let i = 5; i >= 0; i--) {
            const lineClass = yaoArray[i] === 1 ? 'line' : 'line broken';
            html += `<div class="${lineClass}"></div>`;
        }

        html += `
                </div>
                <div class="hexagram-info">
                    <div class="hexagram-name">${hexagram.name}卦（第${hexagram.number}卦）</div>
                    <p>${hexagram.description}</p>
                </div>
            </div>

            <p><strong>卦象分析：</strong></p>
            <p style="white-space: pre-line;">${yaoAnalysis}</p>

            <p><strong>總體運勢：</strong></p>
            <p>${interpretation.general}</p>

            <p><strong>事業運：</strong></p>
            <p>${interpretation.career}</p>

            <p><strong>財運：</strong></p>
            <p>${interpretation.wealth}</p>

            <p><strong>感情運：</strong></p>
            <p>${interpretation.love}</p>

            <p><strong>健康運：</strong></p>
            <p>${interpretation.health}</p>
        `;

        return html;
    }
}
