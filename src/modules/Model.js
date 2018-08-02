export default class Model {

    constructor(){
       let colors = ['aqua','antiquewhite','bisque','burlywood','cadetblue','tomato','cornflowerblue','darkcyan','darkgrey','springgreen'];
       let rand = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
       this.color = colors[rand];
    }

    //метод удаения модели данных
    removeModel(){
        document.querySelector('input[type=text]').value = '';
        this.delAllElem();
    }
    //Метод удаления всех элементов
    delAllElem(){
        let list = document.querySelector('.list');
        while (list.firstChild) list.removeChild(list.firstChild);
    }
	//Метод для коррекции ввода
	correctInput(inp_el){
		let str = inp_el.value;
		inp_el.value = str.replace(/[^1-9]/g,'');
	}
	//метод создания элемента
	create(num,x,y) {
		//добавляем элементы со значениями
		let el = document.createElement('div');
		el.setAttribute('class', 'elem');
		//el.innerText = num;
		el.style.height = num + 'px';
		el.style.width = 8 + 'px';
		el.style.left = 15 * x + 'px';
		el.style.top = 15 * y + 'px';
		return el;
	}
	//метеод вставки элементов
	postElem(elem, index, list) {
		//let list = document.querySelector('.list');
		list.insertBefore(elem,list.children[index]); //вставляем элемент по индексу
	}

	//метод удаления элемента по индексу
	delElem(index){
		let list = document.querySelector('.list');
		list.removeChild(list.children[index]);
	}
	//метод перерисовки
	repaint(elems) {


        let obj = this;
		//let elems = document.querySelectorAll('.elem');

		for (let i = 0; i < elems.length; i++) {
			elems[i].style.transition = 'none';
			elems[i].style.background = 'red';
		}

		let timer = setTimeout(function() {
			for (var i = 0; i < elems.length; i++) {
				elems[i].style.transition = '0.3s';
				elems[i].style.background = obj.color;
			}
		}, 10);
	}
	//метод перестановки элементов
	transpElements(mass) {

        let list = document.querySelector('.list');
        let obj = this;

        let trans_el = [];

        let col_el = list.childNodes.length - 1;

        for(let i = 0; i < col_el; i++){

            let num = parseInt(list.children[i].style.left, 10);
            let pos = (num == 0) ?  0 : num/15;

            if(mass[pos] != list.children[i].innerText) trans_el.push(i);

        }

        if (trans_el.length == 0) return

        let buf_pos = list.children[trans_el[0]].style.left;

        list.children[trans_el[0]].style.background = "red";
        list.children[trans_el[1]].style.background = "red";

        list.children[trans_el[0]].addEventListener("transitionend",function () {
            list.children[trans_el[0]].style.background = obj.color;
            list.children[trans_el[1]].style.background = obj.color;
        }, false);


        list.children[trans_el[0]].style.left = list.children[trans_el[1]].style.left;
        list.children[trans_el[1]].style.left = buf_pos;

	}
	//метод получения текущего расположения элементов на странице
	currentMassElems() {
		let list = document.querySelector('.list');
		let elems = list.children;
		let col_el = elems.length;
		let mass_el = [];

		for(let i = 0; i < col_el; i++){
			let id = parseInt(elems[i].style.left, 10); //получаем место элемента в массиве
			id = id / 15;
			mass_el[id] = elems[i].innerText;
		}

		return mass_el;
	}
	//Метод создания модели данных
	createModels(inp,list) {

        //let mass_num = inp.value;
        let mass_num  = inp;
        let mass_el = list.children;
        let col_num = mass_num.length;
        let col_el = list.childNodes.length - 1;
        let i_n;
        let i_e;
        let step_x = 15;

        for(i_n = 0; i_n < col_num; i_n++){ //перебираем массив цифр

            let f_el_created = false;
            let x = (step_x * i_n) + 'px'; //устанавливаем значение по x исходя из положения в массиве

            for(i_e = 0; i_e < col_el; i_e++){  //перебираем массив элементов

                if(mass_el[i_e].style.left == x){  //если на данной позиции в массиве есть элемент

                    let val_el = mass_el[i_e].innerText; //получаем значение элемента

                    if(val_el == mass_num[i_n]){ //если значение равно значению цифры
                        f_el_created = true;
                        break;
                    }

                    this.delElem(i_e); //удаляем элемент если на такой позиции есть элемент с другим значением
                    break;
                }
            }

            if (f_el_created == false){
                let new_elem = this.create(mass_num[i_n],i_n,0);  //создаем элемент
                this.postElem(new_elem,i_n,list);
                this.repaint(list.getElementsByClassName('elem'));
            }
        }

        //после подгонки удаляем лишние элементы
        if (col_num < col_el){

            for (let i = col_el-1; i >= 0; i--){

                let x_el = parseInt(mass_el[i].style.left,10);
                let x_del = (col_num - 1) * 15;

                if( x_el > x_del ){
                    this.delElem(i);
                }
            }

        }
	}

}

