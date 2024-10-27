
// 欢迎用户
let myButton = document.querySelector('button');
let myHeading = document.querySelector('h6');

myButton.onclick = function() {
  setUserName();
}

function setUserName() {
  let myName = prompt('请输入你的名字。');
  if(!myName) {
    setUserName();
  } else {
    localStorage.setItem('name', myName);
    myHeading.textContent = '欢迎，' + myName;
  }
}

if(!localStorage.getItem('name')) {
  setUserName();
} else {
  let storedName = localStorage.getItem('name');
  myHeading.textContent = '欢迎，' + storedName;
}


// 首页 切换图片
let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/index1.jpg') {
      myImage.setAttribute('src', 'images/index2.jpg');
    } else {
      myImage.setAttribute('src', 'images/index1.jpg');
    }
}