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
let created_at = document.getElementById('date');
created_at.value = now();


let form_ = document.querySelector('#main');
let act = document.getElementById('submit');

let back = document.getElementById('back');
back.onclick = () =>{window.history.go(-1);}

let sub_win = document.getElementById('success_container');
sub_win.style.display = 'none';

act.onclick = () => {
    let blank = [document.getElementById('title').value,
        document.getElementById('detail').value,
        document.getElementById('author').value,
        document.getElementById('email').value]
    function is_blank(){
        if (blank[0]==''||blank[1]==''||blank[2]==''||blank[3]=='') return false
        else return true
    }
    let formdata = new FormData(form_);
    const xhr =new XMLHttpRequest();
    let data = {
        'title': formdata.get('title'),
        'detail': formdata.get('detail'),
        'author': formdata.get('author'),
        'created_at': created_at.value,
        'author_email': formdata.get('author_email'),
        'answers':new Array()
    }
    let fdata = JSON.stringify(data);
    if (is_blank()){
        sub_win.style.display = 'grid';
        xhr.open('post',"https://hduhelp.woshiluo.com/api/question");
        xhr.setRequestHeader("Content-type","application/json");
        xhr.addEventListener("loadend",()=>{
            sleep(1000);
            window.location.replace('questions.html');
            console.log(xhr.response);
        })
        xhr.send(fdata);
    }
    else {
        alert('请填写所有信息哦');
    }
}

