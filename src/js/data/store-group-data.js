
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
                        link:'https://www.moustacherepublic.com/about-us/',
                        text: [
                            {
                                colour: 'aqua',
                                backgroundColour: 'black',
                                fontSize: '48px',
                                text: 'test',
                                width: '80%',
                                link: 'https://www.moustacherepublic.com/',
                                top: 'calc(10vh + 65px)'
                            }
                        ]
                    },
                    {
                        type: 'image',
                        src: path + '/src/img/story_image_group_1_2.jpg',
                        title: 'image title',
                        link:'https://www.moustacherepublic.com/about-us/',
                        text: [
                            {
                                colour: 'white',
                                backgroundColour: 'red',
                                fontSize: '48px',
                                text: 'test',
                                width: '40%',
                                link: 'https://www.moustacherepublic.com/',
                                top: 'calc(40vh + 65px)'
                            }
                        ]
                    },
                    {
                        type: 'image',
                        src: path + '/src/img/story_image_group_1_3.jpg',
                        title: 'image title',
                        link:'https://www.moustacherepublic.com/about-us/',
                        text: [
                            {
                                colour: 'white',
                                backgroundColour: 'black',
                                fontSize: '48px',
                                text: 'test',
                                link: 'https://www.moustacherepublic.com/',
                                top: 'calc(70vh + 65px)'
                            }
                        ]
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
                        link:'https://www.moustacherepublic.com/about-us/',
                        text: [
                            {
                                colour: '#ffd4f7',
                                backgroundColour: 'rgba(0,0,0,0.7)',
                                fontSize: '80px',
                                text: 'pink text',
                                link: '',
                                position: 'middle'
                            }
                        ]
                    },
                    {
                        type: 'image',
                        src: path + '/src/img/story_image_group_2_2.jpg',
                        title: 'image title',
                        link:'https://www.moustacherepublic.com/about-us/',
                        text: [
                            {
                                colour: '#d4dcff',
                                backgroundColour: 'rgba(0,0,0,0.7)',
                                fontSize: '24px',
                                text: 'blue text',
                                link: '',
                                position: 'middle'
                            }
                        ]
                    },
                    {
                        type: 'image',
                        src: path + '/src/img/story_image_group_2_3.jpg',
                        title: 'image title',
                        link:'https://www.moustacherepublic.com/about-us/',
                        text: [
                            {
                                colour: '#fff',
                                fontSize: '48px',
                                text: 'white text no background',
                                link: '',
                                position: 'middle'
                            }
                        ]
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
