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
var value1 = document.createTextNode("050%");
var value2 = document.createTextNode("050%");
var text2 = document.createTextNode("梨を取ろうとしている確率");

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
  value1.data = ("000" + (100-slider_value)).slice(-3) + "%";
  value2.data = ("000" + slider_value).slice(-3) + "%";
};
slider.oninput = slider_event;
slider.onchange = slider_event;


var episode_count = 0;
var frame_count = 0; 
var answer = [];
function nextButtonAction()  {
  if (frame_count < 0) { // first only
    frame_count = 0;
  } else {
    answer.push(slider_value);
  }

	var episode_id = shuffled_episode[episode_count];
	var episode_index = episode_name.indexOf(episode_id);
	var max_frame = len_frame[episode_index];
  
	var image = document.getElementById("image");
  image.onload = function() {
    next_button = document.getElementById("next_button");
    next_button.innerText = "next";
    next_button.disabled = "";
  } 
  next_button.innerText = "loading";
  next_button.disabled = "true";
	image.setAttribute("src", "imgs/"+episode_id+"/D"+frame_count+".png");

  my_console.data = "imgs/"+episode_id+"/D"+frame_count+".png";
	
  if (frame_count == 0 && episode_count == 0) {
    ;
  } else {
    answer.push(slider_value);
  }
  frame_count += 1;
	if (frame_count == max_frame) { // end of the episode
		episode_count += 1;
		frame_count = 0;	
		answer_fields[episode_index].value = answer.join(",");
		answer = [];
    slider.value = 50;
    value1.data = "050%";
    value2.data = "050%";
	}
	if (episode_count == episode_name.length) { // end of the experiment
		endEvent();
    return
	}

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
  button.id = "next_button";
  button.innerText = "next";
  answer_bar.appendChild(button);
  

// debug button
  var button = document.createElement("button");
  button.onclick = function(){form.submit()};
  button.appendChild(document.createTextNode("ver4"));
  debug.appendChild(button);
	debug.appendChild(my_console);

  //debug.style.visibility = "hidden";
});


