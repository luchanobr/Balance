import { trigger, animate, transition, style, query } from '@angular/animations';

export const fadeInOut=

    trigger('fadeInOut', [
        
        transition( '* <=> *', [
          style({position: "relative"}),
           query(':enter, :leave',  [
        style({
          position: 'relative',
          top:0,
          left:0,
          width: '100%',
          
        })
      ] ,{optional: true},),
            query(':enter', 
                [
                    style({ opacity: 1})
                ],
             
            ),

            query(':leave', 
                [
                    style({ opacity: 1, position: "absolute" }),
                    animate('0.5s linear', style({ opacity: 0  }))
                ] ,{optional: true},
            ),

            query(':enter', 
                [
                    animate('0.5s linear', style({ opacity: 1 }))
                ],{optional: true},
            )

        ])

    ]);