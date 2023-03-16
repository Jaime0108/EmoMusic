let arr = new Array(5),
    randomArr = randomFunc(),
    num = 0;

function randomFunc() {
    return Math.floor(Math.random() * 31) + 2;
}

function newArrFunc(arr, randomArr) {
    if (arr.indexOf(randomArr) == -1) {
        arr[num] = randomArr;
        num++
    }
    else {
       randomArr = randomFunc()
    }

    if (num >= arr.length) {
        console.log(arr,"arr")
        return arr
    }
    else {
        newArrFunc(arr, randomArr)
    }
}
 newArrFunc(arr, randomArr);