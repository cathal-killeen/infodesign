angular.module('SubjectService', []).factory('Subjects', ['$http', '$location', function($http, $location) {
    var isLoaded = false;
    var subjects;
    var host = $location.host;
    $http.get('http://cathal-infodesign.herokuapp.com/results')
        .then(function(res){
            isLoaded = true;
            subjects = res.data;
        })

    var grades =            ["A1","A2","B1","B2","B3","C1","C2","C3","D1","D2","D3","E","F","NG"];
    var gradeUpperLimits =  [100,90,85,80,75,70,65,60,55,50,45,40,25,10];

    function Gender(grades){
        this.grades = grades;
        this.total = function(){
            var total = 0;
            var g = this.grades;
            Object.keys(g).forEach(function(key){
                total += g[key];
            })
            return total;
        }
        this.expected = function(){
            var combined = 0;
            var g = this.grades;
            var index = 0;
            Object.keys(g).forEach(function(key){
                combined += (g[key] * gradeUpperLimits[index]);
                index++;
            })
            var expectedValue = combined/this.total();
            return expectedValue;
        }
    }

    function Subject(name, data){
        this.name = name;
        this.category = data.Category;
        this.categoryNum = function(){
            var num = 0;
            switch (this.category) {
                case "Language":
                    num = 1;
                    break;
                case "Humanities":
                    num = 2;
                    break;
                case "Business":
                    num = 3;
                    break;
                case "STEM":
                    num = 4;
                    break;
                default:
                    num = 0;
            }
            return num;
        }
        this.male = new Gender(data.Male);
        this.female = new Gender(data.Female);
        this.total = this.male.total() + this.female.total();
        this.percent_male = (this.male.total()/this.total)*100;
        this.percent_female = (this.female.total()/this.total)*100;
    }


    return {
        get: function() {
            return new Promise(function(resolve, reject) {
                function check(){
                    if(isLoaded){
                        resolve(subjects);
                    }else{
                        window.setTimeout(check,100);
                    }
                }
                check();
            })
        },
        names: function() {
            var arr = [];
            Object.keys(subjects).forEach(function(key){
                arr.push(key);
            })
            return arr;
        },
        array: function(){
            var arr = [];
            Object.keys(subjects).forEach(function(key){
                arr.push(new Subject(key, subjects[key]));
            })
            return arr;
        }
    }

}]);
