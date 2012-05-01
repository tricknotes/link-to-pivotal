!function() {
  const PIVOTAL_STORY_URL = 'https://www.pivotaltracker.com/story/show/'
      , STORY_ID_MATCHER = /\[(?:[a-zA-Z]+ )?#([0-9]{8})\]/
      , LINK_TEMPLATE = '<a href="'+PIVOTAL_STORY_URL+'%s">%s</a>'
      , QUERIES = ['.commit .commit-title', '.commit .commit-desc']

  var linkToPivotal = function(text, processor) {
    return text.replace(STORY_ID_MATCHER, function(matched, id) {
      var values = [id, matched]
        , i = 0
      var linked = LINK_TEMPLATE.replace(/%s/g, function() {
        return values[i++ % 2];
      });
      if (processor) {
        return processor(linked);
      } else {
        return linked;
      }
    });
  };

  QUERIES.forEach(function(query) {
    var messages = document.querySelectorAll(query);
    var i, message, text, replaced, anchor;
    for (i = messages.length; i--;) {
      message = messages.item(i);
      text = message.innerHTML;
      anchor = message.querySelector('a');
      if (anchor) {
        replaced = linkToPivotal(text, function(linked) {
          return '</a>' + linked + '<a href="' + escape(anchor.getAttribute('href')) + '">';
        });
      } else {
        replaced = linkToPivotal(text);
      }
      message.innerHTML = replaced;
    }
  });
}();
