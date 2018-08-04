"use strict";

//подключаем модули

import Sorting from "./modules/Sorting";
import Model from "./modules/Model";
import Component from "./modules/Component";

var sorting = new Sorting(); //создаем обьект сортировщика
var model = new Model(); //создаем обьект управления элементами

/*//обьявляем глобальные переменные
var btn = document.querySelectorAll('.btn-control button');
var btn_next = btn[1];
var btn_prev = btn[0];

btn_prev.onclick = function() {

    let sort_mass = sorter.prevStep(); //массив

    if (sort_mass)
        model.transpElements(sort_mass);

};

btn_next.onclick = function() {

    let mass_el = model.currentMassElems();  //получаем текущий массив элементов

    let sort_mass = sorter.sortStep(mass_el); //сортируем массив

    if (sort_mass)
        model.transpElements(sort_mass);

};*/


////

let component = new Component();
let btn_create = document.querySelector('.btn-create-comp');

btn_create.onclick = function () {
    component.showComponent();
}

btn_create.onmousedown = function () {
 btn_create.style.background = 'gray';
};

btn_create.onmouseup = function () {
    btn_create.style.background = 'white';
};

btn_create.onmouseout = function () {
    btn_create.style.background = 'white';
};


//component.add(component.createWrappComp(0, 50,1));

//component.addStatus(component.createStatus('loading'), 1);






//component.dellStatus(1);

