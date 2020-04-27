(function ()
{
    'use strict';

    angular
        .module('app.population.reporting.carte')
        .controller('carteController', carteController);

    /** @ngInject */
    function carteController($scope, $mdDialog, apiFactory,$state, apiUrlExcel, uiGmapGoogleMapApi,$cookieStore)
    {

      var vm = this ;
        uiGmapGoogleMapApi.then(function (maps)
        {

          vm.map = 
          {
              center: {
                  latitude : -18.881728,
                  longitude: 47.510447
              },
              zoom  : 6/*,
              events: { 
                  click: function(latLng)
                  { 
                  console.log(latLng); 

                  },
                  mouseover: function(gPoly, eventName, polyModel, latLngArgs) {
                                       console.log("mouseover ok");
                  },
                  mouseout: function(gPoly, eventName, polyModel, latLngArgs) {

                    console.log("mouseout ok");
                    console.log(latLngArgs);
                  }
                }*/
              //marker: vm.liste
          };

          vm.sss = function(){console.log('okokok');}

          var id_user = $cookieStore.get('id');

          apiFactory.getAll("commune/index").then(function(result) 
          {
            console.log(result.data.response);  
            vm.polylines = [];    



            vm.all_commune = result.data.response ;

            angular.forEach(vm.all_commune, function(value, key)
            {
              

              var item = 
              {
                id: value.id ,
                path:value.coordonnees,
                stroke: {
                    color: '#7f421e',
                    weight: 2
                },                  
                fill: {
                    
                    opacity: 0,
                    color:'#f2650e'
                     
                },
                events: { 
                  click: function(event)
                  { 
                  console.log(value.id); 

                  },
                  mouseover: function(gPoly, eventName, polyModel, latLngArgs) {
                    polyModel.fill.opacity = '0.5';
                   console.log("mouseover ok");
                  },
                  mouseout: function(gPoly, eventName, polyModel, latLngArgs) {
                    polyModel.fill.opacity = '0';
                    console.log("mouseout ok");
                    console.log(latLngArgs);
                  }
                }
              };

            
                vm.polylines.push(item);
              
              console.log(vm.polylines);
              
            });


          });

      });

        

    

    }
})();
