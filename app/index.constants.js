(function ()
{
    "use strict";

    angular
        .module("fuse")
		.constant("apiUrl", "http://localhost/2019/population/api/index.php/api/")
		.constant("apiUrlbase", "http://localhost/2019/population/")
		.constant("apiUrlvalidationbeneficiaire", "validationdonnees/beneficiaire/")
		.constant("apiUrlvalidationintervention", "validationdonnees/intervention/")
		.constant("apiUrlrecommandation", "recommandation/");
		
	/*	.constant("apiUrl", "http://192.168.88.200/2019/population/api/index.php/api/")
		.constant("apiUrlbase", "http://192.168.88.200/2019/population/")
		.constant("apiUrlvalidation", "http://192.168.88.200/2019/population/validationdonnees/")
		.constant("apiUrlrecommandation", "http://192.168.88.200/2019/population/recommandation/")
		.constant("apiUrlvalidationbeneficiaire", "http://192.168.88.200/2019/population/validationdonnees/beneficiaire/")
		.constant("apiUrlvalidationintervention", "http://192.168.88.200/2019/population/validationdonnees/intervention/");*/
		
   /* 	.constant("apiUrl", "http://196.192.38.40/2019/population/api/index.php/api/")
		.constant("apiUrlbase", "http://196.192.38.40/2019/population/")
		.constant("apiUrlvalidation", "http://196.192.38.40/2019/population/validationdonnees/")
		.constant("apiUrlrecommandation", "http://196.192.38.40/2019/population/recommandation/");
		.constant("apiUrlvalidationbeneficiaire", "http://196.192.38.40/2019/population/validationdonnees/beneficiaire/")
		.constant("apiUrlvalidationintervention", "http://196.192.38.40/2019/population/validationdonnees/intervention/");*/
		
		/*.constant("apiUrl", "http://192.168.88.186:8080/2019/population/api/index.php/api/")
		.constant("apiUrlbase", "http://192.168.88.186:8080/2019/population/")
		.constant("apiUrlvalidation", "http://192.168.88.186:8080/2019/population/validationdonnees/")
		.constant("apiUrlrecommandation", "http://192.168.88.186:8080/2019/population/recommandation/")
		.constant("apiUrlvalidationbeneficiaire", "http://192.168.88.186:8080/2019/population/validationdonnees/beneficiaire/")
		.constant("apiUrlvalidationintervention", "http://192.168.88.186:8080/2019/population/validationdonnees/intervention/");*/

		
})();
