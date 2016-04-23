angular.module('MainCtrl', []).controller('MainController', function($scope, Subjects, Entrants) {

	$scope.tagline = 'To the moon and back!';

	Entrants.categories().then(function(data){
		$scope.categories = data;
		console.log($scope.categories);
	});

	Entrants.get().then(function(data){
		$scope.entrants = data;
		console.log($scope.entrants)

		var genEntrantPoints = function(){
			var arr = [];
			$scope.entrants.forEach(function(field){
				arr.push({
					x: field.percent_female,
					y: field.category_num(),
					z: field.total,
					name: field.name,
					category: field.category,
					roundPercent: field.percent_female.toPrecision(3),
					numMale: field.male,
					numFemale: field.female});
			})
			return arr;
		}

		var entrants = new CanvasJS.Chart("entrantsChart",
		{
			animationEnabled: true,
			title:{
				text: "2014/15 University Undergraduate Entrants",
				fontFamily: "arial",
				fontSize: 40
			},
			axisX: {
				title:"Percent Female",
				fontFamily: "arial",
				labelFontSize: 20,
				titleFontSize: 20,
				maximum: 100
			},
			axisY:{
				valueFormatString: " ",
				tickColor: "transparent",
				maximum: 12,
				stripLines:[
					{
						value: 1.1,
						color:"#FFFFFF",
						label : "Generic programmes and qualifications",
						labelFontColor: "#000000",
					},
					{
						value: 2.1,
						color:"#FFFFFF",
						label : "Education",
						labelFontColor: "#000000",
					},
					{
						value: 3.1,
						color:"#FFFFFF",
						label : "Services",
						labelFontColor: "#000000",
					},
					{
						value: 4.1,
						color:"#FFFFFF",
						label : "Arts and humanities",
						labelFontColor: "#000000",
					},
					{
						value: 5.1,
						color:"#FFFFFF",
						label : "Social sciences, journalism and information",
						labelFontColor: "#000000",
					},
					{
						value: 6.1,
						color:"#FFFFFF",
						label : "Business, administration and law",
						labelFontColor: "#000000",
					},
					{
						value: 7.1,
						color:"#FFFFFF",
						label : "Natural sciences, mathematics and statistics",
						labelFontColor: "#000000",
					},
					{
						value: 8.1,
						color:"#FFFFFF",
						label : "Information and Communication Technologies (ICTs)",
						labelFontColor: "#000000",
					},
					{
						value: 9.1,
						color:"#FFFFFF",
						label : "Engineering, manufacturing and construction",
						labelFontColor: "#000000",
					},
					{
						value: 10.1,
						color:"#FFFFFF",
						label : "Agriculture, forestry, fisheries and veterinary",
						labelFontColor: "#000000",
					},
					{
						value: 11.1,
						color:"#FFFFFF",
						label : "Health and welfare",
						labelFontColor: "#000000",
					}
				]
			},
			legend:{
				verticalAlign: "bottom",
				horizontalAlign: "left",
				fontSize: 20
			},
			data: [
				{
					type: "bubble",
					legendText: "Size of Bubble Represents Total Number of Students Enrolled",
					showInLegend: true,
					legendMarkerType: "circle",
					fillOpacity: 0.7,
					toolTipContent: "<strong>{name}</strong> <br/>Category: {category}<br/>Percent Female: {roundPercent}%<br/>Male Students: {numMale} <br>Female Students: {numFemale} <br>Total Students: {z}",
					dataPoints: genEntrantPoints()
				}
			]
		});

		entrants.render();



	})

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
				interval: 1,
				stripLines:[
					{
						value: 1.1,
						color:"#FFFFFF",
						label : "Languages",
						labelFontColor: "#000000",
					},
					{
						value:2.1,
						color:"#FFFFFF",
						label : "Humanities",
						labelFontColor: "#000000",
					},
					{
						value: 3.1,
						color:"#FFFFFF",
						label : "Business",
						labelFontColor: "#000000",
					},
					{
						value: 4.1,
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
