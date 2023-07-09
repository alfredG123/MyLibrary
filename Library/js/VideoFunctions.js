$(document).ready(function () {
    LoadTableData();
});

function LoadTableData() {
    let video_table = document.getElementById('video_table');

    for (var i = 1; i <= video_list.size; i++) {
        let video_item = video_list.get(i);
        let row = video_table.insertRow();
        let image_cell = row.insertCell(0);
        let title_cell = row.insertCell(1);
        let button_cell = row.insertCell(2);

        let image = document.createElement('img');
        image.src = image_folder_path + video_item.image;
        image_cell.appendChild(image);

        title_cell.innerHTML = video_item.title;

        let view_button = document.createElement('button');
        view_button.innerText = 'View';
        view_button.setAttribute('type', 'button');
        view_button.setAttribute('onclick', 'ViewDetails(' + i + ')');
        button_cell.appendChild(view_button);
    }
}

function ViewDetails(index) {
    let detail_href = 'Details.html?Type=' + video_page_type + '&Index=' + index;

    window.top.postMessage({ 'function': 'ChangePage', 'parameters': detail_href }, '*');
}