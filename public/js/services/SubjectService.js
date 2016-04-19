angular.module('SubjectService', []).factory('Subjects', ['$http', '$location', function($http, $location) {
    var subjects;
    var host = $location.host;
    $http.get('http://localhost:8080/results')
        .then(function(res){
            return res;
            console.log(res);
        })


    return {
        get: function(){
            $http.get('http://localhost:8080/results')
                .success(function(res){
                    console.log(res);
                    return res;
                })
        }
    }

}]);
