function buildProjects(projects) {
	projects.forEach(function(project) {
		$('#projects-container').append("<div class='houzz-back-project-container'><div class='project-image-container'><img src="+project['Image']+" /></div><div class='project-content-container'><div class='project-title'>"+project['Title']+"</div><div class='project-description'>"+project['Description']+"</div><div class='project-description-read-more'><a href='./project.html?id="+project['Id']+"'>Read More</a></div><div class='project-status'>$"+project['totalDonatedAmount']+" donated  by Houzz</div></div></div>");
	});
}

function buildProjectHero(projects, id) {
	projects.forEach(function(project) {
		if (project["Id"] == id){
			$('.project-hero-content-title').html(project["Title"]);
			$('.project-hero-content-description').html(project["Description"]);
			$('.houzz-back-hero-project-img').attr('src', project["Image"]);
		}
	});
}

function FeatureData(json) {
    this.projects = json["featureData"]["projects"];
		this.hero_project_id = json["featureData"]["heroProjectId"];
		$('#hero-project-read-more').href('project.html?id='+this.hero_project_id);
    var project_count = 0;
    var people_donated = 0;
    var total_donated = 0;

    this.projects.forEach(function(project) {
    	project_count ++;
    	people_donated = people_donated + project.totalDonatedPeople;
    	total_donated = total_donated + parseFloat(project.totalDonatedAmount);
    });

    this.project_count = project_count;
    this.people_donated = people_donated;
    this.total_donated = total_donated;
}


function fetchData() {
	var url = "https://poccommunity-api.herokuapp.com/feature_data"
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

function fillDetails(featureData) {
	$('#open-projects').html(featureData.project_count);
	$('#people-donated').html(featureData.people_donated);
	$('#overall-donated span').html(featureData.total_donated);
}

var featureData = new FeatureData(fetchData());

$(document).on('click', '#list-view-link', function(){
  $('#projects-container, .houzz-back-hero-project-container').show();
  $('#map-view').hide();
  $(this).addClass('active');
  $('#map-view-link').removeClass('active');
});

$(document).on('click', '#map-view-link', function(){
  $('#projects-container, .houzz-back-hero-project-container').hide();
  $('#map-view').show();
  $(this).addClass('active');
  $('#list-view-link').removeClass('active');
});



