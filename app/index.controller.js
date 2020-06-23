(function ()
{
    'use strict';

    angular
        .module('fuse')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming, $interval, apiFactory, $cookieStore,loginService)
    {
        var vm = this;

        // Data
        vm.themes = fuseTheming.themes;
        var email = $cookieStore.get('email');

        if (email) 
        {
            $interval(function()
            {

                apiFactory.getParamsDynamic("utilisateurs/index?email_connection="+email+"&test_connection=1").then(function(result) 
                {
                    var resultat = result.data.response;
                    
                    if (resultat.etat_connexion == 0) 
                    {
                        loginService.logout();
                    }

                });
            },5000) ;
        }

       
        
    }
})();