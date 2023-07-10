$(document).ready(function () {
    const anime_card_template = document.getElementById('anime_card_template');

    LoadTableData();
});

function LoadTableData() {
    let anime_container = document.getElementById('anime_container');

    for (var i = 1; i <= anime_list.size; i++) {
        let anime_item = anime_list.get(i);
        let anime_card = anime_card_template.content.cloneNode(true).children[0];

        let anime_image = anime_card.querySelector('[anime-image]');
        let anime_title = anime_card.querySelector('[anime-title]');

        anime_image.src = image_folder_path + anime_item.image;
        anime_title.innerHTML = anime_item.title;

        anime_image.setAttribute('onclick', 'ViewDetails(' + i + ')');

        anime_container.appendChild(anime_card);
    }
}

function ViewDetails(index) {
    let detail_href = 'Details.html?Type=' + anime_page_type + '&Index=' + index;

    window.top.postMessage({ 'function': 'ChangePage', 'parameters': detail_href }, '*');
}