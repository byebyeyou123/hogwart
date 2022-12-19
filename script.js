$(function () {
  //************햄버거바 동작*****************************************//
  //햄버거바 클릭 시 navbar_menu에 active 클래스가 추가/제거 된다 => 네비바 펼쳐침/닫힘
  //햄버거바 active 상태에서 overay가 나타나고 클릭하면 햄버거바가 inactive 된다 => 배경 클릭시 네비바 닫힘
  //네비바에서 메뉴를 클릭하면 navbar_menu에 active 클래스가 제거 된다 => 네비바 닫힘

  $(".navbar_toggleBtn").on("click", function () {
    $("#navbar_menu").toggleClass("active");
    $(".overlay").fadeIn();
  });

  $(".overlay").on("click", function () {
    $("#navbar_menu").removeClass("active");
    $(".overlay").fadeOut();
  });

  $("#navbar_menu a").on("click", function () {
    $("#navbar_menu").removeClass("active");
    $(".overlay").fadeOut();
  });

  $(".navbar_toggleBtn").click(function (e) {
    e.preventDefault();
  });

  //************student 섹션의 버튼 동작*******************************//
  //오른쪽 계속 클릭하다가 끝점에 닿으면 처음으로 돌아감, 부드럽게 이동하는 애니메이션 적용
  //전체 이미지(10장)가 차지하는 너비 = 1982
  $("#slideLeft").on("click", function () {
    let now_x = $(".flex-box").scrollLeft();
    $(".flex-box").animate({ scrollLeft: now_x - 200 }, 800);
  });
  $("#slideRight").on("click", function () {
    let now_x = $(".flex-box").scrollLeft();
    let div_width = $(".flex-box").width();
    if (now_x > 1982 - div_width) {
      $(".flex-box").animate({ scrollLeft: 0 }, 800);
    } else {
      $(".flex-box").animate({ scrollLeft: now_x + 200 }, 800);
    }
  });

  //************신청하기 버튼 클릭 시 알림창 나타내기*******************//
  //이름에 입력값이 없을 때, 숫자&알파벳&단일한글자모음&특수문자 포함할 때는 경고창 발생
  //연락처에 입력값이 8자리 이하일 때, 알파벳&한글&특수문자 포함할 때는 경고창 발생, 이름 입력값 삭제
  //연락처에 입력값이 8자리 이하일 때, 알파벳&한글&특수문자 포함할 때는 경고창 발생, 연락처 입력값 삭제
  //개인정보이용동의 미체크시 경고창 발생
  //위에 해당 사항 없을 시 신청완료 알림창 발생

  $("#applybtn").on("click", function () {
    let name = $("#name").val();
    let phone = $("#phone").val();
    let pattern1 = /[0-9]/;
    let pattern2 = /[a-zA-Z]/;
    let pattern3 = /[ㄱ-ㅎ|ㅏ-ㅣ]/;
    let pattern4 = /[~!@#\#$%<>^&*,]/;
    let pattern5 = /[가-힣]/;

    name = name.split(" ").join("");
    phone = phone
      .split(")")
      .join("")
      .split("-")
      .join("")
      .split(".")
      .join("")
      .split("(")
      .join("")
      .split(" ")
      .join("");

    if (
      name.length == 0 ||
      pattern1.test(name) ||
      pattern2.test(name) ||
      pattern3.test(name) ||
      pattern4.test(name)
    ) {
      $(".modal-body").html(
        "<p>올바른 이름이 아닙니다😭<br />다시 입력해주세요😉</p>"
      );
      $("#name").val("");
    } else if (
      phone.length < 9 ||
      pattern2.test(phone) ||
      pattern3.test(phone) ||
      pattern4.test(phone) ||
      pattern5.test(phone)
    ) {
      $(".modal-body").html(
        "<p>올바른 연락처가 아닙니다😭<br />다시 입력해주세요😉</p>"
      );
      $("#phone").val("");
    } else if ($("input:checked[id='info']").is(":checked") == false) {
      $(".modal-body").html("<p>개인정보처리방침에<br/>동의해주세요😉</p>");
    } else {
      $(".modal-body").html(
        "<p>호그와트에 대한 관심에<br />감사드립니다😀<br />입력해주신 연락처로<br />안내드릴 예정입니다🙂</p>"
      );
    }
    $("#mymodal").modal("show");
  });
});
