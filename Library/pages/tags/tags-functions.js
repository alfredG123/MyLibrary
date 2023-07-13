$(document).ready(function () {
    LoadTags();
});

// Load tags on the page
function LoadTags() {
    LoadTagsByType(search_by_actor);
    LoadTagsByType(search_by_anime_company);
    LoadTagsByType(search_by_anime_serie);
    LoadTagsByType(search_by_author);
    LoadTagsByType(search_by_manga_serie);
    LoadTagsByType(search_by_tag);
    LoadTagsByType(search_by_video_company);
    LoadTagsByType(search_by_video_serie);
}

// Load tags on the page by the search type
function LoadTagsByType(search_type) {
    var item_list = null;
    var item_container = null;

    // Find the corresponding lists and container controls
    switch (search_type) {
        case search_by_actor:
            item_list = actor_list;
            item_container = document.getElementById('video_actors_container');
            break;
        case search_by_anime_company:
            item_list = anime_company_list;
            item_container = document.getElementById('anime_companies_container');
            break;
        case search_by_anime_serie:
            item_list = anime_serie_list;
            item_container = document.getElementById('anime_series_container');
            break;
        case search_by_author:
            item_list = author_list;
            item_container = document.getElementById('manga_authors_container');
            break;
        case search_by_manga_serie:
            item_list = manga_serie_list;
            item_container = document.getElementById('manga_series_container');
            break;
        case search_by_tag:
            item_list = tag_list;
            item_container = document.getElementById('tags_container');
            break;
        case search_by_video_company:
            item_list = video_company_list;
            item_container = document.getElementById('video_companies_container');
            break;
        case search_by_video_serie:
            item_list = video_serie_list;
            item_container = document.getElementById('video_series_container');
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
    for (var i = 0; i < item_list.length; i++) {
        let item_text = item_list[i];

        // Create a button for the tag
        let tag_control = document.createElement('div');
        tag_control.innerText = item_text;
        tag_control.classList.add('col-sm-2');
        tag_control.classList.add('tag-container');
        tag_control.setAttribute('onclick', 'FindItemsForTag(' + search_type + ',"' + item_text + '");');

        // Add the tag control to the container
        item_container.append(tag_control);
    }
}

// Raise an event to display search results
function FindItemsForTag(search_type, item_text) {
    let search_href = 'Search.html?SearchType=' + search_type + '&ItemText=' + item_text + '';

    window.top.postMessage({ 'function': 'ChangePage', 'parameters': search_href }, '*');
}
