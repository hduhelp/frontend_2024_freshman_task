function now(){
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);

    const formattedTime = year +'-'+ month +'-'+ day +'T'+ hours +':'+ minutes +':'+ seconds + 'Z';
    return formattedTime;
}
function sleep(time){
    var timeStamp = new Date().getTime();
    var endTime = timeStamp + time;
    while(true){
        if (new Date().getTime() > endTime){
        return;}}
}

let uid = localStorage.getItem('uid');
let a_uid = localStorage.getItem('a_uid');

let sub_win = document.getElementById('success_container');
sub_win.style.display = 'none';

let back = document.getElementById('back');
back.onclick = () =>{window.history.go(-1);}


let created_at = document.getElementById('date');
created_at.value = now();


fetch(`https://hduhelp.woshiluo.com/api/question/${uid}/answer`)
    .then(Response => Response.json())
    .then(data => {
        console.log(data);
        document.getElementById('content').value = data[a_uid-1]['content'];
        document.getElementById('author_name').value = data[a_uid-1]['author_name'];
        document.getElementById('email').value = data[a_uid-1]['author_email'];
    })
    .catch(err => console.log('Request Failed', err));

let act = document.getElementById('submit');
let form_ = document.querySelector('#main');
act.onclick = () => {
    let blank = document.getElementById('content').value;

    function is_blank(){
        if (blank=='') return false
        else return true
    }
    let formdata = new FormData(form_);
    const xhr =new XMLHttpRequest();
    let data = {
        'detail': formdata.get('content'),
        'author': formdata.get('author_name'),
        'created_at': created_at.value,
        'author_email': formdata.get('author_email'),
    }
    let fdata = JSON.stringify(data);
    if (is_blank()){
        sub_win.style.display = 'grid';
        xhr.open('put',`https://hduhelp.woshiluo.com/api/question/${uid}/answer/${a_uid}`);
        xhr.setRequestHeader("Content-type","application/json");
        xhr.addEventListener("loadend",()=>{
            sleep(1000);
            window.history.go(-1);
            console.log(xhr.response);
        })
        xhr.send(fdata);
    }
    else {
        alert('请填写相应信息哦');
    }
}