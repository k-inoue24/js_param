$(window).on('load',function(){
  var URL = location.search;
  var sexCondition = URL.split('?sex=')[1];
  console.log(sexCondition);
  $('.resultList li').each(function(){
    if(!$(this).hasClass(sexCondition)) {
      $(this).hide();
    }
  })
})