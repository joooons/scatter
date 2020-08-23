

















//  MMMMMMMM  MM      MM  MMMMMMMM  MM    MM  MMMMMM        MM      MMMMMM    MMMM    MMMMMM  MMMMMMMM  MM    MM  MMMMMMMM  MMMMMM      MMMM    
//  MM        MM      MM  MM        MMMM  MM    MM          MM        MM    MM    MM    MM    MM        MMMM  MM  MM        MM    MM  MM    MM  
//  MMMMMMMM  MM      MM  MMMMMMMM  MM  MMMM    MM          MM        MM      MM        MM    MMMMMMMM  MM  MMMM  MMMMMMMM  MMMMMM      MM      
//  MM        MM      MM  MM        MM    MM    MM          MM        MM        MM      MM    MM        MM    MM  MM        MM    MM      MM    
//  MM          MM  MM    MM        MM    MM    MM          MM        MM    MM    MM    MM    MM        MM    MM  MM        MM    MM  MM    MM  
//  MMMMMMMM      MM      MMMMMMMM  MM    MM    MM          MMMMMM  MMMMMM    MMMM      MM    MMMMMMMM  MM    MM  MMMMMMMM  MM    MM    MMMM    

// EVENT LISTENERS _______________________________________________________

const listen = {
    list : new Array(14).fill(0),
    done : false,
    tick : function(x) {
        if (this.done) return;
        this.list[x] = 1;
        if (this.list.reduce( (t,n) => {return t+n} ) < this.list.length) return;
        $('#cover').fadeOut(1000, () => {
            $('#cover').remove();
        });
        this.done = true;
    }
}




























//  MMMMMMMM  MM      MM  MMMMMMMM  MM    MM  MMMMMM        MM    MM    MMMM    MM    MM  MMMMMM    MM      MMMMMMMM  MMMMMM      MMMM    
//  MM        MM      MM  MM        MMMM  MM    MM          MM    MM  MM    MM  MMMM  MM  MM    MM  MM      MM        MM    MM  MM    MM  
//  MMMMMMMM  MM      MM  MMMMMMMM  MM  MMMM    MM          MMMMMMMM  MMMMMMMM  MM  MMMM  MM    MM  MM      MMMMMMMM  MMMMMM      MM      
//  MM        MM      MM  MM        MM    MM    MM          MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM      MM    
//  MM          MM  MM    MM        MM    MM    MM          MM    MM  MM    MM  MM    MM  MM    MM  MM      MM        MM    MM  MM    MM  
//  MMMMMMMM      MM      MMMMMMMM  MM    MM    MM          MM    MM  MM    MM  MM    MM  MMMMMM    MMMMMM  MMMMMMMM  MM    MM    MMMM    

// EVENT HANDLERS ______________________________________________
































//  MMMMMMMM  MMMMMM          MMMMMMMM  MM    MM  MM    MM    MMMM    MMMMMM  MMMMMM    MMMM    MM    MM    MMMM    
//  MM        MM    MM        MM        MM    MM  MMMM  MM  MM    MM    MM      MM    MM    MM  MMMM  MM  MM    MM  
//  MMMMMMMM  MMMMMM          MMMMMMMM  MM    MM  MM  MMMM  MM          MM      MM    MM    MM  MM  MMMM    MM      
//  MM        MM    MM        MM        MM    MM  MM    MM  MM          MM      MM    MM    MM  MM    MM      MM    
//  MM        MM    MM        MM        MM    MM  MM    MM  MM    MM    MM      MM    MM    MM  MM    MM  MM    MM  
//  MM        MMMMMM          MM          MMMM    MM    MM    MMMM      MM    MMMMMM    MMMM    MM    MM    MMMM    

// OTHER FIREBASE FUNCTIONS _______________________________________





