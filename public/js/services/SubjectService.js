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
            Object.keys(this.grades).forEach(function(key){
                total += this.grades[key];
            })
            return total;
        }
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
        }
    }

}]);
