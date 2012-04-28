!function() {
  const PIVOTAL_STORY_URL = 'https://www.pivotaltracker.com/story/show/'
      , STORY_ID_MATCHER = /\[(?:Finish )?#([0-9]{8})\]/
      , LINK_TEMPLATE = '<a href="'+PIVOTAL_STORY_URL+'%s">%s</a>'
      , QUERIES = ['.commit .commit-title', '.commit .commit-desc']

  QUERIES.forEach(function(query) {
    var messages = document.querySelectorAll(query);
    var i, message, text, replaced, anchor;
    for (i = messages.length; i--;) {
      message = messages.item(i);
      text = message.innerHTML;
      anchor = message.querySelector('a');
      if (anchor) {
        replaced = text.replace(STORY_ID_MATCHER, function(matched, id) {
          var values = [id, matched]
            , i = 0
          var linked = LINK_TEMPLATE.replace(/%s/g, function() {
            return values[i++ % 2];
          });
          return '</a>' + linked + '<a href="' + anchor.getAttribute('href') + '">'
        });
      } else {
        replaced = text.replace(STORY_ID_MATCHER, function(matched, id) {
          var values = [id, matched]
            , i = 0
          return LINK_TEMPLATE.replace(/%s/g, function() {
            return values[i++ % 2];
          });
        });
      }
      message.innerHTML = replaced;
    }
  });
}();
