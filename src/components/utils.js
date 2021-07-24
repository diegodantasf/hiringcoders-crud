export function createButton(name, onclickFn) {
    const button = document.createElement("button");
    button.innerHTML = name;
    button.onclick = onclickFn;
    return button;
}

export function createInput(name, id) {
    const inputContainer = document.createElement('div');
    const label = document.createElement('div');
    const input = document.createElement('input');
    label.innerHTML = name;
    inputContainer.appendChild(label);
    inputContainer.appendChild(input);
    return inputContainer;
}

export function updateContent(tree) {
    const content = document.querySelector("#content");
    content.appendChild(tree);
}

export function clearContent() {
    const content = document.querySelector("#content");
    content.textContent = '';
}

export function loadContent(content) {
    clearContent();
    updateContent(content);
}