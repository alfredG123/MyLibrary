const manga_title1 = 'manga title 1';
const manga_title2 = 'manga title 2';
const manga_title3 = 'manga title 3';
const manga_title4 = 'manga title 4';

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
