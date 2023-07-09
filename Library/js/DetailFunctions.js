$(document).ready(function () {
    LoadDetails();
});

function LoadDetails() {
    let parameters = new URL(window.location).searchParams;
    let page_type = parseInt(parameters.get('Type'));
    let index = parseInt(parameters.get('Index'));

    let image = document.getElementById('detail_image');
    image.src = GetImagePath(page_type, index);

    let title_label = document.getElementById('detail_title');
    title_label.innerText = GetTitle(page_type, index);

    SetupAuthor(page_type, index);
    SetupActors(page_type, index);
    SetupTags(page_type, index);
}

function GetImagePath(page_type, index) {
    let image_path = '';

    if (page_type == anime_page_type) {
        image_path = anime_list.get(index).image;
    }
    else if (page_type == manga_page_type) {
        image_path = manga_list.get(index).image;
    }
    else if (page_type == video_page_type) {
        image_path = video_list.get(index).image;
    }

    if (image_path != '') {
        image_path = image_folder_path + image_path;
    }

    return image_path;
}

function GetTitle(page_type, index) {
    let title;

    if (page_type == anime_page_type) {
        title = anime_list.get(index).title;
    }
    else if (page_type == manga_page_type) {
        title = manga_list.get(index).title;
    }
    else if (page_type == video_page_type) {
        title = video_list.get(index).title;
    }

    return title;
}

function SetupAuthor(page_type, index) {
    let detail_author_column = document.getElementById('detail_author_column');

    detail_author_column.style.display = 'table-cell';
    if (page_type != manga_page_type) {
        detail_author_column.style.display = 'none';

        return;
    }

    let author_name = manga_list.get(index).author;
    let author_label = document.getElementById('detail_author');
    author_label.innerText = author_name;
}

function SetupActors(page_type, index) {
    let detail_actor_list_column = document.getElementById('detail_actor_list_column');

    detail_actor_list_column.style.display = 'table-cell';
    if (page_type != video_page_type) {
        detail_actor_list_column.style.display = 'none';

        return;
    }

    let actor_list = video_list.get(index).actors;
    let actor_list_control = document.getElementById('actor_list');

    for (var i = 0; i < actor_list.length; i++) {
        let list_item = document.createElement('li');
        list_item.innerText = actor_list[i];
        actor_list_control.append(list_item);
    }
}

function SetupTags(page_type, index) {
    let tag_list;
    let tag_list_control = document.getElementById('tag_list');

    if (page_type == anime_page_type) {
        tag_list = anime_list.get(index).tags;
    }
    else if (page_type == manga_page_type) {
        tag_list = manga_list.get(index).tags;
    }
    else if (page_type == video_page_type) {
        tag_list = video_list.get(index).tags;
    }

    for (var i = 0; i < tag_list.length; i++) {
        let list_item = document.createElement('li');
        list_item.innerText = tag_list[i];
        tag_list_control.append(list_item);
    }
}