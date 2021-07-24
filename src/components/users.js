import * as utils from './utils.js';
import {loadMenu} from './menu.js'

function loadData() {
    const data = localStorage.getItem('users');
    if (data === null) {
        return [];
    }
    return JSON.parse(data);
}

function saveData(data) {
    localStorage.setItem('users', JSON.stringify(data));
}

function createUserCRUD() {
    const crud = document.createElement('div');

    const inputs = [];
    inputs.push(utils.createInput('Name'));
    inputs.push(utils.createInput('Email'));
    inputs.push(utils.createInput('Phone'));

    const addUserButton = utils.createButton('Add new user', function() {
        const userData = []
        
        for (let i = 0; i < inputs.length; ++i) {
            const x = inputs[i].querySelector('input').value;
            if (typeof(x) === 'string' && x.length > 0) {
                userData.push(x);
            } else {
                return;
            }
        }
        
        const data = loadData();
        data.push(userData);
        saveData(data);
        loadUsers();
    });

    const goBackButton = utils.createButton('Return', function() {
        loadMenu();
    });

    inputs.forEach(function(input) {
        crud.appendChild(input);
    });
    crud.appendChild(addUserButton);
    crud.appendChild(goBackButton);

    return crud;
}

function createTable() {
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const header = ['Name', 'Email', 'Phone', 'Remove?'];
    header.forEach(function(h) {
        const th = document.createElement('th');
        th.innerHTML = h;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    const data = loadData();
    data.forEach(function(user) {
        const row = document.createElement('tr');
        user.forEach(function(info) {
            const td = document.createElement('td');
            td.innerHTML = info;
            row.appendChild(td);
        });
        const td = document.createElement('td');
        const removeButton = utils.createButton("Remove", function(){
            let tmpData = data;
            tmpData = tmpData.filter(item => item !== user);
            saveData(tmpData);
            loadUsers();
        })
        td.appendChild(removeButton);
        row.appendChild(td);
        table.appendChild(row);
    });
    return table;
}

function createUsers() {
    const users = document.createElement('div');
    users.setAttribute('users', '');
    users.appendChild(createUserCRUD());
    users.appendChild(createTable());
    return users;
}

export function loadUsers() {
    const users = createUsers();
    utils.loadContent(users);
}