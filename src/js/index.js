// test script 

// var my_awesome_script = document.createElement('script');

// my_awesome_script.setAttribute('src','https://nealoo.github.io/ins-feed/public/js/bundle.js');

// document.head.appendChild(my_awesome_script);



import $ from 'jquery';
import '../scss/index.scss';

// dummy data
import storyGroupDataFactory from './data/store-group-data.js';

import mainHtml from '../template/index.handlebars';

(function(){
    if(window.innerWidth > 768){
        return false;
    }

    let path = 'https://nealoo.github.io/ins-feed';

    if(location.host.includes('localhost')){
        path = 'http://localhost:3000';
    }

    $('body').prepend(mainHtml(storyGroupDataFactory(path)));
})();