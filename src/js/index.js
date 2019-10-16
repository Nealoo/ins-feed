// test script 

// var my_awesome_script = document.createElement('script');

// my_awesome_script.setAttribute('src', 'https://nealoo.github.io/ins-feed/public/js/bundle.js');

// document.head.appendChild(my_awesome_script);



import $ from 'jquery';
import '../scss/index.scss';

// dummy data
import storyGroupDataFactory from './data/store-group-data.js';
// bind functions
import initFeedFunction from './init-feed-function.js'

import mainHtml from '../template/index.handlebars';

const initMRMobileFeed = (selector = 'body', position = 'top') => {
    if(window.innerWidth > 768){
        return false;
    }

    let path = 'https://nealoo.github.io/ins-feed';

    if(location.host.includes('localhost')){
        path = 'http://localhost:3000';
    }

    if (position === 'top') {
        $(selector).prepend(mainHtml(storyGroupDataFactory(path)));
    } else {
        $(selector).append(mainHtml(storyGroupDataFactory(path)));
    }

    const feedFunction = new initFeedFunction();

    feedFunction.init();
};

// initMRMobileFeed(selector, position);