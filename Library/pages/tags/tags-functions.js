var tags_actors_div;
var tags_anime_companies_div;
var tags_anime_series_div;
var tags_authors_div;
var tags_manga_series_div;
var tags_tag_div;
var tags_video_companies_div;
var tags_video_series_div;

$(document).ready(function () {
    tags_actors_div = document.getElementById('tags_actors_div');
    tags_anime_companies_div = document.getElementById('tags_anime_companies_div');
    tags_anime_series_div = document.getElementById('tags_anime_series_div');
    tags_authors_div = document.getElementById('tags_authors_div');
    tags_manga_series_div = document.getElementById('tags_manga_series_div');
    tags_tag_div = document.getElementById('tags_tag_div');
    tags_video_companies_div = document.getElementById('tags_video_companies_div');
    tags_video_series_div = document.getElementById('tags_video_series_div');

    LoadTags();
});

// Raise an event to the parent page to search
function FindItemsForTag(search_type, item_index) {
    window.top.postMessage({ 'function': 'SearchItemsByIndex', 'parameters': search_type + '|' + item_index }, '*');
}

// Load tags on the page
function LoadTags() {
    LoadTagsByType(SEARCH_BY_ACTOR);
    LoadTagsByType(SEARCH_BY_ANIME_COMPANY);
    LoadTagsByType(SEARCH_BY_ANIME_SERIES);
    LoadTagsByType(SEARCH_BY_AUTHOR);
    LoadTagsByType(SEARCH_BY_MANGA_SERIES);
    LoadTagsByType(SEARCH_BY_TAG);
    LoadTagsByType(SEARCH_BY_VIDEO_COMPANY);
    LoadTagsByType(SEARCH_BY_VIDEO_SERIES);
}

// Load tags on the page by the search type
function LoadTagsByType(search_type) {
    let item_list = null;
    let item_container = null;

    // Find the corresponding lists and container controls
    switch (search_type) {
        case SEARCH_BY_ACTOR:
            item_list = ACTOR_LIST;
            item_container = tags_actors_div;
            break;
        case SEARCH_BY_ANIME_COMPANY:
            item_list = ANIME_COMPANY_LIST;
            item_container = tags_anime_companies_div;
            break;
        case SEARCH_BY_ANIME_SERIES:
            item_list = ANIME_SERIES_LIST;
            item_container = tags_anime_series_div;
            break;
        case SEARCH_BY_AUTHOR:
            item_list = AUTHOR_LIST;
            item_container = tags_authors_div;
            break;
        case SEARCH_BY_MANGA_SERIES:
            item_list = MANGA_SERIES_LIST;
            item_container = tags_manga_series_div;
            break;
        case SEARCH_BY_TAG:
            item_list = TAG_LIST;
            item_container = tags_tag_div;
            break;
        case SEARCH_BY_VIDEO_COMPANY:
            item_list = VIDEO_COMPANY_LIST;
            item_container = tags_video_companies_div;
            break;
        case SEARCH_BY_VIDEO_SERIES:
            item_list = VIDEO_SERIES_LIST;
            item_container = tags_video_series_div;
            break;
    }

    // Load tags on the page
    if (item_list != null && item_container != null) {
        LoadTagsWithList(search_type, item_list, item_container);
    }
}

// Load tags on the page by the search type
function LoadTagsWithList(search_type, item_list, item_container) {

    // Create a tag for each item
    for (let i = 0; i < item_list.length; i++) {
        let item_text = item_list[i];

        // Create a button for the tag
        let tag_control = document.createElement('div');
        tag_control.innerText = item_text;
        tag_control.classList.add('col-sm-2');
        tag_control.classList.add('tags-tag-text-div');
        tag_control.setAttribute('onclick', 'FindItemsForTag(' + search_type + ',"' + i + '");');

        // Add the tag control to the container
        item_container.append(tag_control);
    }
}