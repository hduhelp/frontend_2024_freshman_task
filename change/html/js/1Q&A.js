let allQuestions = [];


            function renderQuestionAndAnswers(questionObj, container) {
            if (!container) return; // 如果container为空，则直接返回

            const questionDiv = document.createElement('div');

            questionDiv.style.backgroundColor = 'white'; // 与页面主题一致的浅绿色背景
            questionDiv.style.padding = '10px'; // 内边距
            questionDiv.style.border = '1px solid #008000'; // 深绿色边框
            questionDiv.style.borderRadius = '5px'; // 边框圆角，与页面其他部分一致
            questionDiv.style.marginBottom = '10px'; // 底部外边距

            // 添加ID
            const idElement = document.createElement('h2');
            idElement.textContent = questionObj.id;
            questionDiv.appendChild(idElement);

            var id = questionObj.id;

            const question = document.createElement('span');
            question.style.fontWeight = 'bold'; // 可以设置字体加粗
            question.textContent = '问题: ';
            questionDiv.appendChild(question);

            // 添加标题
            const titleElement = document.createElement('span');
            titleElement.textContent = questionObj.title;
            questionDiv.appendChild(titleElement);

            const p1 = document.createElement('p');
            p1.textContent = questionObj.p1;
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

        // API调用和数据处理
        fetch('https://hduhelp.woshiluo.com/api/question')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                allQuestions = data; // 将获取到的数据存储在全局变量中

                // 渲染初始问题列表
                const questionList = document.getElementById('questionList');
                questionList.innerHTML = ''; // 清空问题列表的内容

                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(questionObj => {
                        if (questionObj.hasOwnProperty('id') && questionObj.hasOwnProperty('title')) {
                            // 创建一个新的div来包裹每个问题，并添加到问题列表中
                            const questionDiv = document.createElement('div');

                            questionDiv.style.backgroundColor = 'white'; // 与页面主题一致的浅绿色背景
                            questionDiv.style.padding = '10px'; // 内边距
                            questionDiv.style.border = '1px solid #008000'; // 深绿色边框
                            questionDiv.style.borderRadius = '5px'; // 边框圆角，与页面其他部分一致
                            questionDiv.style.marginBottom = '10px'; // 底部外边距
                            


                            // 添加ID
                            const idElement = document.createElement('h2');
                            idElement.textContent = questionObj.id;
                            questionDiv.appendChild(idElement);

                            var id = questionObj.id;

                            const question = document.createElement('span');
                            question.style.fontWeight = 'bold'; // 可以设置字体加粗
                            question.textContent = '问题: ';
                            questionDiv.appendChild(question);

                            // 添加标题
                            const titleElement = document.createElement('span');
                            titleElement.textContent = questionObj.title;
                            questionDiv.appendChild(titleElement);

                            const p1 = document.createElement('p');
                            p1.textContent = questionObj.p1;
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

                            // 将问题添加到问题列表中
                            questionList.appendChild(questionDiv);

                        }
                    });
                }
                else {
                    questionList.innerHTML = '<p>Data received is not an array.</p>';
                }
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Failed to fetch questions due to an error.';
                document.body.appendChild(errorMessage);
            });
        function searchById() {
            const searchId = document.getElementById('searchId').value;
            const container = document.getElementById('questionsAndAnswers');
            container.innerHTML = '';

            const filteredData = allQuestions.filter(questionObj => questionObj.id.toString() === searchId);

            if (filteredData.length > 0) {
                filteredData.forEach(questionObj => {
                    renderQuestionAndAnswers(questionObj, container);
                });
            } else {
                container.innerHTML = '<p>没有找到对应ID的问题。</p>';
            }
        }
