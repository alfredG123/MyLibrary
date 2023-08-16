// Controls
var backlog_card_template;
var backlog_list_div;
var backlog_paging_item_template;
var backlog_paging_list;
var backlog_paging_nav;
var backlog_previous_button_list_item;
var backlog_next_button_list_item;

// Paging
var current_page_number = 1;
var total_page_number = 0;

$(document).ready(function () {
    backlog_card_template = document.getElementById('backlog_card_template');
    backlog_list_div = document.getElementById('backlog_list_div');
    backlog_paging_item_template = document.getElementById('backlog_paging_item_template');
    backlog_paging_list = document.getElementById('backlog_paging_list');
    backlog_paging_nav = document.getElementById('backlog_paging_nav');
    backlog_previous_button_list_item = document.getElementById('backlog_previous_button_list_item');
    backlog_next_button_list_item = document.getElementById('backlog_next_button_list_item');

    // Create page items
    total_page_number = BuildPaging(BACKLOG_LIST, backlog_paging_nav, backlog_paging_item_template, backlog_next_button_list_item, backlog_paging_list, 'backlog');

    // Create cards for list items
    LoadPageData(current_page_number);
});

// Create cards for list items
function LoadPageData(page_number) {
    current_page_number = page_number;

    // Determine the range of available items
    let start_index = (page_number - 1) * ITEM_NUMBER_PER_PAGE;
    let end_index = page_number * ITEM_NUMBER_PER_PAGE;
    if (end_index > BACKLOG_LIST.length) {
        end_index = BACKLOG_LIST.length;
    }

    // Update the paging control
    UpdatePagingUI(current_page_number, total_page_number, backlog_previous_button_list_item, backlog_next_button_list_item, 'backlog');

    // Clear all existing cards
    backlog_list_div.innerHTML = '';

    // Create a card for each item
    for (let i = start_index; i < end_index; i++) {
        let backlog_item = BACKLOG_LIST[i];
        let backlog_card = backlog_card_template.content.cloneNode(true).children[0];

        SetupBacklogImage(backlog_card, backlog_item);
        SetupBacklogTitle(backlog_card, backlog_item);

        backlog_card.setAttribute('onclick', 'ViewDetails(' + i + ')');

        backlog_list_div.appendChild(backlog_card);
    }
}

// Add an image to the card
function SetupBacklogImage(backlog_card, backlog_item) {

    // If the image is not specified, return
    if (backlog_item.image == null)
        return;

    let backlog_image = backlog_card.querySelector('[backlog-image]');
    backlog_image.src = '../../' + IMAGE_FOLDER_PATH_FROM_ROOT + backlog_item.image;
}

// Set up the title of the card
function SetupBacklogTitle(backlog_card, backlog_item) {

    // If the title is not specified, return
    if (backlog_item.title == null)
        return;

    let backlog_title = backlog_card.querySelector('[backlog-title]');
    backlog_title.innerHTML = backlog_item.title;
}

// Raise an event to the parent page to view details
function ViewDetails(index) {
    window.top.postMessage({ 'function': 'ViewDetail', 'parameters': BACKLOG_DATA_TYPE + '|' + index }, '*');
}