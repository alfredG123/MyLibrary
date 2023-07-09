const video_title1 = 'video title 1';
const video_title2 = 'video title 2';
const video_title3 = 'video title 3';
const video_title4 = 'video title 4';
const video_title5 = 'video title 5';
const video_title6 = 'video title 6';

const video1 = {
    'title': video_title1,
    'image': '4hmr2i7yijkl6b2gyusa4s5jfwktzbg.png',
    'actors': [actor_name1],
    'tags': [tag_text1, tag_text2],
};

const video2 = {
    'title': video_title2,
    'image': 'bmxvf8djut3co3zc2anmiztxqkrtwtd.png',
    'actors': [actor_name2, actor_name3],
    'tags': [tag_text1, tag_text2, tag_text3],
};

const video3 = {
    'title': video_title3,
    'image': 'cb9az129h0s9yrzjawsng05ivkswl6k.png',
    'actors': [actor_name1],
    'tags': [tag_text5, tag_text6],
};

const video4 = {
    'title': video_title4,
    'image': 'h8guwfomjccchkolh1f9imbalkkpon8.png',
    'actors': [actor_name4],
    'tags': [],
};

const video5 = {
    'title': video_title5,
    'image': 'rz9oh45ztuok9j3p5qsiufyavo6b7ki.png',
    'actors': [actor_name1, actor_name2, actor_name3],
    'tags': [tag_text7],
};

const video6 = {
    'title': video_title6,
    'image': 'svbsb24r4gn98gxlltz5f7o3o8rdq82.png',
    'actors': [actor_name1],
    'tags': [tag_text2, tag_text5],
};

const video_key_list = new Map();
video_key_list.set(video_title1, 1);
video_key_list.set(video_title2, 2);
video_key_list.set(video_title3, 3);
video_key_list.set(video_title4, 4);
video_key_list.set(video_title5, 5);
video_key_list.set(video_title6, 6);

const video_list = new Map();
video_list.set(1, video1);
video_list.set(2, video2);
video_list.set(3, video3);
video_list.set(4, video4);
video_list.set(5, video5);
video_list.set(6, video6);
