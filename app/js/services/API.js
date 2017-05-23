(function() {
    'use strict';

    angular
        .module('dogPark')
        .factory('API', function($http){

            return{
                postPark:(data)=>{                     // create a park.  update "park", based on '/park' from index.js
                    return $http({
                        method:"POST",
						data:data,
                        url:`https://doggydatesbackend.herokuapp.com/park`    
                    })
                },

                getPark:(id)=>{                             // get a single park
                    return $http({
                        method:"GET",
                        url:`https://doggydatesbackend.herokuapp.com/park/${id}`    
                    })
                },

                getParks:()=>{                          // get all parks
                    return $http({
                        method:"GET",
                        url:`https://doggydatesbackend.herokuapp.com/park`    
                    })
                },

                deletePark:(id)=>{                          // delete a single parkß
                    return $http({
                        method:"DELETE",
                        url:`https://doggydatesbackend.herokuapp.com/park/${id}`    
                    })
                },

                getWeather: (url) => {                      // weather 
                    return $http({
                        type:"GET",
                        url: url,
                    })
                },
                
            }

         });
        
})();