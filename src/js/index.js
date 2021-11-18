
//获取首页数据
function getIndexData() {
    $.ajax({
        type: 'get',
        url: 'http://www.xiongmaoyouxuan.com/api/tab/1?start=0',
        headers: {
            'x-platform': 'pc'
        },
        success: function (res) {
            if (res.code == 200) {
                showBannerImg(res)
                // console.log(res)
                title1 = res.data.gridsV2[0].title
                text1 = res.data.gridsV2[0].text
                tagImageUrl1 = res.data.gridsV2[0].imageUrl
                title2 = res.data.gridsV2[2].title
                text2 = res.data.gridsV2[2].text
                tagImageUrl2 = res.data.gridsV2[2].imageUrl
                title3 = res.data.gridsV2[1].title
                text3 = res.data.gridsV2[1].text
                tagImageUrl3 = res.data.gridsV2[1].imageUrl
                // console.log(title1)
                let htmlTxt1 = template("yellow", {
                    title1,
                    text1,
                    tagImageUrl1
                })
                $('.yellow').html(htmlTxt1)
                let htmlTxt2 = template("bottom1", {
                    title2,
                    text2,
                    tagImageUrl2
                })
                $('.bottom1').html(htmlTxt2)
                let htmlTxt3 = template("orange", {
                    title3,
                    text3,
                    tagImageUrl3
                })
                $('.orange').html(htmlTxt3)
            } else {
                alert('不能获取数据！')
            }
        }
    })
}


//左侧导航
function leftNav() {
    const menuEle = document.querySelector('.menu-active')
    const ulEle = document.querySelector('#banner ul')
    menuEle.onmouseover = function (e) {
        menuEle.classList.remove('add')
    }
    ulEle.onmouseover = function (e) {
        menuEle.classList.remove('add')
        e = e || window.event
        let target = e.target || e.srcElement
        if (target.getAttribute('class') == 'li1') {

            $.ajax({
                type: 'get',
                url: 'http://www.xiongmaoyouxuan.com/api/tab/2?start=0',
                success: function (res) {
                    if (res.code == 200) {
                        // console.log(res)
                        let menuTitleTop = res.data.category.name
                        let htmlTxt1 = template("menu-title1", {
                            menuTitleTop
                        })
                        $('.menu-title-top').html(htmlTxt1)
                    }
                }
            })
            $.ajax({
                type: 'get',
                url: 'http://www.xiongmaoyouxuan.com/api/tab/13?start=0',
                success: function (res) {
                    if (res.code == 200) {
                        // console.log(res)
                        let menuTitleBottom = res.data.category.name
                        let htmlTxt2 = template("menu-title2", {
                            menuTitleBottom
                        })
                        $('.menu-title-bottom').html(htmlTxt2)
                    }
                }
            })
        }
    }
    ulEle.onmouseout = function (e) {
        menuEle.classList.add('add')
    }
    menuEle.onmouseout = function (e) {
        menuEle.classList.add('add')
    }
}

//加载轮播图片
function showBannerImg(res) {
    let bannerImages = res.data.banners
    // console.log(bannerImages)
    let htmlTxt = template("showbannerimg", {bannerImages})
    $('.swiper-wrapper').html(htmlTxt)

    var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,
        loop: true,
        speed: 300,
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
}



//获取更多数据
let dataList = []
// ulmoreEle=document.querySelector('.ulmore')
function getMoreData(start) {

    $.ajax({
        type: 'get',
        url: 'http://www.xiongmaoyouxuan.com/api/tab/1/feeds',
        data: {
            start
        },
        success: function (res) {
            if (res.code == 200) {
                let list = res.data.list
                dataList = [...dataList, ...list]
                // console.log(res)
                //截取不能构成一行的数据
                let num=dataList.length%4
                if(num!==0){
                    dataList.splice(dataList.length-num,num)
                }
                let htmlTxt = template("showmore", {
                    dataList
                })
                $('.product').html(htmlTxt)
            } else {
                alert('不能获取数据！')
            }
        }
    })
}

//点击显示更多商品

function showMore() {
    let start = 0
    getMoreData(start)
    const moreEle = document.querySelector('.getmore')
    // console.log(moreEle)
    moreEle.onclick = function () {
        start += 20
        getMoreData(start)

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

//跳转页面
function changePage() {
    $('.first').on('click', function () {
        location.href = '../pages/index.html'
    })
    $('.second').on('click', function () {
        location.href = '../pages/freeship.html'

    })
    $('.three').on('click', function () {
        location.href = '../pages/supervalue.html'
    })
    $('.four').on('click', function () {
        location.href = '../pages/wearstyle.html'
    })
    $('.yellow').on('click',function(){
        location.href = '../pages/freeship.html'
    })
    $('.bottom1').on('click', function () {
        location.href = '../pages/wearstyle.html'
    })
    $('.orange').on('click', function () {
        location.href = '../pages/supervalue.html'
    })
}

//查看商品详情
function goDetail(){
    $('#productsList .product').on('click','li', function(){
        let id=$(this).attr('index-data')
        // console.log(id)
        let product={id}
        console.log(product)
        let productStr=localStorage.getItem('PRODUCTID')
        let details = JSON.parse(productStr) || []
        details.unshift(product)
         localStorage.setItem('PRODUCTID', JSON.stringify(details))
         location.href='../pages/detail.html'
    })
}

//获取登录后的用户名
function showUser(){
    const username = JSON.parse(localStorage.getItem('userMessage'))
    // console.log(username)
    let newName=username.find(item => {
           return item.id
    })
    // console.log(newName.id)
    // $('.goLogin').html(newName.id)

}
showMore()
changePage()
getIndexData()
leftNav()
goDetail()
showUser()