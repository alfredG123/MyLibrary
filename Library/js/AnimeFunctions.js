$(document).ready(function () {
    LoadTableData();
});

function LoadTableData() {
    let anime_table = document.getElementById('anime_table');

    for (var i = 1; i <= anime_list.size; i++) {
        let anime_item = anime_list.get(i);
        let row = anime_table.insertRow();
        let image_cell = row.insertCell(0);
        let title_cell = row.insertCell(1);
        let button_cell = row.insertCell(2);

        let image = document.createElement('img');
        image.src = image_folder_path + anime_item.image;
        image_cell.appendChild(image);

        title_cell.innerHTML = anime_item.title;

        let view_button = document.createElement('button');
        view_button.innerText = 'View';
        view_button.setAttribute('type', 'button');
        view_button.setAttribute('onclick', 'ViewDetails(' + i + ')');
        button_cell.appendChild(view_button);
    }
}

function ViewDetails(index) {
    let detail_href = 'Details.html?Type=' + anime_page_type + '&Index=' + index;

    window.top.postMessage({ 'function': 'ChangePage', 'parameters': detail_href }, '*');
}