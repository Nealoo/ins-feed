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
        this.getSwiperProgress();
        // this.bindSwipeCloseEvent();
        // this.initSwiper();
    }

    initVimeo(){
        const selector = '.insf__story-content-vimeo';
        const options = {
            controls: false,
            title: false,
            transparent: false,
            background: true
        }
        $(selector).each((index, ele) => {
            const elementId = $(ele).attr('id');
            this.vimeoVids[elementId] = new Player(elementId, options);
            this.vimeoVids[elementId].on('ended', () => {
                this.swipeToNext();
            })
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
            // effect: 'cube',
            // grabCursor: true,
            // cubeEffect: {
            //     shadow: true,
            //     slideShadows: true,
            //     shadowOffset: 20,
            //     shadowScale: 0.94,
            // },
            allowTouchMove: false,
            on: {
                slidePrevTransitionStart: () => {
                    this.swipeEventHandler('start', 'outer', 'prev');
                },
                slidePrevTransitionEnd: () => {
                    this.swipeEventHandler('end', 'outer', 'prev');
                },
                slideNextTransitionStart: () => {
                    this.swipeEventHandler('start', 'outer', 'next');
                },
                slideNextTransitionEnd: () => {
                    this.swipeEventHandler('end', 'outer', 'next');
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
            // autoplay: {
            //     delay: 2500,
            //     disableOnInteraction: false,
            //     waitForTransition: true
            // },
            allowTouchMove: false,
            on: {
                slidePrevTransitionStart: () => {
                    this.swipeEventHandler('start', 'inner', 'prev');
                },
                slidePrevTransitionEnd: () => {
                    this.swipeEventHandler('end', 'inner', 'prev');
                },
                slideNextTransitionStart: () => {
                    this.swipeEventHandler('start', 'inner', 'next');
                },
                slideNextTransitionEnd: () => {
                    this.swipeEventHandler('end', 'inner', 'next');
                }
            },
        });

        // console.log(innerSwiper, outerSwiper);

        const self = this;

        let yPosition = 0;
        let xPosition = 0;

        innerSwiper.forEach(swiper => {
            // if (this.swiperProgress) {
            //     if (index in this.swiperProgress) {
            //         const oldIndex = this.swiperProgress[index];
            //         swiper.slideTo(oldIndex);
            //     }
            // }

            // console.log(swiper);
            swiper.on('touchStart', function(e){
                // console.log(e);
                // console.log('start: '+ e.changedTouches[0].screenY);
                e.changedTouches &&
                (yPosition = e.changedTouches[0].screenY);

                e.changedTouches &&
                (xPosition = e.changedTouches[0].pageX);
            });
            swiper.on('touchEnd', function(e){
                // console.log('end: '+ e.changedTouches[0].screenY);

                if(e.changedTouches && (yPosition - e.changedTouches[0].screenY > 100) ){
                    // console.log('move up');
                    self.hideSliderWrapper();
                }

                if(e.changedTouches && (xPosition - e.changedTouches[0].pageX > 50) ){
                    self.outerSwiper.slideNext();
                }

                if(e.changedTouches && (e.changedTouches[0].pageX - xPosition > 50) ){
                    if(self.outerTimer){
                        clearTimeout(self.outerTimer);
                    }
                    swiper.slideTo(0);
                    self.outerSwiper.slidePrev();
                }
            });
            swiper.on('reachEnd', function(e){
                const outerIndex = $('.insf__story-content.swiper-slide-active').index();
                const innerIndex = $('.swiper-slide-active .swiper-slide-active').index();
                const $storyGroup = $(`.insf__story-group:nth-child(${ outerIndex + 1 })`);
                $storyGroup.addClass('insf__story-group--viewed');
                $storyGroup.find('insf__story-content-title-progress-section')
                self.outerTimer = setTimeout(() => {
                    self.outerSwiper.slideNext();
                    swiper.slideTo(0);
                }, 3000);
            });

            const halfScreen = window.screen.width/2;
            swiper.on('click', function(e){
                if(e.changedTouches[0].pageX > halfScreen){
                    swiper.slideNext();
                }else{
                    swiper.slidePrev();
                }
            });

            // const halfScreen = window.screen.width/2;
            // swiper.on('click', function(e){
            //     if(e.changedTouches[0].pageX > halfScreen){
            //         self.outerSwiper.slideNext();
            //     }else{
            //         self.outerSwiper.slidePrev();
            //     }
            // });
        });

        this.outerSwiper = outerSwiper;
        this.innerSwiper = innerSwiper;

          $('.insf__story-content-container').addClass('insf__inited');
    }

    swipeToNext() {
        const innerIndex = $('.swiper-slide-active .swiper-slide-active').index();
        if (!this.innerSwiper[innerIndex + 1].isEnd) {
            this.innerSwiper[innerIndex + 1].slideNext();
        } else if (!this.outerSwiper.isEnd) {
            this.outerSwiper.slideNext();
        } else {
            this.hideSliderWrapper();
        }
    }

    setProgressBar(outerIndex, innerIndex) {
        console.log('setting progress bar', outerIndex, innerIndex);
        const $outer = $(`.insf__story-content:nth-child(${ outerIndex + 1 })`);
        $outer.find('.insf__story-content-title-progress-section').each((index, ele) => {
            $(ele).removeClass('insf__story-content-title-progress-section--current');
            if (innerIndex > index + 1) {
                $(ele).addClass('insf__story-content-title-progress-section--viewed');
            } else {
                $(ele).removeClass('insf__story-content-title-progress-section--viewed');
                if (innerIndex === index + 1) {
                    $(ele).addClass('insf__story-content-title-progress-section--current');
                } 
            }
        });
    }

    setSwiperProgress(outerIndex, innerIndex) {
        console.log('setting Swiper Progress', outerIndex, innerIndex);
        const $storyGroup = $(`.insf__story-group:nth-child(${ outerIndex + 1 })`);
        if (innerIndex >= +$storyGroup.attr('data-swiper-slides')) {
            $storyGroup.addClass('insf__story-group--viewed');
        }
        if (outerIndex in this.setSwiperProgress) {
            if (innerIndex - 1 > this.setSwiperProgress[outerIndex]) {
                this.swiperProgress[outerIndex] = innerIndex - 1;
            }
        } else {
            this.swiperProgress[outerIndex] = innerIndex - 1;
        }
        localStorage.setItem('mrIns_swiperProgress', JSON.stringify(this.swiperProgress));
    }

    getSwiperProgress() {
        const swiperProgress = JSON.parse(localStorage.getItem('mrIns_swiperProgress')) || {};
        this.swiperProgress = swiperProgress;
        if (swiperProgress) {
            for (const [outerIndex, slideIndex] of Object.entries(swiperProgress)) {
                const $storyGroup = $(`.insf__story-group:nth-child(${ +outerIndex + 1 })`);
                if (slideIndex + 1 >= +$storyGroup.attr('data-swiper-slides')) {
                    $storyGroup.addClass('insf__story-group--viewed');
                }
            }
        }
    }

    automaticallyPlayVideos() {
        const $youtube = $('.swiper-slide-active .swiper-slide-active .insf__story-content-youtube');
        const $vimeo = $('.swiper-slide-active .swiper-slide-active .insf__story-content-vimeo')
        const containsYoutube = !!$youtube.length;
        const containsVimeo = !!$vimeo.length;

        if (containsYoutube) {
            // we attempt to play the YouTube video twice incase it reached end of the video
            $youtube[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            $youtube[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            this.youtubePlaying = $youtube[0];
        } else if (containsVimeo) {
            const vimeoId = $vimeo.attr('id');
            $vimeo.click();
            this.vimeoVids[vimeoId].setCurrentTime(0);
            this.vimeoVids[vimeoId].play();
            this.vimeoPlaying = vimeoId;
        }
    }

    pausePlayingVideos() {
        if (this.youtubePlaying) {
            this.youtubePlaying.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
            this.youtubePlaying = null;
        }
        if (this.vimeoPlaying) {
            this.vimeoVids[this.vimeoPlaying].pause();
            this.vimeoPlaying = null;
        }
    }

    swipeEventHandler(type, depth, direction) {
        const outerIndex = $('.insf__story-content.swiper-slide-active').index();
        const innerIndex = $('.swiper-slide-active .swiper-slide-active').index();
        // const innerTotal = $('.insf__story-content-title-progress-section').length;

        // console.log(innerIndex, innerTotal);

        if (type === 'start') {
            this.pausePlayingVideos();
            this.automaticallyPlayVideos();
            this.setProgressBar(outerIndex, innerIndex);
            this.setSwiperProgress(outerIndex, innerIndex);

            // if( depth == 'inner' && innerIndex == innerTotal ){
            //     $(`.insf__story-group:nth-child(${ outerIndex })`).addClass('insf__story-group--viewed');
            // }
        } 

        if (depth === 'outer') {
            // $(`.insf__story-group:nth-child(${ outerIndex + 1 })`).addClass('insf__story-group--viewed');

            
            if (direction === 'next') {
                this.innerSwiper[outerIndex - 1].autoplay.stop();
                this.innerSwiper[outerIndex].autoplay.start();
                // this.setSwiperProgress(outerIndex - 1, )
            } else if (direction === 'prev') {
                this.innerSwiper[outerIndex + 1].autoplay.stop();
                this.innerSwiper[outerIndex].autoplay.start();
                const prevInnerIndex = $(`.insf__story-content:nth-child(${ outerIndex - 1 })`);
                // this.setSwiperProgress(outerIndex + 1, )
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
            // $(this).parent().addClass('insf__story-group--viewed');
            const $firstProgressBar = $(`.insf__story-content:nth-child(${ outerIndex + 1})`).find('.insf__story-content-title-progress-section:first-child');
            if (!$firstProgressBar.hasClass('insf__story-content-title-progress-section--viewed')) {
                $firstProgressBar.addClass('insf__story-content-title-progress-section--current');
            }

            self.setSwiperProgress(outerIndex, 1);

            self.showSliderWrapper();
            self.initSwiper();

            self.outerSwiper.slideTo(outerIndex);
            self.innerSwiper[outerIndex].autoplay.start();
            // self.innerSwiper[outerIndex + 1].slideTo(0);
            self.automaticallyPlayVideos();
            // self.setProgressBar(outerIndex, 1);

            self.innerSwiper.forEach((swiper,index) => {
                swiper.autoplay.stop();

                if( outerIndex !== index ){
                    swiper.slideTo(0);
                }
                
            });

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
        this.pausePlayingVideos();
        
        $('body').removeClass('has-active-modal');
        $('body').css('top', '0px');
        $('body').scrollTop(parseInt($('body').attr('data-original-height')));
        $('html').scrollTop(parseInt($('html').attr('data-original-height')));

        const outerIndex = $('.insf__story-content.swiper-slide-active').index();

        this.innerSwiper.forEach((swiper,index) => {
            swiper.autoplay.stop();
        });
    }
}


// playVideo, stopVideo, pauseVideo
// $('.insf__story-content-youtube').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

export default initFeedFunction;