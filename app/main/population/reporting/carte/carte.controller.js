(function ()
{
    'use strict';

    angular
        .module('app.population.reporting.carte')
        .controller('carteController', carteController);

    /** @ngInject */
    function carteController($scope, $mdDialog, apiFactory,$state, apiUrlExcel, uiGmapGoogleMapApi)
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
              zoom  : 6
              //marker: vm.liste
          };

      });

    }
})();
