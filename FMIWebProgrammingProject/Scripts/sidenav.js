'use strict';

// Selecting elements
const btnOpenEl = document.querySelector('#btnOpen');
const btnCloseEl = document.querySelector('.closebtn');
const sidenavEl = document.querySelector('#mySidenav');

// Open sidenav
btnOpenEl.addEventListener('click', function() {
    sidenavEl.style.width = '250px';
    document.querySelector('main').style.marginLeft = '250px';
});

btnCloseEl.addEventListener('click', function() {
    sidenavEl.style.width = '0';
    document.querySelector('main').style.marginLeft = '0';
});