$(document).ready(function () {
    var no_anime_label = document.getElementById('no_anime_label');
    var no_manga_label = document.getElementById('no_manga_label');
    var no_video_label = document.getElementById('no_video_label');
    var anime_table = document.getElementById('anime_table');
    var manga_table = document.getElementById('manga_table');
    var video_table = document.getElementById('video_table');

    InitializeTabs();

    LoadTableData();
});

function LoadTableData() {
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

    LoadTableDataInTab(search_type, anime_page_type, item_text);
    LoadTableDataInTab(search_type, manga_page_type, item_text);
    LoadTableDataInTab(search_type, video_page_type, item_text);

    let tab_content = document.getElementById('video_tab');
    SelectTab(tab_content, video_page_type);
}

function LoadTableDataInTab(search_type, page_type, item_text) {
    let item_table = null;
    let item_list = null;

    if (page_type == anime_page_type) {
        item_table = document.getElementById('anime_table');
        item_list = anime_list;
    }
    else if (page_type == manga_page_type) {
        item_table = document.getElementById('manga_table');
        item_list = manga_list;
    }
    else if (page_type == video_page_type) {
        item_table = document.getElementById('video_table');
        item_list = video_list;
    }

    if (item_table != null) {
        LoadTableDataInTable(search_type, item_table, page_type, item_list, item_text);
    }
}

function LoadTableDataInTable(search_type, item_table, page_type, item_list, item_text) {
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
        anime_table.style.display = 'block';
    }
    else if (page_type == manga_page_type) {
        manga_table.style.display = 'block';
    }
    else if (page_type == video_page_type) {
        video_table.style.display = 'block';
    }

    for (var i = 0; i < item_key_list.length; i++) {
        let row = item_table.insertRow();
        let image_cell = row.insertCell(0);
        let title_cell = row.insertCell(1);
        let button_cell = row.insertCell(2);
        let item_index = item_key_list[i];
        let list_item = item_list.get(item_index);

        let image = document.createElement('img');
        image.src = image_folder_path + list_item.image;
        image_cell.appendChild(image);

        title_cell.innerHTML = list_item.title;

        let view_button = document.createElement('button');
        view_button.innerText = 'View';
        view_button.setAttribute('type', 'button');
        view_button.setAttribute('onclick', 'ViewDetails(' + page_type + ',' + item_index + ')');
        button_cell.appendChild(view_button);
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

function InitializeTabs() {
    let no_anime_label = document.getElementById('no_anime_label');
    let no_manga_label = document.getElementById('no_manga_label');
    let no_video_label = document.getElementById('no_video_label');
    let anime_table = document.getElementById('anime_table');
    let manga_table = document.getElementById('manga_table');
    let video_table = document.getElementById('video_table');

    no_anime_label.style.display = 'none';
    no_manga_label.style.display = 'none';
    no_video_label.style.display = 'none';
    anime_table.style.display = 'none';
    manga_table.style.display = 'none';
    video_table.style.display = 'none';
}