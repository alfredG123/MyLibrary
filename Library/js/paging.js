// Paging
var current_page_number = 1;
var total_page_number = 0;

// Create page items and add them to the paging control
function BuildPaging(item_list, item_paging_nav_id, paging_item_template, next_button, paging_bar) {

    if (!HideOrDisplayPagingControl(item_list, item_paging_nav_id))
        return;

    // Determine the total number of pages
    total_page_number = Math.ceil(item_list.length / ITEM_NUMBER_PER_PAGE);

    // Create a list item for each page
    for (let i = 1; i <= total_page_number; i++) {

        // Create the page item
        let paging_item = paging_item_template.content.cloneNode(true).children[0];
        let paging_item_link = paging_item.querySelector('[paging-item]');

        // Set up the page item
        paging_item.setAttribute('id', 'page_item_' + i);
        paging_item.setAttribute('onclick', 'ChangePage(' + i + ')');
        paging_item_link.innerHTML = i;

        // Insert the page item before the next button
        paging_bar.insertBefore(paging_item, next_button);
    }
}

function HideOrDisplayPagingControl(item_list, item_paging_nav_id) {
    let item_paging_nav = document.getElementById(item_paging_nav_id);

    // Hide the paging by default
    item_paging_nav.style.display = 'none';

    // If there are pages, return
    if (item_list.length == 0)
        return false;

    // Display the paging control
    item_paging_nav.style.display = 'block';

    return true;
}

// Change to the specified page
function ChangePage(page_number) {

    // If the page is the same, return
    if (current_page_number == page_number)
        return;

    current_page_number = page_number;

    LoadPageData(current_page_number);
}

// Change to previous page
function ChangeToPreviousPage() {
    current_page_number--;

    LoadPageData(current_page_number);
}

// Change to next page
function ChangeToNextPage() {
    current_page_number++;

    LoadPageData(current_page_number);
}

function UpdatePagingUI(previous_button, next_button) {

    // Set up the previous buttons
    previous_button.classList.remove(DISABLED_CLASS);
    if (current_page_number == 1) {
        previous_button.classList.add(DISABLED_CLASS);
    }

    // Set up the next button
    next_button.classList.remove(DISABLED_CLASS);
    if (current_page_number == total_page_number) {
        next_button.classList.add(DISABLED_CLASS);
    }

    // Set up the page items
    for (let i = 1; i <= total_page_number; i++) {
        let page_item_id = 'page_item_' + i;
        let paging_item = document.getElementById(page_item_id);

        if (i == current_page_number) {
            paging_item.classList.add(ACTIVE_CLASS);
        }
        else {
            paging_item.classList.remove(ACTIVE_CLASS);
        }
    }
}