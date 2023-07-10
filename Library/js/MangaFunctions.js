$(document).ready(function () {
    const manga_card_template = document.getElementById('manga_card_template');

    LoadTableData();
});

function LoadTableData() {
    let manga_container = document.getElementById('manga_container');

    for (var i = 1; i <= manga_list.size; i++) {
        let manga_item = manga_list.get(i);
        let manga_card = manga_card_template.content.cloneNode(true).children[0];

        let manga_image = manga_card.querySelector('[manga-image]');
        let manga_title = manga_card.querySelector('[manga-title]');

        manga_image.src = image_folder_path + manga_item.image;
        manga_title.innerHTML = manga_item.title;

        manga_image.setAttribute('onclick', 'ViewDetails(' + i + ')');

        manga_container.appendChild(manga_card);
    }
}

function ViewDetails(index) {
    let detail_href = 'Details.html?Type=' + manga_page_type + '&Index=' + index;

    window.top.postMessage({ 'function': 'ChangePage', 'parameters': detail_href }, '*');
}