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

let sub_win = document.getElementById('success_container');
sub_win.style.display = 'none';

let back = document.getElementById('back');
back.onclick = () =>{window.history.go(-1);}


let created_at = document.getElementById('date');
created_at.value = now();

let act = document.getElementById('submit');
let form_ = document.querySelector('#main');
act.onclick = () => {
    let blank = [
        document.getElementById('content').value,
        document.getElementById('author_name').value,
        document.getElementById('email').value]

    function is_blank(){
        if (blank[0]==''||blank[0]==''||blank[0]=='') return false
        else return true
    }
    let formdata = new FormData(form_);
    const xhr =new XMLHttpRequest();
    let data = {
        'content': formdata.get('content'),
        'author_name': formdata.get('author_name'),
        'created_at': created_at.value,
        'author_email': formdata.get('author_email'),
    }
    let fdata = JSON.stringify(data);
    if (is_blank()){
        sub_win.style.display = 'grid';
        xhr.open('post',`https://hduhelp.woshiluo.com/api/question/${uid}/answer`);
        xhr.setRequestHeader("Content-type","application/json");
        xhr.addEventListener("loadend",()=>{
            sleep(1000);
            window.location.href = 'now_q&a.html';
            console.log(xhr.response);
        })
        xhr.send(fdata);
    }
    else {
        alert('请填写相应信息哦');
    }
}