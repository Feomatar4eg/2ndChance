'use strict';
/*
1) Следующим переменным присвоить значения
 title- строка с названием проекта,
 screens - строка с названиями типов экранов через запятую ("Простые, Сложные, Интерактивные"),
 screenPrice- любое число,
 rollback - любое число от 1 до 100,
 fullPrice- любое число (сколько хотите заработать),
 adaptive- булевое значение

2) Используя методы и свойства:
Вывести в консоль тип данных значений переменных title, fullPrice, adaptive;
Вывести в консоль длину строки screens
Вывести в консоль “Стоимость верстки экранов (screenPrice) рублей/ долларов/гривен/юани” 
и “Стоимость разработки сайта (fullPrice) рублей/ долларов/гривен/юани”
Привести строку screens к нижнему регистру и разбить строку на массив, вывести массив в консоль
Вывести в консоль Процент отката посреднику за работу (fullPrice * (rollback/100))
3) Проверить, чтобы все работало и не было ошибок в консоли 
4) Добавить папку или ветку со вторым уроком в свой репозиторий на GitHub
*/

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