'use strict';
/*
ЗАДАНИЕ:
Это задание выполняется отдельно от нашего проекта с бюджетом!
Для этого задания создайте отдельный репозиторий.
Скачать архив, прикрепленный к уроку.
1) Повесить на кнопку обработчик события click и реализовать такой функционал:
В input[type=text] можно ввести цвет: red, green, blue и так далее.
По нажатию на кнопку необходимо брать этот цвет и добавлять его свойству style="backgroundColor: " квадрата
Работать должно так: ввели в input[type=text] yellow, по нажатию на кнопку значение input[type=text] 
 в свойство style="backgroundColor: yellow" и фон квадрата должен поменяться
2) В кружке (который внутри квадрата) есть кнопка. Дать ей свойство style="display: none; " 
3) Повесить на input[type=range] обработчик события input и реализовать такой функционал:
при каждом изменении положения ползунка значение input[type=range] необходимо заносить в 
свойства ширины и высоты кружка (который внутри квадрата) (height и width) (в процентах!!)
*/
let inputText = document.getElementById('text');
let btn = document.getElementById('btn');
let square = document.getElementById('square');
let circleBtn = document.getElementById('e_btn');
let range = document.getElementById('range');
let circle = document.getElementById('circle');
console.dir(circle);

const ranger = function (event) {
    console.log(range.value);
    circle.style.width = (150 * ((+range.value + 50) / 100)) + 'px';
    circle.style.height = (150 * ((+range.value + 50) / 100)) + 'px';
    console.dir(circle);
};
const typer = function (event) {

};

const clickBtn = function (event) {
    square.style.backgroundColor = inputText.value;
};


inputText.addEventListener('input', typer);
btn.addEventListener('click', clickBtn);
circleBtn.style.display = 'none';
range.addEventListener('input', ranger);