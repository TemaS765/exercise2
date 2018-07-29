export default class Component {
       
    /**
     * Creates an instance of the component
     *
     * @param {number} id - number component
     * @param {number} x - component position horizontally
     * @param {number} y - component position vertically
     * @param {string} data - data array
     * @returns {HTMLDivElement}
     */
    createCompDOM(data, id, x, y){

        let cmp = document.createElement('div');

        data = data.split("").join(',');

        cmp.className = 'component';
        cmp.id = 'cmp-' + id;
        cmp.style.left = x + 'px';
        cmp.style.top = y + 'px';

        cmp.innerHTML = '<div class="head-comp">\n' +
                            '<div class="data">[' + data + ']</div>\n' +
                            '<div class="wrapper-btn-del-comp">\n' +
                                '<input class="btn-del-comp" type="button" value="X">\n' +
                            '</div>\n' +
                        '</div>\n' +
                        '<div class="btn-control">\n' +
                            '<button>prev</button>\n' +
                            '<button>next</button>\n' +
                        '</div>\n' +
                        '<div class="list">\n' +
                        '</div>';

        /*let sort_model = '<button>prev</button>\n' +
                         '<button>next</button>\n' +
                         '<div class="list">\n' +
                         '</div>';*/
        return cmp;
    }

    createWrappComp(){

        let wrapp_cmp = document.createElement('div');

        wrapp_cmp.className = 'wrapper-component';




    }

    /**
     * Add an component to the DOM
     *
     * @param {number} id - number component
     * @param {number} x - component position horizontally
     * @param {number} y - component position vertically
     * @param {string} data - data array
     */
    addCompDOM(data, id, x, y){

        let container = document.querySelector('.container-components');
        let cmp = this.createCompDOM(data, id, x, y);
        container.appendChild(cmp);
        this.showStatus('loading', 'Loading...', 1);


    }

    createStatusContainer(){
        let st_container = document.createElement('div');
        st_container.style.left = '15px';
        st_container.style.top =  '50px';
        return st_container;
    }

    showStatus(type, message, id){
        let container = document.querySelector('#cmp-' + id);
        let obj_status = this.createStatusContainer();
        obj_status.className = type;
        obj_status.innerText = message;
        container.appendChild(obj_status);
    }

    removeStatus(id){
        let loading = document.querySelector('.cmp-' + id + '>');
        loading.parentNode.removeChild(loading);
    }

    getDataServer(){

        let xhr = new XMLHttpRequest();
        let obj = this;
        let res;

        xhr.open('GET',"http://localhost:1234/array",true);

        xhr.send();

        xhr.onreadystatechange = function () {

            if (xhr.readyState != 4) return;



            if (xhr.status != 200) {
               console.log("Error!");
            }
            else{

                obj.removeStatus(1);
                console.log(JSON.parse(xhr.responseText));
            }


        }

        this.showStatus(1,0,0);
    }

    init(){

    }
}