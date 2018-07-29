export default class Component {

    constructor(){
        this.count = 0;
        this.offset = 150;
    }
    //Создание обложки компонента
    createWrappComp(x, y, id){

        let wrapper = document.createElement('div');

        wrapper.className = 'wrapper-component';
       // wrapper.id = 'wr-cmp-' + id;
        wrapper.style.left = x + 'px';
        wrapper.style.top = y + 'px';
        wrapper.innerHTML = '<div class="head-comp">' +
                            '<div class="wrapper-btn-del-comp">' +
                            '   <input class="btn-del-comp" type="button" value="X">' +
                            '</div>' +
                            '</div>';

        return wrapper;
    }
    createBodyComp(id, data){

        let body_cmp = document.createElement('div');
        body_cmp.className = 'body-comp';
        body_cmp.innerHTML = '<div class="data">[' + data + ']</div>' +
                         '<div class="btn-control">' +
                            '<button>prev</button>' +
                            '<button>next</button>' +
                         '</div>' +
                         '<div class="list">' +
                         '</div>';

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
        let id = this.count;

        xhr.open('GET',"http://localhost:1234/array",true);

        xhr.send();

        let component = this.createWrappComp(x, y, id);

        let btn_dell = component.getElementsByClassName('btn-del-comp');
        btn_dell[0].onclick = function () {
            let id = parseInt(this.parentElement.parentElement.parentElement.style.top) / obj.offset;
            obj.removeComponent(id);
            xhr.onreadystatechange = null;
            xhr.abort();
        };

        this.add(component);


        //this.add(this.createWrappComp(0, this.offset * this.count, this.count));

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
                //region[parseInt(region.style.top)/obj.offset].appendChild(obj.createBodyComp(parseInt(region.style.top)/obj.offset, xhr.responseText.split(',')));
                console.log(JSON.parse(xhr.responseText));
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