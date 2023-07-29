var index_anime_link;
var index_home_link;
var index_main_content_iframe;
var index_manga_link;
var index_nav_div;
var index_search_input;
var index_tags_link;
var index_video_link;

$(document).ready(function () {
    index_anime_link = document.getElementById('index_anime_link');
    index_home_link = document.getElementById('index_home_link');
    index_main_content_iframe = document.getElementById('index_main_content_iframe');
    index_manga_link = document.getElementById('index_manga_link');
    index_nav_div = document.getElementById('index_nav_div');
    index_search_input = document.getElementById('index_search_input');
    index_tags_link = document.getElementById('index_tags_link');
    index_video_link = document.getElementById('index_video_link');
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
        let search_type = parameters[0];
        let item_text = parameters[1];

        ChangePageToSearchByText(search_type, item_text);
    }

    // If the iframe request for searching items, do it
    else if (e.data.function == 'SearchItemsByIndex') {
        let parameters = e.data.parameters.split('|');
        let search_type = parameters[0];
        let item_index = parameters[1];

        ChangePageToSearchByIndex(search_type, item_index);
    }
};

// Set up the active style for the selected link
function ChangeActiveLink(active_link) {

    // Inactivate all links by default
    index_anime_link.classList.remove(ACTIVE_CLASS);
    index_home_link.classList.remove(ACTIVE_CLASS);
    index_manga_link.classList.remove(ACTIVE_CLASS);
    index_tags_link.classList.remove(ACTIVE_CLASS);
    index_video_link.classList.remove(ACTIVE_CLASS);

    // Activate the specified link, if one is specified
    if (active_link != null) {
        active_link.classList.add(ACTIVE_CLASS);
    }
}

// Change page to the detail page to show information about the specified item
function ChangePageToDetails(data_type, item_index) {

    // Set up the link for the search page
    let search_href = 'pages/details/details.html?DataType=' + data_type + '&ItemIndex=' + item_index + '';

    // Change the page to perform the search
    ChangePage(search_href);
}

// Change page to the search page and search items by index
function ChangePageToSearchByIndex(search_type, item_index) {

    // Set up the link for the search page
    let search_href = 'pages/search/search.html?SearchBy=Index&SearchType=' + search_type + '&ItemIndex=' + item_index;

    // Change the page to perform the search
    ChangePage(search_href);
}

// Change page to the search page and search items by text
function ChangePageToSearchByText(search_type, item_text) {

    // Set up the link for the search page
    let search_href = 'pages/search/search.html?SearchBy=Text&ItemText=' + item_text;

    // Change the page to perform the search
    ChangePage(search_href);
}

// Change the page in the frame to the specified page
function ChangePage(page_href) {
    index_main_content_iframe.src = page_href;

    // Update the display
    ChangeActiveLink(null);
}

// Change the page in the frame to anime
function ChangeToAnime() {
    index_main_content_iframe.src = 'pages/anime/anime.html';

    // Update the display
    ChangeActiveLink(index_anime_link);
}

// Change the page in the frame to home
function ChangeToHome() {
    index_main_content_iframe.src = 'pages/home/home.html';

    // Update the display
    ChangeActiveLink(index_home_link);
}

// Change the page in the frame to manga
function ChangeToManga() {
    index_main_content_iframe.src = 'pages/manga/manga.html';

    // Update the display
    ChangeActiveLink(index_manga_link);
}

// Change the page in the frame to tags
function ChangeToTags() {
    index_main_content_iframe.src = 'pages/tags/tags.html';

    // Update the display
    ChangeActiveLink(index_tags_link);
}

// Change the page in the frame to video
function ChangeToVideo() {
    index_main_content_iframe.src = 'pages/video/video.html';

    // Update the display
    ChangeActiveLink(index_video_link);
}

// Search through the libray by the specified text
function SearchTitle() {

    // Get the input text
    let search_text = index_search_input.value;

    // Clear the search text
    index_search_input.value = '';

    // Start the search
    ChangePageToSearchByText(SEARCH_BY_TITLE, search_text);
}