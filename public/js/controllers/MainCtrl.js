angular.module('MainCtrl', []).controller('MainController', function($scope, Subjects) {

	$scope.tagline = 'To the moon and back!';

	Subjects.get().then(function(data) {
		var subjects = Subjects.array();
		console.log(subjects);

		var genDataPoints = function(){
			var arr = [];
			subjects.forEach(function(subject){
				arr.push({x:subject.percent_female, y: 1, z: subject.total, name: subject.name});
			})
			return arr;
		}

		var chart = new CanvasJS.Chart("bubbleChartContainer",
		{
			title:{
				text: "2015 Higher Level Leaving Cert Subject Enrollment"
			},
			axisX: {
				title:"Percent Female"
			},
			axisY: {
				title:"Fertility Rate"
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
					toolTipContent: "<strong>{name}</strong> <br/> Subject Category: {y}<br/> Percentage Female Students: {x}%<br/> Total Students: {z}",
					dataPoints: genDataPoints()
				}
			]
		});

		chart.render();
	})




});
