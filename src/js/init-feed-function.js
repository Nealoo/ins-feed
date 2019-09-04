import $ from 'jquery';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
class initFeedFunction {
    constructor(){
        //TODO
    }

    init() {

        this.bindThumbnailEvent();
        this.bindStoryCloseEvent();
        // this.bindSwipeCloseEvent();
        // this.initSwiper();
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

                if(e.changedTouches && (yPosition - e.changedTouches[0].screenY > 150) ){
                    // console.log('move up');
                    self.hideSliderWrapper();
                }
            });
        });

          this.outerSwiper = outerSwiper;
          this.innerSwiper = innerSwiper;

          $('.insf__story-content-container').addClass('insf__inited');
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
            const thisIndex = $(this).parent().index();

            self.showSliderWrapper();
            self.initSwiper();

            self.outerSwiper.slideTo(thisIndex);
            self.innerSwiper[thisIndex].slideTo(0);

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

export default initFeedFunction;