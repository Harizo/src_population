(function ()
{
    "use strict";

    angular
        .module("fuse")

		/*.constant("apiUrl", "http://localhost/2019/population/api/index.php/api/")
		.constant("apiUrlbase", "http://localhost/2019/population/")
		.constant('apiUrlExcel', "http://localhost/2019/population/exportexcel/")*/
		
		/* SERVEUR LOCAL ASTRUM*/
		/*.constant("apiUrl", "http://192.168.88.200/2019/population/api/index.php/api/")
		.constant("apiUrlbase", "http://192.168.88.200/2019/population/")
		.constant('apiUrlExcel', "http://192.168.88.200/2019/population/exportexcel/")*/
		/*FIN SERVEUR LOCAL ASTRUM*/


		/* AUTRE SERVEUR */
		.constant("apiUrl", "http://192.168.1.209/2019/population/api/index.php/api/")
		.constant("apiUrlbase", "http://192.168.1.209/2019/population/")
		.constant('apiUrlExcel', "http://192.168.1.209/2019/population/exportexcel/")
		/*FIN AUTRE SERVEUR */


		.constant("apiUrlvalidationbeneficiaire", "validationdonnees/beneficiaire/")
		.constant("apiUrlvalidationintervention", "validationdonnees/intervention/")
		.constant("apiUrlrecommandation", "recommandation/");

		
})();
