'use strict';

// Selecting elements
const container = document.querySelector('.container');
const mealName = document.querySelector('.input');
const category = document.querySelector('.select-field');
const ingredients = document.querySelector('#ingredients');
const description = document.querySelector('#description');
const img = document.querySelector('.btn-upload');
const btn = document.querySelector('.btn-submit');

let publicationsSoFar = -1;
const data = [];

const showContent = function(clName, div) {
    const id = Number(clName.substring(2));
    div.innerHTML = div.innerHTML.replace(/{%MEAL%}/g, data[id].meal);
    div.innerHTML = div.innerHTML.replace(/{%WAYOFDOING%}/g, data[id].wayOfDoing);
    div.innerHTML = div.innerHTML.replace(/{%IMAGE%}/g, data[id].image);

    let allIngredients = '';
    for (const current of data[id].ingredients.split('\n')) {
        allIngredients += `<li>${current}</ll>\n`;
    }
    div.innerHTML = div.innerHTML.replace(/{%INGREDIENTS%}/g, allIngredients);

}

const fillData = function(id) {
    const imgPath = `Images/${img.value.substring(img.value.lastIndexOf('\\')+1)}`;

    let obj = {};
    obj[id] = id;
    obj['meal'] = mealName.value;
    obj['ingredients'] = ingredients.value;
    obj['image'] = imgPath;
    obj['wayOfDoing'] = description.value;
    data.push(obj);
}
const clearForm = function() {
    mealName.value = '';
    img.value = '';
    description.value = '';
    ingredients.value = '';
}

const submitContent = function() {
    publicationsSoFar++;
    let id = 'id' + publicationsSoFar;
    fillData(id);

    const div = document.createElement('div');
    div.className = `meal ${id}`;

    div.innerHTML = div.innerHTML = `
        <h2>{%MEAL%}</h2>
        <img src="{%IMAGE%}" alt="smth went wrong">
        <p>Продукти:</p>
        <ol>
        {%INGREDIENTS%}
        </ol>
        <p>Начин на приготвяне</p>
        <p>
        {%WAYOFDOING%}    
        </p>
  `;
    showContent(id, div);
    container.appendChild(div);
    clearForm();
}

btn.addEventListener('click', submitContent);