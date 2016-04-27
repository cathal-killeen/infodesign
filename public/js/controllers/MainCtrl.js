angular.module('MainCtrl', []).controller('MainController', function($scope, Subjects, Entrants) {

	$scope.tagline = 'To the moon and back!';

	Entrants.categories().then(function(categories){
		$scope.categories = categories;
		console.log($scope.categories);

		var genMalePoints = function(){
			var arr = [];
			$scope.categories.forEach(function(category){
				arr.push({y: category.male(), label: category.name});
			})
			return arr;
		}

		var genFemalePoints = function(){
			var arr = [];
			$scope.categories.forEach(function(category){
				arr.push({y: category.female(), label: category.name});
			})
			return arr;
		}

		var femalePie = new CanvasJS.Chart("femalePie", {
			title:{
				text: "Female",
				verticalAlign: 'top',
				horizontalAlign: 'left'
			},
			animationEnabled: true,
			data: [
				{
					type: "doughnut",
					startAngle:20,
					toolTipContent: "{label}: {y} - <strong>#percent%</strong>",
					indexLabel: "{label} #percent%",
					dataPoints: genFemalePoints()
				}
			]
		});
		femalePie.render();

		var malePie = new CanvasJS.Chart("malePie", {
			title:{
				text: "Male",
				verticalAlign: 'top',
				horizontalAlign: 'left'
			},
			animationEnabled: true,
			data: [
				{
					type: "doughnut",
					startAngle:20,
					toolTipContent: "{label}: {y} - <strong>#percent%</strong>",
					indexLabel: "{label} #percent%",
					dataPoints: genMalePoints()
				}
			]
		});
		malePie.render();

		Entrants.get().then(function(entrants){
			$scope.entrants = entrants;
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
						roundPercent: field.percent_female.toPrecision(4),
						numMale: field.male,
						numFemale: field.female});
				})
				return arr;
			}

			var percentage = function(index){
				return $scope.categories[index].percent_female().toPrecision(3);
			}

			var entrants = new CanvasJS.Chart("entrantsChart",
			{
				animationEnabled: true,
				title:{
					text: "2014/15 University Undergraduate Entrants",
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
							label : "Generic programmes and qualifications, " + percentage(0) + "%",
							labelFontColor: "#000000",
						},
						{
							value: 2.1,
							color:"#FFFFFF",
							label : "Education, " + percentage(1) + "%",
							labelFontColor: "#000000",
						},
						{
							value: 3.1,
							color:"#FFFFFF",
							label : "Services, " + percentage(2) + "%",
							labelFontColor: "#000000",
						},
						{
							value: 4.1,
							color:"#FFFFFF",
							label : "Arts and humanities, " + percentage(3) + "%",
							labelFontColor: "#000000",
						},
						{
							value: 5.1,
							color:"#FFFFFF",
							label : "Social sciences, journalism and information, " + percentage(4) + "%",
							labelFontColor: "#000000",
						},
						{
							value: 6.1,
							color:"#FFFFFF",
							label : "Business, administration and law, " + percentage(5) + "%",
							labelFontColor: "#000000",
						},
						{
							value: 7.1,
							color:"#FFFFFF",
							label : "Natural sciences, mathematics and statistics, " + percentage(6) + "%",
							labelFontColor: "#000000",
						},
						{
							value: 8.1,
							color:"#FFFFFF",
							label : "Information and Communication Technologies (ICTs), " + percentage(7) + "%",
							labelFontColor: "#000000",
						},
						{
							value: 9.1,
							color:"#FFFFFF",
							label : "Engineering, manufacturing and construction, " + percentage(8) + "%",
							labelFontColor: "#000000",
						},
						{
							value: 10.1,
							color:"#FFFFFF",
							label : "Agriculture, forestry, fisheries and veterinary, " + percentage(9) + "%",
							labelFontColor: "#000000",
						},
						{
							value: 11.1,
							color:"#FFFFFF",
							label : "Health and welfare, " + percentage(10) + "%",
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



		});

	});

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
				text: "2015 Higher Level Leaving Cert Subject Enrollment",
				fontSize: 30
			},
			axisX: {
				title:"Percent Female",
				fontFamily: "arial",
				labelFontSize: 20,
				titleFontSize: 20,
				maximum: 100,
				minimum: 0
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
				horizontalAlign: "left",
				fontSize: 15
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
