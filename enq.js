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
// hidden inputs
// order
var order_field = document.createElement("input");
order_field.setAttribute("type", "hidden");
order_field.name = input_names[2];
order_field.value = shuffled_episode.join(",");
form.appendChild(order_field);

// answers
var answer_fields = [];
for (var i = 0; i < 8; i++) {
	var field = document.createElement("input");
	field.setAttribute("type", "hidden");
	field.name = input_names[i+3];
	field.value = "null";
	form.appendChild(field);
	answer_fields.push(field);
}
  
// for debug	
var my_console = document.createTextNode("test");


var text1 = document.createTextNode("りんごを取ろうとしている確率");
var value1 = document.createTextNode("50");
var value2 = document.createTextNode("50");
var text2 = document.createTextNode("梨を取ろうとしている確率");
value1.setAttribute =("style", "width:100px;");
value2.setAttribute =("style", "width:20pxl");

var slider = document.createElement("input");
slider.setAttribute("type", "range");
slider.setAttribute("min", 0);
slider.setAttribute("max", 100);
slider.setAttribute("step", 1);
slider.setAttribute("name", "slider");

var slider_value = 50;
function slider_event(){ 
  slider_value = slider.value;
  my_console.data = slider_value;
  value1.data = slider_value;
  value2.data = 100-slider_value;
};
slider.oninput = slider_event;
slider.onchange = slider_event;


var episode_count = 0;
var frame_count = 0;
var answer = [];
function nextButtonAction()  {
	if (frame_count == max_frame) {
		episode_count += 1;
		frame_count = 0;	
		answer_fields[episode_index].value = answer.join(",");
		answer = [];
    slider.value = 50;
	}
	if (episode_count == episode_name.length) {
		endEvent();
	}

	var image = document.getElementById("image");
	var episode_id = shuffled_episode[episode_count];
	var episode_index = episode_name.indexOf(episode_id);
	var max_frame = len_frame[episode_index];
	image.setAttribute("src", "imgs/"+episode_id+"/D"+frame_count+".png");
	my_console.data = "shuffled: ";
	my_console.data += shuffled_episode;
	my_console.data += "id now";
	my_console.data += episode_id;
	my_console.data += "frame now";
	my_console.data += frame_count;
	my_console.data += "frame max";
	my_console.data += max_frame;
	frame_count += 1;
	answer.push(slider_value);
}
function endEvent() {
	form.submit();
}


$(function(){
	var header = document.getElementById("header");
	var main = document.getElementById("main");
	var answer_bar = document.getElementById("bar");
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

  // slider
  answer_bar.appendChild(text1);
  answer_bar.appendChild(value1);
  answer_bar.appendChild(slider);
  answer_bar.appendChild(value2);
  answer_bar.appendChild(text2);


  // next button
  var button = document.createElement("button");
  button.onclick = nextButtonAction;
  button.appendChild(document.createTextNode("next"));
  answer_bar.appendChild(button);
  

// debug button
  var button = document.createElement("button");
  button.onclick = function(){form.submit()};
  button.appendChild(document.createTextNode("debug"));
  debug.appendChild(button);
	debug.appendChild(my_console);

  debug.style.visibility = "hidden";
});


