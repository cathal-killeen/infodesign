angular.module('MainCtrl', []).controller('MainController', function($scope, Subjects) {

	$scope.tagline = 'To the moon and back!';

	Subjects.get().then(function(data) {
		$scope.$apply(function(){
			$scope.subjects = Subjects.array()
			$scope.selected = $scope.subjects[0];
		})
		console.log($scope.subjects);
		$scope.selectedSubject;

		var genDataPoints = function(){
			var arr = [];
			$scope.subjects.forEach(function(subject){
				arr.push({
					x:subject.percent_female,
					y: subject.categoryNum(),
					z: subject.total,
					name: subject.name,
					category: subject.category,
					roundPercent: subject.percent_female.toPrecision(3),
					numMale: subject.male.total(),
					numFemale: subject.female.total()});
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
					toolTipContent: "<strong>{name}</strong> <br/> Subject Category: {category}<br/>Percent Female: {roundPercent}%<br/>Male Students: {numMale} <br>Female Students: {numFemale} <br>Total Students: {z}",
					dataPoints: genDataPoints()
				}
			]
		});

		chart.render();

		var genMalePoints = function(subject){
			arr = [];
			var grades = subject.male.grades;
			Object.keys(grades).forEach(function(grade){
				percent = (grades[grade]/subject.male.total())*100;
				arr.push({label: grade, y: percent})
			})
			return arr;
		}

		var genFemalePoints = function(subject){
			arr = [];
			var grades = subject.female.grades;
			Object.keys(grades).forEach(function(grade){
				percent = (grades[grade]/subject.female.total())*100;
				arr.push({label: grade, y: percent})
			})
			return arr;
		}

		var spline = new CanvasJS.Chart("splineContainer",
		{
			title:{
				text: $scope.selected.name,
				titleFontFamily: "arial",
			},
			animationEnabled: true,
			axisY:{
				title: "Percentage",
				titleFontFamily: "arial",
				titleFontSize: 12,
				includeZero: false
			},
			toolTip: {
				shared: true
			},
			data: [
				{
					type: "spline",
					name: "Male",
					showInLegend: true,
					dataPoints: genMalePoints($scope.selected)
				},
				{
					type: "spline",
					name: "Female",
					showInLegend: true,
					dataPoints: genFemalePoints($scope.selected)
				}
			],
			legend:{
				cursor:"pointer",
				itemclick:function(e){
					if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
					}
					else {
						e.dataSeries.visible = true;
					}
					chart.render();
				}
			}
		});

		spline.render();

		$scope.$watch('selected', function(){
			console.log("Selected new");
			spline.options.title.text = $scope.selected.name;
			spline.options.data[0].dataPoints = genMalePoints($scope.selected);
			spline.options.data[1].dataPoints = genFemalePoints($scope.selected);
			spline.render();
		});
	})




});
