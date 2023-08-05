// Controls
var anime_card_template;
var anime_list_div;
var anime_paging_item_template;
var anime_paging_list;
var anime_paging_nav;
var anime_previous_button_list_item;
var anime_next_button_list_item;

$(document).ready(function () {
    anime_card_template = document.getElementById('anime_card_template');
    anime_list_div = document.getElementById('anime_list_div');
    anime_paging_item_template = document.getElementById('anime_paging_item_template');
    anime_paging_list = document.getElementById('anime_paging_list');
    anime_paging_nav = document.getElementById('anime_paging_nav');
    anime_previous_button_list_item = document.getElementById('anime_previous_button_list_item');
    anime_next_button_list_item = document.getElementById('anime_next_button_list_item');

    // Create page items
    BuildPaging(ANIME_LIST, anime_paging_nav, anime_paging_item_template, anime_next_button_list_item, anime_paging_list);

    // Create cards for list items
    LoadPageData(current_page_number);
});

// Create cards for list items
function LoadPageData(page_number) {

    // Determine the range of available items
    let start_index = (page_number - 1) * ITEM_NUMBER_PER_PAGE;
    let end_index = page_number * ITEM_NUMBER_PER_PAGE;
    if (end_index > ANIME_LIST.length) {
        end_index = ANIME_LIST.length;
    }

    // Update the paging control
    UpdatePagingUI(anime_previous_button_list_item, anime_next_button_list_item);

    // Clear all existing cards
    anime_list_div.innerHTML = '';

    // Create a card for each item
    for (let i = start_index; i < end_index; i++) {
        let anime_item = ANIME_LIST[i];
        let anime_card = anime_card_template.content.cloneNode(true).children[0];

        SetupanimeImage(anime_card, anime_item);
        SetupanimeTitle(anime_card, anime_item);

        anime_card.setAttribute('onclick', 'ViewDetails(' + i + ')');

        anime_list_div.appendChild(anime_card);
    }
}

// Add an image to the card
function SetupanimeImage(anime_card, anime_item) {

    // If the image is not specified, return
    if (anime_item.image == null)
        return;

    let anime_image = anime_card.querySelector('[anime-image]');
    anime_image.src = '../../' + IMAGE_FOLDER_PATH_FROM_ROOT + anime_item.image;
}

// Set up the title of the card
function SetupanimeTitle(anime_card, anime_item) {

    // If the title is not specified, return
    if (anime_item.title == null)
        return;

    let anime_title = anime_card.querySelector('[anime-title]');
    anime_title.innerHTML = anime_item.title;
}

// Raise an event to the parent page to view details
function ViewDetails(index) {
    window.top.postMessage({ 'function': 'ViewDetail', 'parameters': ANIME_DATA_TYPE + '|' + index }, '*');
}