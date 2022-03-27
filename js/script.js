'use strict';
/*
ЗАДАНИЕ: 
1) Запретить нажатие кнопки Рассчитать если не выбран ни один тип экрана в выпадающем списке и не введено
 их количество. Учесть что блоков с типом экранов может быть несколько, но пустых (незаполненных)
 элементов быть не должно
2) Повесить на input[type=range] (в блоке с классом .rollback) обработчик события. При перемещении
 ползунка значение под ним (в элементе span) должно меняться. А так же это значение должно заноситься в
 свойство rollback нашего объекта для последующих расчетов!
3) В нашем объекте присутствует метод getServicePercentPrice. Данный метод рассчитывает доход с учетом
 отката посреднику. Перенести его логику в метод addPrices и выводить в поле с подписью "Стоимость с
  учетом отката"
4) В методе addScreens мы добавляем в свойство appData.screens новые объекты. Добавить свойство count в
 которое занести количество экранов из input. В методе addPrices посчитать общее количество экранов и
 вывести на страницу итоговое значение в поле с подписью "Количество экранов"
5) Удалить из проекта метод getRollbackMessage
УСЛОЖНЕННОЕ ЗАДАНИЕ: 
1) Сделать так, чтоб после нажатия на кнопку Рассчитать изменение значения input[type=range] меняло и
 сумму в поле с подписью "Стоимость с учетом отката". Сумма должна пересчитываться с учетом реального
  значения процента отката. Проверить чтоб значение не менялось до расчета, только после рассчета.*/

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    services: {},
    resetBtn: '',
    startBtn: '',
    plusBtn: '',
    otherItemsPcnt: '',
    otherItemsNmbr: '',
    rollbackSpan: '',
    inputCls: '',
    start: function () {
        appData.asking();
        appData.screenPriceMath();
        appData.getAllServicePrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.logger();
    },
    parse: function () {
        appData.title = document.getElementsByTagName('h1')[0].outerText;
        console.log(appData.title);
        appData.startBtn = document.getElementsByClassName('handler_btn')[0];
        console.log(appData.startBtn);
        appData.resetBtn = document.getElementsByClassName('handler_btn')[1];
        console.log(appData.resetBtn);
        appData.plusBtn = document.querySelector('.screen-btn');
        console.log(appData.plusBtn);
        appData.otherItemsPcnt = document.querySelectorAll('.other-items.percent');
        console.log(appData.otherItemsPcnt);
        appData.otherItemsNmbr = document.querySelectorAll('.other-items.number');
        console.log(appData.otherItemsNmbr);
        appData.rollback = document.querySelector('.rollback>div>input');
        console.log(appData.rollback);
        appData.rollbackSpan = document.querySelector('.rollback>div>span');
        console.log(appData.rollbackSpan);
        appData.inputCls = document.getElementsByClassName('total-input');
        console.log(appData.inputCls);
        appData.screens = document.querySelectorAll('.screen');
        console.log(appData.screens);
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = Math.round(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
    },
    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
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
        for (let key in appData.services) {
            appData.allServicePrices += +appData.services[key];
        }
    },
    getTitle: function () {
        appData.title = appData.title.trim().toLowerCase();
        appData.title = appData.title[0].toUpperCase() + appData.title.slice(1);
        appData.title = appData.title;
    },
    asking: function () {
        let i = 0;
        do {
            appData.title = prompt('Введите название проекта.', '  кальКУЛЯТОр верстки.');
        } while (appData.isNumber(appData.title));
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
        for (let i = 0; i < 2; i++) {
            let price = 0;
            let name;
            do {
                name = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные" + i);
            } while (appData.isNumber(name));
            do {
                price = +prompt("Сколько будет стоить данная работа?", "5000");
            } while (!appData.isNumber(price));
            appData.screens.push({
                id: i,
                name: name,
                price: price
            });
        }
        do {
            let nameService;
            let servicePrice;
            do {
                nameService = prompt("Какой дополнительный тип услуги нужен?", "Яндекс метрика " + i);
            } while (appData.isNumber(nameService));
            do {
                servicePrice = prompt("Сколько это будет стоить?", '2000');
            } while (!appData.isNumber(servicePrice));
            appData.services[nameService + '' + i] = +servicePrice;
            i++;
        }
        while (i < 2);

    },
    screenPriceMath: function () {
        appData.screenPrice = appData.screens.reduce((sum, elem) => {
            return sum += elem.price;
        }, 0);
    },
    logger: function () {
        for (let key in appData) {
            //Без методов красивше!
            if (typeof appData[key] == 'function') {
                continue;
            }
            console.log(key + ' : ' + appData[key]);
        }
        console.log(appData.services);
        console.log(appData.screens);
    }
};

//appData.start();
appData.parse();