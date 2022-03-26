'use strict';
/*
1) Объявить функцию getAllServicePrices. Функция возвращает сумму всех дополнительных услуг.
 Результат сохраняем в переменную allServicePrices. Тип - function expression
2) Объявить функцию getFullPrice. Функция возвращает сумму стоимости верстки
 и стоимости дополнительных услуг (screenPrice + allServicePrices).
  Результат сохраняем в переменную fullPrice. Тип - function declaration
3) Объявить функцию getTitle. Функция возвращает title меняя его таким образом:
 первый символ с большой буквы, остальные с маленькой". Учесть вариант что строка
  может начинаться с пустых символов. " КаЛьКулятор Верстки"
4) Объявить функцию getServicePercentPrices. Функция возвращает итоговую стоимость
 за вычетом процента отката. Результат сохраняем в переменную servicePercentPrice
  (итоговая стоимость минус сумма отката)
5) Вывести в консоль строку из переменной screens в виде массива
6) Почистить консоль логи и добавить недостающие, должны остаться:
- вызовы функции showTypeOf
- вывод строки с типами экранов для разработки screens
- сообщение о скидке пользователю (вызовы функции getRollbackMessage)
- стоимость за вычетом процента отката посреднику (вызовы функции getServicePercentPrices)
6) Проверить, чтобы все работало и не было ошибок в консоли
7) Добавить папку с четвертым уроком в свой репозиторий на GitHub
 */

let title = prompt('Введите название проекта.', '  кальКУЛЯТОр верстки.');
const screens = prompt("“Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
const screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?", "Яндекс метрика");
const servicePrice1 = +prompt("Сколько это будет стоить?", '2000');
const service2 = prompt("Какой дополнительный тип услуги нужен?", "Гугл метрика");
const servicePrice2 = +prompt("Сколько это будет стоить?", '2000');

const rollback = 20;

let servicePercentPrice;
let allServicePrices, fullPrice;

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

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

const getAllServicePrices = function (price1, price2) {
    return price1 + price2;
};

function getFullPrice(scrPrice, servicesPrice) {
    return scrPrice + servicesPrice;
}

const getTitle = function (titleText) {
    titleText = titleText.trim().toLowerCase();
    titleText = titleText[0].toUpperCase() + titleText.slice(1);
    return titleText;
};

const getServicePercentPrices = function (fullPrice, rollback) {
    return Math.round(fullPrice - (fullPrice * (rollback / 100)));
};

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
title = getTitle(title);

showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
console.log(getRollbackMsg(fullPrice));
console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей');
console.log(screens.toLocaleLowerCase().split(', '));
console.log('Процент отката посреднику за работу ' + fullPrice * (rollback / 100));
console.log('Мой заработок ' + servicePercentPrice);