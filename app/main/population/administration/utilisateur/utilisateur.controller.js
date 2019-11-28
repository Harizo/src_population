(function ()
{
    'use strict';

    angular
        .module('app.population.administration.utilisateur')
        .controller('UserController', UserController);

    /** @ngInject */
    function UserController(apiFactory, $location, $mdDialog, $scope,$cookieStore)  {
		var vm = this;
		vm.allSite = [];
		vm.selectedItem = {} ;
		vm.infoAssuj = {} ;
		vm.all_region =[];
		vm.all_district =[];
		vm.all_commune =[];
		vm.all_fokontany =[];
		vm.all_intervention =[];
		vm.NouvelItem = false;
		vm.titre="Nouveau utilisateur";
		vm.afficherboutonnouveau = 1 ;
		vm.afficherboutonModifSupr = 0 ;
		vm.afficherliste =1;
		// Récupérer via cookies id utilisateur
		vm.id_utilisateur =$cookieStore.get('id');
		vm.column = [{"titre":"Nom"},{"titre":"Prénom"},{"titre":"Email"},
		{"titre":"Etat"},{"titre":"Envoi des données"},{"titre":"Privilège"}];

		vm.dtOptions = {
			dom       : '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
			pagingType: 'simple',
			autoWidth : false,
			responsive: true
		};
		apiFactory.getAll("utilisateurs/index").then(function(result) {
			vm.listes_utilisateurs = result.data.response;
		});
		apiFactory.getAll("region/index").then(function(result) { 
			vm.all_region = result.data.response;    
		});
		apiFactory.getAll("intervention/index").then(function(result) { 
			vm.all_intervention = result.data.response;    
		});
		//add historique : consultation DDB annuaire d'intervention
		var config = {
			headers : {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
			}
		};
		var datas = $.param({
			action:"Consultation Administration / Utilisateurs / Gestion utilisateur",
			id_utilisateur:vm.id_utilisateur
		});
		//factory
		apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
		});				
		vm.formatMillier = function (nombre) {
            if (typeof nombre != 'undefined' && parseInt(nombre) >= 0) {
                nombre += '';
                var sep = ' ';
                var reg = /(\d+)(\d{3})/;
                while (reg.test(nombre)) {
                    nombre = nombre.replace(reg, '$1' + sep + '$2');
                }
                return nombre;
            } else {
                return "";
            }
		}      
		vm.sexe = function (s)  {
			var x = Number(s);
			switch(x)  {
				case 1:  {
					return "Mr";
					break;
				}
				case 0: {
					return "Mme";
					break;
				}
				default: {
					return "Mr/Mme ...?";
					break;
				}
			}
		}
		vm.filtre_region = function() {
			apiFactory.getAPIgeneraliserREST("district/index","cle_etrangere",vm.user.id_region).then(function(result) { 
				vm.all_district = result.data.response;   
				vm.user.id_district = null ; 
				vm.user.id_commune = null ; 
				vm.user.id_fokontany = null ; 
			});
		}
		vm.filtre_commune = function() {
			apiFactory.getAPIgeneraliserREST("commune/index","cle_etrangere",vm.user.id_district).then(function(result) { 
				vm.all_commune = result.data.response; 
				vm.user.id_commune = null ; 
				vm.user.id_fokontany = null ; 
			});
		}
		vm.filtre_fokontany = function() {
			apiFactory.getAPIgeneraliserREST("fokontany/index","cle_etrangere",vm.user.id_commune).then(function(result) { 
				vm.all_fokontany = result.data.response;    
				vm.user.id_fokontany = null ;          
			});
		}
		vm.selection = function (item) {        
			vm.selectedItem = item; 
			// vm.nouvelItem = item;
			//currentItem = JSON.parse(JSON.stringify(vm.selectedItem));
			vm.afficherboutonModifSupr = 1 ;
			vm.user = {} ;
			vm.affichageMasque = 0 ;       
		};
		$scope.$watch('vm.selectedItem', function() {
			if (!vm.listes_utilisateurs) return;
			vm.listes_utilisateurs.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItem.$selected = true;
		});
		vm.annuler = function()  {
			vm.user = {} ;
			vm.affichageMasque = 0 ;
			vm.afficherboutonnouveau = 1 ;
			vm.afficherboutonModifSupr =0;
			vm.NouvelItem =false;
			vm.afficherliste =1;
			vm.selectedItem={};
		}     
		function loadAll()  {
			var repos = vm.assujettis ;
			return repos.map( function (repo) {
				repo.value = repo.nom.toLowerCase();      
				return repo;
			});
		}
		function loadAllforPersonnel()  {
			var repos = vm.personnels ;
			return repos.map( function (repo) {
				repo.value = repo.nom.toLowerCase();     
				return repo;
			});
		}
		vm.changerAssujettis = function (item) {
			vm.infoAssuj = item ;
		}
      vm.changerPers = function (item) {
          vm.pers = item ;
      }
        // Fonction utilisées par balise autocomplete
        vm.querySearch = function  (query) {
            vm.repos = loadAll();
          var results = query ? vm.repos.filter( createFilterFor(query) ) : vm.repos,
              deferred;
          if (vm.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
          } else {
            return results;
          }
        }
        vm.querySearchPersonnel = function  (query) {
            vm.reposPers = loadAllforPersonnel();
          var results = query ? vm.reposPers.filter( createFilterFor(query) ) : vm.reposPers,
              deferred;
          if (vm.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
          } else {
            return results;
          }
        }
        function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);
          return function filterFn(item) {
            return (item.value.indexOf(lowercaseQuery) === 0);
          };
        }
		vm.testEnabled = function(valeur) {
          switch(valeur) {
              case '1':  {
                  return 'Actif' ;
                  break;
              }
              case '0':  {
                  return 'Inactif' ;
                  break;
              }
              case '2':  {
                  return 'Suspendu' ;
                  break;
              }
              default : {
                  return 'Inactif' ;
                  break;
              }
          }
		}
        vm.ajouterUtilisateur = function () {
			vm.titre="Nouveau utilisateur";
			vm.affichageMasquefinancementprogramme = 1 ;
			vm.afficherboutonnouveau = 0 ;
			vm.afficherboutonModifSupr =0;
			vm.affichageMasque = 1 ;
			vm.afficherliste =0;
			vm.user.id=0;
			vm.user.nom=null;
			vm.user.user=true;
			vm.user.prenom=null;
			vm.user.email=null;
			vm.user.enabled=1;
			vm.user.sigle=null;
			vm.user.envoi_donnees=null;
			vm.user.password=null;
			vm.user.default_password=1;
			vm.user.id_region=null;
			vm.user.id_district=null;
			vm.user.id_commune=null;
			vm.user.id_fokontany=null;
			vm.user.id_intervention=null;
			vm.user.piece_identite= null;
			vm.user.adresse= null;               
			vm.user.fonction=null;                 
			vm.user.telephone= null;                 
			vm.user.raison_sociale= null;                 
			vm.user.adresse_hote= null;             
			vm.user.nom_responsable= null;                 
			vm.user.fonction_responsable= null;
			vm.user.email_hote= null;
			vm.user.telephone_hote= null;
			vm.user.description_hote= null;
			vm.user.user=true;
			vm.user.ddb=false;
			vm.user.admin=false;
			vm.user.ajout=false;
			vm.user.modif=false;
			vm.user.suppr=false;
			vm.user.imp=false;
			vm.user.vld=false;
			vm.NouvelItem = true ;			
        };
		vm.modifier = function()   {
			vm.NouvelItem = false ;	
			vm.titre="Modification utilisateur";
			vm.affichageMasque = 1 ;
			vm.afficherboutonnouveau =0;
			vm.afficherboutonModifSupr =0;
			vm.afficherliste =0;
			vm.user.id = vm.selectedItem.id ;
			vm.user.nom = vm.selectedItem.nom ;
			vm.user.prenom = vm.selectedItem.prenom ;
			vm.user.email = vm.selectedItem.email ;
			vm.user.enabled = vm.selectedItem.enabled ;
			vm.user.sigle = vm.selectedItem.sigle ;
			vm.user.password = vm.selectedItem.password ;
			vm.user.default_password = parseInt(vm.selectedItem.default_password) ;
			vm.user.envoi_donnees = parseInt(vm.selectedItem.envoi_donnees) ;      
			vm.searchText="";
			vm.searchTextPers=""; 
			if(vm.selectedItem.id_region) {
				vm.user.id_region=parseInt(vm.selectedItem.id_region);
			} else vm.user.id_region=null;
			if(vm.selectedItem.id_district) {
				if(vm.selectedItem.id_region) {
					apiFactory.getAPIgeneraliserREST("district/index","cle_etrangere",vm.selectedItem.id_region).then(function(result) { 
						vm.all_district = result.data.response;   
					});					
				}
				vm.user.id_district=parseInt(vm.selectedItem.id_district);
			} else vm.user.id_district=null;
			if(vm.selectedItem.id_commune) {
				if(vm.selectedItem.id_district) {
					apiFactory.getAPIgeneraliserREST("commune/index","cle_etrangere",vm.selectedItem.id_district).then(function(result) { 
						vm.all_commune = result.data.response; 
					});
				}	
				vm.user.id_commune=parseInt(vm.selectedItem.id_commune);
			} else vm.user.id_commune=null;
			if(vm.selectedItem.id_fokontany) {
				if(vm.selectedItem.id_commune) {
					apiFactory.getAPIgeneraliserREST("fokontany/index","cle_etrangere",vm.selectedItem.id_commune).then(function(result) { 
						vm.all_fokontany = result.data.response; 
					});
				}	
				vm.user.id_fokontany=parseInt(vm.selectedItem.id_fokontany);
			} else vm.user.id_fokontany=null;
			if(vm.selectedItem.id_intervention) {
				vm.user.id_intervention=parseInt(vm.selectedItem.id_intervention);
			} else vm.user.id_intervention=null;
			vm.user.piece_identite= vm.selectedItem.piece_identite;
			vm.user.adresse= vm.selectedItem.adresse;               
			vm.user.fonction= vm.selectedItem.fonction;                 
			vm.user.telephone= vm.selectedItem.telephone;                 
			vm.user.raison_sociale= vm.selectedItem.raison_sociale;                 
			vm.user.adresse_hote= vm.selectedItem.adresse_hote;             
			vm.user.nom_responsable= vm.selectedItem.nom_responsable;                 
			vm.user.fonction_responsable= vm.selectedItem.fonction_responsable;
			vm.user.email_hote= vm.selectedItem.email_hote;
			vm.user.telephone_hote= vm.selectedItem.telephone_hote;
			vm.user.description_hote= vm.selectedItem.description_hote;
			angular.forEach(vm.selectedItem.roles, function(value, key)  {           
				switch(value)   {
					case 'USER':  {
                      vm.user.user = true ;
                      break ;
					}
					case 'DDB':  {
                      vm.user.ddb = true ;
                      break ;
					}
					case 'ADMIN' :  {
                      vm.user.admin = true ;
                      break;
					}
					case 'IMP': {
                      vm.user.imp = true ;
                      break;
					}
					case 'VLD': {
                      vm.user.vld = true ;
                      break;
					}
					case 'AJOUT':  {
                      vm.user.ajout = true ;
                      break;
					}
					case 'MODIF':  {
                      vm.user.modif = true ;
                      break;
					}
					case 'SUPPR':  {
                      vm.user.suppr = true ;
                      break;
					}
					default:  {
                      break ;
					}
				}  
          });
		}
		vm.supprimer = function() {
			vm.affichageMasque = 0 ;
			vm.afficherboutonModifSupr = 0 ;
			var confirm = $mdDialog.confirm()
			.title('Etes-vous sûr de supprimer cet enregistrement ?')
			.textContent('')
			.ariaLabel('Lucky day')
			.clickOutsideToClose(true)
			.parent(angular.element(document.body))
			.ok('ok')
			.cancel('annuler');
			$mdDialog.show(confirm).then(function() {        
				vm.ajout(vm.selectedItem,1);
			}, function() {
				//alert('rien');
			});
		}
		vm.ajout = function(user,suppression)  {
			var tab = [] ;         
			angular.forEach(user, function(value, key)  {        
              if(key == 'user' && value == true)
                  tab.push(key.toUpperCase());
              if(key == 'ddb' && value == true)
                tab.push(key.toUpperCase());
              if(key == 'admin' && value == true)
                  tab.push(key.toUpperCase());
              if(key == 'vld' && value == true)
                tab.push(key.toUpperCase());
              if(key == 'imp' && value == true)
                tab.push(key.toUpperCase());
              if(key == 'ajout' && value == true)
                tab.push(key.toUpperCase());
              if(key == 'modif' && value == true)
                tab.push(key.toUpperCase());
              if(key == 'suppr' && value == true)
                tab.push(key.toUpperCase());             
			});         
			if (suppression == 0) { //update
				var config = {
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				var getId = 0;
				if (vm.NouvelItem==false) {
				   getId = vm.selectedItem.id; 
				} 
				if (!vm.infoAssuj) {
					vm.infoAssuj = {};
					vm.infoAssuj.id = "";
				};
				if (!vm.pers) {
					vm.pers = {};
					vm.pers.id = "";
				};
				var datas = $.param({ 
					id:getId,		
					gestion_utilisateur:1,
					supprimer:suppression,
					nom: user.nom,
					prenom: user.prenom,                           
					sigle: user.sigle,                           
					email: user.email ,
					enabled: user.enabled ,
					envoi_donnees: user.envoi_donnees ,
					password: user.password ,
					default_password: user.default_password ,
					roles: tab,                 
					id_region: user.id_region,                 
					id_district: user.id_district,                 
					id_commune: user.id_commune,                 
					id_fokontany: user.id_fokontany,                 
					id_intervention: user.id_intervention,                 
					piece_identite: user.piece_identite,                 
					adresse: user.adresse,                 
					fonction: user.fonction,                 
					telephone: user.telephone,                 
					raison_sociale: user.raison_sociale,                 
					adresse_hote: user.adresse_hote,                 
					nom_responsable: user.nom_responsable,                 
					fonction_responsable: user.fonction_responsable,                 
					email_hote: user.email_hote,                 
					telephone_hote: user.telephone_hote,                 
					description_hote: user.description_hote,                 
				});
				apiFactory.add("utilisateurs/index",datas, config).success(function (data) {
					if (getId==0) {                 
					   var itemss = {
							id:String(data.response),
							nom:user.nom,
							prenom:user.prenom,
							email:user.email,
							sigle:user.sigle,
							enabled:user.enabled,
							envoi_donnees:user.envoi_donnees,
							password:user.password,
							default_password:user.default_password,
							id_region: user.id_region,                 
							id_district: user.id_district,                 
							id_commune: user.id_commune,                 
							id_fokontany: user.id_fokontany,                 
							id_intervention: user.id_intervention,                 
							piece_identite: user.piece_identite,                 
							adresse: user.adresse,                 
							fonction: user.fonction,                 
							telephone: user.telephone,                 
							raison_sociale: user.raison_sociale,                 
							adresse_hote: user.adresse_hote,                 
							nom_responsable: user.nom_responsable,                 
							fonction_responsable: user.fonction_responsable,                 
							email_hote: user.email_hote,                 
							telephone_hote: user.telephone_hote,                 
							description_hote: user.description_hote,                 
						};
						vm.listes_utilisateurs.push(itemss); 
						vm.action="Ajout compte utilisateur ("+ user.raison_sociale + ") au nom de : " + user.prenom + " " + user.nom + "("+ user.email + ")";
						// Envoi e-mail pour signaler que le compte utilisateur a été ouvert
					} else {
						vm.selectedItem.roles = tab ;
						vm.selectedItem.nom = user.nom;
						vm.selectedItem.email = user.email;
						vm.selectedItem.prenom = user.prenom;
						vm.selectedItem.sigle = user.sigle;
						vm.selectedItem.enabled = user.enabled;
						vm.selectedItem.envoi_donnees = user.envoi_donnees;
						vm.selectedItem.password = user.password;
						vm.selectedItem.default_password = user.default_password;
						vm.selectedItem.id_region= user.id_region;                
						vm.selectedItem.id_district= user.id_district;                
						vm.selectedItem.id_commune= user.id_commune;                 
						vm.selectedItem.id_fokontany= user.id_fokontany;                 
						vm.selectedItem.id_intervention= user.id_intervention;                 
						vm.selectedItem.piece_identite= user.piece_identite;                 
						vm.selectedItem.adresse= user.adresse;               
						vm.selectedItem.fonction= user.fonction;               
						vm.selectedItem.telephone= user.telephone;       
						vm.selectedItem.raison_sociale= user.raison_sociale;
						vm.selectedItem.adresse_hote= user.adresse_hote;           
						vm.selectedItem.nom_responsable= user.nom_responsable;       
						vm.selectedItem.fonction_responsable= user.fonction_responsable;
						vm.selectedItem.email_hote= user.email_hote         
						vm.selectedItem.telephone_hote= user.telephone_hote;             
						vm.selectedItem.description_hote= user.description_hote;
						vm.user = {} ;
						vm.selectedItem.$selected=false;
						vm.action="Modification compte utilisateur ("+ user.raison_sociale + ") au nom de : " + user.prenom + " " + user.nom + "("+ user.email + ")";
					}	
					//add historique : suppresion/modifcation/ajout Gestion utilisateur
					var config = {
						headers : {
							'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
						}
					};
					var datas = $.param({
						action:vm.action,
						id_utilisateur:vm.id_utilisateur
					});
					//factory
					apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
					});								
					}).error(function (data) {               
				});
			} else {  //delete
				var config = {
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
				};
				var datas = $.param({ 
					gestion_utilisateur:1,
					supprimer:suppression,
					id:vm.selectedItem.id
				});
				apiFactory.add("utilisateurs/index",datas, config).success(function (data) {
					vm.listes_utilisateurs = vm.listes_utilisateurs.filter(function(obj) {            
						return obj.id !== vm.selectedItem.id;
					});
				}).error(function (data) {
                  
				});
			}
			vm.afficherboutonnouveau = 1 ;
			vm.affichageMasque = 0 ;
			vm.afficherliste =1;
			vm.NouvelItem=false;
		}
    }
})();
