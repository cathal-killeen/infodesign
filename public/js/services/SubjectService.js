angular.module('SubjectService', []).factory('Subjects', ['$http', '$location', function($http, $location) {
    var isLoaded = false;
    var subjects;
    var host = $location.host;
    $http.get('http://localhost:8080/results')
        .then(function(res){
            isLoaded = true;
            subjects = res.data;
        })

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
    }

    function Subject(name, genders){
        this.name = name;
        this.male = new Gender(genders.Male);
        this.female = new Gender(genders.Female);
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
