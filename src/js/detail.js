
//发起请求，获取数据
function showProductDetial() {
    const idStr = localStorage.getItem('PRODUCTID')
    let ids = JSON.parse(idStr) || []
    let id = parseInt(ids[0].id)
    // console.log(id)
    $.ajax({
        type: 'get',
        url: 'http://www.xiongmaoyouxuan.com/api/detail',
        data: {
            id
        },
        success: function (res) {
            if (res.code == 200) {
                // console.log(res)
                let detailproduct = res.data.detail.photo
                let title=res.data.detail.title
                let price=res.data.detail.price
                let couponValue=res.data.detail.couponValue
                let expireDate=res.data.detail.expireDate
                let platformName=res.data.detail.shop.platformName
                let tbOriginPrice=res.data.detail.tbOriginPrice
                let saleNum=res.data.detail.saleNum
                let arr =detailproduct.map(function (item){
                    return item.url
                })
                let img=arr[0]
                console.log(img)
                let htmlTxt1 = template("getglass", {
                    detailproduct,
                    img
                })
                data={
                    title,
                    couponValue,
                    expireDate,
                    platformName,
                    price,
                    tbOriginPrice,
                    saleNum,
                }
                let htmlTxt2 = template("getText",data)
                let nickname=res.data.shop.nickname
                // console.log(nickname)
                let picUrl=res.data.shop.coverUrl
                let serviceScore=res.data.shop.serviceScore
                let deliveryScore=res.data.shop.deliveryScore
                let itemScore=res.data.shop.itemScore
                data2={
                    nickname,
                    picUrl,
                    serviceScore,
                    deliveryScore,
                    itemScore
                }
                let htmlTxt3 = template("getshop",data2)
                let imgdata=res.data.detail.descContentList
                let imgs=imgdata.map(item => {
                    return item.image       
                })
                // console.log({imgs})
                let htmlTxt4 = template("imgdetail",{imgs})
                $('.content-bottom').html(htmlTxt4)

                $('.top-left').html(htmlTxt1)
                $('.top-text').html(htmlTxt2)
                $('.top-shop').html(htmlTxt3)
                const olliEle = document.querySelectorAll('ol>li')
                const ulliEle = document.querySelectorAll('.glass-min>li')
                olliEle[0].classList.add('dynamic')
                mouseMove()
                let changeObj = new changePic(olliEle, ulliEle)
                changeObj.change()

                goCart()
            }
        }
    })
}
showProductDetial()

function mouseMove() {
    //获取节点
    const moveEle = document.querySelector('.move')
    const moveRangeEle = document.querySelector('.moveRange')
    const bigBox = document.querySelector('.bigBox')
    const bigPic = document.querySelector('.bigBox>img')
    bigBox.style.display = 'none'
    //获取元素p的尺寸
    moveRangeEle.onmousemove = function (e) {
        //获取事件对象
        e = e || window.event
        //获取光标位置,并把p元素的光标点设置成中心
        let x = e.offsetX - moveEle.offsetWidth / 2
        let y = e.offsetY - moveEle.offsetHeight / 2
        //边界判断
        //左边界
        if (x < 0) {
            x = 0
        }
        //右边界
        if (x > moveRangeEle.offsetWidth - moveEle.offsetWidth) {
            x = moveRangeEle.offsetWidth - moveEle.offsetWidth
        }
        // 上边界
        if (y < 0) {
            y = 0
        }
        // 下边界
        if (y > moveRangeEle.offsetHeight - moveEle.offsetHeight) {
            y = moveRangeEle.offsetHeight - moveEle.offsetHeight
        }

        //获取移动的比例
        /**
         遮罩层移动距离        遮罩层
         ------------   =  ------------
         背景图片移动距离      放大镜

          背景图片移动距离 =  遮罩层移动距离*放大镜/遮罩层
       **/
        let moveX = x * bigBox.offsetWidth / moveEle.offsetWidth
        let moveY = y * bigBox.offsetHeight / moveEle.offsetHeight

        moveEle.style.top = y + 'px'
        moveEle.style.left = x + 'px'

        bigPic.style.top = -moveY + 'px'
        bigPic.style.left = -moveX + 'px'


    }
    //鼠标移入出现
    moveRangeEle.onmouseover = function () {
        moveEle.style.display = 'block'
        bigBox.style.display = 'block'
        //计算背景图比例
        /*计算背景图比例
           遮罩层mask            放大镜bigGlass
          ---------------   =   ------------------
           显示图片showbox        背景图bigPicBox
         
           背景图片bigpicbox = 放大镜bigGlass*显示图片showbox/遮罩层mask
        */
        bigPic.style.width = bigBox.offsetWidth * moveRangeEle.offsetWidth / moveEle.offsetWidth + 'px'
        bigPic.style.height = bigBox.offsetHeight * moveRangeEle.offsetHeight / moveEle.offsetHeight + 'px'
    }
    //鼠标移出隐藏
    moveRangeEle.onmouseout = function () {
        moveEle.style.display = 'none'
        bigBox.style.display = 'none'
    }
}

//构造函数
function changePic(olliEle, ulliEle) {
    this.olliEle = olliEle
    this.ulliEle = ulliEle
}
changePic.prototype.change = function () {
    //遍历li
    const bigPic=document.querySelector('.bigPic')
    for (let i = 0; i < this.ulliEle.length; i++) {
        //获取当前对象
        let _this = this
        //清除所有样式
        this.ulliEle[i].onclick = function () {
            _this.clear()
            _this.olliEle[i].classList.add('dynamic')
            _this.ulliEle[i].classList.add('addBorder')
            // console.log((_this.olliEle[i].firstChild).getAttribute('src'))
            let picUrl=(_this.olliEle[i].firstChild).getAttribute('src')
            bigPic.src=picUrl
        }

    }
}
changePic.prototype.clear = function () {
    for (let i = 0; i < this.olliEle.length; i++) {
        this.olliEle[i].classList.remove('dynamic')
        this.ulliEle[i].classList.remove('addBorder')
    }
}


//回到顶部
//回到顶部函数
function backTop() {
    //重复执行，滚动条位置-50
    var timeObj = window.setInterval(function () {
        var distantTop = getScrollTop() //获取滚动条位置
        dist = distantTop - 50
        setScrollTop(dist)
        if (dist <= 0) {
            window.clearInterval(timeObj)
        }

    }, 10)
}

//设置滚动条位置
function setScrollTop(dist) {

    if (document.body.scrollTop) {
        document.body.scrollTop = dist
    } else {
        document.documentElement.scrollTop = dist
    }

}
//获取当前滚动条位置
function getScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop
}
//跳转到首页
function goIndex(){
    $('#nav ul li').on('click',function(){
        location.href = '../pages/index.html'
    })
}
//去购物车
function goCart(){
    $('.join-cart').on('click',function(){
        // alert('>>>')
        addCart()
        alert('添加购物车成功！')
        location.href='../pages/cart.html'
    })
}
//将商品信息存储到本地，然后在购物车显示
function addCart(){
    const idStr = localStorage.getItem('PRODUCTID')
    let ids = JSON.parse(idStr) || []
    let id = parseInt(ids[0].id)
    // console.log(id)
    $.ajax({
        type: 'get',
        url: 'http://www.xiongmaoyouxuan.com/api/detail',
        data: {
            id
        },
        success: function (res) {
            if (res.code == 200) {
                // console.log(res)
                // console.log(res.data.detail.id)
                let product={
                    id:res.data.detail.id,
                    qunTitle:res.data.detail.qunTitle,
                    image:res.data.detail.image,
                    price:res.data.detail.price,
                    num:1,
                    state:false,
                    singleprice:res.data.detail.price,
                }
                // console.log(product)
                let productStr=localStorage.getItem('CARTS')
                let carts=JSON.parse(productStr) || []
                let newCarts=carts.find(item=>item.id==product.id)
                if(newCarts){
                    newCarts.num++
                    newCarts.singleprice = (newCarts.num * product.price).toFixed(2)
                }else{
                    carts.push(product)
                }
                localStorage.setItem('CARTS', JSON.stringify(carts))
            }
        }
    })
}

backTop()
goIndex()
