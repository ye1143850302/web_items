//轮播图的效果
// 1.鼠标经过轮播图模块 左右按钮显示 离开左右按钮则隐藏
// 2.右侧按钮按一下 图片往左边放一张 右侧按钮同理
// 3.图片播放的同时，下面的小圆圈模块同时变化
// 4.点击小圆圈可以播放对应的图片
// 5.鼠标不经过轮播图，轮播图也会自动播放
// 6.鼠标经过，轮播图模块 自动播放停止
window.addEventListener('load', function() {

    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth; //图片的宽度
    // 1.鼠标经过按钮显示 鼠标离开 按钮隐藏
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            //手动调用点击事件  定时器自动点击
            arrow_r.click();
        }, 2000);
    });
    //2.动态生成小圆圈  小圆圈的个数与图片的张数一致
    //思路：（1）得到ul里的图片的个数=li的个数
    // （2）利用循环动态生成小圆圈 放入ol里面
    // （3）创建节点 createElment('li')
    // (4)插入节点ol.appendchild(li)
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // this.console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        //为每个图片生成一个小圆圈li
        var li = this.document.createElement('li');
        //记录当前小圆圈的索引号  自定义属性
        li.setAttribute('index', i);
        //将每个小圆圈li插入ol中
        ol.appendChild(li);
        //小圆圈的排他思想 点击一个小圆圈 当前的小圆圈变颜色 其他不变
        li.addEventListener('click', function() {
            //首先干掉所有li 清除所有的li的类current
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下自己;
            this.className = 'current';
            // 5.点击小圆圈 更换图片模块
            // 滚动图片移动的是排好队形的ul 核心算法是： 当点击某个小圆圈时， 就让ul移动小圆圈的索引号乘以图片的宽度

            //点击当前的li 获得当前li的索引号
            var index = this.getAttribute('index');
            //当点击li就要把这个li的index给到num
            num = index;
            //当点击li就要把这个li的index给到cicle
            circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    //把ol里面的第一个孩子-小圆圈设置为current
    ol.children[0].className = 'current';
    //6.克隆第一张图片 放到ul后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first); //写在添加li生成小圆圈的后面就可以避免生成小圆圈
    // 7.点击右侧按钮 图片滚动一张
    //声明一个变量 点击一次就加1 在乘以图片的宽度得到ul移动的距离
    var num = 0;
    var circle = 0; //控制小圆圈播放变化的变量
    var flag = true; //节流阀 控制不要点击过快
    arrow_r.addEventListener('click', function() {
            if (flag == true) {
                flag = false;
                //无缝滚动 将第一张复制一份 放到最后一张 当滚动到最后一张时候 无动画的将ul滚动到第一张的位置
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                animate(ul, -num * focusWidth, function() {
                    flag = true; //回调函数 打开节流阀
                });
                //8.点击右侧按钮 小圆圈也跟着一起变化
                circle++;
                //如果cicle=4,那么说明走到克隆的那个图片的 需要复原
                if (circle == ol.children.length) {
                    circle = 0;
                }
                circlechange();
            }
        })
        // 9.左侧按钮的变化效果
    arrow_l.addEventListener('click', function() {
        if (flag == true) {
            flag = false;
            //无缝滚动 将第一张复制一份 放到最后一张 当滚动到最后一张时候 无动画的将ul滚动到第一张的位置
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            //8.点击右侧按钮 小圆圈也跟着一起变化
            circle--;
            //如果cicle<0,那么说明走到第一图片的 则小圆圈需要走到第四个
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            //调用函数
            circlechange();
        }

    })

    function circlechange() {
        //先清除其余小圆圈的current名字
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '0';
        }
        //留下当前的小圆圈的类
        ol.children[circle].className = 'current';
    }
    //10.自动播放
    var timer = this.setInterval(function() {
        //手动调用点击事件  定时器自动点击
        arrow_r.click();
    }, 2000);
})