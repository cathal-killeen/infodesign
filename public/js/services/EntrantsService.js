angular.module('EntrantsService', []).factory('Entrants', ['$http', '$location', function($http, $location) {
    function Field(data){
        this.male = data.Male;
        this.female = data.Female;
        this.name = data.Field;
        this.category = data.Category;
        this.total = this.male + this.female;
        this.percent_male = (this.male/this.total)*100;
        this.percent_female = (this.female/this.total)*100;
        this.category_num = function(){
            var num = 0;
            switch (this.category) {
                case "Generic programmes and qualifications":
                    num = 1;
                    break;
                case "Education":
                    num = 2;
                    break;
                case "Services":
                    num = 3;
                    break;
                case "Arts and humanities":
                    num = 4;
                    break;
                case "Social sciences, journalism and information":
                    num = 5;
                    break;
                case "Business, administration and law":
                    num = 6;
                    break;
                case "Natural sciences, mathematics and statistics":
                    num = 7;
                    break;
                case "Information and Communication Technologies (ICTs)":
                    num = 8;
                    break;
                case "Engineering, manufacturing and construction":
                    num = 9;
                    break;
                case "Agriculture, forestry, fisheries and veterinary":
                    num = 10;
                    break;
                case "Health and welfare":
                    num = 11;
                    break;
                default:
                    num = 0;
            }
            return num;
        }
    }

    function Category(name){
        this.name = name;
        this.fields = [];
        this.male = function() {
            var total = 0;
            this.fields.forEach(function(field){
                total += field.male;
            })
            return total;
        }
        this.female = function() {
            var total = 0;
            this.fields.forEach(function(field){
                total += field.female;
            })
            return total;
        }
        this.total = function(){
            return this.male() + this.female();
        }
        this.percent_male = function(){
            return (this.male()/this.total())*100;
        }
        this.percent_female = function(){
            return (this.female()/this.total)*100;
        }
    }

    var getFields = function() {
        return new Promise(function(resolve, reject) {
            $http.get('http://localhost:8080/entrants')
                .then(function(res){
                    var arr = [];
                    res.data.forEach(function(data){
                        arr.push(new Field(data));
                    })
                    resolve(arr);
            })
        })
    }

    return {
        get: function(){
            return getFields();
        },
        categories: function(){
            return new Promise(function(resolve, reject) {
                getFields().then(function(data){
                    var categories = [];
                    data.forEach(function(field){
                        var index = _.findIndex(categories, {name: field.category});
                        if(index == -1){
                            var newCat = new Category(field.category);
                            newCat.fields.push(field);
                            categories.push(newCat);
                        }else{
                            categories[index].fields.push(field);
                        }
                    })
                    resolve(categories);
                })
            })
        }
    }
}])
