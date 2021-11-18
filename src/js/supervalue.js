//获取专区导航数据
function getNavData() {
    $.ajax({
        type: 'get',
        url: 'http://www.xiongmaoyouxuan.com/api/column/170',
        success: function (res) {
            if (res.code == 200) {
                let navdata = res.data.subColumns
                let dataname=res.data.name
                let htmlTxt = template("shownav", {
                    navdata
                })
                let htmlTxt2=template("showtitle", {
                    dataname
                })
                $('#zone').html(htmlTxt2)
                $('#zone-nav ul').html(htmlTxt)
            } else {
                alert('不能获取数据！')
            }
        }
    })
}
//获取商品列表
let zoneData = []
function getMoreData(start) {
    $.ajax({
        type: 'get',
        url: 'http://www.xiongmaoyouxuan.com/api/sub_column/174/items',
        data: {
            start
        },
        success: function (res) {
            if (res.code == 200) {
                let list = res.data.list
                zoneData = [...zoneData, ...list]
                // console.log(zoneData)
                let num=zoneData.length%4
                if(num!==0){
                    zoneData.splice(zoneData.length-num,num)
                }
                let htmlTxt = template("showproducts", {
                    zoneData
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
    moreEle.onclick = function () {
        start += 20
        getMoreData(start)
        if(start>=88){
            alert('没有更多数据！')
        }
    }
}
//跳转页面
function changePage(){
    $('.first').on('click',function(){
        clear()
        $('.first').addClass('.active')
        location.href='../pages/index.html'
    })
    $('.second').on('click',function(){
        clear()
        $('.second').addClass('.active')
        location.href='../pages/freeship.html'
    })
    $('.three').on('click',function(){
        clear()
        $('.three').addClass('.active')
        location.href='../pages/supervalue.html'
    })
    $('.four').on('click',function(){
        clear()
        $('.four').addClass('.active')
        location.href='../pages/wearstyle.html'
    })

    //移出li样式
    function clear(){
        $('#nav ul li').on('click',function(){
            $('#nav ul li').removeClass('.active')
        })
    }


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
goDetail()

getNavData()
showMore()
changePage()
