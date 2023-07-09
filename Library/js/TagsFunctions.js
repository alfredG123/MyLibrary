$(document).ready(function () {
    LoadAuthors();
    LoadActors();
    LoadTags();
});

function LoadAuthors() {
    let authors_container = document.getElementById('authors_container');

    for (var i = 0; i < author_list.length; i++) {
        let author_button = document.createElement('div');
        author_button.innerText = author_list[i];
        author_button.classList.add('col-sm-2');
        author_button.classList.add('tag-container');
        author_button.setAttribute('onclick', 'FindItemsByAuthor(' + i + ');');
        authors_container.append(author_button);
    }
}

function LoadActors() {
    let actors_container = document.getElementById('actors_container');

    for (var i = 0; i < actor_list.length; i++) {
        let actor_button = document.createElement('div');
        actor_button.innerText = actor_list[i];
        actor_button.classList.add('col-sm-2');
        actor_button.classList.add('tag-container');
        actor_button.setAttribute('onclick', 'FindItemsByActor(' + i + ');');
        actors_container.append(actor_button);
    }
}

function LoadTags() {
    let tags_container = document.getElementById('tags_container');

    for (var i = 0; i < tag_list.length; i++) {
        let tag_button = document.createElement('div');
        tag_button.innerText = tag_list[i];
        tag_button.classList.add('col-sm-2');
        tag_button.classList.add('tag-container');
        tag_button.setAttribute('onclick', 'FindItemsByTag(' + i + ');');
        tags_container.append(tag_button);
    }
}

function FindItemsByActor(actor_index) {
    let actor_text = actor_list[actor_index];
    let search_href = 'Search.html?Actor=' + actor_text;

    window.top.postMessage({ 'function': 'ChangePage', 'parameters': search_href }, '*');
}

function FindItemsByAuthor(author_index) {
    let author_text = author_list[author_index];
    let search_href = 'Search.html?Author=' + author_text;

    window.top.postMessage({ 'function': 'ChangePage', 'parameters': search_href }, '*');
}

function FindItemsByTag(tag_index) {
    let tag_text = tag_list[tag_index];
    let search_href = 'Search.html?Tag=' + tag_text;

    window.top.postMessage({ 'function': 'ChangePage', 'parameters': search_href }, '*');
}