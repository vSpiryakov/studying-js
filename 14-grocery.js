const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

let editElement;
let edtiFlag = false;
let editID = '';

form.addEventListener('submit', addItem);

clearBtn.addEventListener('click', clearItems);

function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value && !edtiFlag) {
        const element = document.createElement('article');
        element.classList.add('grocery-item');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
        list.appendChild(element);
        displayAlert('item added', 'success');
        container.classList.add('show-container');

        addToLocalStorage(id, value);

        setBackToDefault();
    }
    else if (value && edtiFlag) {

    }
    else {
        displayAlert('please enter a value', 'danger');
    }
}

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000)
}

function addToLocalStorage(id, value) {

}

function setBackToDefault() {
    grocery.value = '';
    edtiFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}

function clearItems() {
    container.classList.remove('show-container');
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        })
    }
    displayAlert('empty list', 'success');
    setBackToDefault();
    localStorage.removeItem('list');
}