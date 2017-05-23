(function() {
    'use strict';

    angular
        .module('dogPark')               // update for each project
        .controller('formController', function(API) {
            const vm = this;
            
            vm.addPark = function(valid){
                if(valid){
                    vm.park.images = [];
                    vm.park.images = vm.images.split(", ");
                    vm.park.location = {lat: vm.lat, long: vm.long};
                    let park = vm.park;
                    let newPark = Object.assign({}, park);
                    console.log(newPark);
                    let addnewPark = API.postPark(newPark);
                    addnewPark.then(res=>{
                        console.log(res);
                        vm.parks = res.data;
                        console.log(vm.parks);
                    })
                    vm.park = {};
                    vm.images= '';
                    vm.lat= '';
                    vm.long= '';
                } else {
                    alert('Incomplete form, please fill in all fields.');
                }
            }

        });
        
})();