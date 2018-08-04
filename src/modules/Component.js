import Model from "./Model.js";
import Adjuster from "./Adjuster.js";

export default class Component {

    constructor(){
        this.count = 0;
        this.offset = 200;
    }
    //Создание обложки компонента
    createWrappComp(x, y){

        let wrapper = document.createElement('div');

        wrapper.className = 'wrapper-component';
        wrapper.style.left = x + 'px';
        wrapper.style.top = y + 'px';
        wrapper.innerHTML = '<div class="head-comp">' +
                                '<div class="data"></div>' +
                            '<div class="wrapper-btn-del-comp">' +
                            '   <input class="btn-del-comp" type="button" value="X">' +
                            '</div>' +
                            '</div>';

        return wrapper;
    }
    createBodyComp(){

        let body_cmp = document.createElement('div');
        body_cmp.className = 'body-comp';
        body_cmp.innerHTML = '<div class="btn-control">' +
                            '<button class="btn-prev">prev</button>' +
                            '<button class="btn-next">next</button>' +
                         '</div>' +
                         '<div class="list">' +
                         '</div>';
        return body_cmp;

    }
    //Добавление тела элемента в обертку
    addBodyComp(body, id){
        let container = document.querySelectorAll('.wrapper-component');
        container[id].appendChild(body);
    }
    //Добавление обьекта в дом модель
    add(obj) {

        let container = document.querySelector('.container-components');
        container.appendChild(obj);

    }
    //создаем статус
    createStatus(type){

        let status = document.createElement('div');

        if (type === 'loading'){
            status.style.border = '1px solid #56dd9a';
            status.style.background = '#e0ffef';
            status.innerText = 'Loading...';
            status.className = 'status';
        }
        else if (type === 'error'){
            status.style.border = '1px solid #ff2e00';
            status.style.background = '#e6bebe';
            status.innerText = 'Error.\nRetry in 3 sec.';
            status.className = 'status';
        }
        else{
            return false;
        }
        return status;

    }
    //добавление статуса в компонент
    addStatus(status, id){

        let container = document.querySelectorAll('.wrapper-component');

        container[id].appendChild(status);
    }
    //удаление статуса из компанента
    removeStatus(id){

        let container = document.querySelectorAll('.wrapper-component');
        container[id].getElementsByClassName('status')[0].remove();

    }
    //вывод компанента в дом
    showComponent(){

        let xhr = new XMLHttpRequest();
        let obj = this;
        let x = 0;
        let y = this.offset * this.count;
        //let model = new Model();
        //let adjuster = new Adjuster();
        //let id = this.count;

        xhr.open('GET',"http://localhost:1234/array",true);
        xhr.send();

        let component = this.createWrappComp(x, y);

        let btn_dell = component.getElementsByClassName('btn-del-comp');
        btn_dell[0].onclick = function () {
            let id = parseInt(this.parentElement.parentElement.parentElement.style.top) / obj.offset;
            obj.removeComponent(id);
            xhr.onreadystatechange = null;
            xhr.abort();
        };

        this.add(component);
        this.addStatus(this.createStatus('loading'), this.count);
        this.count++;
        let region = document.querySelectorAll('.wrapper-component')[this.count-1];

        xhr.onreadystatechange = function () {

            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                obj.removeStatus(parseInt(region.style.top)/obj.offset);
                obj.addStatus(obj.createStatus('error'), parseInt(region.style.top)/obj.offset);
                setTimeout(function () {
                    obj.removeStatus(parseInt(region.style.top)/obj.offset);
                    obj.addStatus(obj.createStatus('loading'), parseInt(region.style.top)/obj.offset);
                    xhr.open('GET',"http://localhost:1234/array",true);
                    xhr.send();
                },3000);
            }
            else{
                obj.removeStatus(parseInt(region.style.top)/obj.offset);
                obj.addBodyComp(obj.createBodyComp(), parseInt(region.style.top)/obj.offset);
                let input = JSON.parse(xhr.responseText)['result'];
                let list = component.getElementsByClassName('list')[0];
                let model = new Model();
                let adjuster = new Adjuster();
                model.createModels(input,list);
                component.getElementsByClassName('data')[0].innerText = "[" + JSON.parse(xhr.responseText)['result'].join(",") + "]";

                let btn_next = component.getElementsByClassName('btn-next');
                btn_next[0].onclick = function () {
                    let list = component.getElementsByClassName('list')[0];
                    let mass = model.currentMassElems(list);
                    model.transpElements(adjuster.sortStep(mass), list);
                };

                let btn_prev = component.getElementsByClassName('btn-prev');
                btn_prev[0].onclick = function () {
                    let list = component.getElementsByClassName('list')[0];
                    model.transpElements(adjuster.prevStep(), list);
                };
            }
        }
    }
    //Удаляем компонент по id
    removeComponent(id){

        let container = document.querySelectorAll('.wrapper-component');
        container[id].remove();

        if (id < this.count - 1){

            for(let i = this.count - 2; i >= id; i--){
                let cmp = document.querySelectorAll('.wrapper-component');
                cmp[i].style.top = i * this.offset + 'px';
            }
        }

        this.count--;

    }

}