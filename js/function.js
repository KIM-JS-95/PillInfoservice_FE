const form = document.querySelector(".hide");
const result = document.querySelector(".js_result");
const featured__wrapper = document.querySelector(".featured__wrapper");
const notice = document.querySelector(".notice");
const list_hide = document.querySelector(".list_hide");

const itemshowup = document.querySelector(".item_showup");

const SHOWING_CN = "form";
let itemlist = [];

// 검색 보내기
function postInfo(event) {
  event.preventDefault();
  const selectbox = document.querySelector(".selectbox").value;
  const pillName = document.getElementById("search").value;
  const pillNum = "";

  search_check(pillName);

  var data = {
    type: 1,
    pillName: pillName,
    pillNum: ""
  };

  fetch('http://localhost:8080/mypill', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;",
    },
    body: JSON.stringify(data),
  })
    //  .then((response) => {
    //   if (!response.ok) {
    //     result.innerText = "서버와 연결이 안되어 있네요?";
    //     throw new Error('promise chain cancelled');
    //   }
    // })
    .then((response) => response.json())
    .then((json) => searchInfo(json))
};

// 데이터 배열에 저장
function searchInfo(json) {
  itemlist = [];

  if (json.body.items == "" || json.body.items == null || json.body.items == undefined) {
    result.innerText = "검색 결과를 찾을 수 없어요!";
  } else {
    json.body.items.forEach((element) => {
      itemlist.push(element);
    });
    paintfunction(itemlist);
  }
}

function search_check(pillName) {
  if (pillName == "") {
    result.innerText = "검색어를 입력해주세요!";
  }
}


// 화면 올라오면 공지사항을 보여주세요
function showup() {
  fetch('http://localhost:8080', {
    method: 'GET'
  })
    .then(function (res) {
      return res.json();
    })
    .then((json) => notice.innerText = json.content)
}

function paintfunction(itemlist) {
  const currentClass = form.className;
  const curentpill = list_hide.classList;

  if (currentClass !== SHOWING_CN) {
    form.className = SHOWING_CN;
  } else {
    form.className = '';
  }

  if (!curentpill.contains(SHOWING_CN)) {
    list_hide.classList.add(SHOWING_CN);
  } else {
    list_hide.classList.remove(SHOWING_CN);
  }

  len = itemlist.length;
  for (let i = 0; i < len; i++) {
    // 리스트를 append 해가며 추가하는 방식
    list_create(itemlist[i])
  }
}



// 이미지 상세정보 제공 팝업창
const swiper = document.querySelector(".swiper-wrapper");

function list_create(item) {

  const item_imege = `${item.ITEM_IMAGE}`;
  const item_names = `${item.ITEM_NAME}`;

  const inner =
    `<span>
  <li>💊 품목명</li>
  <ul>
    <li>${item.ITEM_SEQ}</li>
  </ul>

  <br>

  <li>💊 품목명</li>
  <ul>
    <li>${item.ETC_OTC_NAME}</li>
    <li>${item.CLASS_NAME}</li>
  </ul>

  <br>

  <li>💊 업체명</li>
  <ul>
    <li>${item.ENTP_NAME}</li>
  </ul>

  <br>

  <li>💊 성상</li>
  <ul>  
    <li>${item.CHART}</li>
  </ul>

  <br>

  <li>💊 일렬번호</li>
  <ul>
    <li>${item.ITEM_SEQ}</li>
  </ul>
      </span>`;

  const swiper_slide = document.createElement("div");
  swiper_slide.classList.add("swiper-slide");
  const item_name = document.createElement("div");
  item_name.innerText = `${item.ITEM_NAME}`

  // 슬라이드 이미지
  const Myimg = document.createElement("img");
  Myimg.setAttribute("id", "myImg");
  Myimg.setAttribute("src", item_imege);
  Myimg.setAttribute("alt", item_names);
  Myimg.classList.add("swiper-slide_image");

  swiper_slide.appendChild(item_name);
  swiper_slide.appendChild(Myimg);
  swiper.appendChild(swiper_slide);

  Myimg.addEventListener("click", function() {item_view(inner, item_imege)});
}

function item_view(inner, item_imege) {
  const myModal = document.createElement("div");
  myModal.setAttribute("id", "myModal");
  myModal.classList.add("modal");

  const close = document.createElement("span");
  close.classList.add("close");
  close.innerText = "❌";

  const model_content = document.createElement("img");
  model_content.classList.add("modal-content");
  model_content.setAttribute("id", "img01");
  model_content.setAttribute("src", item_imege);

  const caption = document.createElement("div");
  caption.classList.add("caption");
  caption.innerHTML = inner;
  
  myModal.appendChild(close);
  myModal.appendChild(model_content);
  myModal.appendChild(caption);
  itemshowup.appendChild(myModal);

  myModal.style.display = "block";

  close.addEventListener("click", function () {
    myModal.style.display = "none"
    myModal.remove();
  });
}



function init() {
  showup;
  form.addEventListener("submit", postInfo);
}

init();