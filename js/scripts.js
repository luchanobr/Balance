$(document).ready(function(){
     $('.owl-carousel').owlCarousel({
        center: false,
        items:3,
        loop:true,
        margin: 20,
        nav:true,
        responsive:{
            0:{
                items:1,
            },
            576:{
                items:2,
                nav: true
            },
            1000:{
                items:3,
                nav: true,
            }
        }
    });
  });