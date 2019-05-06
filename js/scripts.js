$(document).ready(function(){

        $('.owl-carousel').owlCarousel({
            center: false,
            items:5,
            loop:true,
            margin: 20,
            nav:true,
            autoplay:true,
            autoplayTimeout:2000,
            autoplayHoverPause:true,
            responsive:{
                0:{
                    items:1,
                },
                576:{
                    items:2,
                    nav: true
                },
                1000:{
                    items:4,
                    nav: true,
                }
            }
        });

        $('a[href*="#"]').on('click', function(e) {
            e.preventDefault()
          
            $('html, body').animate(
              {
                scrollTop: $($(this).attr('href')).offset().top,
              },
              500,
              'linear'
            )
          })
       
        $("#blogButton").on("mouseover", function (){
            $("#arrow").addClass("arrow-blog");
        } )
        
        $("#blogButton").on("mouseleave", function (){
            $("#arrow").removeClass("arrow-blog");
        } )

        var data = {
   
            labels: ['Lun', 'Mar', 'Mier', 'Jue', 'Vie'],
          
            series: [
              [750, 220, 450, 1223, 980]
            ]
          };
         
          var opciones ={
            width: 300,
            height: 200
          };

          new Chartist.Line('.ct-chart', data, opciones);
        
        

});


