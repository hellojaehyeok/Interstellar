console.clear();


// Scroll Count Up
const count = document.querySelectorAll("h2.number_count");
const count_txt = document.querySelectorAll("p.count_txt");
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
            for(let i = 0 ; i < count_txt.length ; i++){
                count_txt[i].classList.add("active_count_txt");
            }
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


// ThreeJs Planet
function planet(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    document.getElementById("threejs_planet").appendChild(renderer.domElement);
    // control = new THREE.OrbitControls(camera, renderer.domElement);

    //SIZE
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", function(){
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width/height;
        camera.updateProjectionMatrix();
    })
    renderer.setClearColor( 0x000000, 0);

    //CAMERA
    camera.position.set(0, 0, 3);
    
    // Light
    const DirecLight = new THREE.DirectionalLight( 0xffffff, 2);
    DirecLight.position.set(0, 2, 0.05);
    DirecLight.target.position.set(0, 0, 0);
    scene.add(DirecLight);
    const light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
    scene.add( light );

    // Particle
    var particle = new THREE.Object3D();
    var geometry = new THREE.TetrahedronGeometry(1, 3);
    var material = new THREE.MeshPhongMaterial({
        color: 0x5c5c5c
    });
    var xyz = Math.random() - 0.5;
    for (var i = 0; i < 3500; i++) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        mesh.position.multiplyScalar(500 + (Math.random() * 1000));
        particle.add(mesh);
    }    
    scene.add(particle);

    // EARTH
    var earth = new THREE.Object3D;
    var earth_loader = new THREE.OBJLoader();
    earth_loader.load(
        "./obj/earth.obj",
        function(object){
            earth = object;
            earth.scale.set(1, 1, 1);
            earth.position.set(0, 0, 0);
            scene.add(earth);
        }
    );


    // MILLER 
    var miller_Geom= new THREE.SphereBufferGeometry(1, 9 ,14, 0, 6.3, 1, 6.3);
    var miller_Mat = new THREE.MeshPhongMaterial({
        // color: 0xa4dcdc,
        color: 0xffffff,
        wireframe: true
    });
    var miller = new THREE.Mesh(miller_Geom, miller_Mat);

    scene.add(miller);
    miller.scale.set(1, 1, 1);
    miller.position.set(0, -4, 0);
    
    //MANN
    var mann_Geom= new THREE.TorusKnotBufferGeometry(0.5, 1, 67, 20, 9, 20);
    var mann_Mat = new THREE.MeshPhongMaterial({
        color: 0x505050,
        wireframe: true
    });
    var mann = new THREE.Mesh(mann_Geom, mann_Mat);
    scene.add(mann);
    mann.scale.set(0.7, 0.7, 0.7);
    mann.position.set(0, -8, 0);


    // Fifth
    var earth_fifth = new THREE.Object3D;
    var earth_fifth_loader = new THREE.OBJLoader();
    earth_fifth_loader.load(
        "./obj/earth.obj",
        function(object){
            earth_fifth = object;
            earth_fifth.scale.set(1, 1, 1);
            earth_fifth.position.set(0, -12, 0);
            scene.add(earth_fifth);
        }
    );

    var miller_fifth = new THREE.Mesh(miller_Geom, miller_Mat);
    miller_fifth.position.set(0, -12, 0);
    scene.add(miller_fifth);

    var mann_fifth = new THREE.Mesh(mann_Geom, mann_Mat);
    mann_fifth.scale.set(0.7, 0.7, 0.7);
    mann_fifth.position.set(0, -12, 0);
    scene.add(mann_fifth);

    var cooper = new THREE.Object3D;
    var cooper_loader = new THREE.OBJLoader();
    cooper_loader.load(
        "./obj/cooper.obj",
        function(object){
            cooper = object;
            cooper.scale.set(2, 2, 2);
            cooper.position.set(0, -12, 0);
            scene.add(cooper);
        }
    );
    

    // Cooper
    var cooper = new THREE.Object3D;
    var cooper_loader = new THREE.OBJLoader();
    cooper_loader.load(
        "./obj/cooper.obj",
        function(object){
            cooper = object;
            cooper.scale.set(2, 2, 2);
            cooper.position.set(0, -16, 0);
            scene.add(cooper);
        }
    );


    // Interstellar
    var main = new THREE.Object3D;
    var main_loader = new THREE.OBJLoader();
    main_loader.load(
        "./obj/main2.obj",
        function(object){
            main = object;
            main.scale.set(3, 3, 3);
            main.position.set(0, -21.7, 0);
            main.rotation.set(0, 30, 0);
            scene.add(main);
        }
    );
   
    const visual_area = document.querySelector("section.visual_area");
    const visual_area_top = visual_area.offsetTop;
    let visual_area_slice = (visual_area.clientHeight - window.innerHeight) / 6;
    let cameraPos = "earth";
    window.addEventListener("scroll", change_planet);
    function change_planet(){
        let cur_scroll = document.documentElement.scrollTop;
        if(cur_scroll > visual_area_top + (visual_area_slice * 5)){
            cameraPos = "interstellar";
        }else if(cur_scroll > visual_area_top + (visual_area_slice * 4)){
            cameraPos = "cooper";
        }else if(cur_scroll > visual_area_top + (visual_area_slice * 3) ){
            cameraPos = "fifth";
        }else if(cur_scroll > visual_area_top + (visual_area_slice * 2)){
            cameraPos = "mann";
        }else if(cur_scroll > visual_area_top + (visual_area_slice * 1)){
            cameraPos = "miller";
        }else if(cur_scroll > visual_area_top){
            cameraPos = "earth";
        }
    }

    //RENDER
    var renderScene = new function renderScene() {
        requestAnimationFrame(renderScene);

        // planet
        earth.rotation.y += 0.0004;
        miller.rotation.y += 0.0004;
        mann.rotation.y += 0.0004;
        cooper.rotation.y += 0.0004;

        // console.log(camera.position.y);
        if(cameraPos == "earth"){
            if(camera.position.y < 0){
                camera.position.y += 0.03; 
            }
        }else if(cameraPos == "miller"){
            if(camera.position.y < -4){
                camera.position.y += 0.03;
            }
            if(camera.position.y > -4){
                camera.position.y -= 0.03;
            }
        }else if(cameraPos == "mann"){
            if(camera.position.y < -8){
                camera.position.y += 0.03; 
            }
            if(camera.position.y > -8){
                camera.position.y -= 0.03; 
            }
        }else if(cameraPos == "fifth"){
            if(camera.position.y < -12){
                camera.position.y += 0.03; 
            }
            if(camera.position.y > -12){
                camera.position.y -= 0.03; 
            }
        }else if(cameraPos == "cooper"){
            if(camera.position.y < -16){
                camera.position.y += 0.03; 
            }
            if(camera.position.y > -16){
                camera.position.y -= 0.03; 
            }
        }else if(cameraPos == "interstellar"){
            if(camera.position.y > -20){
                camera.position.y -= 0.03; 
            }
        }


        // particle
        particle.rotation.y += 0.000006;
        renderer.render(scene,camera);
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
    change_mode_txt();
    planet();
}
init();