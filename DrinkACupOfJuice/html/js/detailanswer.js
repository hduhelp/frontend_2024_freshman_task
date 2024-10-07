function renderQuestionAndAnswers(answerObj, container) {
    if (!container) return; // 如果container为空，则直接返回

    const questionDiv = document.createElement('div');

    questionDiv.style.backgroundColor = '#333'; // 深灰色背景
    questionDiv.style.padding = '10px'; // 内边距保持不变
    questionDiv.style.border = '1px solid #666'; // 深灰色边框
    questionDiv.style.borderRadius = '5px'; // 边框圆角保持不变
    questionDiv.style.marginBottom = '10px'; // 底部外边距保持不变

    // 添加ID
    const idElement = document.createElement('h2');
    idElement.textContent = answerObj.id;
    questionDiv.appendChild(idElement);

    var id = answerObj.id;


    const p1 = document.createElement('p');
    p1.textContent = answerObj.p1;
    questionDiv.appendChild(p1);

    const author = document.createElement('span');
    author.style.fontWeight = 'bold'; // 可以设置字体加粗
    author.textContent = '作者: ';
    questionDiv.appendChild(author);

    //添加作者
    const authorElement = document.createElement('span');
    authorElement.textContent = questionObj.author;
    questionDiv.appendChild(authorElement);

    const p2 = document.createElement('p');
    p2.textContent = questionObj.p2;
    questionDiv.appendChild(p2);

    const email = document.createElement('span');
    email.style.fontWeight = 'bold'; // 可以设置字体加粗
    email.textContent = '作者email: ';
    questionDiv.appendChild(email);

    //添加author_email
    const author_emailElement = document.createElement('span');
    author_emailElement.textContent = questionObj.author_email;
    questionDiv.appendChild(author_emailElement);

    const p3 = document.createElement('p');
    p3.textContent = questionObj.p3;
    questionDiv.appendChild(p3);

    const detail1 = document.createElement('span');
    detail1.style.fontWeight = 'bold'; // 可以设置字体加粗
    detail1.textContent = '内容: ';
    questionDiv.appendChild(detail1);

    // 添加详情（如果存在，否则显示默认消息）
    const detail = questionObj.detail || 'No detail available.';
    const detailElement = document.createElement('span');
    detailElement.textContent = detail;
    questionDiv.appendChild(detailElement);

    const p4 = document.createElement('p');
    p4.textContent = questionObj.p4;
    questionDiv.appendChild(p4);

    const at = document.createElement('span');
    at.style.fontWeight = 'bold'; // 可以设置字体加粗
    at.textContent = '创建时间: ';
    questionDiv.appendChild(at);

    //添加created_at
    const created_atElement = document.createElement('span');
    created_atElement.textContent = questionObj.created_at;
    questionDiv.appendChild(created_atElement);

    const p5 = document.createElement('p');
    p5.textContent = questionObj.p5;
    questionDiv.appendChild(p5);



    const a = document.createElement('button');
    a.textContent = '查看答案';
    a.onclick = function () { const url = `detailanswer.html?id=${id}`; window.location.href = url; };

    questionDiv.appendChild(a);

    container.appendChild(questionDiv); // 将新创建的div添加到容器中
}

let allanswer=[];
fetch('https://hduhelp.woshiluo.com/api/question')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                allanswer = data;
            })

        // 当文档加载完成后执行
        document.addEventListener('DOMContentLoaded', function () {
            // 获取URL的查询字符串并解析它
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);

            // 尝试获取id查询参数
            const id = urlParams.get('id');

            if (id) { // 确保id存在
                function fetchQuestion() {
                    // 使用模板字符串来插入id变量
                    const apiUrl = `https://hduhelp.woshiluo.com/api/question/${id}`;

                    // 发送fetch请求
                    fetch(apiUrl, {
                        method: 'GET'
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            const container = document.getElementById('questionsAndAnswers');
                            container.innerHTML = ''; // 清空容器内容

                            if (data && data.hasOwnProperty('id') && data.hasOwnProperty('title') && data.hasOwnProperty('answers')) {
                                // 创建一个新的div来包裹问题和它的答案
                                const qaContainer = document.createElement('div');
                
                                // 创建问题部分的HTML
                                const questionDiv = document.createElement('div');
                                 // 添加ID（可选，取决于是否需要显示）
                                const idElement = document.createElement('h3');
                                idElement.textContent = '问题ID: ' + data.id;
                                questionDiv.appendChild(idElement);

                                // 添加问题标题
                                const questionTitle = document.createElement('h2');
                                questionTitle.textContent = data.title;
                                questionDiv.appendChild(questionTitle);

                                // 将问题添加到问题和答案的容器中
                                qaContainer.appendChild(questionDiv);

                                // 处理答案
                                if (data.answers.length > 0) {
                                    const answersDiv = document.createElement('div');
                                    answersDiv.className = 'answers';
                                
                                    data.answers.forEach(answerObj => {
                                        const answerDiv = document.createElement('div');
                                        answerDiv.className = 'answer'; // 为答案添加一个类名，以便可以单独样式化
                                
                                        // 添加答案ID（可选）
                                        const aidElement = document.createElement('p');
                                        aidElement.textContent = '回答ID: ' + answerObj.id;
                                        answerDiv.appendChild(aidElement);
                                
                                        const aauthorElement = document.createElement('p');
                                        aauthorElement.textContent = '回答作者: ' + answerObj.author_name;
                                        answerDiv.appendChild(aauthorElement);

                                        const aemailElement = document.createElement('p');
                                        aemailElement.textContent = '作者email: ' + answerObj.author_email;
                                        answerDiv.appendChild(aemailElement);


                                        // 添加答案内容
                                        const contentElement = document.createElement('p');
                                        contentElement.textContent = '回答：' + answerObj.content;
                                        answerDiv.appendChild(contentElement);

                                        const aatElement = document.createElement('p');
                                        aatElement.textContent = '回答时间: ' + answerObj.created_at;
                                        answerDiv.appendChild(aatElement);
                                
                                        // 将答案添加到答案的div中
                                        answersDiv.appendChild(answerDiv);
                                
                                        // 如果不是最后一个答案，则添加一个分隔符
                                        if (data.answers.indexOf(answerObj) < data.answers.length - 1) {
                                            const separator = document.createElement('hr');
                                            separator.className = 'answer-separator'; // 可选：为分隔符添加类名以进行样式化
                                            answersDiv.appendChild(separator);
                                        }
                                    });
                                
                                    // 将答案的div添加到问题和答案的容器中
                                    qaContainer.appendChild(answersDiv);
                                }
                                
                                // 将问题和答案的容器添加到页面上
                                container.appendChild(qaContainer);
                            } else {
                                // 处理data不符合预期的情况
                                console.error('Received data does not match expected format');
                            }
                        })
                        .catch(error => {
                            console.error('There was a problem fetching the question:', error);
                        });
                }

                // 调用fetchQuestion函数
                fetchQuestion();
            } else {
                console.error('ID query parameter is missing');
            }
});
function searchById() {
    const searchId = document.getElementById('searchId').value;
    const container = document.getElementById('questionsAndAnswers');
    container.innerHTML = '';

    const filteredData = allanswer.filter(answerObj => answerObj.id.toString() === searchId);

    if (filteredData.length > 0) {
        filteredData.forEach(answerObj => {
            renderQuestionAndAnswers(answerObj, container);
        });
    } else {
        container.innerHTML = '<p>没有找到对应ID的回答。</p>';
    }
}