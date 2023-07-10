$(document).ready(function () {
    const item_card_template = document.getElementById('item_card_template');

    var no_anime_label = document.getElementById('no_anime_label');
    var no_manga_label = document.getElementById('no_manga_label');
    var no_video_label = document.getElementById('no_video_label');
    var anime_container = document.getElementById('anime_container');
    var manga_container = document.getElementById('manga_container');
    var video_container = document.getElementById('video_container');

    no_anime_label.style.display = 'none';
    no_manga_label.style.display = 'none';
    no_video_label.style.display = 'none';
    anime_container.style.display = 'none';
    manga_container.style.display = 'none';
    video_container.style.display = 'none';

    LoadCardData();
});

function LoadCardData() {
    let parameters = new URL(window.location).searchParams;
    let actor_text = parameters.get('Actor');
    let author_text = parameters.get('Author');
    let search_text = parameters.get('SearchText');
    let tag_text = parameters.get('Tag');
    let item_text;
    let search_type;

    if (actor_text != null) {
        item_text = actor_text;
        search_type = search_by_actor;
    }
    else if (author_text != null) {
        item_text = author_text;
        search_type = search_by_author;
    }
    else if (search_text != null) {
        item_text = search_text;
        search_type = search_by_text;
    }
    else if (tag_text != null) {
        item_text = tag_text;
        search_type = search_by_tag;
    }

    LoadCardDataInTab(search_type, anime_page_type, item_text);
    LoadCardDataInTab(search_type, manga_page_type, item_text);
    LoadCardDataInTab(search_type, video_page_type, item_text);

    let tab_content = document.getElementById('video_tab');
    SelectTab(tab_content, video_page_type);
}

function LoadCardDataInTab(search_type, page_type, item_text) {
    let item_container = null;
    let item_list = null;

    if (page_type == anime_page_type) {
        item_container = anime_container;
        item_list = anime_list;
    }
    else if (page_type == manga_page_type) {
        item_container = manga_container;
        item_list = manga_list;
    }
    else if (page_type == video_page_type) {
        item_container = video_container;
        item_list = video_list;
    }

    if (item_container != null) {
        LoadCardDataInContainer(search_type, item_container, page_type, item_list, item_text);
    }
}

function LoadCardDataInContainer(search_type, item_container, page_type, item_list, item_text) {
    let item_key_list = [];

    if (search_type == search_by_actor) {
        if (page_type == video_page_type) {
            item_key_list = FindItemsByActorText(item_list, item_text);
        }
    }
    else if (search_type == search_by_author) {
        if (page_type == manga_page_type) {
            item_key_list = FindItemsByAuthorText(item_list, item_text);
        }
    }
    else if (search_type == search_by_text) {
        item_key_list = FindItemsBySeacrhText(item_list, item_text);
    }
    else if (search_type == search_by_tag) {
        item_key_list = FindItemsByTagText(item_list, item_text);
    }

    if (item_key_list.length == 0) {
        if (page_type == anime_page_type) {
            no_anime_label.style.display = 'block';
        }
        else if (page_type == manga_page_type) {
            no_manga_label.style.display = 'block';
        }
        else if (page_type == video_page_type) {
            no_video_label.style.display = 'block';
        }

        return;
    }

    if (page_type == anime_page_type) {
        anime_container.style.display = 'block';
    }
    else if (page_type == manga_page_type) {
        manga_container.style.display = 'block';
    }
    else if (page_type == video_page_type) {
        video_container.style.display = 'block';
    }

    for (var i = 0; i < item_key_list.length; i++) {
        let item_index = item_key_list[i];
        let list_item = item_list.get(item_index);
        let item_card = item_card_template.content.cloneNode(true).children[0];
        let item_image = item_card.querySelector('[item-image]');
        let item_title = item_card.querySelector('[item-title]');

        item_image.src = image_folder_path + list_item.image;
        item_title.innerHTML = list_item.title;

        item_image.setAttribute('onclick', 'ViewDetails(' + page_type + ',' + item_index + ')');

        item_container.appendChild(item_card);
    }
}

function FindItemsByActorText(item_list, actor_name) {
    let item_key_list = [];

    if (actor_name == null || actor_name == '')
        return item_key_list;

    for (var [key, value] of item_list.entries()) {
        if (value.actors.includes(actor_name)) {
            item_key_list.push(key);
        }
    }

    return item_key_list;
}

function FindItemsByAuthorText(item_list, author_name) {
    let item_key_list = [];

    if (author_name == null || author_name == '')
        return item_key_list;

    for (var [key, value] of item_list.entries()) {
        if (value.author.includes(author_name)) {
            item_key_list.push(key);
        }
    }

    return item_key_list;
}

function FindItemsBySeacrhText(item_list, search_text) {
    let item_key_list = [];

    if (search_text == null || search_text == '')
        return item_key_list;

    for (var [key, value] of item_list.entries()) {
        if (value.title.includes(search_text)) {
            item_key_list.push(key);
        }
    }

    return item_key_list;
}

function FindItemsByTagText(item_list, tag_text) {
    let item_key_list = [];

    if (tag_text == null || tag_text == '')
        return item_key_list;

    for (var [key, value] of item_list.entries()) {
        if (value.tags.includes(tag_text)) {
            item_key_list.push(key);
        }
    }

    return item_key_list;
}

function ViewDetails(page_type, item_index) {
    let detail_href = 'Details.html?Type=' + page_type + '&Index=' + item_index;

    window.top.postMessage({ 'function': 'ChangePage', 'parameters': detail_href }, '*');
}

function SelectTab(tab_control, page_type) {
    let tab_content_list = document.getElementsByClassName('tab-content');
    for (i = 0; i < tab_content_list.length; i++) {
        tab_content_list[i].style.display = 'none';
    }

    let tab_link_list = document.getElementsByClassName('tab-link');
    for (i = 0; i < tab_link_list.length; i++) {
        tab_link_list[i].classList.remove('active');
    }

    let tab_content = null;

    if (page_type == anime_page_type) {
        tab_content = document.getElementById('anime_tab');
    }
    else if (page_type == manga_page_type) {
        tab_content = document.getElementById('manga_tab');
    }
    else if (page_type == video_page_type) {
        tab_content = document.getElementById('video_tab');
    }

    if (tab_content != null) {
        tab_content.style.display = 'block';
    }

    tab_control.classList.add('active');
}
