function getPosTop(i, j) {
    return 20 + i * 120;
}

function getPosLeft(i, j) {
    return 20 + j * 120;
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 1:
            return "#8539A8";
            break;
        case 3:
            return "#000000";
            break;

        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
    }

    return "black";
}

function getNumberText(number) {
    switch (number) {
        case 1:
            return "答疑";
            break;
        case 2:
            return "HTML";
            break;
        case 3:
            return "失败";
            break;
        case 4:
            return "CSS";
            break;
        case 8:
            return "JS";
            break;
        case 16:
            return "jQuery";
            break;
        case 32:
            return "Vue";
            break;
        case 64:
            return "React";
            break;
        case 128:
            return "Node";
            break;
        case 256:
            return "HTTP";
            break;
        case 512:
            return "项目";
            break;
        case 1024:
            return "面试";
            break;
        case 2048:
            return "offer";
            break;
        case 4096:
            return "成功";
            break;
        case 8192:
            return "赢了";
            break;
    }
    return "black";
}

function getNumberColor(number) {
    if (number <= 4)
        return "#776e65";

    return "white";
}

function nospace(board) {

    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] == 0)
                return false;

    return true;
}

function canMoveLeft(board) {

    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++)
            if (board[i][j] != 0)
            // if( board[i][j-1] == 0 || board[i][j-1] == board[i][j])
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j] || board[i][j - 1] == 1 || board[i][j] == 1)
                    return true;

    return false;
}

function canMoveRight(board) {

    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--)
            if (board[i][j] != 0)
            // if( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j] || board[i][j + 1] == 1 || board[i][j] == 1)
                    return true;

    return false;
}

function canMoveUp(board) {

    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++)
            if (board[i][j] != 0)
            // if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j] || board[i - 1][j] == 1 || board[i][j] == 1)
                    return true;

    return false;
}

function canMoveDown(board) {

    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--)
            if (board[i][j] != 0)
            // if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j] || board[i + 1][j] == 1 || board[i][j] == 1)
                    return true;

    return false;
}

function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++)
        if (board[row][i] != 0)
            return false;
    return true;
}

function noBlockVertical(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++)
        if (board[i][col] != 0)
            return false;
    return true;
}

function nomove(board) {
    if (canMoveLeft(board) ||
        canMoveRight(board) ||
        canMoveUp(board) ||
        canMoveDown(board))
        return false;

    return true;
}

var arr = ["1.任何值和NaN做任何比较，结果都是false;", "2.箭头函数中this的值和外层的this是一样的;", "3.Proxy用于修改操作的默认行为;", "4.垃圾回收是一种自动的内存管理机制;", "5.Set中成员的值都是唯一的;", "6.stringify()将JS对象序列化为JSON字符串;", "7.扩展运算符可以展开数组;", "8.instanceof可确定原型与实例的关系;", "9.this在全局函数中等于window;", "10.Generator是一种异步编程解决方案;", "11.静态方法不会被实例继承;"];
var arr1 = [];

function mianjing() {
    showCongrat('请收下进阶秘籍')
    arr1.push(arr.shift());
    var textareaSled = document.getElementById('mianjingText');
    textareaSled.innerHTML = "";
    for (var i = 0; i < arr1.length; i++) {
        textareaSled.innerHTML += arr1[i] + '<br>';
    }
}

function updateMianjing() {
    arr = ["1.任何值和NaN做任何比较，结果都是false;", "2.箭头函数中this的值和外层的this是一样的;", "3.Proxy用于修改操作的默认行为;", "4.垃圾回收是一种自动的内存管理机制;", "5.Set中成员的值都是唯一的;", "6.stringify()将JS对象序列化为JSON字符串;", "7.扩展运算符可以展开数组;", "8.instanceof可确定原型与实例的关系;", "9.this在全局函数中等于window;", "10.Generator是一种异步编程解决方案;", "11.静态方法不会被实例继承;"];
    arr1 = [];
    document.getElementById('mianjingText').innerHTML = "越努力，越幸运";
}