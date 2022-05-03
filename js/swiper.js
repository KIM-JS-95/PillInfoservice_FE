new Swiper('.swiper-container', {
        slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
        spaceBetween: 10, // 슬라이드 사이 여백
        centeredSlides: true, // 1번 슬라이드가 가운데 보이기
        loop: true, // 반복 재생 여부
        autoplay: { // 자동 재생 여부
            delay: 3000 // 3초마다 슬라이드 바뀜
        },
        pagination: { // 페이지 번호 사용 여부
            el: '.swiper-pagination', // 페이지 번호 요소 선택자
            clickable: true, // 사용자의 페이지 번호 요소 제어 가능 여부
        },
        navigation: { // 슬라이드 이전/다음 버튼 사용 여부
            prevEl: '.swiper-prev', // 이전 버튼 선택자
            nextEl: '.swiper-next' // 다음 버튼 선택자
        }
    });
