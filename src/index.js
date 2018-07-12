"use strict";

//подключаем модули

import Sorter from "./modules/Sorter";
import Model from "./modules/Model";

var sorter = new Sorter(); //создаем обьект сортировщика
var model = new Model(); //создаем обьект управления элементами

//обьявляем глобальные переменные
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

};

