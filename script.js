const terms = [
    { abbreviation: "AGE", fullTerm: "acute gastric enteritis", meaning: "급성위장염" },
    { abbreviation: "Appe", fullTerm: "appendicitis", meaning: "충수염" },
    { abbreviation: "ALT", fullTerm: "alanine aminotransferase", meaning: "알라닌 아미노전이요소" },
    { abbreviation: "AST", fullTerm: "aspartate aminotransferase", meaning: "아스파르테이트 아미노전이요소" },
    { abbreviation: "B-I", fullTerm: "gastroduodenostomy", meaning: "위 십이지장 문합술" },
    { abbreviation: "B-II", fullTerm: "gastrojejunostomy", meaning: "위 공장 문합술" },
    { abbreviation: "B/V", fullTerm: "barovac", meaning: "바로박" },
    { abbreviation: "CBD", fullTerm: "common bile duct", meaning: "총담관" },
    { abbreviation: "EGC", fullTerm: "early gastric cancer", meaning: "조기위암" },
    { abbreviation: "EGD", fullTerm: "esophagogastroduodenoscopy", meaning: "식도 위십이지장 내시경검사" },
    { abbreviation: "ERCP", fullTerm: "endoscopic retrograde cholangiopancreatography", meaning: "내시경적 역행성 담낭췌 조영술" },
    { abbreviation: "GERD", fullTerm: "gastroesophageal reflux disease", meaning: "위 역류성 식도염" },
    { abbreviation: "GIST", fullTerm: "gastrointestinal stromal tumor", meaning: "위점막하 종양" },
    { abbreviation: "HCC", fullTerm: "hepatic cellular cancer", meaning: "간세포 암" },
    { abbreviation: "H/V", fullTerm: "hemovac", meaning: "헤모박" },
    { abbreviation: "IVC", fullTerm: "inferior vena cava", meaning: "하대정맥" },
    { abbreviation: "IBS", fullTerm: "irritable bowel syndrome", meaning: "과민성장증후군" },
    { abbreviation: "LC", fullTerm: "liver cirrhosis", meaning: "간경변증" },
    { abbreviation: "MA tube", fullTerm: "Miller abbot tube", meaning: "밀러 애보트 튜브" },
    { abbreviation: "PEG", fullTerm: "percutaneous endoscopic gastrectomy", meaning: "경피 내시경적 위절제술" },
    { abbreviation: "Post.op", fullTerm: "postoperative", meaning: "수술 후" },
    { abbreviation: "Pre.op", fullTerm: "preoperative", meaning: "수술 전" },
    { abbreviation: "PTBD", fullTerm: "percutaneous transhepatic bile duct drainage", meaning: "경피적 간 담도 배액" },
    { abbreviation: "TACE", fullTerm: "transarterial chemoembolization", meaning: "경동맥 화학색전술" },
    { abbreviation: "ROS", fullTerm: "review of symptoms", meaning: "증상 재검토" },
    { abbreviation: "RSG", fullTerm: "radical subtotal gastrectomy", meaning: "부분 위절제술" },
    { abbreviation: "RTG", fullTerm: "radical total gastrectomy", meaning: "전 위절제술" },
    { abbreviation: "RFCA", fullTerm: "radiofrequency catheter ablation", meaning: "(고주파) 전극 도자 절제술" },
];

let currentTermIndex = 0;
let errorLog = [];
let totalQuestions = terms.length;

function shuffleTerms(terms) {
    for (let i = terms.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [terms[i], terms[j]] = [terms[j], terms[i]];
    }
}

function showNextTerm() {
    if (currentTermIndex < terms.length) {
        document.getElementById('abbreviation').innerText = terms[currentTermIndex].abbreviation;
        document.getElementById('fullTermInput1').value = "";
        document.getElementById('fullTermInput2').value = "";
        document.getElementById('result').classList.add('hidden');
    } else {
        showFinalResult();
    }
}

function checkAnswer() {
    const userInput1 = document.getElementById('fullTermInput1').value.trim();
    const userInput2 = document.getElementById('fullTermInput2').value.trim();

    const correctFullTerm = terms[currentTermIndex].fullTerm;
    const correctMeaning = terms[currentTermIndex].meaning;

    if (userInput1 === correctFullTerm && userInput2 === correctMeaning) {
        currentTermIndex++;
        showNextTerm();
    } else {
        logError(userInput1, userInput2, correctFullTerm, correctMeaning);
    }
}

function logError(userInput1, userInput2, correctFullTerm, correctMeaning) {
    errorLog.push({
        abbreviation: terms[currentTermIndex].abbreviation,
        correct: correctFullTerm + " (" + correctMeaning + ")",
        userInput: userInput1 + " / " + userInput2
    });
    currentTermIndex++;
    showNextTerm();
}

function showFinalResult() {
    const resultElement = document.getElementById('result');
    const errorTable = document.getElementById('errorTable');
    const errorLogBody = document.getElementById('errorLog');

    resultElement.innerText = `모든 문제를 풀었습니다! 틀린 개수: ${errorLog.length}`;
    resultElement.classList.remove('hidden');

    if (errorLog.length > 0) {
        errorTable.classList.remove('hidden');
        errorLog.forEach(error => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `<td>${error.abbreviation}</td>
                               <td>${error.correct}</td>
                               <td>${error.userInput}</td>`;
            errorLogBody.appendChild(newRow);
        });
    }

    // "은혜야 사랑해 수고했어" 메시지 띄우기
    alert("은혜야 사랑해! 💖");  // 여기에 팝업 메시지를 추가했습니다.
    
    const finalMessageElement = document.getElementById('finalMessage');
    finalMessageElement.classList.remove('hidden');
}

shuffleTerms(terms);
showNextTerm();
