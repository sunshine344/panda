//设置全选框的状态
let checkedAllState = false
/**
 * 显示购物车列表
 */
// 1. 从localstorage中获取购物车商品数据
let cartStr = localStorage.getItem('CARTS')
let carts = JSON.parse(cartStr) || []
//显示商品列表
function showCartList() {
    
    let data = {
        checkedAllState, //全选状态
        carts
    }
    // console.log(carts)
    let str = template("cartproduct", data)
    
    $('table').html(str)
    
    // console.log(str)
}

const tableEle = document.querySelector('table')
const totalEle = document.querySelector('.totalPrice')
//操作商品
function onProduct() {
    tableEle.addEventListener('click', function (e) {
        e = e || window.event //获取事件对象
        let target = e.target || e.srcElement //获取目标对象

        //删除书籍
        if (target.getAttribute('class') == 'deleteBtn') {
            //获取索引号
            let index = target.getAttribute('data-index')
            let isDelete = confirm('确定要删除？')
            if (isDelete) {
                //删除商品项
                carts.splice(index, 1)
            }

            localStorage.setItem('CARTS', JSON.stringify(carts))
            

            onTotal()

            //添加商品后，如果没有选中，然后再删除，遍历数组查看单选框选中状态，确定全选框状态
            let state = carts.every(item => item.state == true)
            if (state) {
                checkedAllState = true
            } else {
                checkedAllState = false
            }

           
            //重新加载列表
            showCartList()

        }

        //数量+1
        if (target.getAttribute('name') == 'plus') {
            console.log('plus')

            //获取索引号
            let index = target.getAttribute('data-index')
            //数量加一
            carts[index].num++

            //计算单个商品总价
            carts[index].singleprice = (carts[index].price * carts[index].num).toFixed(2)
            localStorage.setItem('CARTS', JSON.stringify(carts))

            //onTotal()
            getCheckedPrice()
            //重新加载列表
            showCartList()
        }

        //数量减一
        if (target.getAttribute('name') == 'minus') {
            //获取索引号
            let index = target.getAttribute('data-index')
            //数量减一
            carts[index].num--
            //计算单个商品总价
            carts[index].singleprice = (carts[index].price * carts[index].num).toFixed(2)
            localStorage.setItem('CARTS', JSON.stringify(carts))

            //onTotal()
            getCheckedPrice()
            //重新加载列表
            showCartList()
        }

        //全选
        if (target.getAttribute('class') == 'checkbox-all') {
            //全选框选中状态，如果开始没有选中，则状态为false，再点击就选中，状态为true
            checkedAllState = !checkedAllState
            //判断全选框的状态，如果它的状态为true，则单选框状态也为true，否则为false
            if (checkedAllState) { //全选框选中
                carts.forEach(item => {
                    item.state = true
                    //onTotal()
                    getCheckedPrice()
                })

            } else {
                carts.forEach(item => {
                    item.state = false
                    totalEle.innerHTML =  0
                })
            }

            showCartList()
        }

        //单选框
        if (target.getAttribute('class') == 'checkbox-item') {
            //获取索引号
            let index = target.getAttribute('data-index')
            carts[index].state = !carts[index].state
            let state = carts.every(item => item.state == true)

            if (state) {
                checkedAllState = true

            } else {
                checkedAllState = false
            }
            getCheckedPrice()
            showCartList()
        }


    })

    //手动输入商品数量
    tableEle.addEventListener('change', function (e) {
        e = e || window.event //获取事件对象
        let target = e.target || e.srcElement //获取目标对象

        if (target.getAttribute('name') == 'amount') {
            //获取输入的值
            let num = target.value
            if (isNaN(num) || num < 0) {
                alert('请输入大于0的数值！')
                num = 0
            }
            if (parseInt(num) != parseFloat(num)) {
                alert('请输入整数！')
                num = 0
            }
            //获取索引号
            let index = target.getAttribute('data-index')
            //将输入的值赋值给输入框
            carts[index].num = num
            //计算单个商品总价
            carts[index].singleprice = (num * carts[index].price).toFixed(2)
            localStorage.setItem('CARTS', JSON.stringify(carts))

            //onTotal()
            showCartList()
        }
    })

}

//实现总价相加
function onTotal() {
    let sum = carts.reduce((s, item) => s += Number(item.singleprice), 0)
    totalEle.innerHTML =sum.toFixed(2)
}
//根据选中状态，获取总价
function getCheckedPrice() {
    let checkedPriceEle = carts.filter(item => item.state == true)
    // console.log(checkedPriceEle)
    if (checkedPriceEle.length == 0) {
        totalEle.innerHTML =  0
    }
    checkedPriceEle.forEach(function (item, index) {
        let sum = checkedPriceEle.reduce((s, item) => s += Number(item.singleprice), 0)
        totalEle.innerHTML = sum.toFixed(2)

    })
    showCartList()
}

//跳转到首页
function goIndex(){
    $('.shopping').on('click',function(){
        location.href = '../pages/index.html'
    })
}

showCartList()
onProduct()
goIndex()