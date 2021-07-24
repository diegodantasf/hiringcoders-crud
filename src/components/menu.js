import * as utils from './utils.js';
import {loadUsers} from './users.js';
import {loadProducts} from './products.js';

function createMenu() {
    const menu = document.createElement('div');
    const usersButton = utils.createButton("Manage users", function() {
        loadUsers();
    });
    const productsButton = utils.createButton("Manage products", function() {
        loadProducts();
    });
    menu.appendChild(productsButton);
    menu.appendChild(usersButton);

    return menu;
}

export function loadMenu() {
    const menu = createMenu();
    menu.setAttribute('menu', '');
    utils.loadContent(menu);
}