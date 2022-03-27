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
    screensData: [],
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollbackData: 10,
    rollback: '',
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    servicesPercent: [],
    servicesNumber: [],
    resetBtn: '',
    startBtn: '',
    plusBtn: '',
    otherItemsPcnt: '',
    otherItemsNmbr: '',
    rollbackSpan: '',
    inputCls: '',
    init: function () {
        appData.parse();
        document.title = appData.title;
        appData.startBtn.addEventListener('click', appData.startBtnClick);
        appData.plusBtn.addEventListener('click', appData.addScreensBlock);
        appData.rollback.addEventListener('input', appData.rollbaackFnc);
    },
    rollbaackFnc: function () {
        console.log(appData.rollback.value);
        console.dir(appData.rollbackSpan);
        appData.rollbackSpan.innerText = appData.rollback.value + '%';
        appData.rollbackData = +appData.rollback.value;
    },
    addScreensBlock: function () {
        let screens = document.querySelectorAll('.screen');
        let screenAdd = screens[0].cloneNode(true);
        screens[screens.length - 1].after(screenAdd);
    },
    start: function () {
        appData.screens = document.querySelectorAll('.screen');
        appData.screenPriceMath();
        appData.getServicePercent();
        appData.getServiceNumber();
        appData.getAllServicePrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.fillInputs();
        // appData.logger();
    },
    startBtnClick: function () {
        appData.start();
    },
    parse: function () {
        appData.title = document.getElementsByTagName('h1')[0].outerText;
        appData.startBtn = document.getElementsByClassName('handler_btn')[0];
        appData.resetBtn = document.getElementsByClassName('handler_btn')[1];
        appData.plusBtn = document.querySelector('.screen-btn');
        appData.otherItemsPcnt = document.querySelectorAll('.other-items.percent');
        appData.otherItemsNmbr = document.querySelectorAll('.other-items.number');
        appData.rollback = document.querySelector('.rollback>div>input');
        appData.rollbackSpan = document.querySelector('.rollback>div>span');
        appData.inputCls = document.getElementsByClassName('total-input');
    },
    fillInputs: function () {
        let sum = 0;
        appData.inputCls[0].value = appData.screenPrice;
        appData.screensData.forEach(function (elem) {
            sum += +elem.count;
        });
        appData.inputCls[1].value = sum;
        appData.inputCls[2].value = appData.allServicePrices;
        appData.inputCls[3].value = appData.fullPrice;
        appData.inputCls[4].value = appData.servicePercentPrice;
    },
    isNumber: function (num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    getServicePercentPrices: function () {
        appData.servicePercentPrice = Math.round(appData.fullPrice - (appData.fullPrice *
            (appData.rollbackData / 100)));
    },
    getFullPrice: function () {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices;
    },
    getAllServicePrices: function () {
        let sum = 0;
        appData.allServicePrices = 0;
        appData.servicesPercent.forEach(function (elem) {
            sum = sum + elem.percent / 100 * appData.screenPrice;
        });
        appData.servicesNumber.forEach(function (elem) {
            sum += elem.cost;
        });
        appData.allServicePrices = sum;
    },
    getServicePercent: function () {
        appData.servicesPercent = [];
        appData.otherItemsPcnt.forEach(function (elem) {
            if (elem.querySelectorAll('input')[0].checked) {
                appData.servicesPercent.push({
                    name: elem.innerText,
                    percent: +elem.querySelectorAll('input')[1].value
                });
            }
        });
    },
    getServiceNumber: function () {
        appData.servicesNumber = [];
        appData.otherItemsNmbr.forEach(function (elem) {
            if (elem.querySelectorAll('input')[0].checked) {
                appData.servicesNumber.push({
                    name: elem.innerText,
                    cost: +elem.querySelectorAll('input')[1].value
                });
            }
        });
    },
    screenPriceMath: function () {
        appData.screenPrice = 0;
        appData.screensData = [];
        appData.screens.forEach(function (elem) {
            let id = elem.querySelector('select').selectedIndex;
            let nameScreen = elem.querySelectorAll('select option')[id].innerText;
            let count = elem.querySelector('input').value;
            let price = elem.querySelector('select').value;
            appData.screensData.push({
                id: id,
                name: nameScreen,
                price: price,
                count: count
            });
        });
        appData.screenPrice = appData.screensData.reduce((sum, elem) => {
            sum = sum + elem.price * +elem.count;
            return sum;
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

appData.init();