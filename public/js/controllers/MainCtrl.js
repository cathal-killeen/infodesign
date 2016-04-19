angular.module('MainCtrl', []).controller('MainController', function($scope, Subjects) {

	$scope.tagline = 'To the moon and back!';

	Subjects.get().then(function(data) {
		var subjects = Subjects.array();
		console.log(subjects);

		var genDataPoints = function(){
			var arr = [];
			subjects.forEach(function(subject){
				arr.push({x:subject.percent_female, y: subject.categoryNum(), z: subject.total, name: subject.name, category: subject.category, roundPercent: subject.percent_female.toPrecision(3)});
			})
			return arr;
		}

		var chart = new CanvasJS.Chart("bubbleChartContainer",
		{
			animationEnabled: true,
			title:{
				text: "2015 Higher Level Leaving Cert Subject Enrollment"
			},
			axisX: {
				title:"Percent Female"
			},
			axisY:{
				valueFormatString: " ",
				tickColor: "transparent",
				maximum: 5,
				stripLines:[
					{
						value: 1,
						color:"#FFFFFF",
						label : "Languages",
						labelFontColor: "#000000",
					},
					{
						value:2,
						color:"#FFFFFF",
						label : "Humanities",
						labelFontColor: "#000000",
					},
					{
						value: 3,
						color:"#FFFFFF",
						label : "Business",
						labelFontColor: "#000000",
					},
					{
						value: 4,
						color:"#FFFFFF",
						label : "STEM",
						labelFontColor: "#000000",
					}
				]
			},
			legend:{
				verticalAlign: "bottom",
				horizontalAlign: "left"

			},
			data: [
				{
					type: "bubble",
					legendText: "Size of Bubble Represents Total Number of Students Enrolled",
					showInLegend: true,
					legendMarkerType: "circle",
					fillOpacity: 0.7,
					toolTipContent: "<strong>{name}</strong> <br/> Subject Category: {category}<br/> Percent Female Students: {roundPercent}%<br/> Total Students: {z}",
					dataPoints: genDataPoints()
				}
			]
		});

		chart.render();
	})




});
