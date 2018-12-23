function FeatureData(json) {
    this.projects = json["featureData"]["projects"];
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

