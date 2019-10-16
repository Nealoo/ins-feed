
function storyGroupData(path) {
    return {
        selector: 'body',
        position: 'top',
        storyGroup:
        [
            {
                thumbnail: {
                    src: path + '/src/img/thumbnail_mr_logo_group_1.jpg',
                    title: 'mr_logo'
                },
                title: 'story group title1',
                border: {
                    gradient: false,
                    colour: '#ffd4f7'
                },
                storyList: [
                    {
                        type: 'image',
                        src: path + '/src/img/story_image_group_1_1.jpg',
                        title: 'image title',
                        link:'https://www.moustacherepublic.com/about-us/'
                    },
                    {
                        type: 'image',
                        src: path + '/src/img/story_image_group_1_2.jpg',
                        title: 'image title',
                        link:'https://www.moustacherepublic.com/about-us/'
                    },
                    {
                        type: 'image',
                        src: path + '/src/img/story_image_group_1_3.jpg',
                        title: 'image title',
                        link:'https://www.moustacherepublic.com/about-us/'
                    },
                ]
            },
            {
                thumbnail: {
                    src: path + '/src/img/thumbnail_mr_logo_group_2.jpg',
                    title: 'mr_logo'
                },
                title: 'story group title2',
                border: {
                    gradient: false,
                    colour: '#d4dcff'
                },
                storyList: [
                    {
                        type: 'image',
                        src: path + '/src/img/story_image_group_2_1.jpg',
                        title: 'image title',
                        link:'https://www.moustacherepublic.com/about-us/'
                    },
                    {
                        type: 'image',
                        src: path + '/src/img/story_image_group_2_2.jpg',
                        title: 'image title',
                        link:'https://www.moustacherepublic.com/about-us/'
                    },
                    {
                        type: 'image',
                        src: path + '/src/img/story_image_group_2_3.jpg',
                        title: 'image title',
                        link:'https://www.moustacherepublic.com/about-us/'
                    },
                ]
            },
            {
                thumbnail: {
                    src: path + '/src/img/thumbnail_mr_logo_group_3.jpg',
                    title: 'mr_logo'
                },
                title: 'story group title3',
                border: {
                    gradient: false,
                    colour: '#b9f7b3',
                    colour1: '#ffd4f7',
                    colour2: '#d4dcff'
                },
                storyList: [
                    {
                        type: 'image',
                        src: path + '/src/img/story_image_group_3_1.jpg',
                        title: 'image title',
                        link:'https://www.moustacherepublic.com/about-us/'
                    },
                    {
                        type: 'image',
                        src: path + '/src/img/story_image_group_3_2.jpg',
                        title: 'image title',
                        link:'https://www.moustacherepublic.com/about-us/'
                    },
                    {
                        type: 'image',
                        src: path + '/src/img/story_image_group_3_3.jpg',
                        title: 'image title',
                        link:'https://www.moustacherepublic.com/about-us/'
                    },
                ]
            },
            {
                thumbnail: {
                    src: path + '/src/img/thumbnail_mr_logo_group_3.jpg',
                    title: 'mr_logo'
                },
                title: 'video test',
                border: {
                    gradient: false,
                    colour: '#ffe3ce'
                },
                storyList: [
                    {
                        type: 'youtube',
                        src: 'https://www.youtube.com/embed/LjVteVUi7dg'
                    },
                    {
                        type: 'vimeo',
                        src: 'https://player.vimeo.com/video/150301800'
                    }
                ]
            }
        ]
    };
}
export default storyGroupData;
