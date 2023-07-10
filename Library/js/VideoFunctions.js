$(document).ready(function () {
    const video_card_template = document.getElementById('video_card_template');

    LoadTableData();
});

function LoadTableData() {
    let video_container = document.getElementById('video_container');

    for (var i = 1; i <= video_list.size; i++) {
        let video_item = video_list.get(i);
        let video_card = video_card_template.content.cloneNode(true).children[0];

        let video_image = video_card.querySelector('[video-image]');
        let video_title = video_card.querySelector('[video-title]');

        video_image.src = image_folder_path + video_item.image;
        video_title.innerHTML = video_item.title;

        video_image.setAttribute('onclick', 'ViewDetails(' + i + ')');

        video_container.appendChild(video_card);
    }
}

function ViewDetails(index) {
    let detail_href = 'Details.html?Type=' + video_page_type + '&Index=' + index;

    window.top.postMessage({ 'function': 'ChangePage', 'parameters': detail_href }, '*');
}