console.clear();


// Scroll Count Up
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
function scroll_count(){
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

// MouseMove Astronaut
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


// Scroll Img Scale
function scroll_img(){
    
    const steel_cut = document.querySelector("section.steel_cut");
    const steel_cut_start = steel_cut.offsetTop;
    const steel_cut_end = steel_cut.clientHeight + steel_cut_start - window.innerHeight;
    const steel_cut_gap = steel_cut_end - steel_cut_start;
    const cut_img_wrap = document.querySelector("div.cut_img_wrap");

    window.addEventListener("scroll", img_trans);
    function img_trans(){
        let cur_scroll = document.documentElement.scrollTop;
        let gap_scroll = cur_scroll - steel_cut_start
        if(cur_scroll < steel_cut_start){
            // cut_img_wrap.style.top = 0  + "px";
            cut_img_wrap.style.position = "absolute";
            cut_img_wrap.style.transform = "scale(5)";

        }else if(steel_cut_end > cur_scroll && cur_scroll > steel_cut_start){
            cut_img_wrap.style.top = 0  + "px";
            cut_img_wrap.style.position = "fixed";
            cut_img_wrap.style.transform = "scale(" + (5 - (4 * gap_scroll / steel_cut_gap)) + ")";

        }else if(cur_scroll >= steel_cut_end){
            cut_img_wrap.style.top = steel_cut_gap  + "px";
            cut_img_wrap.style.position = "absolute";
            cut_img_wrap.style.transform = "scale(1)";
            
        }
    }   
}

// Change Mode Txt
function change_mode_txt(){
    const steel_cut = document.querySelector("section.steel_cut");
    const mode_txt = document.querySelector("span.mode_txt");

    window.addEventListener("scroll", scroll_change_mode_txt);
    function scroll_change_mode_txt(){
        if(steel_cut.getBoundingClientRect().bottom < -50){
            mode_txt.classList.add("active_3D_txt");
        }else{
            mode_txt.classList.remove("active_3D_txt");
        }
    }
}

// Init
function init(){
    // window.onload = function(){
    //     setTimeout(function(){
    //         window.scrollTo(0, 0);
    //     },100)   
    // }

    scroll_count();
    move_astronaut();
    scroll_img();
    change_mode_txt()
}
init();