
export default class Sorting {

	constructor() {
		this.stop_index = 0; //инициализация индекса остановки
        this.step_story = []; //история шагов
        this.index_story = [];//история индексов
	}
	//методы добавления историии шагов сортировки
	setIndexStory(index){
		this.index_story.push(index);
	}
  	getPrevIndex(){
        return this.index_story[this.index_story.length - 1];
    }
  	popIndexStory(){
		return this.index_story.pop();
	}
	setStepStory(step){
		this.step_story.push(step);
	}
    getPrevStep(){
        return this.step_story[this.step_story.length - 1];
    }
	popStepStory(){
		return this.step_story.pop();
	}
	getStopIndex(){
		return this.stop_index;
	}
	clearStory(){
        this.stop_index = 0;
	    this.step_story = [];
	    this.index_story = [];
    }

	sortStep (mass) {     //метод выполнения шага сортировки
	    let elems = mass.slice(0); //для копирования массива
		let col_elem = elems.length;
		let stop_index = this.stop_index;
		let i,buf;
		let tran_elem = [];
		let f_done = false;

		for (i = stop_index; i < col_elem - 1; i++) {
            if (elems[i] > elems[i + 1]) {
                buf = elems[i];
                elems[i] = elems[i + 1];
                elems[i + 1] = buf;
                stop_index = i; //записываем индекс
                tran_elem.push(i); //запоминаем перемещаемые элементы
                tran_elem.push(i + 1);
                f_done = false;
                break;
            }
            if (f_done && i >= col_elem - 2) //выставляем флаг выполнения сортировки если круг прошел без перестановок
                break;
            if (i >= col_elem - 2){
                i = -1;
                f_done = true;
            }
		}

		this.stop_index = stop_index;

		if (elems.join('') != mass.join('')){
			this.setIndexStory(stop_index);
			this.setStepStory(mass.join(''));
        }
		 else{
            return null;
		}

		return elems;
	}
    //возвращвем передыдущий шаг
	prevStep(){
	    if(this.step_story.length > 0){
            this.stop_index = this.popIndexStory();
			return this.popStepStory();
        }
        else {
	    	//this.stop_index = 0;
            return false;
        }
    }
	//метод полной сортировки массива
    sortMass(mass){

        let sort_mass = [];
		let buff_mass = mass;
        do {
            sort_mass = buff_mass;
            buff_mass = this.sortStep(sort_mass);
        }
        while (buff_mass)

		return sort_mass;
	}

}
