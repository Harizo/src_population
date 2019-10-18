(function ()
{
    'use strict';

    angular
        .module('app.population.reporting.nombrebeneficiaire')
        .controller('NombrebeneficiaireController', NombrebeneficiaireController);

    /** @ngInject */
    function NombrebeneficiaireController($scope, $mdDialog, apiFactory, $state, $cookieStore, apiUrl, apiUrlbase)
    {
        var vm = this;
        vm.ajout = ajout ;
		vm.ajoutDecaissement = ajoutDecaissement ;
		vm.desactivermodifier =0;
		vm.titrepage ="Nouvel prospection";
        var NouvelItem=false;
        var NouvelItemDecaissement=false;
        var currentItem;
		var currentItemDecaissement;
        vm.selectedItem ={};
        vm.selectedItemDecaissement={};
        vm.Decaissement=[];
		vm.allRecordsFinancementintervention=[];
        //variale affichage bouton nouveau
        vm.afficherboutonnouveau = 1 ;
		vm.afficherboutonModifSupr=0;
		vm.cliquable=1;
        var trouve =false;
		vm.affiche_load =true;
		
		vm.ok =1;
        //variable cache masque de saisie
        vm.affichageMasque = 0 ;
 		var id_user = $cookieStore.get('id');
		vm.utilisateur_id = id_user;
        vm.sexes = ("Mâle;Femmelle").split(';').map(function (state)
        {
            return {sexe: state};
        });
        //style
		vm.dtOptions = {
			dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
			pagingType: 'simple',
			autoWidth: false,
			responsive: true
		};
		//col table
		vm.financementintervention_column = [{titre:"Programme/Src-finance/Axe stratégique"},{titre:"Devise"},{titre:"Secteur"},{titre:"Budget initial"},{titre:"Budget modif"}];
		vm.decaissement_column = [{titre:"Mont initial"},{titre:"Mont revisé"},{titre:"Date révision"},{titre:"Décaiss prévu"},{titre:"Décaiss effect"},{titre:"Transf bénéf"},{titre:"Période Déb"},{titre:"Période fin"}];
		apiFactory.getAll("financement_intervention/index").then(function(result) {
			vm.allRecordsFinancementintervention= result.data.response;
			console.log(vm.allRecordsFinancementintervention);
		});
		apiFactory.getAll("decaissement/index").then(function(result) {
			vm.allRecordsDecaissement= result.data.response;
		});
        //Debut
        function ajout(prospection,suppression) {
            if (NouvelItem==false) {
                test_existance (prospection,suppression); 
            } else {
              
                insert_in_base(prospection,suppression);
            }                                        
        }
        function test_existance (item,suppression) {          
            if (suppression!=1) {
                vm.allRecordsFinancementintervention.forEach(function(indic) {               
                  if (indic.id==item.id) {
                      insert_in_base(item,suppression);
                      vm.affichageMasque = 0 ;
                     }
                     else {
                    vm.affichageMasque = 0 ;
                    }
                  
                });
            } else {        
				insert_in_base(item,suppression);
			} 
        } 
        function insert_in_base(prospection,suppression) {
            //add
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };
            var getId = 0;
            if (NouvelItem==false) {
               getId = vm.selectedItem.id; 
            } 
            var datas = $.param({
                    id:getId,
                    supprimer:suppression,
                    id_type_fiche_prospection:prospection.id_type_fiche_prospection,
                    typeprospection:prospection.typeprospection,
                    prospecteur:prospection.prospecteur,
                    personnelprospecteur:prospection.personnelprospecteur,
                    reference_prospection:prospection.reference_prospection,
                    numero_releve:prospection.numero_releve,
                    numero_fiche:prospection.numero_fiche,
                    date_prospection:prospection.date_prospection,
                    date_envoi:prospection.date_envoi,
                    id_station:prospection.id_station,
                    station:prospection.station,
                    id_post:prospection.id_post,
                    poste:prospection.poste,
                    surface_prospect:prospection.surface_prospect,
                    surface_infeste:prospection.surface_infeste,
                    latitude:prospection.latitude,
                    longitude:prospection.longitude,
                    altitude:prospection.altitude,
                    coordonnee1:prospection.coordonnee1,
                    coordonnee2:prospection.coordonnee2,
                    coordonnee3:prospection.coordonnee3,
                    coordonnee4:prospection.coordonnee4,
                    id_utilisateur:prospection.id_utilisateur,
                    informateur:prospection.informateur,
                    date_observation:prospection.date_observation,
                    date_signalisation:prospection.date_signalisation,
                    moyen:prospection.moyen,
                    validation:prospection.validation,
                    supprime:prospection.supprime,
                    localite:prospection.localite,
                    id_fokontany:prospection.id_fokontany,
                    fokontany:prospection.fokontany					
				});  
            //factory
            apiFactory.add("ficheprospection/index",datas, config).success(function (data) {
				if (NouvelItem == false) {                 
                    // Update or delete: id exclu                    
                    if(suppression==0) { 
						vm.selectedItem.id_type_fiche_prospection=prospection.id_type_fiche_prospection; 
						vm.selectedItem.typeprospection=prospection.typeprospection; 
						vm.selectedItem.prospecteur=prospection.prospecteur; 
						vm.selectedItem.personnelprospecteur=prospection.personnelprospecteur; 
						vm.selectedItem.reference_prospection=prospection.reference_prospection; 
						vm.selectedItem.numero_releve=prospection.numero_releve; 
						vm.selectedItem.numero_fiche=prospection.numero_fiche; 
						vm.selectedItem.date_prospection=prospection.date_prospection; 
						vm.selectedItem.date_envoi=prospection.date_envoi; 
						vm.selectedItem.id_station=prospection.id_station; 
						vm.selectedItem.station=prospection.station; 
						vm.selectedItem.id_post=prospection.id_post; 
						vm.selectedItem.poste=prospection.poste; 
						vm.selectedItem.surface_prospect=prospection.surface_prospect; 
						vm.selectedItem.surface_infeste=prospection.surface_infeste; 
						vm.selectedItem.latitude=prospection.latitude; 
						vm.selectedItem.longitude=prospection.longitude; 
						vm.selectedItem.altitude=prospection.altitude; 
						vm.selectedItem.coordonnee1=prospection.coordonnee1; 
						vm.selectedItem.coordonnee2=prospection.coordonnee2; 
						vm.selectedItem.coordonnee3=prospection.coordonnee3; 
						vm.selectedItem.coordonnee4=prospection.coordonnee4; 
						vm.selectedItem.id_utilisateur=prospection.id_utilisateur; 
						vm.selectedItem.informateur=prospection.informateur; 
						vm.selectedItem.date_observation=prospection.date_observation; 
						vm.selectedItem.date_signalisation=prospection.date_signalisation; 
						vm.selectedItem.moyen=prospection.moyen; 
						vm.selectedItem.validation=validez; 
						vm.selectedItem.supprime=prospection.supprime; 
                        vm.selectedItem.localite=prospection.localite; 
                        vm.selectedItem.id_fokontany=prospection.id_fokontany;
                        vm.selectedItem.fokontany=prospection.fokontany; 
						vm.afficherboutonModifSupr = 0 ;
						vm.afficherboutonnouveau = 1 ;
						vm.selectedItem.$selected = false;
						vm.selectedItem ={};
                    } else {                      
						vm.allRecordsFinancementintervention = vm.allRecordsFinancementintervention.filter(function(obj) {
							return obj.id !== currentItem.id;
						});
                    }
				} else {                               
                    var item = {
						id:String(data.response),
						id_type_fiche_prospection:prospection.id_type_fiche_prospection,
						typeprospection:prospection.typeprospection,
						prospecteur:prospection.prospecteur,
						personnelprospecteur:prospection.personnelprospecteur,
						reference_prospection:prospection.reference_prospection,
						numero_releve:prospection.numero_releve,
						numero_fiche:prospection.numero_fiche,
						date_prospection:prospection.date_prospection,
						date_envoi:prospection.date_envoi,
						id_station:prospection.id_station,
						station:prospection.station,
						id_post:prospection.id_post,
						poste:prospection.poste,
						surface_prospect:prospection.surface_prospect,
						surface_infeste:prospection.surface_infeste,
						latitude:prospection.latitude,
						longitude:prospection.longitude,
						altitude:prospection.altitude,
						coordonnee1:prospection.coordonnee1,
						coordonnee2:prospection.coordonnee2,
						coordonnee3:prospection.coordonnee3,
						coordonnee4:prospection.coordonnee4,
						id_utilisateur:prospection.id_utilisateur,
						informateur:prospection.informateur,
						date_observation:prospection.date_observation,
						date_signalisation:prospection.date_signalisation,
						moyen:prospection.moyen,
						validation:prospection.validation,
						supprime:prospection.supprime,
                        id_fokontany:prospection.id_fokontany,
                        fokontany:prospection.fokontany,
                        localite:prospection.localite,
						// RAZ Détail
						densite :[],
						espece:[],
						description  :[],
						comportement :[],
						vegetation :[],
						vegetationdetail :[],
						vegetationhumidite :[],
						vegetationtexturesol :[],
					};
					vm.allRecordsFinancementintervention.push(item); 
                    NouvelItem=false;
				}
                  vm.affichageMasque = 0 ;
			})
        }
        //Fin
		vm.showAlert = function(titre,textcontent) {
			// Appending dialog to document.body to cover sidenav in docs app
			// Modal dialogs should fully cover application
			// to prevent interaction outside of dialog
			$mdDialog.show(
			  $mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(false)
				.parent(angular.element(document.body))
				.title(titre)
				.textContent(textcontent)
				.ariaLabel('Alert Dialog Demo')
				.ok('Fermer')
				.targetEvent()
			);
		} 
		function test_sexe(stp) {
			switch (stp) {
				case "1": {
					return 1 ;
					break ;
				}
				case "0": {
					return 0 ;
					break ;
				}
			}
		}
		function formatDate(date) {
			var mois = date.getMonth()+1;
			var dateSQL = (date.getFullYear()+"/"+mois+"/"+date.getDate());
			return dateSQL;

		}
		function parseDate(date) {
			var d = moment(date, 'YYYY-MM-DD', true);
			return d.isValid() ? d.toDate() : new Date(NaN);
		}
		//Début modif
		vm.selection= function (item) {  
            vm.selectedItem = item;
            vm.nouvelItem = item;
            currentItem = JSON.parse(JSON.stringify(vm.selectedItem));       
			// RAZ Détail			
			if(item.detail_charge==0) {
				item.detail_decaissement =[];
				setTimeout(function(){
					apiFactory.getAPIgeneraliserREST("decaissement/index","cle_etrangere",vm.selectedItem.id).then(function(result) {
						item.detail_decaissement = result.data.response;
						item.detail_charge=1;
					});
				},600);	
			} 		
        };
        $scope.$watch('vm.selectedItem', function() {
			if (!vm.allRecordsFinancementintervention) return;
			vm.allRecordsFinancementintervention.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItem.$selected = true;
        });
        vm.ajouter = function () {
			vm.selectedItem.$selected = false;
			vm.decaissement.typeprospection={};
			vm.decaissement.personnelprospecteur={};
			vm.decaissement.reference_prospection='';
			vm.decaissement.numero_releve='';
			vm.decaissement.numero_fiche='';
            vm.decaissement.id_station='';
            vm.decaissement.id_post='';
			vm.decaissement.station={};
			vm.decaissement.poste={};
            vm.decaissement.id_utilisateur='';
            vm.decaissement.date_prospection='';
            vm.decaissement.date_envoi='';
            vm.decaissement.surface_prospect='';
            vm.decaissement.surface_infeste='';
            vm.decaissement.longitude='';
            vm.decaissement.latitude='';            
            vm.decaissement.localite='';
            vm.decaissement.id_fokontany='';
            vm.decaissement.fokontany={};
			vm.decaissement.validation=1;
			vm.decaissement.supprime=0;
			NouvelItem = true ;
			vm.titrepage ="Nouvel prospection";
        };
        vm.annuler = function() {
			vm.selectedItem = {} ;
			vm.selectedItem.$selected = false;
			// RAZ Détail
			vm.Decaissement =[];
			vm.Espece = [];
			vm.Description = [];
			vm.Comportement = [];
			vm.Vegetation = [];
			vm.Vegetationdetail = [];
			vm.Vegetationhumidite = [];
			vm.Vegetationtexturesol = [];
			NouvelItem = false;
        };
		vm.modifier = function() {
			NouvelItem = false ;
			vm.decaissement.id = vm.selectedItem.id ;
			vm.decaissement.id_type_fiche_prospection = vm.selectedItem.id_type_fiche_prospection ;
			vm.decaissement.typeprospection = vm.selectedItem.typeprospection ;
			vm.decaissement.prospecteur = vm.selectedItem.prospecteur ;
			vm.decaissement.personnelprospecteur = vm.selectedItem.personnelprospecteur ;
			vm.decaissement.reference_prospection = vm.selectedItem.reference_prospection ;
			vm.decaissement.numero_releve = vm.selectedItem.numero_releve ;
			vm.decaissement.numero_fiche = vm.selectedItem.numero_fiche ;
			if(vm.selectedItem.date_prospection) {
				vm.decaissement.date_prospection = new Date(vm.selectedItem.date_prospection) ;
			}	
			if(vm.selectedItem.date_envoi) {
				vm.decaissement.date_envoi = new Date(vm.selectedItem.date_envoi) ;
			}	
			vm.decaissement.id_station = vm.selectedItem.id_station ;
			vm.decaissement.station = vm.selectedItem.station ;
			vm.decaissement.id_post = vm.selectedItem.id_post ;
			vm.decaissement.poste = vm.selectedItem.poste ;
			if(vm.selectedItem.surface_prospect) {
				vm.decaissement.surface_prospect = parseInt(vm.selectedItem.surface_prospect) ;
			}	
			if(vm.selectedItem.surface_infeste) {
				vm.decaissement.surface_infeste = parseInt(vm.selectedItem.surface_infeste) ;
			}
			vm.decaissement.latitude = vm.selectedItem.latitude ;
			vm.decaissement.longitude = vm.selectedItem.longitude ;
			vm.decaissement.altitude = vm.selectedItem.altitude ;
			vm.decaissement.coordonnee1 = vm.selectedItem.coordonnee1 ;
			vm.decaissement.coordonnee2 = vm.selectedItem.coordonnee2 ;
			vm.decaissement.coordonnee3 = vm.selectedItem.coordonnee3 ;
			vm.decaissement.coordonnee4 = vm.selectedItem.coordonnee4 ;
			vm.decaissement.id_utilisateur = vm.selectedItem.id_utilisateur ;
			vm.decaissement.informateur = vm.selectedItem.informateur ;
			if(vm.selectedItem.date_observation) {
				vm.decaissement.date_observation = new Date(vm.selectedItem.date_observation) ;
			}	
			if(vm.selectedItem.date_signalisation) {
				vm.decaissement.date_signalisation = new Date(vm.selectedItem.date_signalisation) ;
			}	
			vm.decaissement.moyen = vm.selectedItem.moyen ;
			vm.decaissement.validation = vm.selectedItem.validation ;
			vm.decaissement.supprime = vm.selectedItem.supprime ;
			vm.afficherboutonModifSupr = 0;
			vm.afficherboutonnouveau = 0;  
			vm.titrepage ="Modifier prospection";
        };
		vm.supprimer = function() {
			NouvelItem = false ;
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
				ajout(vm.selectedItem,1);
			}, function() {
            //alert('rien');
			});
        };
        vm.modifierTypeprospection = function (item) { 
			vm.alltypeprospection.forEach(function(typepros) {
				if(typepros.id==item.id_type_fiche_prospection) {
					vm.decaissement.id_type_fiche_prospection = typepros.id; 
					vm.decaissement.typeprospection=[];
					var itemss = {
						id: typepros.id,
						libelle: typepros.libelle,
					};
					vm.decaissement.typeprospection.push(itemss);
				}
			});
		}
	// DETAIL
	// DECAISSEMENT
        vm.selectionDecaissement= function (item) {     
            vm.selectedItemDecaissement = item;
            vm.afficherboutonModifSupr = 1 ;
            vm.affichageMasque = 0 ;
            vm.afficherboutonnouveau = 1 ;
            NouvelItem=false;
        };
        $scope.$watch('vm.selectedItemDecaissement', function() {
			if (!vm.selectedItem.id) return;
			vm.selectedItem.detail_decaissement.forEach(function(item) {
				item.$selected = false;
			});
			vm.selectedItemDecaissement.$selected = true;
        });
        //function cache masque de saisie
        vm.ajouterDecaissement = function () {
 			vm.affichageMasque = 1 ;
			vm.selectedItemDecaissement.$selected = false;
            NouvelItemDecaissement = true ;
			vm.decaissement={};
			vm.decaissement.id = 0;		
			vm.decaissement.id_financement_intervention = vm.selectedItem.id;			
			vm.decaissement.montant_initial =null;
			vm.decaissement.montant_revise =null;
			vm.decaissement.decaissement_prevu =null;
			vm.decaissement.decaissement_effectif =null;
			vm.decaissement.transfert_direct_beneficiaire =null;
			vm.decaissement.montant_mesure_accompagnement =null;
			vm.decaissement.decaissement_prevu_cumule =null;
			vm.decaissement.decaissement_cumule =null;
			vm.decaissement.decaissement_effectif_beneficiaire_cumule =null;
			vm.decaissement.nombre_beneficiaire =null;
			vm.decaissement.nombre_beneficiaire_cumule =null;
			vm.decaissement.nombre_beneficiaire_sortant =null;
			vm.decaissement.nombre_beneficiaire_sortant_cumule =null;
			vm.decaissement.date_revision =null;
			vm.decaissement.date_debut_periode =null;
			vm.decaissement.date_fin_periode =null;
			vm.decaissement.id_acteur =null;
			vm.decaissement.acteur = null ;
			vm.decaissement.nom_informateur = null ;
			vm.decaissement.prenom_informateur = null ;
			vm.decaissement.telephone_informateur = null ;
			vm.decaissement.email_informateur = null ;
			vm.decaissement.flag_integration_donnees = false ;
			vm.decaissement.nouvelle_integration = false;
			vm.decaissement.commentaire = null;
        };
        vm.annulerDecaissement = function(item) {
			vm.affichageMasque = 0 ;
			vm.afficherboutonnouveau = 1 ;
			vm.afficherboutonModifSupr = 0 ;
			item.$selected=false;
			item.$edit=false;
			NouvelItemDecaissement = false;
			vm.selectedItemDecaissement = {} ;
			vm.selectedItemDecaissement.$selected = false;
       };
        vm.modifierDecaissement = function() {
			vm.affichageMasque = 1 ;
			NouvelItemDecaissement = false ;
			vm.decaissement={};
			currentItemDecaissement = angular.copy(vm.selectedItemDecaissement);
			vm.selectedItem.detail_decaissement.forEach(function(it) {
				it.$edit = false;
			});        	
			vm.decaissement.id = vm.selectedItemDecaissement.id	;		
			vm.decaissement.id_financement_intervention = vm.selectedItem.id;			
			if(vm.selectedItemDecaissement.montant_initial) {
				vm.decaissement.montant_initial = parseFloat(vm.selectedItemDecaissement.montant_initial);
			}	else vm.decaissement.montant_initial =null;
			if(vm.selectedItemDecaissement.montant_revise) {
				vm.decaissement.montant_revise = parseFloat(vm.selectedItemDecaissement.montant_revise);
			}	else vm.decaissement.montant_revise =null;
			if(vm.selectedItemDecaissement.decaissement_prevu) {
				vm.decaissement.decaissement_prevu = parseFloat(vm.selectedItemDecaissement.decaissement_prevu);
			}	else vm.decaissement.decaissement_prevu =null;
			if(vm.selectedItemDecaissement.decaissement_effectif) {
				vm.decaissement.decaissement_effectif = parseFloat(vm.selectedItemDecaissement.decaissement_effectif);
			}	else vm.decaissement.decaissement_effectif =null;
			if(vm.selectedItemDecaissement.transfert_direct_beneficiaire) {
				vm.decaissement.transfert_direct_beneficiaire = parseFloat(vm.selectedItemDecaissement.transfert_direct_beneficiaire);
			}	else vm.decaissement.transfert_direct_beneficiaire =null;
			if(vm.selectedItemDecaissement.montant_mesure_accompagnement) {
				vm.decaissement.montant_mesure_accompagnement = parseFloat(vm.selectedItemDecaissement.montant_mesure_accompagnement);
			}	else vm.decaissement.montant_mesure_accompagnement =null;
			if(vm.selectedItemDecaissement.decaissement_prevu_cumule) {
				vm.decaissement.decaissement_prevu_cumule = parseFloat(vm.selectedItemDecaissement.decaissement_prevu_cumule);
			}	else vm.decaissement.decaissement_prevu_cumule =null;
			if(vm.selectedItemDecaissement.decaissement_cumule) {
				vm.decaissement.decaissement_cumule = parseFloat(vm.selectedItemDecaissement.decaissement_cumule);
			}	else vm.decaissement.decaissement_cumule =null;
			if(vm.selectedItemDecaissement.decaissement_effectif_beneficiaire_cumule) {
				vm.decaissement.decaissement_effectif_beneficiaire_cumule = parseFloat(vm.selectedItemDecaissement.decaissement_effectif_beneficiaire_cumule);
			}	else vm.decaissement.decaissement_effectif_beneficiaire_cumule =null;
			
			if(vm.selectedItemDecaissement.nombre_beneficiaire) {
				vm.decaissement.nombre_beneficiaire = parseInt(vm.selectedItemDecaissement.nombre_beneficiaire);
			}	else vm.decaissement.nombre_beneficiaire =null;
			if(vm.selectedItemDecaissement.nombre_beneficiaire_cumule) {
				vm.decaissement.nombre_beneficiaire_cumule = parseInt(vm.selectedItemDecaissement.nombre_beneficiaire_cumule);
			}	else vm.decaissement.nombre_beneficiaire_cumule =null;
			if(vm.selectedItemDecaissement.nombre_beneficiaire_sortant) {
				vm.decaissement.nombre_beneficiaire_sortant = parseInt(vm.selectedItemDecaissement.nombre_beneficiaire_sortant);
			}	else vm.decaissement.nombre_beneficiaire_sortant =null;
			if(vm.selectedItemDecaissement.nombre_beneficiaire_sortant_cumule) {
				vm.decaissement.nombre_beneficiaire_sortant_cumule = parseInt(vm.selectedItemDecaissement.nombre_beneficiaire_sortant_cumule);
			}	else vm.decaissement.nombre_beneficiaire_sortant_cumule =null;			
			if(vm.selectedItemDecaissement.date_revision) {
				vm.decaissement.date_revision = new Date(vm.selectedItemDecaissement.date_revision);
			}	else vm.decaissement.date_revision =null;
			if(vm.selectedItemDecaissement.date_debut_periode) {
				vm.decaissement.date_debut_periode = new Date(vm.selectedItemDecaissement.date_debut_periode);
			}	else vm.decaissement.date_debut_periode =null;
			if(vm.selectedItemDecaissement.date_fin_periode) {
				vm.decaissement.date_fin_periode = new Date(vm.selectedItemDecaissement.date_fin_periode);
			}	else vm.decaissement.date_fin_periode =null;
			if(vm.selectedItemDecaissement.id_acteur) {
				vm.decaissement.id_acteur = parseInt(vm.selectedItemDecaissement.id_acteur);
			}	else vm.decaissement.id_acteur =null;
			vm.decaissement.acteur = vm.selectedItemDecaissement.acteur ;
			vm.decaissement.nom_informateur = vm.selectedItemDecaissement.nom_informateur ;
			vm.decaissement.prenom_informateur = vm.selectedItemDecaissement.prenom_informateur ;
			vm.decaissement.telephone_informateur = vm.selectedItemDecaissement.telephone_informateur ;
			vm.decaissement.email_informateur = vm.selectedItemDecaissement.email_informateur ;
			vm.decaissement.flag_integration_donnees = vm.selectedItemDecaissement.flag_integration_donnees ;
			vm.decaissement.nouvelle_integration = vm.selectedItemDecaissement.nouvelle_integration ;
			vm.decaissement.commentaire = vm.selectedItemDecaissement.commentaire ;
        };
        vm.supprimerDecaissement = function() {
			var confirm = $mdDialog.confirm()
                .title('Etes-vous sûr de supprimer cet enregistrement ?')
                .textContent('')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .ok('supprimer')
                .cancel('annuler');
			$mdDialog.show(confirm).then(function() {          
				ajoutDecaissement(vm.selectedItemDecaissement,1);
			}, function() {
			});
        }
        function ajoutDecaissement(densi,suppr) {  
			//add
			var config = {
				headers : {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				}
			};
			var getId = 0;
			if (NouvelItemDecaissement==false) {
			   getId = vm.selectedItemDecaissement.id; 
			}
			var daty_revision =null;
			var daty_date_debut_periode =null;
			var daty_date_fin_periode =null;
			if(vm.decaissement.date_revision) {
				if(parseInt(suppr)==0) {
					daty_revision = formatDate(vm.decaissement.date_revision);
				} else {
					// ignorer formatDate lors de la suppression
					daty_revision = vm.decaissement.date_revision;
				}
			}	
			if(vm.decaissement.date_date_debut_periode) {
				if(parseInt(suppr)==0) {
					daty_date_debut_periode = formatDate(vm.decaissement.date_date_debut_periode);
				} else {
					// ignorer formatDate lors de la suppression
					daty_date_debut_periode = vm.decaissement.date_date_debut_periode;
				}
			}	
			if(vm.decaissement.date_date_fin_periode) {
				if(parseInt(suppr)==0) {
					daty_date_fin_periode = formatDate(vm.decaissement.date_date_fin_periode);
				} else {
					// ignorer formatDate lors de la suppression
					daty_date_fin_periode = vm.decaissement.date_date_fin_periode;
				}
			}	
			var datas = $.param({
				supprimer:suppr,
				id:getId, 
				id_financement_intervention:vm.decaissement.id_financement_intervention,		
				montant_initial:vm.decaissement.montant_initial,
				montant_revise:vm.decaissement.montant_revise,
				decaissement_prevu:vm.decaissement.decaissement_prevu,
				decaissement_effectif:vm.decaissement.decaissement_effectif,
				transfert_direct_beneficiaire:vm.decaissement.transfert_direct_beneficiaire,
				montant_mesure_accompagnement:vm.decaissement.montant_mesure_accompagnement,
				decaissement_prevu_cumule:vm.decaissement.decaissement_prevu_cumule,
				decaissement_cumule:vm.decaissement.decaissement_cumule,
				decaissement_effectif_beneficiaire_cumule:vm.decaissement.decaissement_effectif_beneficiaire_cumule,
				nombre_beneficiaire:vm.decaissement.nombre_beneficiaire,
				nombre_beneficiaire_cumule:vm.decaissement.nombre_beneficiaire_cumule,
				nombre_beneficiaire_sortant:vm.decaissement.nombre_beneficiaire_sortant,
				nombre_beneficiaire_sortant_cumule:vm.decaissement.nombre_beneficiaire_sortant_cumule,
				date_revision:daty_revision,
				date_debut_periode:daty_date_debut_periode,
				date_fin_periode:daty_date_fin_periode,
				id_acteur:vm.decaissement.id_acteur,
				acteur:vm.decaissement.acteur,
				nom_informateur:vm.decaissement.nom_informateur,
				prenom_informateur:vm.decaissement.prenom_informateur,
				telephone_informateur:vm.decaissement.telephone_informateur,
				email_informateur:vm.decaissement.email_informateur,
				flag_integration_donnees:vm.decaissement.flag_integration_donnees,
				nouvelle_integration:vm.decaissement.nouvelle_integration,
				commentaire:vm.decaissement.commentaire,
			});       
			//factory
			apiFactory.add("decaissement/index",datas, config).success(function (data) {
				if (NouvelItemDecaissement == false) {
					// Update or delete: id exclu                   
					if(suppr==0) {
						for (var i = 0; i < vm.selectedItem.detail_decaissement.length; i++) {
							if(vm.selectedItem.detail_decaissement[i].$selected==true) {
								vm.selectedItem.detail_decaissement[i]=vm.decaissement;
								vm.selectedItem.detail_decaissement[i].$selected=false;
								vm.selectedItemDecaissement=vm.decaissement;
								vm.selectedItemDecaissement.$selected = false;
								vm.selectedItemDecaissement ={};
							}          
						}							
						vm.selectedItemDecaissement.$selected = false;
						vm.selectedItemDecaissement.$edit = false;
						vm.selectedItemDecaissement ={};
					} else {    
						vm.selectedItem.detail_decaissement = vm.selectedItem.detail_decaissement.filter(function(obj) {
							return obj.id !== vm.selectedItemDecaissement.id;
						});
					}
				} else {
					densi.id=data.response;	
					NouvelItemDecaissement=false;
					// Push vers parent original
					var ite ={
						id:data.response, 
						id_financement_intervention:vm.decaissement.id_financement_intervention,		
						montant_initial:vm.decaissement.montant_initial,
						montant_revise:vm.decaissement.montant_revise,
						decaissement_prevu:vm.decaissement.decaissement_prevu,
						decaissement_effectif:vm.decaissement.decaissement_effectif,
						transfert_direct_beneficiaire:vm.decaissement.transfert_direct_beneficiaire,
						montant_mesure_accompagnement:vm.decaissement.montant_mesure_accompagnement,
						decaissement_prevu_cumule:vm.decaissement.decaissement_prevu_cumule,
						decaissement_cumule:vm.decaissement.decaissement_cumule,
						decaissement_effectif_beneficiaire_cumule:vm.decaissement.decaissement_effectif_beneficiaire_cumule,
						nombre_beneficiaire:vm.decaissement.nombre_beneficiaire,
						nombre_beneficiaire_cumule:vm.decaissement.nombre_beneficiaire_cumule,
						nombre_beneficiaire_sortant:vm.decaissement.nombre_beneficiaire_sortant,
						nombre_beneficiaire_sortant_cumule:vm.decaissement.nombre_beneficiaire_sortant_cumule,
						date_revision:vm.decaissement.date_revision,
						date_debut_periode:vm.decaissement.date_debut_periode,
						date_fin_periode:vm.decaissement.date_fin_periode,
						id_acteur:vm.decaissement.id_acteur,
						acteur:vm.decaissement.acteur,
						nom_informateur:vm.decaissement.nom_informateur,
						prenom_informateur:vm.decaissement.prenom_informateur,
						telephone_informateur:vm.decaissement.telephone_informateur,
						email_informateur:vm.decaissement.email_informateur,
						flag_integration_donnees:vm.decaissement.flag_integration_donnees,
						nouvelle_integration:vm.decaissement.nouvelle_integration,
						commentaire:vm.decaissement.commentaire,
					}	
					vm.selectedItem.detail_decaissement.push(ite);					
				}
				densi.$selected=false;
				densi.$edit=false;
				vm.affichageMasque = 0 ;
				vm.afficherboutonnouveau = 1 ;
				vm.afficherboutonModifSupr=0;
			}).error(function (data) {
				vm.showAlert('ERREUR',"Erreur lors de l'enregistrement !");
			});  
        }
        vm.export_excel = function()  {
            console.log(vm.selectedItem);
            vm.cliquable=0;
            vm.affiche_load = true;
            var bla = $.post(apiUrl + "Exportexcel_fiches/export_prospection",{
                id_fiche : vm.selectedItem.id,
                id_type_fiche : vm.selectedItem.id_type_fiche_prospection,
                repertoire:'prospection/fiche'
            },
            function(data) {
                vm.affiche_load = false;
                vm.cliquable=1;
                //download excel
                window.location = apiUrlbase+"exportexcel/prospection/fiche/"+data.ref+".xlsx" ;
            });
        }
    }
})();