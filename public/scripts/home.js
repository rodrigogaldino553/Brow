
function showInfo(){
    const input = document.querySelector('#keep-user').value.split(',')
    //{'name': '{{user.name}}', 'user':'{{user.user}}', 'photo':'{{user.photo}}', 'status':'{{user.status}}'};
    const data = {"name": input[0], "user": input[1], "photo": input[2], "status": input[3]}
    console.log(data)
}


