$(document).ready(function () {
    LoadDetails();
});

// Display the details of the specified item
function LoadDetails() {
    let parameters = new URL(window.location).searchParams;
    let data_type = parseInt(parameters.get('DataType'));
    let index = parseInt(parameters.get('ItemIndex'));
    let detail_item = null;

    // Get the specified item
    if (data_type == ANIME_DATA_TYPE) {
        detail_item = ANIME_LIST[index];
    }
    else if (data_type == MANGA_DATA_TYPE) {
        detail_item = MANGA_LIST[index];
    }
    else if (data_type == VIDEO_DATA_TYPE) {
        detail_item = VIDEO_LIST[index];
    }

    // If the item is not found, return
    if (detail_item == null)
        return;

    SetupDetailImage(detail_item);
    SetupDetailTitle(detail_item);
    SetupDetailAlternateTitles(detail_item);
    SetupDetailSeries(data_type, detail_item);
    SetupDetailEpisode(detail_item);
    SetupDetailCode(detail_item);
    SetupDetailAuthor(detail_item);
    SetupDetailActors(detail_item);
    SetupDetailCompanies(data_type, detail_item);
    SetupDetailTags(detail_item);
    SetupDetailLinks(detail_item);
}

// Display the image of the item
function SetupDetailImage(detail_item) {
    let detail_image = document.getElementById('detail_image');

    // Hide the image by default
    detail_image.style.display = 'none';

    // If the item has no image, return
    if (detail_item.image == null)
        return;

    // Display the image field
    detail_image.style.display = 'block';

    // Display the image
    detail_image.src = '../../' + IMAGE_FOLDER_PATH_FROM_ROOT + detail_item.image;
}

// Display the title of the item
function SetupDetailTitle(detail_item) {
    let detail_title_div = document.getElementById('detail_title_div');

    // Hide the title field by default
    detail_title_div.style.display = 'none';

    // If the item has no title, return
    if (detail_item.title == null)
        return;

    // Display the title field
    detail_title_div.style.display = 'flex';

    // Display the title
    let detail_title_label = document.getElementById('detail_title_label');
    detail_title_label.innerText = detail_item.title;
}

// Display the alternate title of the item
function SetupDetailAlternateTitles(detail_item) {
    let detail_alternate_title_list_div = document.getElementById('detail_alternate_title_list_div');

    // Hide the alternate title field by default
    detail_alternate_title_list_div.style.display = 'none';

    // If the item has no alternate titles, return
    if (detail_item.alternateTitles == null || detail_item.alternateTitles.length == 0)
        return;

    // Display the alternate titles field
    detail_alternate_title_list_div.style.display = 'flex';

    // Display the alternate titles
    CreateAlternateTitleLabels(detail_item);
}

// Create labels for alternate titles
function CreateAlternateTitleLabels(detail_item) {
    let detail_alternate_title_label_list_div = document.getElementById('detail_alternate_title_label_list_div');

    // Create a label for each alternate title
    for (var i = 0; i < detail_item.alternateTitles.length; i++) {
        let alternate_title_label = document.createElement('label');
        alternate_title_label.innerText = detail_item.alternateTitles[i];
        alternate_title_label.classList.add('readonly-text-label');
        detail_alternate_title_label_list_div.append(alternate_title_label);
    }
}

// Display the series of the item
function SetupDetailSeries(data_type, detail_item) {
    let detail_series_div = document.getElementById('detail_series_div');
    let search_type = null;
    let series_list = null;

    // Hide the series field by default
    detail_series_div.style.display = 'none';

    // If the item does not belong to any series, return
    if (detail_item.series == null)
        return;

    // Display the series field
    detail_series_div.style.display = 'flex';

    if (data_type == ANIME_DATA_TYPE) {
        search_type = SEARCH_BY_ANIME_SERIES;
        series_list = ANIME_SERIES_LIST;
    }
    else if (data_type == MANGA_DATA_TYPE) {
        search_type = SEARCH_BY_MANGA_SERIES;
        series_list = MANGA_SERIES_LIST;
    }
    else if (data_type == VIDEO_DATA_TYPE) {
        search_type = SEARCH_BY_VIDEO_SERIES;
        series_list = VIDEO_SERIES_LIST;
    }

    // Display the series
    let detail_series_label = document.getElementById('detail_series_label');
    detail_series_label.innerText = series_list[detail_item.series];
    detail_series_label.classList.add('link-text-label');
    detail_series_label.setAttribute('onclick', 'FindItemsForDetailTag(' + search_type + ',"' + detail_item.series + '");');
}

// Display the episode of the item
function SetupDetailEpisode(detail_item) {
    let detail_episode_div = document.getElementById('detail_episode_div');

    // Hide the episode field by default
    detail_episode_div.style.display = 'none';

    // If the item does not belong to any episode, return
    if (detail_item.episode == null)
        return;

    // Display the episode field
    detail_episode_div.style.display = 'flex';

    // Display the episode
    let detail_episode_label = document.getElementById('detail_episode_label');
    detail_episode_label.innerText = detail_item.episode;
}

// Display the code of the item
function SetupDetailCode(detail_item) {
    let detail_code_div = document.getElementById('detail_code_div');

    // Hide the code field by default
    detail_code_div.style.display = 'none';

    // If the item has no code, return
    if (detail_item.code == null)
        return;

    // Display the code field
    detail_code_div.style.display = 'flex';

    // Display the code
    let detail_code_label = document.getElementById('detail_code_label');
    detail_code_label.innerText = detail_item.code;
}

// Display the author of the item
function SetupDetailAuthor(detail_item) {
    let detail_author_div = document.getElementById('detail_author_div');

    // Hide the author field by default
    detail_author_div.style.display = 'none';

    // If the item has no author, return
    if (detail_item.author == null)
        return;

    // Display the author field
    detail_author_div.style.display = 'flex';

    // Display the author
    let detail_author_label = document.getElementById('detail_author_label');
    detail_author_label.innerText = AUTHOR_LIST[detail_item.author];
    detail_author_label.setAttribute('onclick', 'FindItemsForDetailTag(' + SEARCH_BY_AUTHOR + ',"' + detail_item.author + '");');
}

// Display the actors in the item
function SetupDetailActors(detail_item) {
    let detail_actor_list_div = document.getElementById('detail_actor_list_div');

    // Hide the actors field by default
    detail_actor_list_div.style.display = 'none';

    // If the item has no actors, return
    if (detail_item.actors == null || detail_item.actors.length == 0)
        return;

    // Display the actors field
    detail_actor_list_div.style.display = 'flex';

    // Display the actors
    CreateActorLabels(detail_item);
}

// Create labels for actors
function CreateActorLabels(detail_item) {
    let detail_actor_label_list_div = document.getElementById('detail_actor_label_list_div');

    // Create a label for each actor
    for (var i = 0; i < detail_item.actors.length; i++) {
        CreateLinkTextLabel(detail_actor_label_list_div, ACTOR_LIST[detail_item.actors[i]], SEARCH_BY_ACTOR, detail_item.actors[i]);
    }
}

// Display the companies in the item
function SetupDetailCompanies(data_type, detail_item) {
    let detail_company_list_div = document.getElementById('detail_company_list_div');

    // Hide the companies field by default
    detail_company_list_div.style.display = 'none';

    // If the item has no companies, return
    if (detail_item.companies == null || detail_item.companies.length == 0)
        return;

    // Display the companies field
    detail_company_list_div.style.display = 'flex';

    // Display the companies
    CreateCompanyLabels(data_type, detail_item);
}

// Create labels for companies
function CreateCompanyLabels(data_type, detail_item) {
    let detail_company_label_list_div = document.getElementById('detail_company_label_list_div');
    let search_type = null;
    let company_list = null;

    if (data_type == ANIME_DATA_TYPE) {
        search_type = SEARCH_BY_ANIME_COMPANY;
        company_list = ANIME_COMPANY_LIST;
    }
    else if (data_type == VIDEO_DATA_TYPE) {
        search_type = SEARCH_BY_VIDEO_COMPANY;
        company_list = VIDEO_COMPANY_LIST;
    }

    // Create a label for each company
    for (var i = 0; i < detail_item.companies.length; i++) {
        CreateLinkTextLabel(detail_company_label_list_div, company_list[detail_item.companies[i]], search_type, detail_item.companies[i]);
    }
}

// Display the tags in the item
function SetupDetailTags(detail_item) {
    let detail_tag_list_div = document.getElementById('detail_tag_list_div');

    // Hide the tags field by default
    detail_tag_list_div.style.display = 'none';

    // If the item has no tags, return
    if (detail_item.tags == null || detail_item.tags.length == 0)
        return;

    // Display the tags field
    detail_tag_list_div.style.display = 'flex';

    // Display the tags
    CreateTagLabels(detail_item);
}

// Create labels for tags
function CreateTagLabels(detail_item) {
    let detail_tag_label_list_div = document.getElementById('detail_tag_label_list_div');

    // Create a label for each tag
    for (var i = 0; i < detail_item.tags.length; i++) {
        CreateLinkTextLabel(detail_tag_label_list_div, TAG_LIST[detail_item.tags[i]], SEARCH_BY_TAG, detail_item.tags[i]);
    }
}

// Display the links in the item
function SetupDetailLinks(detail_item) {
    let detail_link_list_div = document.getElementById('detail_link_list_div');

    // Hide the links field by default
    detail_link_list_div.style.display = 'none';

    // If the item has no links, return
    if (detail_item.links == null || detail_item.links.length == 0)
        return;

    // Display the links field
    detail_link_list_div.style.display = 'flex';

    // Display the links
    CreateLinkLabels(detail_item);
}

// Create labels for links
function CreateLinkLabels(detail_item) {
    let detail_link_label_list_div = document.getElementById('detail_link_label_list_div');

    // Create a label for each link
    for (var i = 0; i < detail_item.links.length; i++) {
        let link_label = document.createElement('label');
        link_label.innerText = detail_item.links[i];
        link_label.classList.add('link-text-label');
        link_label.setAttribute('onclick', 'CopyLinkToClipboard("' + detail_item.links[i] + '");');
        detail_link_label_list_div.append(link_label);
    }
}

function CreateLinkTextLabel(detail_label_list_div, item_text, search_by_type, search_index) {
    let text_label = document.createElement('label');
    text_label.innerText = item_text;
    text_label.classList.add('link-text-label');
    text_label.setAttribute('onclick', 'FindItemsForDetailTag(' + search_by_type + ',"' + search_index + '");');
    detail_label_list_div.append(text_label);
}

function FindItemsForDetailTag(search_type, item_index) {
    window.top.postMessage({ 'function': 'SearchItemsByIndex', 'parameters': search_type + '|' + item_index }, '*');
}

function CopyLinkToClipboard(link_text) {
    navigator.clipboard.writeText(link_text);

    alert('The link is copied to the clipboard!');
}