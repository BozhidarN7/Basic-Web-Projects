'use strict';

// Selecting elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');

const replaceContent = function(clName, div) {
    const id = Number(clName.substring(2));
    div.innerHTML = div.innerHTML.replace(/{%MEAL%}/g, data[id].meal);
    div.innerHTML = div.innerHTML.replace(/{%WAYOFDOING%}/g, data[id].wayOfDoing);
    div.innerHTML = div.innerHTML.replace(/{%IMAGE%}/g, data[id].image);

    let allIngredients = '';
    for (const current of data[id].ingredients) {
        allIngredients += `<li>${current}</ll>\n`;
    }

    div.innerHTML = div.innerHTML.replace(/{%INGREDIENTS%}/g, allIngredients);

}

const createContent = function(clName) {
    const div = document.createElement('div');
    div.className = 'test'
    div.innerHTML = `
        <div class="header" style="background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url('{%IMAGE%}')">
            </div>
            <div class="modalContent">
                <h2>{%MEAL%}</h2>
                <div class="ingredients">
                    <p>Продукти:</p>
                    <ol>
                    {%INGREDIENTS%}
                    </ol>
                </div>
                <h3>Начин на приготвяне</h3>
                <p>
                {%WAYOFDOING%}
                </p>
            </div>
  `;

    replaceContent(clName, div);
    modal.appendChild(div);
}

const openModal = function(clName) {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');

    createContent(clName);
}

const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    const test = document.querySelector('.test');
    modal.removeChild(test);
}

btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
const data = [{
        id: 'id0',
        meal: 'Палачинки',
        ingredients: ['2 банана', '2 яйца', '1/2 чаена лъжичка канела', '1/2 чаеан лъжичка ванилов екстаркт'],
        image: 'https://www.az-jenata.bg/media/az-jenata/files/articles/640x480/3892f014a8c0a894ab83aabb9905746c.jpg',
        wayOfDoing: 'Намачкайте с вилица бананите и ги сложете в купа. Към тях прибавете яйцата, канелата и ваниловия екстракт. Разбъркайте добре и в загрят тиган с незалепващо покритие, с помощта на супена лъжица оформете малки кръгчета, сипвайки от сместа. Печете палачинките около 2-3 минути за всяка страна. Сервирайте с мед, течен шоколад, сладко по ваш избор. Прочети още на: https://www.az-jenata.bg/a/88-/37342-bananovi-palachinki-bez-brashno/'
    },
    {
        id: 'id1',
        meal: 'Нахутени кексчета с праз и подправки',
        ingredients: ['нахут', 'лимецово брашно - 1 ч.ч.', 'яйца - 1 бр.', 'кисело мляко 1/2 ч.л.', 'праз - 4 стръка', 'копър - 1/3 връзка'],
        image: 'data:image/jpeg;base64,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',
        wayOfDoing: 'Пасирайте нахута в блендер. В дълбока купа разбийте яйцето и добавете пасирания нахут. Прибавете киселото мляко, в което сте угасили сода за хляб с няколко капки оцет. Разбъркайте. Праза изчистете и нарежете на ситно. Оставете малко за декорация на солените кексчета и добавете към сместа. Накълцайте магданоза и копъра заедно с дръжките и прибавете и тях.Добавете лимецовото брашно, зехтина, щипка черен пипер и сол (1/2 равна чаена лъжичка). Разбъркайте хубаво.Трябва да ви се получи гъста кексова смес. Ако е нужно, добавете още малко лимецово брашно.Разпределете получената смес в 12 силиконови форми за мъфини. Отгоре декорирайте със заделения предварително нарязан на тъничко праз. Печете в предварително загрята на 180 градуса фурна до готовност. Извадете ги от формите, след като се охладят леко.'
    },
    {
        id: 'id2',
        meal: 'Кокосова палачинка',
        ingredients: ['3 яйца', '15 гр. Кокосови стърготини', '3 ванилии', '½ с.л. натурално какао', 'Канела', 'Кокосово масло'],
        image: 'https://inspiredfitstrong.com/wp-content/uploads/2015/10/zakuska2.jpg',
        wayOfDoing: 'Намачкайте банана. Смесете го с останалите продукти. Намажете тигана с малко кокосово масло. Сипете сместа (може да я разделите на две) и похлупете с капак. Палачинката ще започне да се надува и когато яйцата вече не са течни, а са бухнали, можете да махнете капака и да обърнете. Опечете от другата страна. След това намажете с 10-15гр. мед.'
    },
    {
        id: 'id3',
        meal: 'Палачинка със сладки картофи',
        ingredients: ['1 бр. сладък картоф', '2 яйца', '10-15 гр. мед'],
        image: 'https://inspiredfitstrong.com/wp-content/uploads/2015/10/Sweet-Potato-Pancakes.jpg',
        wayOfDoing: 'Сварете един сладък картоф – използвайте около 100гр. от сварения картоф. Намачкайте го. Смесете го с 2 яйца, ванилия и канела. Намажете тигана с масло и опечете палачинката. Намажете я с 10-15гр. мед и имате чудесна закуска.'
    },
    {
        id: 'id4',
        meal: 'Тиквен хляб',
        ingredients: ['2 яйца+ 2 белтъка', '200гр. печена тиква', '1 банан', '50 гр. кокосово брашно', '½ ч.л. бакпулвер', '10-15 гр. мед'],
        image: 'https://inspiredfitstrong.com/wp-content/uploads/2015/10/pump-bread.jpg',
        wayOfDoing: 'Намачкайте тиквата и банана. Смесете с останалите продукти. Намажете дълбок съд с малко масло. Ако имате повече време, печете във фурната около 30 минути. Ако бързате, опечете сместа като палачинки – използвайте тиган.'
    },
    {
        id: 'id5',
        meal: 'Солена палачинка',
        ingredients: ['2-3 яйца', '15гр. кокосови стърготини', '½ нарязана тиквичка', '½ нарязан морков', '¼ червена чушка', 'Черен пипер', 'сол'],
        image: 'https://inspiredfitstrong.com/wp-content/uploads/2015/10/cottage.jpg',
        wayOfDoing: 'Намачкайте тиквата и банана. Смесете с останалите продукти. Намажете дълбок съд с малко масло. Ако имате повече време, печете във фурната около 30 минути. Ако бързате, опечете сместа като палачинки – използвайте тиган.'
    },
    {
        id: 'id6',
        meal: 'Тиквена палачинка',
        ingredients: ['3 яйца', '150 гр. настъргана тиква', 'Ванилия'],
        image: 'https://inspiredfitstrong.com/wp-content/uploads/2015/10/%D0%BF%D0%B0%D0%BB%D0%B0%D1%87%D0%B8%D0%BD%D0%BA%D0%B05.jpg',
        wayOfDoing: 'Разбъркайте всичко и опечете на тиган с малко масло. После намажете с 10-15гр. мед и поръсете с 15гр. орехи.'
    },
    {
        id: 'id7',
        meal: 'Палачинкова торта – Кала',
        ingredients: ['6 цели яйца', '40 гр. кокосови стърготини', '100-150мл. прясно мляко', 'ванилия', '1 есенция ром', '250 гр. цедено кисело мляко', '300 гр. боровинки', '3-4 с.л. мед', '3с.л. коксоово олио',
            '80гр. сурови бадеми'
        ],

        image: 'https://inspiredfitstrong.com/wp-content/uploads/2015/10/obqd9.jpg',
        wayOfDoing: '<pre>За блатовете:</pre>Разбийте 6-те яйца. Добавете кокос, кокосовото олио и ванилия. Сипете малко прясно мляко, за да сместта да не е много гъста. После опечете 3 палачинки, като намажете тигана с малко кокосово масло, за да не залепват.Когато едната палачинка е готова, намажете я със съвсем малко мед, така че да попие и да омекне.<pre>За крема:</pre>Разбийте цеденото кисело мляко, заедно с боровинките. Добавете 2с.л. мед и есенция ром.Намажете всяка палачинка със сместа и на всеки блат слагайте малко натрошени бадеми. Натрупайте палачинките една върху друга. Украсете и после оставете в хладилника за 2-3 часа.'
    },
    {
        id: 'id8',
        meal: 'Таханови десертчета',
        ingredients: ['2 яйца+ 2 белтъка', '1 с.л. мед', '100 гр. варена тиква', '2 ч.л. тахан', '2 с.л. котидж сирене', 'Ванилия', 'Шепа натрошени бадеми'],
        image: 'https://inspiredfitstrong.com/wp-content/uploads/2015/10/tahanovi.jpg',
        wayOfDoing: 'Смесете всичко и оформете топчета. Поставете ги върху хартия за печене и печете не повече от 15 мин.'
    },
];