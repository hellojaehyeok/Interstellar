# Interstellar
영화 '인터스텔라' 웹사이트 입니다.
2020년 학교과제로 만든 사이트를 다시 디자인 후 제작하였습니다.


<hr />

## 사용 언어
 - HTML, CSS, JavaScript 
### 중점 작업  
1. 미디어 쿼리와 display: flex; 를 사용하여 반응형 웹페이지를 제작하는데 집중하였습니다.  
2. 기초적인 vanilla javascript를 연습하기 위하여 jQuery를 사용하지 않았습니다.  
3. 2D 그래픽과 3D 그래픽이 자연스럽게 이어지도록 만들었습니다.
4. 기존에 자주 사용하던 오퍼시티 페이드인 대신 다른 효과들을 제작해보았습니다.


<hr />


## 웹사이트 구성

### Header 
좌측에는 HTML과 CSS로 움직이는 로고를 만들었습니다.   
두 개의 사각형을 만들고 border-radius로 원 형태를 만들었습니다.   
display: flex; 를 이용하여 정중앙에 배치 후 밖에 있는 원을 css animation 을 이용하여 움직임을 추가하였습니다.   


우측에는 내비게이션을 만들어 클릭 시 해당 위치로 이동하게 만들었습니다.   
jQuery를 사용하여 이동하는 것이 아닌 href="" 에 id 값을 넣어 이동하게 만들었고,   
scroll-behavior: smooth; 를 사용하여 부드럽게 이동되도록 하였습니다.   

HTML

    <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#story_line">Story Line</a></li>
        <li><a href="#3D">3D</a></li>
    </ul>

CSS

    html{scroll-behavior: smooth;}

### Main