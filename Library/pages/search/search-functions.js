var anime_container;
var anime_paging_list;
var anime_paging_nav;
var anime_previous_button_list_item;
var anime_next_button_list_item;
var anime_tab;
var anime_tab_link;
var item_card_template;
var manga_container;
var manga_paging_list;
var manga_paging_nav;
var manga_previous_button_list_item;
var manga_next_button_list_item;
var manga_tab;
var manga_tab_link;
var no_anime_label;
var no_manga_label;
var no_video_label;
var video_container;
var video_paging_list;
var video_paging_nav;
var video_previous_button_list_item;
var video_next_button_list_item;
var video_tab;
var video_tab_link;

var anime_result_item_key_list;
var manga_result_item_key_list;
var video_result_item_key_list;

// Paging
var anime_current_page_number = 1;
var anime_total_page_number = 0;
var manga_current_page_number = 1;
var manga_total_page_number = 0;
var video_current_page_number = 1;
var video_total_page_number = 0;

var active_search_tab_index = NONE_TAB_INDEX;

$(document).ready(function () {
    anime_container = document.getElementById('anime_container');
    anime_paging_list = document.getElementById('anime_paging_list');
    anime_paging_nav = document.getElementById('anime_paging_nav');
    anime_previous_button_list_item = document.getElementById('anime_previous_button_list_item');
    anime_next_button_list_item = document.getElementById('anime_next_button_list_item');
    anime_tab = document.getElementById('anime_tab');
    anime_tab_link = document.getElementById('anime_tab_link');
    item_card_template = document.getElementById('item_card_template');
    manga_container = document.getElementById('manga_container');
    manga_paging_list = document.getElementById('manga_paging_list');
    manga_paging_nav = document.getElementById('manga_paging_nav');
    manga_previous_button_list_item = document.getElementById('manga_previous_button_list_item');
    manga_next_button_list_item = document.getElementById('manga_next_button_list_item');
    manga_tab = document.getElementById('manga_tab');
    manga_tab_link = document.getElementById('manga_tab_link');
    no_anime_label = document.getElementById('no_anime_label');
    no_manga_label = document.getElementById('no_manga_label');
    no_video_label = document.getElementById('no_video_label');
    video_container = document.getElementById('video_container');
    video_paging_list = document.getElementById('video_paging_list');
    video_paging_nav = document.getElementById('video_paging_nav');
    video_previous_button_list_item = document.getElementById('video_previous_button_list_item');
    video_next_button_list_item = document.getElementById('video_next_button_list_item');
    video_tab = document.getElementById('video_tab');
    video_tab_link = document.getElementById('video_tab_link');

    // Hide controls by default
    no_anime_label.style.display = 'none';
    no_manga_label.style.display = 'none';
    no_video_label.style.display = 'none';
    anime_container.style.display = 'none';
    manga_container.style.display = 'none';
    video_container.style.display = 'none';

    LoadSearchResults();

    // Set up the default tab
    DisplayDefaultTab();
});

// Find items by the search paramaters
function LoadSearchResults() {
    let search_parameters = new URL(window.location).searchParams;
    let search_by = search_parameters.get('SearchBy');

    if (search_by == 'Text') {
        let item_text = search_parameters.get('ItemText');

        // Find the items by the search parameters for each data type
        LoadSearchResultsForTabByText(VIDEO_DATA_TYPE, item_text);
        LoadSearchResultsForTabByText(ANIME_DATA_TYPE, item_text);
        LoadSearchResultsForTabByText(MANGA_DATA_TYPE, item_text);
    }
    else if (search_by == 'Index') {
        let search_type = parseInt(search_parameters.get('SearchType'));
        let item_index = parseInt(search_parameters.get('ItemIndex'));

        // Find the items by the search parameters for each data type
        LoadSearchResultsForTabByIndex(search_type, VIDEO_DATA_TYPE, item_index);
        LoadSearchResultsForTabByIndex(search_type, ANIME_DATA_TYPE, item_index);
        LoadSearchResultsForTabByIndex(search_type, MANGA_DATA_TYPE, item_index);
    }
}

// Find the items by the search parameters for each data type
function LoadSearchResultsForTabByText(data_type, item_text) {

    // Find the corresponding list
    if (data_type == ANIME_DATA_TYPE) {
        anime_result_item_key_list = SearchItemsByText(ANIME_LIST, item_text);
    }
    else if (data_type == MANGA_DATA_TYPE) {
        manga_result_item_key_list = SearchItemsByText(MANGA_LIST, item_text);
    }
    else if (data_type == VIDEO_DATA_TYPE) {
        video_result_item_key_list = SearchItemsByText(VIDEO_LIST, item_text);
    }
}

// Find the items by the search parameters for each data type
function LoadSearchResultsForTabByIndex(search_type, data_type, item_index) {

    // Find the corresponding list
    if (data_type == ANIME_DATA_TYPE) {
        anime_result_item_key_list = SearchItemsByIndex(search_type, data_type, ANIME_LIST, item_index);
    }
    else if (data_type == MANGA_DATA_TYPE) {
        manga_result_item_key_list = SearchItemsByIndex(search_type, data_type, MANGA_LIST, item_index);
    }
    else if (data_type == VIDEO_DATA_TYPE) {
        video_result_item_key_list = SearchItemsByIndex(search_type, data_type, VIDEO_LIST, item_index);
    }
}

// Find items that match requirements
function SearchItemsByText(item_list, item_text) {
    let item_key_list = [];

    // If the search text is not specified, return
    if (item_text == null || item_text == '')
        return item_key_list;

    // If the items has the similar title, store it
    for (var [key, value] of item_list.entries()) {
        if (CheckIfTitleContainsText(value.title, item_text)) {
            item_key_list.push(key);
        }
        else if (CheckIfTitleContainsText(value.alternateTitles, item_text)) {
            item_key_list.push(key);
        }
    }

    return item_key_list;
}

// Find items that match requirements
function SearchItemsByIndex(search_type, data_type, item_list, item_index) {
    let item_key_list = [];

    // If the search text is not specified, return
    if (item_index == null)
        return item_key_list;

    // If the items match texts, store it
    for (var [key, value] of item_list.entries()) {
        let item_value = null;

        // Find the value to search
        switch (search_type) {
            case SEARCH_BY_ACTOR:
                item_value = value.actors;
                break;
            case SEARCH_BY_ANIME_COMPANY:
                if (data_type == ANIME_DATA_TYPE) {
                    item_value = value.companies;
                }
                break;
            case SEARCH_BY_VIDEO_COMPANY:
                if (data_type == VIDEO_DATA_TYPE) {
                    item_value = value.companies;
                }
                break;
            case SEARCH_BY_ANIME_SERIES:
                if (data_type == ANIME_DATA_TYPE) {
                    item_value = value.series;
                }
                break;
            case SEARCH_BY_MANGA_SERIES:
                if (data_type == MANGA_DATA_TYPE) {
                    item_value = value.series;
                }
                break;
            case SEARCH_BY_VIDEO_SERIES:
                if (data_type == VIDEO_DATA_TYPE) {
                    item_value = value.series;
                }
                break;
            case SEARCH_BY_AUTHOR:
                item_value = value.author;
                break;
            case SEARCH_BY_TAG:
                item_value = value.tags;
                break;
        }

        // If the item has the text that match the search texts
        if (CheckIfItemContainsTag(item_value, item_index)) {
            item_key_list.push(key);
        }
    }

    return item_key_list;
}

// Check if the value is match the index
function CheckIfItemContainsTag(item_value, item_index) {
    var is_matched = false;

    if (Array.isArray(item_value)) {
        if (item_value.indexOf(item_index) != -1) {
            is_matched = true;
        }
    }
    else {
        if (item_value == item_index) {
            is_matched = true;
        }
    }

    return is_matched;
}

// Check if the value is match the text
function CheckIfTitleContainsText(item_value, item_text) {
    var is_matched = false;
    var lowercase_item_text = item_text.toLowerCase();

    // Check if the text in the list
    if (Array.isArray(item_value)) {
        if (item_value.some(text => text.toLowerCase().indexOf(lowercase_item_text) !== -1)) {
            is_matched = true;
        }
    }

    // Check if the item text in the text
    else {
        if (item_value.indexOf(lowercase_item_text) !== -1) {
            is_matched = true;
        }
    }

    return is_matched;
}

function DisplayDefaultTab() {

    // Set up the active tab
    if (video_result_item_key_list.length > 0) {
        active_search_tab_index = VIDEO_TAB_INDEX;
    }
    else if (anime_result_item_key_list.length > 0) {
        active_search_tab_index = ANIME_TAB_INDEX;
    }
    else if (manga_result_item_key_list.length > 0) {
        active_search_tab_index = MANGA_TAB_INDEX;
    }

    // Set up the default display
    anime_container.style.display = 'block';
    manga_container.style.display = 'block';
    video_container.style.display = 'block';
    no_anime_label.style.display = 'none';
    no_manga_label.style.display = 'none';
    no_video_label.style.display = 'none';

    // Update the display
    if (anime_result_item_key_list.length == 0) {
        anime_container.style.display = 'none';
        no_anime_label.style.display = 'block';
    }
    if (manga_result_item_key_list.length == 0) {
        manga_container.style.display = 'none';
        no_manga_label.style.display = 'block';
    }
    if (video_result_item_key_list.length == 0) {
        video_container.style.display = 'none';
        no_video_label.style.display = 'block';
    }

    // Create page items
    anime_total_page_number = BuildPaging(anime_result_item_key_list, anime_paging_nav, item_paging_item_template, anime_next_button_list_item, anime_paging_list, 'anime');
    manga_total_page_number = BuildPaging(manga_result_item_key_list, manga_paging_nav, item_paging_item_template, manga_next_button_list_item, manga_paging_list, 'manga');
    video_total_page_number = BuildPaging(video_result_item_key_list, video_paging_nav, item_paging_item_template, video_next_button_list_item, video_paging_list, 'video');

    // Set up the default page number
    UpdatePagingUI(anime_current_page_number, anime_total_page_number, anime_previous_button_list_item, anime_next_button_list_item, 'anime');
    UpdatePagingUI(manga_current_page_number, manga_total_page_number, manga_previous_button_list_item, manga_next_button_list_item, 'manga');
    UpdatePagingUI(video_current_page_number, video_total_page_number, video_previous_button_list_item, video_next_button_list_item, 'video');

    // Set up the first tab
    SelectTab(active_search_tab_index);
}

// Display the tab control
function SelectTab(selected_tab_index) {

    // If no tab is selected, default to the tab to video
    if (selected_tab_index == NONE_TAB_INDEX) {
        selected_tab_index = VIDEO_TAB_INDEX;
    }

    active_search_tab_index = selected_tab_index;

    // Hide all tabs by default
    let tab_content_list = document.getElementsByClassName('tab-content');
    for (i = 0; i < tab_content_list.length; i++) {
        tab_content_list[i].style.display = 'none';
    }

    // Hide all tabs by default
    let tab_link_list = document.getElementsByClassName('tab-link');
    for (i = 0; i < tab_link_list.length; i++) {
        tab_link_list[i].classList.remove(ACTIVE_CLASS);
    }

    // Find the active tab control
    let tab_content = null;
    let tab_link = null;

    if (selected_tab_index == ANIME_TAB_INDEX) {
        tab_content = anime_tab;
        tab_link = anime_tab_link;

        LoadPageData(anime_current_page_number);
    }
    else if (selected_tab_index == MANGA_TAB_INDEX) {
        tab_content = manga_tab;
        tab_link = manga_tab_link;

        LoadPageData(manga_current_page_number);
    }
    else if (selected_tab_index == VIDEO_TAB_INDEX) {
        tab_content = video_tab;
        tab_link = video_tab_link;

        LoadPageData(video_current_page_number);
    }

    // Display the active tab
    if (tab_content != null) {
        tab_content.style.display = 'block';
    }
    if (tab_link != null) {
        tab_link.classList.add(ACTIVE_CLASS);
    }
}

// Create cards for list items
function LoadPageData(page_number) {
    let result_item_key_list;
    let total_page_number;
    let previous_button;
    let next_button;
    let item_container;
    let item_list;
    let data_type;
    let page_item_id_prefex;

    if (active_search_tab_index == ANIME_TAB_INDEX) {
        anime_current_page_number = page_number;
        total_page_number = anime_total_page_number;
        result_item_key_list = anime_result_item_key_list;
        previous_button = anime_previous_button_list_item;
        next_button = anime_next_button_list_item;
        item_container = anime_container;
        item_list = ANIME_LIST;
        data_type = ANIME_DATA_TYPE;
        page_item_id_prefex = 'anime';
    }
    else if (active_search_tab_index == MANGA_TAB_INDEX) {
        manga_current_page_number = page_number;
        total_page_number = manga_total_page_number;
        result_item_key_list = manga_result_item_key_list;
        previous_button = manga_previous_button_list_item;
        next_button = manga_next_button_list_item;
        item_container = manga_container;
        item_list = MANGA_LIST;
        data_type = MANGA_DATA_TYPE;
        page_item_id_prefex = 'manga';
    }
    else if (active_search_tab_index == VIDEO_TAB_INDEX) {
        video_current_page_number = page_number;
        total_page_number = video_total_page_number;
        result_item_key_list = video_result_item_key_list;
        previous_button = video_previous_button_list_item;
        next_button = video_next_button_list_item;
        item_container = video_container;
        item_list = VIDEO_LIST;
        data_type = VIDEO_DATA_TYPE;
        page_item_id_prefex = 'video';
    }

    // Determine the range of available items
    let start_index = (page_number - 1) * ITEM_NUMBER_PER_PAGE;
    let end_index = page_number * ITEM_NUMBER_PER_PAGE;
    if (end_index > result_item_key_list.length) {
        end_index = result_item_key_list.length;
    }

    // Update the paging control
    UpdatePagingUI(page_number, total_page_number, previous_button, next_button, page_item_id_prefex);

    // Clear all existing cards
    item_container.innerHTML = '';

    // Create a card for each item
    for (let i = start_index; i < end_index; i++) {
        let item_index = result_item_key_list[i];
        let list_item = item_list[item_index];
        let item_card = item_card_template.content.cloneNode(true).children[0];
        let item_image = item_card.querySelector('[item-image]');
        let item_title = item_card.querySelector('[item-title]');

        // Set up the image control
        item_image.src = '../../' + IMAGE_FOLDER_PATH_FROM_ROOT + list_item.image;
        item_image.setAttribute('onclick', 'ViewDetails(' + data_type + ',' + item_index + ')');

        // Set up the image caption
        item_title.innerHTML = list_item.title;

        // Add the card control to the container
        item_container.appendChild(item_card);
    }
}

// Raise an event to display the detail
function ViewDetails(data_type, item_index) {
    window.top.postMessage({ 'function': 'ViewDetail', 'parameters': data_type + '|' + item_index }, '*');
}