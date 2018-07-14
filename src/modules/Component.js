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
        cmp.id = 'cmp_' + id;
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

        return cmp;
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
    }

    getDataServer(){

        let xhr = new XMLHttpRequest();
        let res;

        xhr.open('GET',"http://localhost:1234/array",true);

        xhr.send();

        xhr.onreadystatechange = function () {

            if (xhr.readyState != 4) return;


            if (xhr.status != 200) {
               console.log("Error!")
            }
            else{
                console.log(JSON.parse(xhr.responseText));
            }


        }
        console.log("Loading");
    }

    init(){

    }
}