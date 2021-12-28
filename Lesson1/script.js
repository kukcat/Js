// console.log("hello world");

// let userName = 'Danil';
// let userNumberAge = 20; 
// let userStringAge = '20'; 
// let isSmoke = false; 

// console.log(userNumberAge === userStringAge);

// typeof isSmoke;

// let op1 = 1;
// let op2 = 15;

// let sum = op1 + op2;

// console.log(sum);

// console.log(op1 >= op2);

// let boolOperand = true;

// console.log(op1 == boolOperand);

// let fruit1 = 'Orange';
// let fruit1 = 'Apple';



// console.log("Old userAge: " + userAge + typeof userAge);


// alert("hello world");
// userAge = Number(prompt("How old are you?"));

// console.log("New userAge: " + userAge + typeof userAge);


// do{
//     userNumberAge = prompt("How old are you?");
// }while(isNaN(userNumberAge));

// if (userNumberAge >= 18 && !isNaN(userNumberAge)){
//     console.log("Проходи");
// }else if(!isNaN(userNumberAge)){
//     console.log("Уходи");
// }else{
//     console.log("Не число")
// }

// let op1 = op2 = true;

// if(op1 && op2){
//     console.log('Первый')
// } else {
//     console.log('Второй')

// }

// let i = 0;

// while(true){
//     console.log(i);
//     i++;
//     if(i == 4){
//         break
//     }
// }
    
// console.log('Loop is already done');
    
// for(let i = 0; i < 10; i++){
//     console.log(i);
//}

// let userAge = prompt("how old r u?");
// let criteriaValue = prompt("criteria?");

// function checkAge(age, criteria){
//     if (age >= criteria) {
//         console.log("go in")
//     }else{
//         console.log("go away")
//     }
// }

// checkAge(userAge, criteriaValue);

// let sayHi = function(){
//     console.log("hi");
// }

// sayHi();

// let word = prompt("Say word");

// let sayWord = (word) =>{
//     console.log("word: " + word);
// }

// sayWord(word);

// 1

// let number1 = 10;
// let number2 = 15;
// let number3 = 20;

// console.log("Первое \nMax: " + Math.max(number1, number2, number3) + "\nMin: " + Math.min(number1, number2, number3));

// // 2

// let result = (number1 + number2 + number3) - Math.min(number1, number2, number3);

// console.log("Второе \nСумма двух больших чисел: " + result);

// if(number1 < number2 && number2 < number3){
//     number1 = number1*2;
//     number2 = number2*2;
//     number3 = number3*2;
// }else{
//     number1 = number1*-1;
//     number2 = number2*-1;
//     number3 = number3*-1;
// }

// console.log("Третье \n" + "A = " + number1 + " B = " + number2 + " C = " + number3);


// let currentYear;

// while(isNaN(currentYear)){
    
//     currentYear = Number(prompt("Введите год"));
// }



// if(currentYear%4 == 0 && (currentYear%100 != 0 || currentYear%400 == 0)){
//     console.log("В " + currentYear + "году 366 дней") 

// }else{
//    console.log("В " + currentYear + " году 365 дней") 
// }

// let cars = [];
// cars = ['volvo', 'audi', 'zaz', 'volvo', 'audi', 'zaz'];

// console.log(cars);

// cars.pop;

// console.log(cars);

// cars.push("newCar");    

// console.log(cars.length);

// delete cars[1];

// console.log(cars);

// cars.forEach(element => {
//     console.log(element + " car");
// });

//  let headingElement = document.querySelector('h1');
//  let btnChange = document.querySelector('.btn_change');

// // let NewColor = prompt("Введите новый цвет")
// // let NewSize = prompt("Введите новый размер шрифта")

// // NewSize = NewSize+'px'

// function changeHeading(){
//     // headingElement.style.color = NewColor;
//     // headingElement.style.fontSize = NewSize;
//     headingElement.classList.toggle('green');
// }

// btnChange.addEventListener('click', changeHeading); 


// const newUser = {
//     name: "Danil",
//     age: 20,
//     isSmoking: false,
//     greeting(){
//         console.log('hi!')
//     }
// }

// let json = JSON.stringify(newUser)

// console.log(json);

// console.log(JSON.parse(json));

// localStorage.setItem('new-user')

// console.log(JSON.parse(localStorage.getItem('new-item')))

// // for (const key in localStorage) {
    
// // }

// let superArr = [[1,2,3], ['volvo', 'audi', 'zaz']]

let inputWidth = document.querySelector(".input_width");
let inputHeight = document.querySelector(".input_height");
let inputColor = document.querySelector(".input_color");
let inputRadius = document.querySelector(".isRadius");

let btnClear = document.querySelector(".btn_clear");
let btnCreate = document.querySelector(".btn_create");

let btnUp = document.querySelector(".arrow_up")
let btnDown = document.querySelector(".arrow_down")
let btnLeft = document.querySelector(".arrow_left")
let btnRight = document.querySelector(".arrow_right")

let newDiv;
let mTop = 0;
let mLeft = 0;
let iwValue;
let ihValue;
let icValue;
let isRadius;
let isDiv = false;

btnCreate.addEventListener('click', createDiv);
btnClear.addEventListener('click', clearDiv);

function clearDiv(){
    document.querySelector('.container').firstChild.remove();
    document.querySelector('.container').style.borderRadius = 0;
    inputHeight.removeAttribute("readonly", 1);
    inputWidth.removeAttribute("readonly", 1);
    isDiv = false;
}

function createDiv(){
   if(!isDiv){
        iwValue = inputWidth.value;
        ihValue = inputHeight.value;
        icValue = inputColor.value;
        isRadius = inputRadius.checked;

        if(iwValue >= 50 && ihValue >= 50 && iwValue <= 500 && ihValue <= 500){

            newDiv = document.createElement('div');
            newDiv.style.width = iwValue + 'px';
            newDiv.style.height = ihValue + 'px';
            newDiv.style.backgroundColor = icValue;

            if(isRadius){
                newDiv.style.borderRadius = iwValue/2 + 'px'; 
                document.querySelector('.container').style.borderRadius = iwValue/2 + 'px';
            }

            document.querySelector('.container').prepend(newDiv);
            inputHeight.setAttribute("readonly", 1);
            inputWidth.setAttribute("readonly", 1);

            isDiv = true;
        }

   }
}

btnUp.addEventListener('click', blockUp); 
btnDown.addEventListener('click', blockDown); 
btnLeft.addEventListener('click', blockLeft); 
btnRight.addEventListener('click', blockRight); 


function blockUp(){
    if(mTop-10>=0){
        mTop -= 10;
        newDiv.style.marginTop = mTop +'px';
    }
}

function blockDown(){

    if(500-(Number(mTop)+Number(ihValue)+10)>=0){
        mTop+=10;
        newDiv.style.marginTop = mTop +'px'; 
    }
}

function blockLeft(){
    if(mLeft-10>=0){
        mLeft -= 10;
        newDiv.style.marginLeft = mLeft +'px';
    }
}

function blockRight(){
    if(500-(Number(mLeft)+Number(iwValue)+10)>=0){
        mLeft+=10;
        newDiv.style.marginLeft = mLeft +'px'; 
    }
}

// -------------------------------------------------------------

let inputReverse = document.querySelector('.reverse_text');

let btnReverse = document.querySelector('.btn_reverse');

btnReverse.addEventListener('click', reverseText);

function reverseText(){
    let strArr = inputReverse.value.split(" ");

    for (let index = 0; index < strArr.length; index++) {
        let element = strArr[index].reverse();
        console.log(element.reverse());
        
    }
    

}