var active_search_tab_index = none_tab_index;

$(document).ready(function () {
    const item_card_template = document.getElementById('item_card_template');
    const no_anime_label = document.getElementById('no_anime_label');
    const no_manga_label = document.getElementById('no_manga_label');
    const no_video_label = document.getElementById('no_video_label');
    const anime_container = document.getElementById('anime_container');
    const manga_container = document.getElementById('manga_container');
    const video_container = document.getElementById('video_container');

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
    let search_type = parseInt(search_parameters.get('SearchType'));
    let item_text = search_parameters.get('ItemText');

    // Find the items by the search parameters for each data type
    LoadSearchResultsForTab(search_type, video_data_type, item_text);
    LoadSearchResultsForTab(search_type, anime_data_type, item_text);
    LoadSearchResultsForTab(search_type, manga_data_type, item_text);
}

// Find the items by the search parameters for each data type
function LoadSearchResultsForTab(search_type, data_type, item_text) {
    var item_container = null;
    var no_item_label = null;
    var item_list = null;

    // Find the corresponding lists and container controls
    if (data_type == anime_data_type) {
        item_list = anime_list;
        item_container = anime_container;
        no_item_label = no_anime_label;
    }
    else if (data_type == manga_data_type) {
        item_list = manga_list;
        item_container = manga_container;
        no_item_label = no_manga_label;
    }
    else if (data_type == video_data_type) {
        item_list = video_list;
        item_container = video_container;
        no_item_label = no_video_label;
    }

    // Load the search results
    if (item_list != null && item_container != null && no_item_label != null) {
        LoadSearchResultsInContainer(search_type, item_container, no_item_label, item_list, data_type, item_text);
    }
}

// Find the items by the search parameters for each data type
function LoadSearchResultsInContainer(search_type, item_container, no_item_label, item_list, data_type, item_text) {
    var item_key_list = SearchItemsByText(search_type, item_list, item_text);

    // Display the labels for no items
    if (item_key_list.length == 0) {
        no_item_label.style.display = 'block';

        return;
    }

    // Set up the active tab
    if (active_search_tab_index == none_tab_index) {
        if (data_type == video_data_type) {
            active_search_tab_index = video_tab_index;
        }
        else if (data_type == anime_data_type) {
            active_search_tab_index = anime_tab_index;
        }
        else if (data_type == manga_data_type) {
            active_search_tab_index = manga_tab_index;
        }
    }

    // Display the containers for the lists
    item_container.style.display = 'block';

    // Create a card control for each found item
    for (var i = 0; i < item_key_list.length; i++) {
        let item_index = item_key_list[i];
        let list_item = item_list.get(item_index);
        let item_card = item_card_template.content.cloneNode(true).children[0];
        let item_image = item_card.querySelector('[item-image]');
        let item_title = item_card.querySelector('[item-title]');

        // Set up the image control
        item_image.src = image_folder_path + list_item.image;
        item_image.setAttribute('onclick', 'ViewDetails(' + data_type + ',' + item_index + ')');

        // Set up the image caption
        item_title.innerHTML = list_item.title;

        // Add the card control to the container
        item_container.appendChild(item_card);
    }
}

// Find items that match requirements
function SearchItemsByText(search_type, item_list, item_text) {
    let item_key_list = [];

    // If the search text is not specified, return
    if (item_text == null || item_text == '')
        return item_key_list;

    // If the items match texts, store it
    for (var [key, value] of item_list.entries()) {
        let item_value = null;

        // Find the value to search
        switch (search_type) {
            case search_by_actor:
                item_value = value.actors;
                break;
            case search_by_anime_company:
            case search_by_video_company:
                item_value = value.company;
                break;
            case search_by_anime_serie:
            case search_by_manga_serie:
            case search_by_video_serie:
                item_value = value.serie;
                break;
            case search_by_author:
                item_value = value.author;
                break;
            case search_by_title:
                item_value = value.title;
                break;
            case search_by_tag:
                item_value = value.tags;
                break;
        }

        // End the loop, the item has no attributes
        if (item_value == null) {
            break;
        }

        // If the item has the text that match the search texts
        if (CheckIfValueMatches(item_value, item_text)) {
            item_key_list.push(key);
        }

        // For title, search the other titles, if the title does not match
        else if (search_type == search_by_title) {
            if (CheckIfValueMatches(value.otherTitles, item_text)) {
                item_key_list.push(key);
            }
        }
    }

    return item_key_list;
}

// Check if the value is match the text
function CheckIfValueMatches(item_value, item_text) {
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
    let detail_href = 'Details.html?DataType=' + data_type + '&ItemIndex=' + item_index;

    window.top.postMessage({ 'function': 'ChangePage', 'parameters': detail_href }, '*');
}

// Display the tab control
function SelectTab(selected_tab_index) {

    // If no tab is selected, default to the tab to video
    if (selected_tab_index == none_tab_index) {
        selected_tab_index = video_tab_index;
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
    if (selected_tab_index == anime_tab_index) {
        tab_content = document.getElementById('anime_tab');
        tab_link = document.getElementById('anime_tab_link');
    }
    else if (selected_tab_index == manga_tab_index) {
        tab_content = document.getElementById('manga_tab');
        tab_link = document.getElementById('manga_tab_link');
    }
    else if (selected_tab_index == video_tab_index) {
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
