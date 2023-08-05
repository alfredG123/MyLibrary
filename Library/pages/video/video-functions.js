// Controls
var video_card_template;
var video_list_div;
var video_paging_item_template;
var video_paging_list;
var video_paging_nav;
var video_previous_button_list_item;
var video_next_button_list_item;

$(document).ready(function () {
    video_card_template = document.getElementById('video_card_template');
    video_list_div = document.getElementById('video_list_div');
    video_paging_item_template = document.getElementById('video_paging_item_template');
    video_paging_list = document.getElementById('video_paging_list');
    video_paging_nav = document.getElementById('video_paging_nav');
    video_previous_button_list_item = document.getElementById('video_previous_button_list_item');
    video_next_button_list_item = document.getElementById('video_next_button_list_item');

    // Create page items
    BuildPaging(VIDEO_LIST, video_paging_nav, video_paging_item_template, video_next_button_list_item, video_paging_list);

    // Create cards for list items
    LoadPageData(current_page_number);
});

// Create cards for list items
function LoadPageData(page_number) {

    // Determine the range of available items
    let start_index = (page_number - 1) * ITEM_NUMBER_PER_PAGE;
    let end_index = page_number * ITEM_NUMBER_PER_PAGE;
    if (end_index > VIDEO_LIST.length) {
        end_index = VIDEO_LIST.length;
    }

    // Update the paging control
    UpdatePagingUI(video_previous_button_list_item, video_next_button_list_item);

    // Clear all existing cards
    video_list_div.innerHTML = '';

    // Create a card for each item
    for (let i = start_index; i < end_index; i++) {
        let video_item = VIDEO_LIST[i];
        let video_card = video_card_template.content.cloneNode(true).children[0];

        SetupvideoImage(video_card, video_item);
        SetupvideoTitle(video_card, video_item);

        video_card.setAttribute('onclick', 'ViewDetails(' + i + ')');

        video_list_div.appendChild(video_card);
    }
}

// Add an image to the card
function SetupvideoImage(video_card, video_item) {

    // If the image is not specified, return
    if (video_item.image == null)
        return;

    let video_image = video_card.querySelector('[video-image]');
    video_image.src = '../../' + IMAGE_FOLDER_PATH_FROM_ROOT + video_item.image;
}

// Set up the title of the card
function SetupvideoTitle(video_card, video_item) {

    // If the title is not specified, return
    if (video_item.title == null)
        return;

    let video_title = video_card.querySelector('[video-title]');
    video_title.innerHTML = video_item.title;
}

// Raise an event to the parent page to view details
function ViewDetails(index) {
    window.top.postMessage({ 'function': 'ViewDetail', 'parameters': VIDEO_DATA_TYPE + '|' + index }, '*');
}