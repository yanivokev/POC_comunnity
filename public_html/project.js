function ProjectData(json) {
    this.id 									= json['id'];
    this.title 								= json['title'];
    this.location 						= json['location'];
    this.image 								= json['image'];
    this.description 					= json['description'];
    this.goal 								= json['goal'];
    this.total_donated_amount = json['total_donated_amount'];
    this.total_donated_people = json['total_donated_people'];
}

function fetchProject(id) {
	var url = "https://poccommunity-api.herokuapp.com/projects/" + id
	var json;
	$.ajax({
	  url: url,
	  dataType: "json",
	  async: false
	}).done(function(data) {
	  json = data
	});
	return json;
}

function fillDetails(projectData) {
	$('.project-title').html(projectData.title);
	$('.project-location span').html(projectData.location);
	$('.project-description').html(projectData.description);
	$('.project-image').attr('src', projectData.image);
	$('.donation-value span').html(numberWithCommas(projectData.total_donated_amount));
	$('.donation-caption span').html(numberWithCommas(projectData.goal));
	$('.donation-people').html(parseInt(projectData.total_donated_people));
	var donated = parseFloat(projectData.total_donated_amount)
	var total 	= parseFloat(projectData.goal)
	var percent = (donated/total).toFixed(2);
	$('.donation-progress').css('width', percent*100 + '%');
}

function numberWithCommas(number) {
    if (number) {
      return parseFloat(number).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "0.00";
    }
  }

var getParameterByName = function(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var project_id = getParameterByName('id');

var projectData = new ProjectData(fetchProject(project_id));

