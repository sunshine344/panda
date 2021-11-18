//获取节点
const registerIdEle = document.querySelector('input[name="registerId"]')
const registerPasswordEle = document.querySelector('input[name="registerPassword"]')
const registerBtnEle = document.querySelector('.btn')
const registerIdText=document.querySelector('.registerIdText')
const registerPasswordText=document.querySelector('.registerPasswordText')

//账号非空验证
const emptyChecjedId = () => {
    //获取节点内容
    let registerId = registerIdEle.value
    if (registerId == '') {
        registerIdText.innerHTML = '用户名不能为空！'
        return false
    } else {
        registerIdText.innerHTML = ''
        return true
    }

}
//密码非空验证
const emptyChecjedPassword=()=>{
    let registerPassword = registerPasswordEle.value
    if(registerPassword==''){
        registerPasswordText.innerHTML='密码不能为空！'
        return false
    }else{
        registerPasswordText.innerHTML=''
        return true

    }
}

//密码强度验证
const passwordDegree = () => {
    let password = registerPasswordEle.value

    let reg = /^[A-Z][0-9a-zA-Z]{7}/
    if (!reg.test(password)) {
        registerPasswordText.innerHTML = '密码必须以大写字母开头，至少8位字母或数字！'
        return false
    } else {
        registerPasswordText.innerHTML = ''
        return true
    }
}

//点击事件
registerBtnEle.onclick=function(){
    let isEmptyChecjedId=emptyChecjedId()
    let isEmptyChecjedPassword=emptyChecjedPassword()
    if(!isEmptyChecjedId||!isEmptyChecjedPassword){
        return
    }
    //密码强度
    let isPasswordDegree=passwordDegree()
    if(!isPasswordDegree){
        return
    }
    alert('注册成功！')
    location.href='../pages/login.html'
    //将数据持久化存储
    let message={
        id:registerIdEle.value,
        password:registerPasswordEle.value
    }
    let messageStr=localStorage.getItem('userMessage')
    let messages=JSON.parse(messageStr) ||[]
    messages.unshift(message)
    localStorage.setItem('userMessage',JSON.stringify(messages))


    registerIdEle.value=''
    registerPasswordEle.value=''

}

//焦点事件
registerIdEle.addEventListener('blur', function () {
    emptyChecjedId()
})
//密码焦点事件
registerPasswordEle.addEventListener('blur', function () {
    let isEmptyChecjedPassword=emptyChecjedPassword()
    //如果为空，则不进行强度验证，不为空时，再进行强度验证
    if (!isEmptyChecjedPassword) {
        return
    }
    passwordDegree()
})

function toLogin(){
    const toLoginEle=document.querySelector('.toLoginBtn')
    toLoginEle.onclick=function(){
        location.href='./login.html'
    }
}
toLogin()