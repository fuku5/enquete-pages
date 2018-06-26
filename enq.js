var episode_name = [1,3,4,5,6,7,8,9];
var len_frame = [20, 17, 34, 24, 60, 47, 17, 14];
var shuffled_episode = episode_name.concat();

function shuffle(array) {
  var n = array.length, t, i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = array[n];
    array[n] = array[i];
    array[i] = t;
  }

  return array;
}

shuffled_episode = shuffle(shuffled_episode);
var input_names = [ "entry.1494962771",  // name
          "entry.183576483",   // gender
          "entry.1631224340",  // order
          "entry.2100160150",  // ep1
          "entry.757586422",
          "entry.794388708",
          "entry.1509331307",
          "entry.886434001",
          "entry.116711273",
          "entry.1753581294",
          "entry.272235439",
          "entry.582817615"];  //comment


var form = document.createElement("form");
form.action = "https://docs.google.com/forms/d/e/1FAIpQLScNfIQobc4VZAqfbxBIGtu-INKfzd2aEGaMiB5qGZGxgHJpgw/formResponse";
form.target = "_self";
form.method = "POST";
form.id = "mG61Hd";
//var form = document.forms[0];
  //document.getElementById("mG61Hd");

// order
var node = document.createElement("input");
node.setAttribute("type", "hidden");
node.name = input_names[2];
node.value = shuffled_episode.join(",");
form.appendChild(node);
	
var my_console = document.createTextNode("test");

var episode_count = 0;
var frame_count = 0;
function nextButtonAction()  {
	var image = document.getElementById("image");
	var episode_id = shuffled_episode[episode_count];
	var max_frame = len_frame[episode_name.indexOf(episode_id)];
	image.setAttribute("src", "imgs/"+episode_id+"/D"+frame_count+".png");
	my_console.data = "shuffled: ";
	my_console.data += shuffled_episode;
	my_console.data += "id now";
	my_console.data += epidode_id;
	my_console.data += "frame now";
	my_console.data += frame_count;
	my_console.data += "frame max";
	my_console.data += max_frame;
	frame_counter += 1;
}

$(function(){
	var header = document.getElementById("header");
	var main = document.getElementById("main");
	var debug = document.getElementById("debug");

  // name
  var name_field = document.createElement("input");
  name_field.name = input_names[0];
  form.appendChild(name_field);
  var name_label = document.createElement("label");
  name_label.htmlFor = input_names[0];
  name_label.appendChild(document.createTextNode("名前"));
  form.insertBefore(name_label, name_field);

  // gender
  genders = ["男性", "女性", "回答しない"];
  for (var i in genders) {
    var box = document.createElement("input");
    box.name = input_names[1];
    box.setAttribute("type", "radio");
    box.setAttribute("value", genders[i]);
    form.appendChild(box);
    var label = document.createElement("label");
    label.setAttribute("for", input_names[1]);
    label.appendChild(document.createTextNode(genders[i]));
    form.insertBefore(label, box);
  }
  header.appendChild(form);

  // next button
  var button = document.createElement("button");
  button.onclick = function(){form.submit()};
  button.appendChild(document.createTextNode("next"));
  main.appendChild(button);
  

// debug button
  var button = document.createElement("button");
  button.onclick = nextButtonAction;
  button.appendChild(document.createTextNode("debug"));
  debug.appendChild(button);
	debug.appendChild(my_console);
});

