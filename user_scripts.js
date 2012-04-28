!function() {
  const PIVOTAL_STORY_URL = 'https://www.pivotaltracker.com/story/show/'
      , STORY_ID_MATCHER = /\[(?:Finish )?#([0-9]{8})\]/
      , LINK_TEMPLATE = '<a href="'+PIVOTAL_STORY_URL+'%s">%s</a>'

  var messages = document.querySelectorAll('.commit .commit-desc');
  var i, message, text, replaced;
  for (i = messages.length; i--;) {
    message = messages.item(i);
    text = message.innerText;

    replaced = text.replace(STORY_ID_MATCHER, function(matched, id) {
      var values = [id, matched]
        , i = 0
      return LINK_TEMPLATE.replace(/%s/g, function() {
        return values[i++ % 2];
      });
    });

    message.innerHTML = replaced;
  }
}();
