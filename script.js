'use strict';
/*
ОБЯЗАТЕЛЬНОЕ ЗАДАНИЕ:
1) Переписать получение значения переменной screenPrice циклом do while.
 Вопрос должен задаваться один раз обязательно, далее уже по условию
2) Добавить проверку что введённые данные являются числом, которые мы
 получаем на вопрос "Сколько это будет стоить" в функции getAllServicePrices
3) Поправить проект так, чтоб расчеты велись верно. Проверить типы получаемых
 переменных и привести их к нужным.
4) Проверить, чтобы все работало и не было ошибок в консоли.
5) Добавить папку с уроком в свой репозиторий на GitHub
УСЛОЖНЕННОЕ ЗАДАНИЕ №1:
Придумать способ сохранять в переменную ответ пользователя после проверки
на число именно как число при любом вводе. (с пробелами и без в переменную 
заносилось именно число) На данный момент проверка isNumber пропустит такой вариант "
123   " и именно это значение попадет в переменную. Необходимо это исправить. Так же
 учитывайте что человек может нажать отмену и в проверку уйдет значение NULL
*/

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function () {

    title = prompt('Введите название проекта.', '  кальКУЛЯТОр верстки.');
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
    screenPrice = prompt("Сколько будет стоить данная работа?", "12000");
    while (!isNumber(screenPrice)) {
        screenPrice = prompt("Сколько будет стоить данная работа?", "12000");
    }
    screenPrice = Number(screenPrice);
    adaptive = confirm("Нужен ли адаптив на сайте?");

};

const getAllServicePrices = function () {
    let sum = 0;
    let i = 0;
    let servicePrice;
    do {
        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?", "Яндекс метрика");
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?", "Гугл метрика");
        }
        servicePrice = prompt("Сколько это будет стоить?", '2000');
        while (!isNumber(servicePrice)) {
            servicePrice = prompt("Сколько это будет стоить?", '2000');
        }
        sum += Number(servicePrice);
        i++;
    }
    while (i < 2);
    return sum;
};

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

function getFullPrice() {
    return screenPrice + allServicePrices;
}

const getRollbackMsg = function (price) {
    if (price >= 30000) {
        return 'Даем скидку в 10%';
    } else if (price >= 15000) {
        return 'Даем скидку в 5%';
    } else if (price >= 0) {
        return 'Скидка не предусмотрена';
    } else {
        return 'что то пошло не так';
    }
};


const getTitle = function () {
    title = title.trim().toLowerCase();
    title = title[0].toUpperCase() + title.slice(1);
    return title;
};

const getServicePercentPrices = function () {
    return Math.round(fullPrice - (fullPrice * (rollback / 100)));
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log(getRollbackMsg(fullPrice));
console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей');
console.log(screens.toLocaleLowerCase().split(', '));
console.log('Процент отката посреднику за работу ' + fullPrice * (rollback / 100));
console.log('Мой заработок ' + servicePercentPrice);