'use strict';
/*
ЗАДАНИЕ:
1) Перенести все функции в объект (сделать их методами объекта)
2) Создать в объекте метод start и перенести в него вызов метода asking
 и переопределение свойств. Вне самого объекта запускаем только метод start
  который в нужном порядке выполнит все действия.
3) Создать в объекте метод logger который будет выводить в консоль необходимую
 информацию. Данный метод запускаем в самом конце метода start (после того как все
     расчеты уже были произведены)
4) Вывести в консоль из метода logger все свойства и методы объекта appData с помощью цикла for in
Таким образом вне объекта теперь должен быть только вызов метода start( )
Поправить весь проект, ошибок в консоли быть не должно, а в консоль должна
 выводится необходимая информация!

*/
const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    service1: '',
    service2: '',
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getServicePercentPrices: function () {
        return Math.round(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
    },
    getFullPrice: function () {
        return appData.screenPrice + appData.allServicePrices;
    },
    getRollbackMsg: function (price) {
        if (price >= 30000) {
            return 'Даем скидку в 10%';
        } else if (price >= 15000) {
            return 'Даем скидку в 5%';
        } else if (price >= 0) {
            return 'Скидка не предусмотрена';
        } else {
            return 'что то пошло не так';
        }
    },
    getAllServicePrices: function () {
        let sum = 0;
        let i = 0;
        let servicePrice;
        do {
            if (i === 0) {
                appData.service1 = prompt("Какой дополнительный тип услуги нужен?", "Яндекс метрика");
            } else if (i === 1) {
                appData.service2 = prompt("Какой дополнительный тип услуги нужен?", "Гугл метрика");
            }
            servicePrice = prompt("Сколько это будет стоить?", '2000');
            while (!appData.isNumber(servicePrice)) {
                servicePrice = prompt("Сколько это будет стоить?", '2000');
            }
            sum += Number(servicePrice);
            i++;
        }
        while (i < 2);
        return sum;
    },
    getTitle: function () {
        appData.title = appData.title.trim().toLowerCase();
        appData.title = appData.title[0].toUpperCase() + appData.title.slice(1);
        return appData.title;
    },
    asking: function () {

        appData.title = prompt('Введите название проекта.', '  кальКУЛЯТОр верстки.');
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?", "12000");
        } while (!appData.isNumber(appData.screenPrice));
        appData.screenPrice = Number(appData.screenPrice);
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");

    },
    logger: function () {
        for (let key in appData) {
            //Без методов красивше!
            if (typeof appData[key] == 'function') {
                continue;
            }
            console.log(key + ' : ' + appData[key]);
        }
    },
    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice();
        appData.servicePercentPrice = appData.getServicePercentPrices();
        appData.title = appData.getTitle();
        appData.logger();
    }

};

appData.start();