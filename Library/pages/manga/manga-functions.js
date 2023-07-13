const item_number_per_page = 100;

var current_page_number = 1;

$(document).ready(function () {
    const manga_card_template = document.getElementById('manga_card_template');
    const paging_item_template = document.getElementById('paging_item_template');
    const page_bar = document.getElementById('page_bar');
    const previous_button = document.getElementById('previous_button');
    const next_button = document.getElementById('next_button');

    LoadPaging();
    LoadPageData(current_page_number);
});

function LoadPaging() {
    let total_page_number = Math.ceil(manga_list.size / item_number_per_page);

    for (var i = 1; i <= total_page_number; i++) {
        let paging_item = paging_item_template.content.cloneNode(true).children[0];
        let paging_item_link = paging_item.querySelector('[paging-item]');

        paging_item.setAttribute('id', 'page_item_' + i);
        paging_item.setAttribute('onclick', 'ChangePage(' + i + ')');
        paging_item_link.innerHTML = i;
        page_bar.insertBefore(paging_item, next_button);
    }
}

function LoadPageData(page_number) {
    const active_class = 'active';
    const disabled_class = 'disabled';

    let manga_container = document.getElementById('manga_container');
    let total_page_number = Math.ceil(manga_list.size / item_number_per_page);
    let start_index = (page_number - 1) * item_number_per_page;
    let end_index = page_number * item_number_per_page;

    if (end_index > manga_list.size) {
        end_index = manga_list.size;
    }

    previous_button.classList.remove(disabled_class);
    next_button.classList.remove(disabled_class);
    if (page_number == 1) {
        previous_button.classList.add(disabled_class);
    }
    if (page_number == total_page_number) {
        next_button.classList.add(disabled_class);
    }

    for (var i = 1; i <= total_page_number; i++) {
        let page_item_id = 'page_item_' + i;
        let paging_item = document.getElementById(page_item_id);

        if (i == page_number) {
            paging_item.classList.add(active_class);
        }
        else {
            paging_item.classList.remove(active_class);
        }
    }

    manga_container.innerHTML = '';

    for (var i = start_index + 1; i <= end_index; i++) {
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
    let detail_href = 'Details.html?DataType=' + manga_data_type + '&ItemIndex=' + index;

    window.top.postMessage({ 'function': 'ChangePage', 'parameters': detail_href }, '*');
}

function ChangeToPreviousPage() {
    current_page_number--;

    LoadPageData(current_page_number);
}

function ChangeToNextPage() {
    current_page_number++;

    LoadPageData(current_page_number);
}

function ChangePage(page_number) {
    current_page_number = page_number;

    LoadPageData(current_page_number);
}