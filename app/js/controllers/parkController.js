


(function() {
    'use strict';

    angular
        .module('dogPark')               // update for each project
        .controller('parkController', function(API) {
            const vm = this;
            vm.park = null;
            vm.getPark = function(){
                let id = localStorage.getItem('park_id');
                let park = API.getPark(id);
                park.then(res=>{
                    vm.park = [res.data];
                    console.log("park",vm.park);
                    vm.slides = [];
                    vm.park.forEach(function(park){
                        park.images.forEach(function(imageUrl){
                        vm.slides.push({image: imageUrl});
                        })
                    })

                    setTimeout(()=>{
                        $('.bxslider').bxSlider();
                    },100)
                })
            }
            vm.getPark();

            let url = localStorage.getItem('url');

            let weather = API.getWeather(url);
            weather.then(response=>{
                vm.weather = response.data;
                console.log('vm.weather',vm.weather);
                vm.iconUrl = `https://openweathermap.org/img/w/${response.data.weather[0].icon}.png`;
                console.log(vm.iconUrl);
            });

   setTimeout(function(){
       console.log(vm.park)
            let lat = vm.park[0].location.lat;
            let long = vm.park[0].location.long;
            var mymap = L.map('singleMap').setView([lat, long], 12);

                                            // to change map style, change api.mapbox link
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5kcmV3LWhvZmZtYW5uIiwiYSI6ImNqMnRldmZiczAwZTUyd2p4eDZucTZrNWcifQ.sslzNqFtIz-EYetZS9dtQQ', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
        }).addTo(mymap);
         vm.park.forEach(function(park){
            let lat = park.location.lat;
            let long = park.location.long;
            console.log(lat,long);
            var marker = L.marker([lat, long]).addTo(mymap);
            marker.bindPopup(`<h4><b>${park.name}</b></h4><h6>${park.address}</h6>`).openPopup();
        })
                

        },1000)
            
        });
         
})();