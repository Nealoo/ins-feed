import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import Player from '@vimeo/player';
import { throws } from 'assert';
class initFeedFunction {
    constructor(){
        //TODO
        this.vimeoVids = {};
        this.swiperProgress = {};
        this.youtubePlaying = null;
        this.vimeoPlaying = null;
    }

    init() {

        this.bindThumbnailEvent();
        this.bindStoryCloseEvent();
        this.initVimeo();
        // this.bindSwipeCloseEvent();
        // this.initSwiper();
    }

    initVimeo(){
        const selector = '.insf__story-content-vimeo';
        const options = {
            controls: false
        }
        $(selector).each((index, ele) => {
            const elementId = $(ele).attr('id');
            this.vimeoVids[elementId] = new Player(elementId, options);
        });
    }

    initSwiper(){

        if($('.insf__story-content-container').hasClass('insf__inited')){
            return false;
        }

        const outerSwiper = new Swiper('.insf__story-content-container', {
            // effect: 'cube',
            // pagination: {
            //     el: '.swiper-pagination',
            //     type: 'progressbar',
            // },
            on: {
                slidePrevTransitionStart: () => {
                    this.swipeEventHandler('outer', 'prev');
                },
                slideNextTransitionStart: () => {
                    this.swipeEventHandler('outer', 'next');
                }
            },
        });

        const innerSwiper = new Swiper('.insf__story-content', {
            nested: true,
            // nested: true,
            // direction: 'vertical',
            // pagination: {
            //   el: '.swiper-pagination',
            //   type: 'progressbar',
            // },
            // navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            // },
            on: {
                slidePrevTransitionStart: () => {
                    this.swipeEventHandler('inner', 'prev');
                },
                slideNextTransitionStart: () => {
                    this.swipeEventHandler('inner', 'next');
                }
            },
          });

        // console.log(innerSwiper, outerSwiper);

        const self = this;

        let yPosition = 0;

        innerSwiper.forEach(swiper => {
            // console.log(swiper);
            swiper.on('touchStart', function(e){
                // console.log(e);
                // console.log('start: '+ e.changedTouches[0].screenY);
                e.changedTouches &&
                (yPosition = e.changedTouches[0].screenY);
            });
            swiper.on('touchEnd', function(e){
                // console.log('end: '+ e.changedTouches[0].screenY);

                if(e.changedTouches && (yPosition - e.changedTouches[0].screenY > 50) ){
                    // console.log('move up');
                    self.hideSliderWrapper();
                    self.pausePlayingVideos();
                }
            });
        });

        this.outerSwiper = outerSwiper;
        this.innerSwiper = innerSwiper;

          $('.insf__story-content-container').addClass('insf__inited');
    }

    setProgressBar(outerIndex, innerIndex) {
        const $outer = $(`.insf__story-content:nth-child(${ outerIndex + 1 })`);
        console.log(`.insf__story-content:nth-child(${ outerIndex })`, $outer);
        console.log($outer.find('.insf__story-content-title-progress-section'));
        $outer.find('.insf__story-content-title-progress-section').each((index, ele) => {
            if (innerIndex > index) {
                $(ele).addClass('insf__story-content-title-progress-section--viewed');
            } else {
                $(ele).removeClass('insf__story-content-title-progress-section--viewed');
            }
        });
    }

    automaticallyPlayVideos() {
        const $youtube = $('.swiper-slide-active .swiper-slide-active .insf__story-content-youtube');
        const $vimeo = $('.swiper-slide-active .swiper-slide-active .insf__story-content-vimeo')
        const containsYoutube = !!$youtube.length;
        const containsVimeo = !!$vimeo.length;

        if (containsYoutube) {
            $youtube[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
            this.youtubePlaying = $youtube[0];
        } else if (containsVimeo) {
            const vimeoId = $vimeo.attr('id');
            this.vimeoVids[vimeoId].play();
            this.vimeoPlaying = vimeoId;
        }
    }

    pausePlayingVideos() {
        if (this.youtubePlaying) {
            this.youtubePlaying.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            this.youtubePlaying = null;
        }
        if (this.vimeoPlaying) {
            this.vimeoVids[this.vimeoPlaying].pause();
            this.vimeoPlaying = null;
        }
    }

    swipeEventHandler(depth, direction) {
        const outerIndex = $('.insf__story-content.swiper-slide-active').index();
        const innerIndex = $('.swiper-slide-active .swiper-slide-active').index();

        this.pausePlayingVideos();
        this.automaticallyPlayVideos();
        this.setProgressBar(outerIndex, innerIndex);

        if (depth === 'outer') {
            $(`.insf__story-group:nth-child(${ outerIndex + 1 })`).addClass('insf__story-group--viewed');
            if (direction === 'next') {
                
            } else if (direction === 'prev') {
                
            }
        } else if (depth === 'inner') {
            if (direction === 'next') {

            } else if (direction === 'prev') {
                
            }
        }

    }

    // bindSwipeCloseEvent() {
    //     $('.js-story-content').on('swipe', function() {
    //         console.log('swipe up');
    //     });
    // }

    bindStoryCloseEvent() {

        const self = this;

        $('.js-story-close').on('click', function() {
            self.hideSliderWrapper();

            // $('.insf__story-content').removeClass('active');
        })
    }

    bindThumbnailEvent() {

        const self = this;

        $('.js-story-thumbnail').on('click', function() {
            const outerIndex = $(this).parent().index();
            $(this).parent().addClass('insf__story-group--viewed');

            self.showSliderWrapper();
            self.initSwiper();

            self.outerSwiper.slideTo(outerIndex);
            self.innerSwiper[outerIndex].slideTo(0);
            self.automaticallyPlayVideos();
            self.setProgressBar(outerIndex, 1);



            // $('.insf__story-content').removeClass('active');
            
            // $('.insf__story-content-container .swiper-wrapper .insf__story-content:eq('+thisIndex+')').addClass('active');
        });
    }

    showSliderWrapper() {
        $('.insf__story-content-container').fadeIn();//addClass('active');
        

        $('body').attr('data-original-height',$('body').scrollTop());
        $('html').attr('data-original-height',$('html').scrollTop());
        $('body').css('top', `${ 0 - ($('body').scrollTop() > 0 ? $('body').scrollTop() : $('html').scrollTop()) }px`);
        $('body').addClass('has-active-modal');
    }

    hideSliderWrapper() {
        $('.insf__story-content-container').fadeOut();//removeClass('active');
        
        $('body').removeClass('has-active-modal');
        $('body').css('top', '0px');
        $('body').scrollTop(parseInt($('body').attr('data-original-height')));
        $('html').scrollTop(parseInt($('html').attr('data-original-height')));
    }
}


// playVideo, stopVideo, pauseVideo
// $('.insf__story-content-youtube').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

export default initFeedFunction;