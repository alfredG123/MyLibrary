var item_card_template;
var no_anime_label;
var no_manga_label;
var no_video_label;
var anime_container;
var manga_container;
var video_container;

var active_search_tab_index = NONE_TAB_INDEX;

$(document).ready(function () {
    item_card_template = document.getElementById('item_card_template');
    no_anime_label = document.getElementById('no_anime_label');
    no_manga_label = document.getElementById('no_manga_label');
    no_video_label = document.getElementById('no_video_label');
    anime_container = document.getElementById('anime_container');
    manga_container = document.getElementById('manga_container');
    video_container = document.getElementById('video_container');

    // Hide controls by default
    no_anime_label.style.display = 'none';
    no_manga_label.style.display = 'none';
    no_video_label.style.display = 'none';
    anime_container.style.display = 'none';
    manga_container.style.display = 'none';
    video_container.style.display = 'none';

    LoadSearchResults();

    // Set up the first tab
    SelectTab(active_search_tab_index);
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
    var item_container = null;
    var no_item_label = null;
    var item_list = null;

    // Find the corresponding lists and container controls
    if (data_type == ANIME_DATA_TYPE) {
        item_list = ANIME_LIST;
        item_container = anime_container;
        no_item_label = no_anime_label;
    }
    else if (data_type == MANGA_DATA_TYPE) {
        item_list = MANGA_LIST;
        item_container = manga_container;
        no_item_label = no_manga_label;
    }
    else if (data_type == VIDEO_DATA_TYPE) {
        item_list = VIDEO_LIST;
        item_container = video_container;
        no_item_label = no_video_label;
    }

    // Load the search results
    if (item_list != null && item_container != null && no_item_label != null) {
        let item_key_list = SearchItemsByText(item_list, item_text);

        LoadSearchResultsInContainer(item_container, no_item_label, item_list, data_type, item_key_list);
    }
}

// Find the items by the search parameters for each data type
function LoadSearchResultsForTabByIndex(search_type, data_type, item_index) {
    var item_container = null;
    var no_item_label = null;
    var item_list = null;

    // Find the corresponding lists and container controls
    if (data_type == ANIME_DATA_TYPE) {
        item_list = ANIME_LIST;
        item_container = anime_container;
        no_item_label = no_anime_label;
    }
    else if (data_type == MANGA_DATA_TYPE) {
        item_list = MANGA_LIST;
        item_container = manga_container;
        no_item_label = no_manga_label;
    }
    else if (data_type == VIDEO_DATA_TYPE) {
        item_list = VIDEO_LIST;
        item_container = video_container;
        no_item_label = no_video_label;
    }

    // Load the search results
    if (item_list != null && item_container != null && no_item_label != null) {
        let item_key_list = SearchItemsByIndex(search_type, data_type, item_list, item_index);

        LoadSearchResultsInContainer(item_container, no_item_label, item_list, data_type, item_key_list);
    }
}

// Find the items by the search parameters for each data type
function LoadSearchResultsInContainer(item_container, no_item_label, item_list, data_type, item_key_list) {

    // Display the labels for no items
    if (item_key_list.length == 0) {
        no_item_label.style.display = 'block';

        return;
    }

    // Set up the active tab
    if (active_search_tab_index == NONE_TAB_INDEX) {
        if (data_type == VIDEO_DATA_TYPE) {
            active_search_tab_index = VIDEO_TAB_INDEX;
        }
        else if (data_type == ANIME_DATA_TYPE) {
            active_search_tab_index = ANIME_TAB_INDEX;
        }
        else if (data_type == MANGA_DATA_TYPE) {
            active_search_tab_index = MANGA_TAB_INDEX;
        }
    }

    // Display the containers for the lists
    item_container.style.display = 'block';

    // Create a card control for each found item
    for (var i = 0; i < item_key_list.length; i++) {
        let item_index = item_key_list[i];
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

        // End the loop, the item has no attributes
        if (item_value == null) {
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

// Raise an event to display the detail
function ViewDetails(data_type, item_index) {
    window.top.postMessage({ 'function': 'ViewDetail', 'parameters': data_type + '|' + item_index }, '*');
}

// Display the tab control
function SelectTab(selected_tab_index) {

    // If no tab is selected, default to the tab to video
    if (selected_tab_index == NONE_TAB_INDEX) {
        selected_tab_index = VIDEO_TAB_INDEX;
    }

    // Hide all tabs by default
    let tab_content_list = document.getElementsByClassName('tab-content');
    for (i = 0; i < tab_content_list.length; i++) {
        tab_content_list[i].style.display = 'none';
    }

    // Hide all tabs by default
    let tab_link_list = document.getElementsByClassName('tab-link');
    for (i = 0; i < tab_link_list.length; i++) {
        tab_link_list[i].classList.remove('active');
    }

    // Find the active tab control
    let tab_content = null;
    let tab_link = null;
    if (selected_tab_index == ANIME_TAB_INDEX) {
        tab_content = document.getElementById('anime_tab');
        tab_link = document.getElementById('anime_tab_link');
    }
    else if (selected_tab_index == MANGA_TAB_INDEX) {
        tab_content = document.getElementById('manga_tab');
        tab_link = document.getElementById('manga_tab_link');
    }
    else if (selected_tab_index == VIDEO_TAB_INDEX) {
        tab_content = document.getElementById('video_tab');
        tab_link = document.getElementById('video_tab_link');
    }

    // Display the active tab
    if (tab_content != null) {
        tab_content.style.display = 'block';
    }
    if (tab_link != null) {
        tab_link.classList.add('active');
    }
}
