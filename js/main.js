var fb_f = false; // fizzbuzz flag
var fs = 14;  // font size
var old_s = ''; // 前回コピー文字列

/* ---------- 関数 ---------- */

/* fizzBuzz */
function fizzBuzz(l) {
   if (l % 3 === 0 && l % 5 === 0) {
     $('.sayfb').text("FizzBuzz");
   } else if (l % 3 === 0) {
     $('.sayfb').text("Fizz");
   } else if (l % 5 === 0) {
     $('.sayfb').text("Buzz");
   } else {
     $('.sayfb').text(" ( ﾟдﾟ ) ");
   }
}

/* メッセージ表示 */
function show_msg(m) {
  $('.msg').html(m);
  $('.msg').fadeIn(100);
  $('.msg').fadeOut(2000);
}

/* ---------- ウィンドウ操作 ---------- */

/* ブラウザ閉じる操作時の警告 */
$(window).on("beforeunload",function(e){
    return "";
});

/* ---------- ボタン・チェックボックス ---------- */

/* fontsize */
$(function() {
  $('#fs').on('click', function(){
    fs += 2;
    if(fs > 18){
      fs = 14;
    }
    $('#input_area').css("font-size", fs + "px");
  });
});

/* copy */
$(function() {
  $('#copy').on('click', function(){
    $('#input_area').select();
    var new_s;
    new_s = window.getSelection().toString();
    var c = String(document.getSelection()).length;
    if(c !== 0 && old_s !== new_s){
      document.execCommand('copy');
      show_msg('Copied!');
    }
    old_s = new_s;
  });
});

/* Clear */
$(function() {
  $('#del').on('click', function(){
    $('#input_area').val("");
    $('.count').html(0);
    $('.sayfb').text("");
  });
});

/* FizzBuzzチェックボックス */
$(function() {
  $('#fb').on('click', function(){
    if($('#fb').prop('checked')){
      fb_f = true;
    }else{
      fb_f = false;
    }
  });
});

/* 更新後の処理 */
$(window).on('unload', function(e){
  $('#fb').prop('checked', false); // チェックボックスオフ
});

/* ---------- イメージアイコン ---------- */

/* theme */
$(function() {
    $('#theme').click(function() {
      $('.dark').toggleClass('light');
  });
});

/* dl */
$(function() {
    $('#dl').click(function() {
      let s = $('#input_area').val();
      let blob = new Blob([s], {type:"text/plan"});
      let link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'btext_download.txt';
      link.click();
  });
});


/* ---------- 情報表示 ---------- */

/* 行数・文字数は常に表示 */
$(function() {
  $('#input_area').bind('keydown keyup keypress change',function(){
    // 行数
    let n = $('#input_area').val().match(/\r\n|\n/g);
    if(n !== null) {
      $('.count_lines').html(n.length + 1);
    } else {
      $('.count_lines').html(1);
    }
    // 文字数
    var l = $(this).val().replace(/\n/g, "").length;
    $('.count_chars').html(l);
    if(fb_f) {
      fizzBuzz(l);
    } else {
     $('.sayfb').text("");
    }
  });
});

/* ---------- 編集機能 ---------- */

/* 選択文字をクリップボードにコピー */

$('#input_area').on('mouseup', function(e){  //mouseupでイベント発火
  if(window.getSelection){  //selectionオブジェクト取得
    var new_s;
    new_s = window.getSelection().toString();
    var c = String(document.getSelection()).length;
    if(c !== 0 && old_s !== new_s){
      document.execCommand('copy');
      show_msg('Copied.');
    }
    old_s = new_s;
  }
});
