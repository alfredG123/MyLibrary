// Controls
var manga_card_template;
var manga_list_div;
var manga_paging_item_template;
var manga_paging_list;
var manga_paging_nav;
var manga_previous_button_list_item;
var manga_next_button_list_item;

$(document).ready(function () {
    manga_card_template = document.getElementById('manga_card_template');
    manga_list_div = document.getElementById('manga_list_div');
    manga_paging_item_template = document.getElementById('manga_paging_item_template');
    manga_paging_list = document.getElementById('manga_paging_list');
    manga_paging_nav = document.getElementById('manga_paging_nav');
    manga_previous_button_list_item = document.getElementById('manga_previous_button_list_item');
    manga_next_button_list_item = document.getElementById('manga_next_button_list_item');

    // Create page items
    BuildPaging(MANGA_LIST, manga_paging_nav, manga_paging_item_template, manga_next_button_list_item, manga_paging_list);

    // Create cards for list items
    LoadPageData(current_page_number);
});

// Create cards for list items
function LoadPageData(page_number) {

    // Determine the range of available items
    let start_index = (page_number - 1) * ITEM_NUMBER_PER_PAGE;
    let end_index = page_number * ITEM_NUMBER_PER_PAGE;
    if (end_index > MANGA_LIST.length) {
        end_index = MANGA_LIST.length;
    }

    // Update the paging control
    UpdatePagingUI(manga_previous_button_list_item, manga_next_button_list_item);

    // Clear all existing cards
    manga_list_div.innerHTML = '';

    // Create a card for each item
    for (let i = start_index; i < end_index; i++) {
        let manga_item = MANGA_LIST[i];
        let manga_card = manga_card_template.content.cloneNode(true).children[0];

        SetupMangaImage(manga_card, manga_item);
        SetupMangaTitle(manga_card, manga_item);

        manga_card.setAttribute('onclick', 'ViewDetails(' + i + ')');

        manga_list_div.appendChild(manga_card);
    }
}

// Add an image to the card
function SetupMangaImage(manga_card, manga_item) {

    // If the image is not specified, return
    if (manga_item.image == null)
        return;

    let manga_image = manga_card.querySelector('[manga-image]');
    manga_image.src = '../../' + IMAGE_FOLDER_PATH_FROM_ROOT + manga_item.image;
}

// Set up the title of the card
function SetupMangaTitle(manga_card, manga_item) {

    // If the title is not specified, return
    if (manga_item.title == null)
        return;

    let manga_title = manga_card.querySelector('[manga-title]');
    manga_title.innerHTML = manga_item.title;
}

// Raise an event to the parent page to view details
function ViewDetails(index) {
    window.top.postMessage({ 'function': 'ViewDetail', 'parameters': MANGA_DATA_TYPE + '|' + index }, '*');
}