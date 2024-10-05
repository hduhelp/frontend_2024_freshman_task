fetch('https://hduhelp.woshiluo.com/api/question')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                allQuestions = data;
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

                            // 假设data是一个包含问题和答案的对象，而不是数组
                            // 如果data是数组，则应该遍历数组中的每个对象
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
                                        



                                        

                                        // 添加答案ID（可选）
                                        const aidElement = document.createElement('p');
                                        aidElement.textContent = '答案ID: ' + answerObj.id;
                                        answerDiv.appendChild(aidElement);

                                        const aauthorElement = document.createElement('p');
                                        aauthorElement.textContent = '答案作者: ' + answerObj.author_name;
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