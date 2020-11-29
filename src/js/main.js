$(window).on('load',function(){
  // 検索結果ページ：URLパラメータを分割し、アーティスト一覧を絞り込み
  if($('body').hasClass('result')) {
    if(location.search) {
      $('.resultList li').hide();
      var URL = location.search;
      var splitUrl1 = URL.split('?');
      var splitUrl2 = splitUrl1[1].split('&');
      $('.resultList li').each(function(index) {
        for(var i = 0; i< splitUrl2.length; i++) {
          if($(this).hasClass(splitUrl2[i])) {
            $(this).show();
          }
        }
      })
    }
  }
})
$(function(){
  // 検索結果ページ：URLパラメータが存在しない場合はhrefをhistory.back()からページリンクに変更
  $('#toSerachPage').on('click',function(){
    if(!location.search) $(this).attr('href','index.html');
  });

  // 検索ページ：チェックボックスの選択内容に基づきURLパラメータを生成→aタグのリンクにパラメータを設定
  var totalUrl = '?';
  var param;
  $('.chkSection input').each(function(){
    chkInput($(this));
    $(this).on('change',function(){
      chkInput($(this));
    })
  })
  $('#searchBtn').on('click',function(){
    if(totalUrl != '?') {
      $(this).attr('href', $(this).attr('href') + totalUrl);
    }
    else {
      alert('一つ以上チェックしてください');
      return false;
    }
  })
  function chkInput(input) {
    param = input.data('target');
    if(input.prop('checked')){
      if(totalUrl == '?') {
        totalUrl += param;
      } else {
        totalUrl = totalUrl + '&' + param;
      }
      console.log(totalUrl);
    } else {
      var replaceParam;
      if(!totalUrl.match(/\&/)) {
        totalUrl = totalUrl.replace(param,'');
      } else {
        var splitURL = totalUrl.split('&');
        var strURL;
        console.log("splitURL",splitURL);
        for(var i = 0; i < splitURL.length; i++) {
          if(splitURL[i].match(param)) {
            splitURL.splice(i,1);
          }
          if(splitURL.join().match(/\?/)) {
            strURL = splitURL.join();
          } else {
            strURL = '?' + splitURL.join();
          }
          console.log("strURL",strURL);
        }
        if(strURL.match(',')) console.log("hey!!!!");
        totalUrl = strURL.replace(',','&');
      }
      console.log(totalUrl);
    }
  }
})
