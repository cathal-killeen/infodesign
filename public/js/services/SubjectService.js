angular.module('SubjectService', []).factory('Subjects', ['$http', '$location', function($http, $location) {
    var isLoaded = false;
    var subjects;
    var host = $location.host;
    $http.get('http://localhost:8080/results')
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
            var total = 0;
            Object.keys(g).forEach(function(key){
                total += g[key] * gradeUpperLimits[index];
            })
            total = total/this.total;
            for(var i=1;i<gradeUpperLimits.length;i++){
                if(total > gradeUpperLimits[i]){
                    return grades[i-1];
                }
                return grades[i];
            }
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
