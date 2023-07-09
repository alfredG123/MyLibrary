const manga_title1 = 'manga title 1';
const manga_title2 = 'manga title 2';
const manga_title3 = 'manga title 3';
const manga_title4 = 'manga title 4';

const author_name1 = 'author1';
const author_name2 = 'author2';
const author_name3 = 'author3';
const author_name4 = 'author4';
const author_name5 = 'author5';
const author_name6 = 'author6';
const author_name7 = 'author7';
const author_name8 = 'author8';
const author_name9 = 'author9';
const author_name10 = 'author10';
const author_name11 = 'author11';
const author_name12 = 'author12';

const manage1 = {
    'title': manga_title1,
    'image': '37k6tkwpg0j4rp4wno3djauxmi5tcsg.png',
    'author': author_name1,
    'tags': [tag_text1, tag_text2, tag_text3],
};

const manage2 = {
    'title': manga_title2,
    'image': 'ldknqut1fuw7tyj97yvslh0iv6kmpes.png',
    'author': author_name2,
    'tags': [tag_text4],
};

const manage3 = {
    'title': manga_title3,
    'image': 'c1fedhtwjklbgoyi08sov1oe6falbet.png',
    'author': author_name3,
    'tags': [tag_text6, tag_text7],
};

const manage4 = {
    'title': manga_title4,
    'image': 'pi0ql8kvw1k3aicyqs6trby8vmbuf5p.png',
    'author': author_name4,
    'tags': [tag_text2],
};


const manga_key_list = new Map();
manga_key_list.set(manga_title1, 1);
manga_key_list.set(manga_title2, 2);
manga_key_list.set(manga_title3, 3);
manga_key_list.set(manga_title4, 4);

const manga_list = new Map();
manga_list.set(1, manage1);
manga_list.set(2, manage2);
manga_list.set(3, manage3);
manga_list.set(4, manage4);

const author_list = [];
author_list.push(author_name1);
author_list.push(author_name2);
author_list.push(author_name3);
author_list.push(author_name4);
author_list.push(author_name5);
author_list.push(author_name6);
author_list.push(author_name7);
author_list.push(author_name8);
author_list.push(author_name9);
author_list.push(author_name10);
author_list.push(author_name11);
author_list.push(author_name12);