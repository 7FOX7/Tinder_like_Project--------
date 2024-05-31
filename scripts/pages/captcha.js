const crossButton = document.querySelector('.js-cross-sign-button'); 

crossButton.addEventListener('mouseenter', () => {
    document.querySelector('.js-cross-small').classList.add('inactive'); 
    document.querySelector('.js-cross-large').classList.add('active'); 
});

crossButton.addEventListener('mouseleave', () => {
    document.querySelector('.js-cross-small').classList.remove('inactive');
    document.querySelector('.js-cross-large').classList.remove('active');  
});

const createImage = function(src, alt) {
    const image = new Image(); 
    image.src = src; 
    image.alt = alt; 
    return image; 
} 


const blueDolphinImg = createImage('../../images/CAPTCHA-blue_dolphin.png', 'blue dolphin'); 
blueDolphinImg.setAttribute('data', 'blue'); 

const greenDolphinImg = createImage('../../images/CAPTCHA-green_dolphin.png', 'green dolphin'); 
greenDolphinImg.setAttribute('data', 'green'); 

const lightBlueDolphinImg = createImage('../../images/CAPTCHA-lightblue_dolphin.png', 'lightblue dolphin'); 
lightBlueDolphinImg.setAttribute('data', 'lightblue'); 

const orangeDolphinImg = createImage('../../images/CAPTCHA-orange_dolphin.png', 'orange dolphin'); 
orangeDolphinImg.setAttribute('data', 'orange'); 

const redDolphinImg = createImage('../../images/CAPTCHA-red_dolphin.png', 'red dolphin'); 
redDolphinImg.setAttribute('data', 'red'); 

const violetDolphinImg = createImage('../../images/CAPTCHA-violet_dolphin.png', 'violet dolphin');
violetDolphinImg.setAttribute('data', 'violet'); 

const reloadImg = createImage('../../images/reload_icon.png', 'reload'); 
reloadImg.style.width = "100%"; 



const CAPTCHA_text = document.createElement('span'); 

const CAPTCHA_imageList = document.createElement('ul'); 

const CAPTCHA_imageList1 = document.createElement('li'); 
CAPTCHA_imageList1.setAttribute('id', '1'); 

const CAPTCHA_imageList2 = document.createElement('li'); 
CAPTCHA_imageList2.setAttribute('id', '2'); 
CAPTCHA_imageList2.style.position = "relative"; 
CAPTCHA_imageList2.style.top = "-60px"; 
CAPTCHA_imageList2.style.left = "65px";

const CAPTCHA_imageList3 = document.createElement('li');
CAPTCHA_imageList3.setAttribute('id', '3');  
CAPTCHA_imageList3.style.position = "relative"; 
CAPTCHA_imageList3.style.top = "-120px"; 
CAPTCHA_imageList3.style.left = "130px";

const CAPTCHA_imageList4 = document.createElement('li'); 
CAPTCHA_imageList4.setAttribute('id', '4'); 
CAPTCHA_imageList4.style.position = "relative"; 
CAPTCHA_imageList4.style.top = "-115px"; 

const CAPTCHA_imageList5 = document.createElement('li'); 
CAPTCHA_imageList5.setAttribute('id', '5'); 
CAPTCHA_imageList5.style.position = "relative"; 
CAPTCHA_imageList5.style.top = "-175px"; 
CAPTCHA_imageList5.style.left = "65px";

const CAPTCHA_imageList6 = document.createElement('li');
CAPTCHA_imageList6.setAttribute('id', '6'); 
CAPTCHA_imageList6.style.position = "relative"; 
CAPTCHA_imageList6.style.top = "-235px"; 
CAPTCHA_imageList6.style.left = "130px";



const reloadButton = document.createElement('button'); 
reloadButton.append(reloadImg); 
reloadButton.style.marginTop = "15px"; 
reloadButton.style.width = "45px"; 
reloadButton.style.border = "none"; 
reloadButton.style.backgroundColor = "transparent"; 
reloadButton.style.cursor = "pointer"; 
reloadButton.addEventListener('click', () => {
    locateAtRandomPositions(); 
})

const imageArr = []; 
const listArr = [];  
const updatedImgArr = []; 

imageArr.push(blueDolphinImg);
imageArr.push(greenDolphinImg); 
imageArr.push(lightBlueDolphinImg);
imageArr.push(orangeDolphinImg); 
imageArr.push(redDolphinImg);
imageArr.push(violetDolphinImg); 

listArr.push(CAPTCHA_imageList1); 
listArr.push(CAPTCHA_imageList2);
listArr.push(CAPTCHA_imageList3);
listArr.push(CAPTCHA_imageList4);
listArr.push(CAPTCHA_imageList5);
listArr.push(CAPTCHA_imageList6);

listArr.forEach((list) => {
    list.setAttribute('class', `js-list-selection`); 
}); 

function init() {
    locateAtRandomPositions(); 
    document.querySelector('.js-captcha-inner-content').style.display = "none"; 
    document.querySelector('.js-captcha-inner-container').style.transform = "translate(-40%, -40%)"; 
    document.querySelector('.js-captcha-inner-container').prepend(CAPTCHA_text); 
    document.querySelector('.js-captcha-inner-container').append(CAPTCHA_imageList);
    document.querySelector('.js-captcha-inner-container').append(reloadButton);

    const listSelections = document.querySelectorAll('.js-list-selection');

    const randDolphin = listSelections[randomNumGen()].firstElementChild; 
    const randDolphinColor = getDolphinColor(randDolphin); 
    CAPTCHA_text.textContent = randDolphinColor; 

    listSelections.forEach((list) => {
        list.addEventListener('click', function() {
            compareSelections(list, listSelections); 
        });
    });
} 

/*
    
*/


function compareSelections(userSelection, listSelections) {  
    const userDolphin = userSelection.firstElementChild; 
    const randomDolphin = listSelections[Math.floor(Math.random()*listArr.length)].firstElementChild;
    // CAPTCHA_text.textContent = getDolphinColor(randomDolphin); 
    if(getDolphinColor(userDolphin) === getDolphinColor(randomDolphin)) {
        console.log(`you are right. it is indeed ${getDolphinColor(randomDolphin)} dolphin`)
    }
    else {
        console.log(`you are wrong. it is ${getDolphinColor(randomDolphin)} dolphin`); 
        locateAtRandomPositions(); 
    }
}

function randomNumGen() {
    const randNum = Math.floor(Math.random()*listArr.length); 
    return randNum; 
}

function getDolphinColor(dolphin) {
     const dolphinColor = dolphin.getAttribute('data'); 
     return dolphinColor; 
}

function locateAtRandomPositions() {
    updatedImgArr.length = 0; 
    for(let i = 0; i < listArr.length; i++) {
        const imageAtRandomPos = getRandomImage(); 
        updatedImgArr.push(imageAtRandomPos); 

        listArr[i].append(updatedImgArr[i]); 
        CAPTCHA_imageList.append(listArr[i]);
    } 
}

function getRandomImage() {
    const ind = Math.floor(Math.random()*imageArr.length);
    const dolphinImg = imageArr[ind]; 
    if(!updatedImgArr.includes(dolphinImg)) {
        return dolphinImg; 
    }
    return getRandomImage(); 
}

document.querySelector('.js-inner-button')
    .addEventListener('click', () => {
        init(); 
    }); 

/*
function removeThisFunction() {
    const ctx = canvas.getContext("2d"); 

canvas.width = 250; 
canvas.height = 150; 

var createImage = function(src, title) {
    var img = new Image(); 
    img.src = src; 
    img.alt = title; 
    img.title = title; 

    return img; 
}

const lightBlueDolphinImg =  createImage('../../images/CAPTCHA-lightblue_dolphin.png', 'light blue dolphin'); 
const violetDolphinImg = createImage('../../images/CAPTCHA-violet_dolphin.png', 'violet dolphin'); 
const redDolphinImg = createImage('../../images/CAPTCHA-red_dolphin.png', 'red dolphin'); 

const dolphinArr = []; 
dolphinArr.push(lightBlueDolphinImg); 
dolphinArr.push(violetDolphinImg); 
dolphinArr.push(redDolphinImg); 

const opts = {
    len : 3, 
    arr : dolphinArr, 
    cap : [] 
};



document.querySelector('.js-inner-button')
    .addEventListener('click', () => {
        document.querySelector('.js-captcha-inner-content').style.display = "none"; 
        document.querySelector('.js-captcha-inner-container').append(canvas); 
        init(); 
    }); 

// document.addEventListener('DOMContentLoaded', init); 

function init() {
    for(let i=0; i<opts.len; i++) {
        var char = runCap(); 
        opts.cap.push(char); 
    }
    addToCanvas(); 
}

function runCap() {
    const ind = Math.floor(Math.random()*opts.arr.length); 
    let char = opts.arr[ind]; 
    if(!opts.cap.includes(char)) {
        return char; 
    } 
    else {
        return runCap(); 
    }
}

function locateOnX() {
    const arr = [0, 50, 100]; 
    return arr; 
}

function addToCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    opts.cap.forEach((image) => {
        ctx.drawImage(image, 0, 0); 
    });
}
}
*/



/*
here is the code: 

```
function init() {
    // random number is generated here (range: 0 - 5 inclusively)
    const rightSelection = Math.floor(Math.random()*listArr.length);
    

    // clear the list (<ul>) before adding <li> elements to it (does not make a difference though)
    while(CAPTCHA_imageList.firstChild) {
        CAPTCHA_imageList.removeChild(CAPTCHA_imageList.lastChild); 
    }
    listArr.forEach((list) => {
        list.innerHTML = ''; 
    }); 


    // gets a random number and add it to the array.
    // 'getRandomImage()' is a recursive function here 
    for(let i = 0; i < listArr.length; i++) {
        const imageAtRandomPos = getRandomImage(); 
        updatedImgArr.push(imageAtRandomPos); 

        listArr[i].append(updatedImgArr[i]); 
        CAPTCHA_imageList.append(listArr[i]); 
    }
    
    updatedImgArr.length = 0; 


    // attach updated list to the container dynamically
    document.querySelector('.js-captcha-inner-content').style.display = "none"; 
    document.querySelector('.js-captcha-inner-container').style.transform = "translate(-40%, -40%)"; 
    document.querySelector('.js-captcha-inner-container').append(CAPTCHA_imageList);
    document.querySelector('.js-captcha-inner-container').append(reloadButton);
    const listSelection1 = document.querySelector('.js-list-selection1'); 


    // add a 'click' event to the first <li> element and compare its id to the 
    // selected number. 
    listSelection1.addEventListener('click', (event) => {
        event.preventDefault(); 
        if(Number(listSelection1.getAttribute('id')) === rightSelection) {
            console.log('you are right')
        }
        else {
            console.log('you are wrong'); 
        }
    });
} 
```

The problem is as follows: When I first run this code and click on the '<li>' element, I get a single message in the console, however, when I 'click' on the 'reload' button: 

```
reloadButton.addEventListener('click', () => {
    init(); 
})
```

and click on the same <li> element , the previous value of rightSelection (which lets say was 3) is still being used for the comparison, so I actually have two comparisons. And with each reload, the previous values are still considered. 
*/

