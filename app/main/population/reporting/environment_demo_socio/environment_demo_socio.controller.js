(function ()
{
    'use strict';

    angular
        .module('app.population.reporting.environment_demo_socio')
        .controller('Environment_demo_socioController', Environment_demo_socioController);

    /** @ngInject */
    function Environment_demo_socioController($scope, $mdDialog, apiFactory,$state)
    {
        /*********DEBUT INITIALISATION *********/
            var vm = this;
                vm.isDistrict = false;
                vm.isCommune  = false;
                vm.affiche_load = false ;
                vm.effectif_age_sexe = [];
                
                vm.filtre      = {};
                vm.alldistrict = [];
                vm.allcommune  = [];
                vm.allregion   = [];

        /*********DEBUT ONGLET EFFECTIF AGE SEXE*********/

        //style datatable
        vm.dtOptions = {
            dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth: true,
            responsive: false
        };

        vm.pivots = [
        {titre:"Effectif par age/sexe de la population",id:"effectif_population_petitenfan_agesco_agetrava_agee_region_dist_comm"},
        {titre:"Effectif manage ayant enfant",id:"effectif_menage_enfant_menagenfan_menagescolai_region_dist_comm"},
       
        
      ];

        //recuperation region
        apiFactory.getAll("region/index").then(function(result)
        {
            vm.allregion = result.data.response;    
        });

        //recuperation effectif population
        vm.filtrer= function(filtre)
        {   
            //var date_d= moment(filtre.date_debut).format('YYYY-MM-DD');
            vm.affiche_load = true ;
            apiFactory.getAPIgeneraliserREST("Environment_demo_socio/index","menu",filtre.pivot,
            "id_region",filtre.region_id,"id_district",filtre.district_id,"id_commune",filtre.commune_id).then(function(result)
            {
                vm.datas = result.data.response;
                vm.affiche_load = false ;
                console.log(vm.effectif_age_sexe);
            });
        }


        //recuperation district par region
        vm.modifierregion = function(filtre)
        {            
            apiFactory.getAPIgeneraliserREST("district/index","cle_etrangere",filtre.region_id).then(function(result)
            {
              vm.filtre.district_id = '*' ;
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
                  vm.filtre.commune_id = '*' ;
                  vm.allcommune = result.data.response; 
                  vm.isCommune = true;
                });
            }
            
        }

        vm.cacher_table = function(mot_a_cherecher,string)
      	{
          	if (!string) 
          	{
            string = "" ;
          	}
          	var res = string.indexOf(mot_a_cherecher);
          	if (res != -1) 
          	{
            return true ;
          	}
         	else
          	{
            return false ;
          	}
      	}
       
       /*********FIN ONGLET EFFECTIF AGE SEXE*********/

    }
})();
