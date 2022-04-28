
const form = document.querySelector(".s003");
const result = document.querySelector(".js_result");
const paintpill = document.querySelector(".paintpill");
const notice = document.querySelector(".notice");

const SHOWING_CN = "form";

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
let itemlist = [];
function searchInfo(json) {
  itemlist = [];

  if (json.body.items == "" || json.body.items == null || json.body.items == undefined) {
    result.innerText = "검색 결과를 찾을 수 없어요!";
  } else {
    json.body.items.forEach((element) => {
      itemlist.push(element);
    });
    paintfunction();
  }
  console.log(itemlist);
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

function paintfunction() {
  const currentClass = form.className;
  if (currentClass !== SHOWING_CN) {
    form.className = SHOWING_CN;
  } else {
    form.className = '';
  }
  paintpill.classList.add(SHOWING_CN);
  paintpill.innerText = "검색 결과를 보여주어라";
}

function init() {
  showup;
  form.addEventListener("submit", postInfo);
}

init();