(function() {
    'use strict';

    angular
        .module('dogPark')               // update for each project
        .controller('mainController', function(API, $auth) {
            const vm = this;
            vm.parks = null;
            let parks = API.getParks();
            parks.then(res=>{
                vm.parks = res.data;
                console.log(vm.parks);
            })

        vm.setPark = function(id){
            localStorage.setItem('park_id', id);
        }

        let user = $auth.getPayload();

         vm.authenticate = function(provider) {
            $auth.authenticate(provider);
        };

        vm.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

        vm.logout = function(){
        $auth.logout();
        }
        
        vm.isAndy = function(){

            if(user && user.sub == '591f4769cb15081f9078a1df'){ // my id from mLab
                return true;
            }
            return false;
        }
        vm.setWeather = function(lat,long){
                let weatherLat = lat;
                let weatherLong = long;
                var url = `http://api.openweathermap.org/data/2.5/weather?lat=${weatherLat}&lon=${weatherLong}&units=imperial&APPID=44ff95e6e64e7414cbcc6712d5d39d21`;
                localStorage.setItem('url', url);
                console.log(url);
        }
 
                                            // current default map center: Blue Ash 39.231866, -84.378428
        setTimeout(function(){
            var mymap = L.map('allMap').setView([39.231866, -84.378428], 10);

                                            // to change map style, change api.mapbox link
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmV3LWhvZmZtYW5uIiwiYSI6ImNqMnRldmZiczAwZTUyd2p4eDZucTZrNWcifQ.sslzNqFtIz-EYetZS9dtQQ', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
        }).addTo(mymap);
         vm.parks.forEach(function(park){
            let lat = park.location.lat;
            let long = park.location.long;
            var marker = L.marker([lat, long]).addTo(mymap);
            marker.bindPopup(`<h4><b>${park.name}</b></h4><h6>${park.address}</h6>`);
        })
        },1000)

        });
        
})();
