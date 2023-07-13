$(document).ready(function () {
    var iframe_main = document.getElementById('iframe_main');
    var anime_link = document.getElementById('anime_link');
    var home_link = document.getElementById('home_link');
    var manga_link = document.getElementById('manga_link');
    var tags_link = document.getElementById('tags_link');
    var video_link = document.getElementById('video_link');
})

window.onmessage = function (e) {
    if (e.data.function == 'ChangePage') {
        ChangePage(e.data.parameters);
    }
};

function ChangeToAnime() {
    iframe_main.src = 'Anime.html';

    ChangeActiveLink(anime_link);
}

function ChangeToHome() {
    iframe_main.src = 'Home.html';

    ChangeActiveLink(home_link);
}

function ChangeToManga() {
    iframe_main.src = 'Manga.html';

    ChangeActiveLink(manga_link);
}

function ChangeToTags() {
    iframe_main.src = 'Tags.html';

    ChangeActiveLink(tags_link);
}


function ChangeToVideo() {
    iframe_main.src = 'Video.html';

    ChangeActiveLink(video_link);
}

function ChangePage(page_href) {
    iframe_main.src = page_href;

    ChangeActiveLink(null);
}

function ChangeActiveLink(active_link) {
    const active_class = 'active';

    anime_link.classList.remove(active_class);
    home_link.classList.remove(active_class);
    manga_link.classList.remove(active_class);
    tags_link.classList.remove(active_class);
    video_link.classList.remove(active_class);

    if (active_link != null) {
        active_link.classList.add(active_class);
    }
}

function SearchTitle() {
    let search_box = document.getElementById('search_text_textbox');
    let search_text = search_box.value;
    let search_href = 'Search.html?SearchType=' + search_by_title + '&ItemText=' + search_text + '';

    search_box.value = '';

    ChangePage(search_href);
}