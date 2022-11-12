const socket = io('http://localhost:8000');

const form = document.getElementById('sendform');
const messageInput = document.getElementById('sendmessage')
const messageContainer = document.querySelector('.container')
var audioReceived = new Audio('ting.mp3');
var audioSent = new Audio('sent.mp3');

const append = (message, position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    audioReceived.play()
    if(position=='right')
    audioSent.play();

}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    messageInput.value = '';

})


// const uname = prompt("Enter you name to join");
console.log(uname);
socket.emit('new-user-joined',uname);

socket.on('user-joined', name =>{
append(`${name} joined the chat`,'right')

})


socket.on('receive', data =>{
append(`${data.name} : ${data.message}`,'left')

})

socket.on('left', name =>{
append(`${name} left the chat`,'left')

})
