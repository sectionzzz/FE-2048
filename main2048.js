var board = new Array()
var score = 0
var hasConflicted = new Array()
var timerId = 0;
$(document).ready(function() {
    newgame()
    toRest()
})

function newgame() {
    //初始化棋盘格
    init();
    if (timerId) {
        clearInterval(timerId);
    }
    timeBack(300);
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
    updateBoardView();
}

function toRest() {

    setInterval(function() {
        $('#toStudy').fadeIn()
    }, 120000)
}

function timeBack(totalTime) {

    var spans = document.querySelector(".time").querySelectorAll("span");

    timerId = setInterval(function() {
        totalTime--;

        if (totalTime < 0) {
            gameover();
            clearInterval(timerId);
            return;
        }

        var hour = Math.floor(totalTime / 3600);

        var minute = Math.floor(totalTime % 3600 / 60);

        var second = Math.floor(totalTime % 60);

        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);

        spans[3].innerHTML = Math.floor(minute / 10);
        spans[4].innerHTML = Math.floor(minute % 10);

        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = Math.floor(second % 10);
    }, 1000);
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

            var gridCell = $('#grid-cell-' + i + '-' + j)
            gridCell.css('top', getPosTop(i, j))
            gridCell.css('left', getPosLeft(i, j))
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array()
        hasConflicted[i] = new Array()
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0
            hasConflicted[i][j] = false
        }
    }

    updateBoardView()
    score = 0;
    updateScore(score);
}

function updateBoardView() {

    $('.number-cell').remove()
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
            var theNumberCell = $('#number-cell-' + i + '-' + j)

            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px')
                theNumberCell.css('height', '0px')
                theNumberCell.css('top', getPosTop(i, j) + 50)
                theNumberCell.css('left', getPosLeft(i, j) + 50)
            } else {
                theNumberCell.css('width', '100px')
                theNumberCell.css('height', '100px')
                theNumberCell.css('top', getPosTop(i, j))
                theNumberCell.css('left', getPosLeft(i, j))
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]))

                theNumberCell.css('color', getNumberColor(board[i][j]))
                theNumberCell.text(getNumberText(board[i][j]))
            }

            hasConflicted[i][j] = false
        }
    }
}

function generateOneNumber(type) {

    if (nospace(board)) {
        return false
    }

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4))
    var randy = parseInt(Math.floor(Math.random() * 4))

    var times = 0
    while (times < 50) {
        if (board[randx][randy] == 0) {
            break
        }

        randx = parseInt(Math.floor(Math.random() * 4))
        randy = parseInt(Math.floor(Math.random() * 4))

        times++
    }
    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    randx = i
                    randy = j
                }
            }
        }
    }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4

    if (type) {
        randNumber = 1
    }

    //在随机位置显示随机数字
    board[randx][randy] = randNumber
    showNumberWithAnimation(randx, randy, randNumber)
    updateBoardView()

    return true
}

$(document).keydown(function(event) {
    switch (event.keyCode) {
        case 37: //left
            if (moveLeft()) {
                setTimeout('generateOneNumber()', 210)
                setTimeout('isgameover()', 300)
                popup()
            }
            break
        case 38: //up
            if (moveUp()) {
                setTimeout('generateOneNumber()', 210)
                setTimeout('isgameover()', 300)
                popup()
            }
            break
        case 39: //right
            if (moveRight()) {
                setTimeout('generateOneNumber()', 210)
                setTimeout('isgameover()', 300)
                popup()
            }
            break
        case 40: //down
            if (moveDown()) {
                setTimeout('generateOneNumber()', 210)
                setTimeout('isgameover()', 300)
                popup()
            }
            break
        default: //default
            break
    }
})

function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover()
    }
}

function gameover() {
    $('#modal_volume').fadeIn()
    updateMianjing();
}

function moveLeft() {

    if (!canMoveLeft(board)) {
        return false
    }

    //moveLeft
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {

                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if ((board[i][k] == 1 || board[i][j] == 1) && (board[i][k] + board[i][j] > 1) && (board[i][k] + board[i][j]) % 2 != 0) {
                        // Ask for Help
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][k] * board[i][j] * 2
                        board[i][j] = 0
                        alreadyHelp()
                        return true
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k)
                            //add
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                            //add score
                        score += board[i][k]
                        updateScore(score)

                        if (board[i][k] == 4) {
                            // 随机将 2+2 == 4 改成 3
                            // if(Math.round(Math.random())){
                            if (Math.floor(Math.random() * 4)) {
                                board[i][k] = 3
                            }
                        }
                        if (board[i][k] == 6) {
                            board[i][k] = 0;
                            mianjing();
                        }

                        hasConflicted[i][k] = true
                        continue
                    }
                }
            }
        }
    }

    setTimeout('updateBoardView()', 200)
    return true
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false
    }

    //moveRight
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {

                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if ((board[i][k] == 1 || board[i][j] == 1) && (board[i][k] + board[i][j] > 1) && (board[i][k] + board[i][j]) % 2 != 0) {
                        // Ask for Help
                        showMoveAnimation(i, j, i, k)
                        board[i][k] = board[i][k] * board[i][j] * 2
                        board[i][j] = 0
                        alreadyHelp()
                        return true
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k)
                            //add
                        board[i][k] += board[i][j]
                        board[i][j] = 0
                            //add score
                        score += board[i][k]
                        updateScore(score)

                        if (board[i][k] == 4) {
                            // 随机将 2+2 == 4 改成 3
                            // if(Math.round(Math.random())){
                            if (Math.floor(Math.random() * 4)) {
                                board[i][k] = 3
                            }
                        }
                        if (board[i][k] == 6) {
                            board[i][k] = 0;
                            mianjing();
                        }

                        hasConflicted[i][k] = true
                        continue
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200)
    return true
}

function moveUp() {

    if (!canMoveUp(board))
        return false;

    //moveUp
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {

                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if ((board[k][j] == 1 || board[i][j] == 1) && (board[k][j] + board[i][j] > 1) && (board[k][j] + board[i][j]) % 2 != 0 && noBlockVertical(j, k, i, board)) {
                        // Ask for Help
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[k][j] * board[i][j] * 2
                        board[i][j] = 0;
                        alreadyHelp();
                        hasConflicted[k][j] = true;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        score += board[k][j];
                        updateScore(score);

                        if (board[k][j] == 4) {
                            // 随机将 2+2 == 4 改成 3
                            // if(Math.round(Math.random())){
                            if (Math.floor(Math.random() * 4)) {
                                board[k][j] = 3
                            }
                        }
                        if (board[k][j] == 6) {
                            board[k][j] = 0
                            mianjing()

                        }

                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false
    }

    //moveDown
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {

                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j)
                        board[k][j] = board[i][j]
                        board[i][j] = 0
                        continue
                    } else if ((board[k][j] == 1 || board[i][j] == 1) && (board[k][j] + board[i][j] > 1) && (board[k][j] + board[i][j]) % 2 != 0) {
                        // Ask for Help
                        showMoveAnimation(i, j, k, j)
                        board[k][j] = board[k][j] * board[i][j] * 2
                        board[i][j] = 0
                        alreadyHelp()
                        return true
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j)
                            //add
                        board[k][j] += board[i][j]
                        board[i][j] = 0
                            //add score
                        score += board[k][j]
                        updateScore(score)

                        if (board[k][j] == 4) {
                            // 随机将 2+2 == 4 改成 3
                            // if(Math.round(Math.random())){
                            if (Math.floor(Math.random() * 4)) {
                                board[k][j] = 3
                            }
                        }
                        if (board[k][j] == 6) {
                            board[k][j] = 0;
                            mianjing();
                        }

                        hasConflicted[k][j] = true
                        continue
                    }
                }
            }
        }
    }

    setTimeout('updateBoardView()', 200)
    return true
}

var mentorList = ['赵文博', '李喆明']

function askForHelp() {
    var mentorIndex = Math.floor(Math.random() * mentorList.length)
    $('.mentor').text(mentorList[mentorIndex])
    $('.description').text('老师 来帮你啦！')
    $('#notify').addClass('active')
    generateOneNumber('help')
}

function alreadyHelp() {
    $('.description').text('老师 看好你呦！')
    setTimeout(function() {
        $('#notify').removeClass('active')
    }, 1000)
}

let eightFlag = true
let sixteenFlag = true
let thirtyTwoFlag = true
let sixtyFourFlag = true

function isEight() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 8 && eightFlag === true) {
                // console.log('aaa')
                showCongrat('恭喜你学习完前端基础')
                eightFlag = false
            }
        }
    }
}

function isSixteen() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 16 && sixteenFlag === true) {
                // console.log('bbb')
                showCongrat('再接再厉！')
                sixteenFlag = false
            }
        }
    }
}

function isThirtyTwo() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 32 && thirtyTwoFlag === true) {
                // console.log('ddd')
                showCongrat('加油！')
                thirtyTwoFlag = false
            }
        }
    }
}

function isSixtyFour() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 64 && sixtyFourFlag === true) {
                // console.log('ccc')
                showCongrat('奥利给！')
                sixtyFourFlag = false
            }
        }
    }
}


function popup() {
    isEight()
    isSixteen()
    isThirtyTwo()
    isSixtyFour()
}