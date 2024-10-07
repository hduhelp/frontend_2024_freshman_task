let back = document.getElementById('back');
back.onclick = () =>{window.location.href = 'index.html';}

fetch('https://hduhelp.woshiluo.com/api/question')
  .then(response => response.json())
  .then(data => {
    for (let i = 0;i < data.length;i++)
    {
      let target_ = document.querySelector('#item_container');
      let item = document.createElement('button');
      item.className = 'middle_items';
      item.id = 'm' + data[i]['id'].toString(10);
      item.onclick = () =>
      {
        window.location.href = "now_q&a.html";
        localStorage.setItem('uid',item.id.slice(1));
      }
        target_.appendChild(item);
          
      let t_title = document.createElement('div');
        t_title.className = 'main_title';
        t_title.innerText = data[i]['title'];
        item.appendChild(t_title);

      let t_img = document.createElement('img');
        t_img.className = 'profile';
        t_img.src = "materials/user.png";
        t_img.width = '30';
        item.appendChild(t_img);

      let t_author = document.createElement('div');
        t_author.className = 'author';
        t_author.innerText = data[i]['author'];
        item.appendChild(t_author);

      let t_email = document.createElement('div');
        t_email.className = 'email';
        t_email.innerText = data[i]['author_email'];
        item.appendChild(t_email);

      let t_detail = document.createElement('div');
        t_detail.className = 'detail';
        t_detail.innerText = data[i]['detail'];
        item.appendChild(t_detail);
  
      let t_created_at = document.createElement('div');
        t_created_at.className = 'date';
        t_created_at.innerText = data[i]['created_at'].slice(0,10)+' '+data[i]['created_at'].slice(11,19);
        item.appendChild(t_created_at);

      let t_del = document.createElement('img');
        t_del.src = 'materials/del.png';
        t_del.width = 30;
        t_del.id = 'del';
        t_del.title = '删除问题';
        t_del.onclick = () =>{
          item.onclick = ()=>{none};
          item.style.display = 'none';
        }
        item.appendChild(t_del);
    }
    document.getElementById('loading_img').style.display = 'none';
  })
  .catch(err => console.log('Request Failed', err));
//----------------------------------------------------------------------------------------------------------------//
add_ques = document.getElementById('add');
add_ques.onclick = () =>{window.location.href = "add_ques.html";};


  