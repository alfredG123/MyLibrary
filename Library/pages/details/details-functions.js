$(document).ready(function () {
    LoadDetails();
});

function LoadDetails() {
    let parameters = new URL(window.location).searchParams;
    let data_type = parseInt(parameters.get('DataType'));
    let index = parseInt(parameters.get('ItemIndex'));

    let image = document.getElementById('detail_image');
    image.src = GetImagePath(data_type, index);

    let title_label = document.getElementById('detail_title');
    title_label.innerText = GetTitle(data_type, index);

    SetupOtherTitle(data_type, index);
    SetupSerie(data_type, index);
    SetupCompany(data_type, index);
    SetupAuthor(data_type, index);
    SetupActors(data_type, index);
    SetupCode(data_type, index);
    SetupTags(data_type, index);
    SetupLinks(data_type, index);
}

function GetImagePath(data_type, index) {
    let image_path = '';

    if (data_type == anime_data_type) {
        image_path = anime_list.get(index).image;
    }
    else if (data_type == manga_data_type) {
        image_path = manga_list.get(index).image;
    }
    else if (data_type == video_data_type) {
        image_path = video_list.get(index).image;
    }

    if (image_path != '') {
        image_path = image_folder_path + image_path;
    }

    return image_path;
}

function GetTitle(data_type, index) {
    let title;

    if (data_type == anime_data_type) {
        title = anime_list.get(index).title;
    }
    else if (data_type == manga_data_type) {
        title = manga_list.get(index).title;
    }
    else if (data_type == video_data_type) {
        title = video_list.get(index).title;
    }

    return title;
}

function SetupOtherTitle(data_type, index) {
    let detail_other_title_container = document.getElementById('detail_other_title_container');

    let other_title_display_list;
    if (data_type == anime_data_type) {
        other_title_display_list = anime_list.get(index).otherTitles;
    }
    else if (data_type == manga_data_type) {
        other_title_display_list = manga_list.get(index).otherTitles;
    }
    else if (data_type == video_data_type) {
        other_title_display_list = video_list.get(index).otherTitles;
    }

    detail_other_title_container.style.display = 'flex';
    if (other_title_display_list.length == 0) {
        detail_other_title_container.style.display = 'none';

        return;
    }

    let other_title_list_control = document.getElementById('detail_other_title_list');
    for (var i = 0; i < other_title_display_list.length; i++) {
        let other_title_text = document.createElement('div');
        other_title_text.innerText = other_title_display_list[i];
        other_title_text.classList.add('other-title-text');
        other_title_list_control.append(other_title_text);
    }
}

function SetupSerie(data_type, index) {
    let detail_serie_container = document.getElementById('detail_serie_container');
    let serie_text;
    let search_type;

    if (data_type == anime_data_type) {
        serie_text = anime_list.get(index).serie;
        search_type = search_by_anime_serie;
    }
    else if (data_type == manga_data_type) {
        serie_text = manga_list.get(index).serie;
        search_type = search_by_manga_serie;
    }
    else if (data_type == video_data_type) {
        serie_text = video_list.get(index).serie;
        search_type = search_by_video_serie;
    }

    detail_serie_container.style.display = 'flex';
    if (serie_text == '') {
        detail_serie_container.style.display = 'none';

        return;
    }

    let serie_button = document.getElementById('detail_serie');
    serie_button.innerText = serie_text;
    serie_button.setAttribute('onclick', 'FindItemsForDetailTag(' + search_type + ',"' + serie_text + '");');
}

function SetupCompany(data_type, index) {
    let detail_company_container = document.getElementById('detail_company_container');
    let company_name = '';
    let search_type;

    detail_company_container.style.display = 'flex';
    if (data_type == anime_data_type) {
        company_name = anime_list.get(index).company;
        search_type = search_by_anime_company;
    }
    else if (data_type == video_data_type) {
        company_name = video_list.get(index).company;
        search_type = search_by_video_company;
    }
    else {
        detail_company_container.style.display = 'none';

        return;
    }

    if (company_name == '') {
        detail_company_container.style.display = 'none';

        return;
    }

    let company_button = document.getElementById('detail_company');
    company_button.innerText = company_name;
    company_button.setAttribute('onclick', 'FindItemsForDetailTag(' + search_type + ',"' + company_name + '");');
}

function SetupAuthor(data_type, index) {
    let detail_author_container = document.getElementById('detail_author_container');

    detail_author_container.style.display = 'flex';
    if (data_type != manga_data_type) {
        detail_author_container.style.display = 'none';

        return;
    }

    let author_name = manga_list.get(index).author;
    let author_button = document.getElementById('detail_author');
    author_button.innerText = author_name;
    author_button.setAttribute('onclick', 'FindItemsForDetailTag(' + search_by_author + ',"' + author_name + '");');
}

function SetupActors(data_type, index) {
    let detail_actor_list_container = document.getElementById('detail_actor_list_container');

    detail_actor_list_container.style.display = 'flex';
    if (data_type != video_data_type) {
        detail_actor_list_container.style.display = 'none';

        return;
    }

    let actor_display_list = video_list.get(index).actors;
    let actor_list_control = document.getElementById('detail_actor_list');

    for (var i = 0; i < actor_display_list.length; i++) {
        let actor_button = document.createElement('div');
        actor_button.innerText = actor_display_list[i];
        actor_button.classList.add('col-sm-2');
        actor_button.classList.add('tag-container');
        actor_button.setAttribute('onclick', 'FindItemsForDetailTag(' + search_by_actor + ',"' + actor_display_list[i] + '");');
        actor_list_control.append(actor_button);
    }
}

function SetupCode(data_type, index) {
    let detail_code_container = document.getElementById('detail_code_container');

    detail_code_container.style.display = 'flex';
    if (data_type != video_data_type) {
        detail_code_container.style.display = 'none';

        return;
    }

    let code = video_list.get(index).code;
    let code_label = document.getElementById('detail_code');
    code_label.innerText = code;
}

function SetupTags(data_type, index) {
    let tag_display_list;
    let tag_list_control = document.getElementById('detail_tag_list');

    if (data_type == anime_data_type) {
        tag_display_list = anime_list.get(index).tags;
    }
    else if (data_type == manga_data_type) {
        tag_display_list = manga_list.get(index).tags;
    }
    else if (data_type == video_data_type) {
        tag_display_list = video_list.get(index).tags;
    }

    for (var i = 0; i < tag_display_list.length; i++) {
        let tag_button = document.createElement('div');
        tag_button.innerText = tag_display_list[i];
        tag_button.classList.add('col-sm-2');
        tag_button.classList.add('tag-container');
        tag_button.setAttribute('onclick', 'FindItemsForDetailTag(' + search_by_tag + ',"' + tag_display_list[i] + '");');
        tag_list_control.append(tag_button);
    }
}

function SetupLinks(data_type, index) {
    let link_display_list;
    let link_list_control = document.getElementById('detail_link_list');

    if (data_type == anime_data_type) {
        link_display_list = anime_list.get(index).links;
    }
    else if (data_type == manga_data_type) {
        link_display_list = manga_list.get(index).links;
    }
    else if (data_type == video_data_type) {
        link_display_list = video_list.get(index).links;
    }

    for (var i = 0; i < link_display_list.length; i++) {
        let link_button = document.createElement('div');
        link_button.innerText = link_display_list[i];
        link_button.classList.add('link-container');
        link_button.setAttribute('onclick', 'CopyLinkToClipboard("' + link_display_list[i] + '");');
        link_list_control.append(link_button);
    }
}

function FindItemsForDetailTag(search_type, item_text) {
    let search_href = 'Search.html?SearchType=' + search_type + '&ItemText=' + item_text + '';

    window.top.postMessage({ 'function': 'ChangePage', 'parameters': search_href }, '*');
}

function CopyLinkToClipboard(link_text) {
    navigator.clipboard.writeText(link_text);

    alert('The link is copied to the clipboard!');
}