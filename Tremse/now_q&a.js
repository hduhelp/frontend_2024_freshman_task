let loading = document.getElementById('loading_img');
let uid = localStorage.getItem('uid');

let back = document.getElementById('back');
back.onclick = () =>{window.history.go(-1);}

let put = document.getElementById('put');
put.onclick = ()=>{window.location.href = 'put_ques.html';}
//以下加载问题
fetch(`https://hduhelp.woshiluo.com/api/question/${uid}`)
    .then(Response => Response.json())
    .then(data => {
        document.title = data['title']
        let target_ = document.querySelector('#ques_container');

        let t_title = document.createElement('div');
            t_title.id = 'title';
            t_title.innerText = data['title'];
            target_.appendChild(t_title);

        let t_img = document.createElement('img');
            t_img.id = 'profile';
            t_img.src = "materials/user.png";
            t_img.width = '30';
            target_.appendChild(t_img);

        let t_author = document.createElement('div');
            t_author.id = 'author';
            t_author.innerText = data['author'];
            target_.appendChild(t_author); 

        let t_email = document.createElement('div');
            t_email.id = 'email';
            t_email.innerText = data['author_email'];
            target_.appendChild(t_email);

        let t_detail = document.createElement('div');
            t_detail.id = 'detail';
            t_detail.innerText = data['detail'];
            target_.appendChild(t_detail);

        let t_created_at = document.createElement('div');
            t_created_at.id = 'date';
            t_created_at.innerText = data['created_at'].slice(0,10)+' '+data['created_at'].slice(11,19);
            target_.appendChild(t_created_at);
    })
    .catch(err => console.log('Request Failed', err));
//以下加载回答
fetch(`https://hduhelp.woshiluo.com/api/question/${uid}/answer`)
    .then(Response => Response.json())
    .then(data => {
        for (let i = 0;i < data.length;i++)
        {
            let a_target_ = document.querySelector('#a_container');
            let a_item = document.createElement('div');
            a_item.className = 'a_item';
            a_target_.appendChild(a_item);

            let a_img = document.createElement('img');
                a_img.className = 'a_profile';
                a_img.src = "materials/user.png";
                a_img.width = '30';
                a_item.appendChild(a_img);

            let a_author = document.createElement('div');
                a_author.className = 'a_author';
                a_author.innerText = data[i]['author_name'];
                a_item.appendChild(a_author);

            let a_email = document.createElement('div');
                a_email.className = 'a_email';
                a_email.innerText = data[i]['author_email'];
                a_item.appendChild(a_email);
    
            let a_content = document.createElement('div');
                a_content.className = 'a_content';
                a_content.innerText = data[i]['content'];
                a_item.appendChild(a_content);
    
            let a_created_at = document.createElement('div');
                a_created_at.className = 'a_date';
                a_created_at.innerText = data[i]['created_at'].slice(0,10)+' '+data[i]['created_at'].slice(11,19);
                a_item.appendChild(a_created_at);

            let t_del = document.createElement('img');
                t_del.src = 'materials/del.png';
                t_del.width = 30;
                t_del.id = 'del';
                t_del.title = '删除回答';
                t_del.onclick = () =>{
                  a_item.style.display = 'none';
                }
                a_item.appendChild(t_del);
            let t_put = document.createElement('img');
                t_put.src = 'materials/put.png';
                t_put.width = 30;
                t_put.id = 'a_put';
                t_put.title = '修改回答';
                t_put.onclick = () =>{
                  window.location.href='put_ans.html';
                  localStorage.setItem('a_uid',data[i]['id']);
                  localStorage.setItem('uid',data[i]['question_id']);
                }
                a_item.appendChild(t_put);
            if (data[i]['is_best'] != undefined)
            {
                let a_best = document.createElement('img');
                    a_best.className = 'a_best';
                    a_best.src = "materials/best.png";
                    a_best.width = '30';
                    a_best.title = 'Best Answer!'
                    a_item.appendChild(a_best);
            }
        }
        ud_id = data.length;
        loading.style.display = 'none';
    })
    .catch(err => {console.log('Request Failed', err);loading.hidden = true;});
//以下增加问题
let add_a = document.getElementById('add');
add_a.onclick = () =>{
    window.location.href = 'add_ans.html';
}