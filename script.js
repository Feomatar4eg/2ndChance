'use strict';

const title = 'Название проекта';
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 2000;
const rollback = 20;
const fullPrice = 5000;
const adaptive = true;


console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log('Стоимость верстки экранов ' + screenPrice + ' рублей');
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей');
console.log(screens.toLocaleLowerCase().split(', '));
console.log('Процент отката посреднику за работу ' + fullPrice * (rollback / 100));