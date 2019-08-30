// test script 

// var my_awesome_script = document.createElement('script');

// my_awesome_script.setAttribute('src','https://nealoo.github.io/ins-feed/index.js');

// document.head.appendChild(my_awesome_script);



import $ from 'jquery';
import '../scss/index.scss';

// dummy data
import storyGroupData from './data/store-group-data.js';

import mainHtml from '../template/index.handlebars';

(function(){
    if(window.innerWidth > 768){
        return false;
    }
    
    $('body').prepend(mainHtml(storyGroupData));
})();