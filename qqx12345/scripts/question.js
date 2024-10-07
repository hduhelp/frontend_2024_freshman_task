document.addEventListener('DOMContentLoaded', () => {
    function fetchquestion () {
        fetch('https://hduhelp.woshiluo.com/api/question')
        .then(response => response.json())
        .then(data => {
            displayquestion(data);
            display();
        });
    }
    function displayquestion(questions)  { 
    const questionlist =document.getElementById('question-container');
    questionlist.innerHTML=''
    questions.forEach((question) => {            
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('element');
        questionDiv.setAttribute('id', question.id);
        // fetchanswer(question.id);
        questionDiv.innerHTML=`
        <h2>${question.title}</h2>
        <p><strong>author:</strong> ${question.author}</p>
        <p><strong>detail:</strong> ${question.detail}</p>
        <p><strong>id:</strong> ${question.id}</p>             
        `;  
        questionlist.appendChild(questionDiv);
        if (question.answers && question.answers.length > 0) {
            question.answers.forEach((answer)=>{
                const answerDiv = document.createElement('div');
                answerDiv.innerHTML=`
                <p><strong>answer:</strong> ${answer.content}</p>
                `;
                questionDiv.appendChild(answerDiv);
            });
        }
    });
}
    fetchquestion();
    function submit() {
        const button =document.querySelector('#question_submit');
        const input =document.querySelector('#question_input');
        // if (input.value.trim()) {
        button.addEventListener('click',()=>{
            if (input.value.trim()) {
            fetch('https://hduhelp.woshiluo.com/api/question',{
                method:'POST',
                headers:{
                      'Content-Type':'application/json'
                },
                body: JSON.stringify({title:input.value,answers:[]}),           
            })
            .then(response => response.json())
            .then(data => fetchquestion()); 
            input.value='';    
        }
            else alert('请输入有效问题');

        });
    }
    submit();
    function display() {
        const elements = document.querySelectorAll('.element');
        elements.forEach((element) => {
            element.addEventListener('click', () => {
                if (!element.querySelector('.reply')) {
                let reply = document.createElement('div');
                reply.className = 'reply'; // 添加样式
                reply.style.display = 'block';
                reply.innerHTML = `
                    <button class="reply-back" style="float: left;">返回</button>
                    <textarea placeholder="输入回答/修改过的问题" class='input'></textarea>
                    <button class="reply-delete">删除</button>
                    <button class="reply-edit">修改</button>
                    <button class="answer">回答</button>
                `;
                element.appendChild(reply); // 将新的回复框添加到当前问题下
                element.style.cursor = 'default';
                reply.querySelector('.reply-back').addEventListener('click', () => {
                    fetchquestion();
                });
                reply.querySelector('.reply-delete').addEventListener('click', () => {
                    const questionId = element.getAttribute('id');
                    //  console.log(questionId);
                     // 获取当前问题的ID
                    if (confirm('确定要删除这个问题吗？')) {
                        deleteQuestion(questionId);
                    }
                });
                reply.querySelector('.reply-edit').addEventListener('click',()=> {
                    const Id = element.getAttribute('id');
                    const input = reply.querySelector('textarea');
                    if (input.value.trim()) {
                        fetch(`https://hduhelp.woshiluo.com/api/question/${Id}`,{
                            method:'PUT',
                            headers:{
                                  'Content-Type':'application/json'
                            },
                            body: JSON.stringify({title:input.value,answers:[]}),           
                        })
                        .then(response => response.json())
                        .then( ()=> fetchquestion()); 
                        input.value='';    
                    }
                        else alert('请输入有效问题');
                });
                reply.querySelector('.answer').addEventListener('click', () => {
                    const Id = element.getAttribute('id');
                    const input = reply.querySelector('textarea');
                    if (input.value.trim()) {
                        fetch(`https://hduhelp.woshiluo.com/api/question/${Id}/answer`,{
                                method:'POST',
                                headers:{
                                      'Content-Type':'application/json'
                                },
                                body: JSON.stringify({content:input.value}),           
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                fetch(`https://hduhelp.woshiluo.com/api/question/${Id}`)
                                .then(response => response.json())
                                .then(questiondata => {
                                    questiondata.answers.push(data);
                                    fetch(`https://hduhelp.woshiluo.com/api/question/${Id}`,{
                                        method:'PUT',
                                        headers:{
                                        'Content-Type':'application/json'
                                         },
                                        body: JSON.stringify({answers:questiondata.answers}),           
                                        })
                                        .then(response => response.json())
                                        .then(()=> console.log('上传成功')); 
                                });
                            });
                            input.value='';                              
                    }
                    else alert('输入有效回答'); 
                });       
            }
            });
        });
    }
    function deleteQuestion(id) {
        fetch(`https://hduhelp.woshiluo.com/api/question/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (response.ok) {
                fetchquestion();
            } else {
                alert('删除失败');
            }
        })
        .catch(error => {
            console.error('删除请求出错:', error);
        });
    }
});           
