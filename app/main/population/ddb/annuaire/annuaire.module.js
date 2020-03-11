(function ()
{
    'use strict';

    angular
        .module('app.population.ddb.annuaire', [])
        .run(testPermission)        
        .config(config);
        var vs ;

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.population_ddb_annuaire', {
            url      : '/donnees-de-base/annuaire',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/population/ddb/annuaire/annuaire.html',
                    controller : 'AnnuaireController as vm'
                }
            },
            bodyClass: 'annuaire',
            data : {
              authorizer : true,
              permitted : ["USER","PERSONNEL","ADMIN"],
              page: "Annuaire Intervention"
            }

        });
        // Navigation
        msNavigationServiceProvider.saveItem('population.annuaire', {
            title: 'Annuaire Intervention',
            icon  : 'icon-swap-horizontal',
            state: 'app.population_ddb_annuaire',
			weight: 7,
            hidden: function()
            {
                    return vs;
            }
        });
    }

    function testPermission(loginService,$cookieStore,apiFactory)
    {
        var id_user = $cookieStore.get('id');
       
        var permission = [];
        if (id_user) 
        {
            apiFactory.getOne("utilisateurs/index", id_user).then(function(result) 
            {
                var user = result.data.response;
                var permission = user.roles;
                var permissions =   [
                                        "SPR_ADM",//administration
                                        "ANR_INT"
                                    ];
                var x =  loginService.gestionMenu(permissions,permission);        
                vs = x ;
              

            });
        }
     
    }

})();
