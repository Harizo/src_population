(function ()
{
    'use strict';

    angular
        .module('app.population.importationdonnees', [			
           'app.population.importationdonnees.importationbeneficiaire',
           'app.population.importationdonnees.importationintervention',
            ])
         .run(testPermission)
         .run(Donnees_non_importees)
        .config(config);
        var vs ;
		var nombre_non_importes={};

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        msNavigationServiceProvider.saveItem('population.importationdonnees', {
            title : 'Importation données',
            icon  : 'icon-data',
            weight: 6/*,
            hidden: function()
            {
                    return vs;
            }*/,
            badge: nombre_non_importes
        });


    }

    function testPermission(loginService,$cookieStore,apiFactory)
    {
        var id_user = $cookieStore.get('id');
       
        var permission = [];
        if (id_user > 0) 
        {
            apiFactory.getOne("utilisateurs/index", id_user).then(function(result) 
            {
                var user = result.data.response;
               

                var permission = user.roles;
                var permissions = ["IMP"];
                var x =  loginService.gestionMenu(permissions,permission);        
                vs = x ;

            });
        }
     
    }
	function Donnees_non_importees(loginService,$cookieStore,apiFactory,apiUrl) {
		var bla = $.post(apiUrl + "importationbeneficiaire/recuperer_nombre_liste_fichier_non_importes",{
			},function(data) {  
				var x = data;
				nombre_non_importes.content = x ;
				nombre_non_importes.color = '#F44336' ;
			});
	}
})();
