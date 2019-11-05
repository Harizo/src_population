(function ()
{
    'use strict';

    angular
        .module('app.population.systeme_protection_social.repartition_age_sexe_beneficiaire')
        .controller('Repartition_age_sexe_beneficiaireController', Repartition_age_sexe_beneficiaireController);

    /** @ngInject */
    function Repartition_age_sexe_beneficiaireController($scope, $mdDialog, apiFactory,$state)
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

        //recuperation region
        apiFactory.getAll("region/index").then(function(result)
        {
            vm.allregion = result.data.response;    
        });
        apiFactory.getAll("intervention/index").then(function(result)
        {
            vm.allintervention = result.data.response;
            console.log(vm.allintervention);    
        });

        //recuperation effectif population
        vm.filtre_benefi_age_sexe= function(filtre)
        {   
            //var date_d= moment(filtre.date_debut).format('YYYY-MM-DD');
            vm.affiche_load = true ;
            apiFactory.getAPIgeneraliserREST("systeme_protection_social/index","menu","beneficiaire_sexe_age",
            "id_region",filtre.region_id,"id_district",filtre.district_id,"id_commune",filtre.commune_id,"id_intervention",filtre.intervention_id).then(function(result)
            {
                vm.beneficiaire_age_sexe = result.data.response;
                vm.affiche_load = false ;
                console.log(vm.beneficiaire_age_sexe);
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
        vm.modifiercommune = function(filtre)
        {   if (filtre.commune_id!='*')
            {
                apiFactory.getAPIgeneraliserREST("fokontany/index","cle_etrangere",filtre.commune_id).then(function(result)
                {
                  //vm.filtre.commune_id = null ;
                  vm.allfokontany = result.data.response; 
                  console.log(vm.allfokontany);
                });
            }
        }
       
       /*********FIN ONGLET EFFECTIF AGE SEXE*********/

    }
})();
