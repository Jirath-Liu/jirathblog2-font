function jumpToMain() {
    window.open("./main.html");
}
function addJumpListener() {
    var toMainWindow = document.getElementById('enterButton');
    toMainWindow.onclick=jumpToMain;
}

window.onload=function(){
    addJumpListener();
};
