var index_anime_tab_link;
var index_home_tab_link;
var index_main_content_iframe;
var index_manga_tab_link;
var index_nav_div;
var index_search_input;
var index_tags_tab_link;
var index_video_tab_link;

$(document).ready(function () {
    index_anime_tab_link = document.getElementById('index_anime_tab_link');
    index_home_tab_link = document.getElementById('index_home_tab_link');
    index_main_content_iframe = document.getElementById('index_main_content_iframe');
    index_manga_tab_link = document.getElementById('index_manga_tab_link');
    index_nav_div = document.getElementById('index_nav_div');
    index_search_input = document.getElementById('index_search_input');
    index_tags_tab_link = document.getElementById('index_tags_tab_link');
    index_video_tab_link = document.getElementById('index_video_tab_link');
});

// Listen to the iframe
window.onmessage = function (e) {

    // If the iframe request for changing page, do it
    if (e.data.function == 'ViewDetail') {
        let parameters = e.data.parameters.split('|');
        let data_type = parameters[0];
        let item_index = parameters[1];

        ChangePageToDetails(data_type, item_index);
    }

    // If the iframe request for searching items, do it
    else if (e.data.function == 'SearchItemsByText') {
        let parameters = e.data.parameters.split('|');
        let item_text = parameters[1];

        ChangePageToSearchByText(item_text);
    }

    // If the iframe request for searching items, do it
    else if (e.data.function == 'SearchItemsByIndex') {
        let parameters = e.data.parameters.split('|');
        let search_type = parameters[0];
        let item_index = parameters[1];

        ChangePageToSearchByIndex(search_type, item_index);
    }

    // If the iframe request for alert message, do it
    else if (e.data.function == 'RaiseMessage') {
        alert(e.data.parameters);
    }
};

// Change page to the detail page to show information about the specified item
function ChangePageToDetails(data_type, item_index) {

    // Set up the link for the search page
    let search_href = 'pages/details/details.html?DataType=' + data_type + '&ItemIndex=' + item_index + '';

    // Change the page to perform the search
    ChangePage(search_href, null);
}

// Change page to the search page and search items by index
function ChangePageToSearchByIndex(search_type, item_index) {

    // Set up the link for the search page
    let search_href = 'pages/search/search.html?SearchBy=Index&SearchType=' + search_type + '&ItemIndex=' + item_index;

    // Change the page to perform the search
    ChangePage(search_href, null);
}

// Search through the libray by the specified text
function SearchTitle() {

    // Get the input text
    let search_text = index_search_input.value;

    // Clear the search text
    index_search_input.value = '';

    // Start the search
    ChangePageToSearchByText(search_text);
}

// Change page to the search page and search items by text
function ChangePageToSearchByText(item_text) {

    // Set up the link for the search page
    let search_href = 'pages/search/search.html?SearchBy=Text&ItemText=' + item_text;

    // Change the page to perform the search
    ChangePage(search_href, null);
}

// Change the page in the frame to anime
function ChangeToAnime() {
    let page_href = 'pages/anime/anime.html';

    // Update the display
    ChangePage(page_href, index_anime_tab_link);
}

// Change the page in the frame to home
function ChangeToHome() {
    let page_href = 'pages/home/home.html';

    // Update the display
    ChangePage(page_href, index_home_tab_link);
}

// Change the page in the frame to manga
function ChangeToManga() {
    let page_href = 'pages/manga/manga.html';

    // Update the display
    ChangePage(page_href, index_manga_tab_link);
}

// Change the page in the frame to tags
function ChangeToTags() {
    let page_href = 'pages/tags/tags.html';

    // Update the display
    ChangePage(page_href, index_tags_tab_link);
}

// Change the page in the frame to video
function ChangeToVideo() {
    let page_href = 'pages/video/video.html';

    // Update the display
    ChangePage(page_href, index_video_tab_link);
}

// Change the page in the frame to the specified page
function ChangePage(page_href, tab_link) {
    index_main_content_iframe.src = page_href;

    // Update the display
    ChangeActiveLink(tab_link);
}

// Set up the active style for the selected link
function ChangeActiveLink(active_link) {

    // Deactivate all links by default
    index_anime_tab_link.classList.remove(ACTIVE_CLASS);
    index_home_tab_link.classList.remove(ACTIVE_CLASS);
    index_manga_tab_link.classList.remove(ACTIVE_CLASS);
    index_tags_tab_link.classList.remove(ACTIVE_CLASS);
    index_video_tab_link.classList.remove(ACTIVE_CLASS);

    // Activate the specified link, if one is specified
    if (active_link != null) {
        active_link.classList.add(ACTIVE_CLASS);
    }
}