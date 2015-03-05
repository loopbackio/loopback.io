/**
 * parses any RSS/XML feed through Google and returns JSON data
 * source: http://stackoverflow.com/a/6271906/477958
 * Used in /resources page
 */
function parseRSS(url, container) {
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
    dataType: 'json',
    success: function(data) {

      $.each(data.responseData.feed.entries, function(key, value){
        thehtml = '<li><a href="'+value.link+'" target="_blank">'+value.title+' <i class="fa fa-long-arrow-right"></i></a></li>';
        $(container).append(thehtml);
      });
    }
  });
}
