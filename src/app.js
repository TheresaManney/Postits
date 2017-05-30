import _ from 'underscore';
import $ from 'jquery';
import 'jquery-colpick';
import Postit from './models/postit.js';
import PostitNotes from './collections/postit_notes.js';


var postitData = [{
    text: "Backbone is a library not a Framework.",
    color: "#AC1200"
},
{
    text: "That means it doesn't dictate to you how the code is structured",
    color: "#752310"
}];

var myPostitNotes = new PostitNotes(postitData);

var myPostit = new Postit( {
  text: "What a beautiful postit!",
  color: '#8A4FFF'
});

var getFormData = function() {
  var formText = $('#text').val();
  $('#text').val('');

  var formColor = $('#color').val();
  // $('#color').var('');

  return {
    text: formText,
    color: formColor
  };
};

var render = function(postit) {
  var templateText = $('#postit-template').html();

  var templateObject = _.template(templateText);

  var compiledHTML = templateObject(postit.toJSON());

  $('#postits').append(compiledHTML);

};

var renderList = function(postitList) {
  $('#postits').empty();
  postitList.each(function(postit) {
    render(postit);
  });
};

$(document).ready(function() {
  // WAVE 2 STUFF
  renderList(myPostitNotes);
  myPostitNotes.on("update", function() {
    renderList(myPostitNotes);
  });

  $('button.success').click(function() {
    var postit = new Postit(getFormData());
    myPostitNotes.add(postit);
  });

  // WAVE 1 STUFF
  // console.log("Lets go!");
  // render(new Postit(postitData[0]));
  // render(myPostit);
  // console.log(myPostit);
  //
  // $("button.success").click(function() {
  //   console.log('test');
  //   var formData = getFormData();
  //   var newPostit = new Postit(formData);
  //   render(newPostit);
  // });
});

// end
