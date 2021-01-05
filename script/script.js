console.clear();


const count = document.querySelectorAll("h2.number_count");
let is_Count = false;

function counter(target, start, end, speed){
    if(is_Count){
        return 
    }
    let i = start;
    let timer = setInterval(()=>{
        i++;
        target.innerHTML = i;
        if(i == end){
            clearInterval(timer);
        }
    }, speed)
}

// Scroll Fade In, Header Bg Change 
function scroll_event(){
    const scroll_count = document.querySelectorAll(".scrollCount");
    
    window.addEventListener('scroll', scrollEvent);
    function scrollEvent(){
        // Count Event
        let scroll_count_top = [];
        for(let i = 0 ; i < scroll_count.length ; i++){
            scroll_count_top[i] = scroll_count[i].getBoundingClientRect().top;
            if(scroll_count_top[i] < window.innerHeight * 0.9){
                counter(count[0], 6674, 6774, 20);
                counter(count[1], 932, 1032, 20);
                counter(count[2], 1550, 1650, 20);
                is_Count = true;
            }
        }
    }
}

function move_astronaut(){
    document.addEventListener('mousemove', function(e){
        const astronaut = document.querySelector("img.astronaut");
        let mouse_x = getTransformValue(e.clientX,window.innerWidth,25);
        let mouse_y = getTransformValue(e.clientY,window.innerHeight,25);
        astronaut.style.left = mouse_x + "px"
        astronaut.style.top = mouse_y + "px"
        astronaut.style.filter = "drop-shadow(" + -mouse_x + "px " + mouse_y + "px 20px #000)"

    });
    function getTransformValue(v1,v2,value){
        return (v1/v2*value-value/2).toFixed(1);                        
    }
}




function init(){
    scroll_event();
    move_astronaut();
}
init();