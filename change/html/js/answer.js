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
    questionDiv.style.backgroundColor = 'white';
    questionDiv.style.padding = '10px';
    questionDiv.style.border = '1px solid #008000';
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
    answersDiv.style.backgroundColor = '#f9f9f9'; // 浅灰色背景，以便与问题部分区分
    answersDiv.style.padding = '10px';
    answersDiv.style.border = '1px solid #ccc';
    answersDiv.style.borderRadius = '5px';
    answersDiv.style.marginTop = '10px';

    questionObj.answers.forEach(answerObj => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer';
        answerDiv.style.marginBottom = '10px';

        const detailDiv = document.createElement('div');
        detailDiv.style.padding = '5px';

        // 添加答案ID
        const aidElement = document.createElement('p');
        aidElement.textContent = '答案ID: ' + answerObj.id;
        detailDiv.appendChild(aidElement);

        // 添加答案作者
        const authorElement = document.createElement('p');
        authorElement.textContent = '答案作者: ' + answerObj.author_name;
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

        answerDiv.appendChild(detailDiv);
        answersDiv.appendChild(answerDiv);
    });

    qaContainer.appendChild(answersDiv);
    return qaContainer;
}