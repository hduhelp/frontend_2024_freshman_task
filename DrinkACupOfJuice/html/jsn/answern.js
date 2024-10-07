fetch('https://hduhelp.woshiluo.com/api/question')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (!Array.isArray(data)) {
            throw new Error('Data received is not an array');
        }

        const container = document.getElementById('questionsAndAnswers');
        container.innerHTML = ''; // 清空容器内容

        data.forEach(questionObj => {
            if (questionObj.hasOwnProperty('id') && questionObj.hasOwnProperty('title') && Array.isArray(questionObj.answers)) {
                const qaContainer = createQuestionAndAnswersContainer(questionObj);
                container.appendChild(qaContainer);
            }
        });
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });

function createQuestionAndAnswersContainer(questionObj) {
    const qaContainer = document.createElement('div');
    qaContainer.style.marginBottom = '20px'; // 可选，为了分隔不同的问题和答案

    // 创建问题部分
    const questionDiv = document.createElement('div');
    questionDiv.style.backgroundColor = '#333'; // 深灰色背景
    questionDiv.style.color = '#ccc'; // 浅灰色文字（如果需要的话）
    questionDiv.style.padding = '10px';
    questionDiv.style.border = '1px solid #666'; // 深灰色边框（与背景形成对比）
    questionDiv.style.borderRadius = '5px';

    const idElement = document.createElement('h3');
    idElement.textContent = '问题ID: ' + questionObj.id;
    questionDiv.appendChild(idElement);

    const questionTitle = document.createElement('h2');
    questionTitle.textContent = questionObj.title;
    questionDiv.appendChild(questionTitle);

    qaContainer.appendChild(questionDiv);

    // 创建答案部分
    const answersDiv = document.createElement('div');
    answersDiv.className = 'answers';
    answersDiv.style.backgroundColor = '#333'; // 深灰色背景
    answersDiv.style.padding = '10px';
    answersDiv.style.border = '1px solid #666'; // 深灰色边框
    answersDiv.style.borderRadius = '5px';
    answersDiv.style.marginTop = '10px';
    answersDiv.style.color = '#ccc'; // 浅灰色文字，确保内容清晰可见

    questionObj.answers.forEach(answerObj => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answerDiv.style.marginBottom = '10px';

        const detailDiv = document.createElement('div');
        detailDiv.style.padding = '5px';

        // 添加答案ID
        let id=answerObj.id;
        const aidElement = document.createElement('p');
        aidElement.textContent = '回答ID: ' + answerObj.id;
        detailDiv.appendChild(aidElement);

        // 添加答案作者
        const authorElement = document.createElement('p');
        authorElement.textContent = '回答作者: ' + answerObj.author_name;
        detailDiv.appendChild(authorElement);

        // 添加作者email（可选）
        if (answerObj.author_email) {
            const emailElement = document.createElement('p');
            emailElement.textContent = '作者email: ' + answerObj.author_email;
            detailDiv.appendChild(emailElement);
        }

        // 添加答案内容
        const contentElement = document.createElement('p');
        contentElement.textContent = '回答：' + answerObj.content;
        detailDiv.appendChild(contentElement);

        // 添加回答时间
        const timeElement = document.createElement('p');
        timeElement.textContent = '回答时间: ' + answerObj.created_at;
        detailDiv.appendChild(timeElement);

        // 创建一个按钮元素
        const detailElement = document.createElement('button');
        detailElement.textContent = '查看详细内容';

        // 为按钮添加点击事件监听器
        detailElement.addEventListener('click', function() {
        // 构造包含答案ID的URL
        const detailUrl = `detailanswern.html?id=${encodeURIComponent(answerObj.id)}`;
        // 更改当前页面的URL以导航到detailnanswer.html，并传递答案ID作为查询参数
        window.location.href = detailUrl;
        });

        detailDiv.appendChild(detailElement);

        answerDiv.appendChild(detailDiv);
        answersDiv.appendChild(answerDiv);
        });

        qaContainer.appendChild(answersDiv);
        return qaContainer;
}