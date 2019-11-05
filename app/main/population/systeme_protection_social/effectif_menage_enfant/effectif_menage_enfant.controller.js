(function ()
{
    'use strict';

    angular
        .module('app.population.environment_demo_socio.effectif_menage_enfant')
        .controller('Effectif_menage_enfantController', Effectif_menage_enfantController);

    /** @ngInject */
    function Effectif_menage_enfantController($scope, $mdDialog, apiFactory,$state)
    {
        /*********DEBUT INITIALISATION *********/
            var vm = this;
                vm.alldistrict = [];
                vm.allcommune  = [];
                vm.allregion   = [];

            
                vm.isDistrict = false;
                vm.isCommune  = false;
                vm.effectif_menage_enf = [];
                
                vm.filtre_menage_enf = {};            

        /*********FIN INITIALISATION*********/

        /*********DEBUT ONGLET EFFECTIF AGE SEXE*********/

        //style datatable
        vm.dtOptions = {
            dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth: true,
            responsive: false
        };

        //recuperation region
        apiFactory.getAll("region/index").then(function(result)
        {
            vm.allregion = result.data.response;    
        });

       /*********DEBUT ONGLET MENAGE ENFANT*********/

         //recuperation effectif menage ayant enfant
        vm.filtre_effectif_menage_enf= function(filtre)
        {   
            vm.affiche_load = true ;
            apiFactory.getAPIgeneraliserREST("Environment_demo_socio/index","menu","effectif_menage_enfant",
            "id_region",filtre.region_id,"id_district",filtre.district_id,"id_commune",filtre.commune_id).then(function(result)
            {
                vm.effectif_menage_enf = result.data.response;
                console.log(vm.effectif_menage_enf);
                vm.affiche_load = false ;
            });
        }

        //recuperation district par region
        vm.modifierregion = function(filtre)
        {            
            apiFactory.getAPIgeneraliserREST("district/index","cle_etrangere",filtre.region_id).then(function(result)
            {
              vm.filtre_menage_enf.district_id = '*' ;
              vm.alldistrict = result.data.response;

              vm.isDistrict = true;
            });
        }

        //recuperation commune par district
        vm.modifierdistrict = function(filtre)
        {   console.log(filtre.district_id);
            if (filtre.district_id!='*')
            {
                apiFactory.getAPIgeneraliserREST("commune/index","cle_etrangere",filtre.district_id).then(function(result)
                {
                  vm.filtre_menage_enf.commune_id = '*' ;
                  vm.allcommune = result.data.response; 
                  vm.isCommune = true;
                });
            }
            
        }

       /*********FIN ONGLET MENAGE ENFANT*********/

    }
})();
