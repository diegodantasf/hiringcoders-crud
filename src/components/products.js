import * as utils from './utils.js';
import {loadMenu} from './menu.js'

function loadData() {
    const data = localStorage.getItem('products');
    if (data === null) {
        return [];
    }
    return JSON.parse(data);
}

function saveData(data) {
    localStorage.setItem('products', JSON.stringify(data));
}

function createProductCRUD() {
    const crud = document.createElement('div');

    const inputs = [];
    inputs.push(utils.createInput('Name'));
    inputs.push(utils.createInput('Price'));
    inputs.push(utils.createInput('Quantity'));

    const addProductButton = utils.createButton('Add new product', function() {
        const productData = []
        
        for (let i = 0; i < inputs.length; ++i) {
            const x = inputs[i].querySelector('input').value;
            if (typeof(x) === 'string' && x.length > 0) {
                productData.push(x);
            } else {
                return;
            }
        }
        
        const data = loadData();
        data.push(productData);
        saveData(data);
        loadProducts();
    });

    const goBackButton = utils.createButton('Return', function() {
        loadMenu();
    });

    inputs.forEach(function(input) {
        crud.appendChild(input);
    });
    crud.appendChild(addProductButton);
    crud.appendChild(goBackButton);

    return crud;
}

function createTable() {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const header = ['Name', 'Price', 'Quantity', 'Remove?'];
    header.forEach(function(h) {
        const th = document.createElement('th');
        th.innerHTML = h;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    const data = loadData();
    data.forEach(function(product) {
        const row = document.createElement('tr');
        product.forEach(function(info) {
            const td = document.createElement('td');
            td.innerHTML = info;
            row.appendChild(td);
        });
        const td = document.createElement('td');
        const removeButton = utils.createButton("Remove", function(){
            let tmpData = data;
            tmpData = tmpData.filter(item => item !== product);
            saveData(tmpData);
            loadProducts();
        })
        td.appendChild(removeButton);
        row.appendChild(td);
        table.appendChild(row);
    });
    return table;
}

function createProducts() {
    const products = document.createElement('div');
    products.setAttribute('products', '');
    products.appendChild(createProductCRUD());
    products.appendChild(createTable());
    return products;
}

export function loadProducts() {
    const products = createProducts();
    utils.loadContent(products);
}