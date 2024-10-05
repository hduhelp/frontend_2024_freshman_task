fetch('https://hduhelp.woshiluo.com/api/question')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const container = document.getElementById('questionsAndAnswers');
                container.innerHTML = ''; // 清空容器内容

                if (Array.isArray(data)) {
                    data.forEach(questionObj => {
                        if (questionObj.hasOwnProperty('id') && questionObj.hasOwnProperty('title') && questionObj.hasOwnProperty('answers')) {
                            // 创建一个新的div来包裹每个问题和它的答案
                            const qaContainer = document.createElement('div');
                    




                            // 创建问题部分的HTML
                            const questionDiv = document.createElement('div');
                            questionDiv.style.backgroundColor = 'white';
                            questionDiv.style.padding = '10px'; // 内边距
                            questionDiv.style.border = '1px solid #008000'; // 深绿色边框
                            questionDiv.style.borderRadius = '5px'; // 边框圆角，与页面其他部分一致
                            questionDiv.style.marginBottom = '10px'; // 底部外边距





                            // 添加ID（可选，取决于是否需要显示）
                            const idElement = document.createElement('h3');
                            idElement.textContent = '问题ID: ' + questionObj.id;
                            questionDiv.appendChild(idElement);

                            // 添加问题标题
                            const questionTitle = document.createElement('h2');
                            questionTitle.textContent = questionObj.title;
                            questionDiv.appendChild(questionTitle);

                            // 将问题添加到问题和答案的容器中
                            qaContainer.appendChild(questionDiv);

                            // 处理答案
                            if (questionObj.answers.length > 0) {
                                const answersDiv = document.createElement('div');
                                answersDiv.className = 'answers';
                                answersDiv.style.backgroundColor = 'white'; 
                                answersDiv.style.padding = '10px'; // 内边距
                                answersDiv.style.border = '1px solid #008000'; // 深绿色边框
                                answersDiv.style.borderRadius = '5px'; // 边框圆角
                                answersDiv.style.marginTop = '10px'; // 顶部外边距，以便与问题部分区分
                            
                                questionObj.answers.forEach(answerObj => {
                                    const answerDiv = document.createElement('div');
                                    answerDiv.className = 'answer'; // 可以为答案添加一个类名，以便后续可能需要的CSS样式
                                    answerDiv.style.marginBottom = '10px'; // 底部外边距，以便每个答案之间有间隔




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
                        }
                    });
                }
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });