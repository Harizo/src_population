(function ()
{
    'use strict';

    angular
        .module('app.population.administration', 
            [
                'app.population.administration.utilisateur',
                'app.population.administration.profil'
            ])
        .run(testPermission)        
        .config(config);
        var vs ;

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        msNavigationServiceProvider.saveItem('population.administration', {
            title : 'Administration',
            icon  : 'icon-camera-iris',
            weight: 1/*,
            hidden: function()
            {
                    return vs;
            }*/
        });

        msNavigationServiceProvider.saveItem('population.administration.utilisateurs', {
            title: 'Utilisateurs',
            icon  : 'icon-account-multiple'
            //state: 'app.population_administration_secteur'
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
                var permissions = ["ADMIN"];
                var x =  loginService.gestionMenu(permissions,permission);        
                vs = x ;
              

            });
        }
     
    }

})();
