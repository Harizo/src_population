(function ()
{
    'use strict';

    angular
        .module('app.population.ddb_adm.decoup_admin')
        .controller('Region_district_communeController', Region_district_communeController);
    /** @ngInject */
    function Region_district_communeController($mdDialog, $scope, apiFactory, $state,apiUrl,$http,$cookieStore)
    {
        var vm = this;
        var NouvelItem =false;
        vm.id_utilisateur = $cookieStore.get('id'); 

/***********DEBUT add historique***********/

        var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
        var datas = $.param({
          action:"Consultation : Découpage admninistratif",
          id_utilisateur:$cookieStore.get('id')
        });
        
        apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
        });

/***********FIN add historique***********/        

/* ***************DEBUT Découpage admninistratif**********************/
      
      /* ***************Debut region**********************/  
        vm.mainGridOptions =
        {
          dataSource: new kendo.data.DataSource({
             
            transport:
            {   
              //recuperation region
                read: function (e)
                {
                    apiFactory.getAll("region/index").then(function success(response)
                    {console.log(response.data.response);
                        e.success(response.data.response);
                    }, function error(response)
                        {
                          vm.showAlert('Erreur','Erreur de lecture');
                        });
                },
                //modification region
                update : function (e)
                {
                  var config ={headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                  
                  var datas = $.param({
                          supprimer: 0,
                          id:        e.data.models[0].id,      
                          code:      e.data.models[0].code,
                          nom:       e.data.models[0].nom               
                      });
                  apiFactory.add("region/index",datas, config).success(function (data)
                  {                
                    e.success(e.data.models);

                    /***********Debut add historique***********/
                      var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                      var datas = $.param({
                              action:"Modification : Region de nom de " + e.data.models[0].nom,
                              id_utilisateur:vm.id_utilisateur
                      });
                            
                      apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
                      });
                  /***********Fin add historique***********/

                  }).error(function (data)
                    {
                      vm.showAlert('Erreur','Erreur lors de l\'insertion de donnée');
                    });                                   
                     
                },
                //suppression region
                destroy: function (e)
                {
                    
                    var config ={headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                    
                    var datas = $.param({
                            supprimer: 1,
                            id:        e.data.models[0].id               
                        });
                    apiFactory.add("region/index",datas, config).success(function (data)
                    {                
                      e.success(e.data.models);

                      /***********Debut add historique***********/
                          var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                          var datas = $.param({
                                  action:"Suppression : Region de nom de " + e.data.models[0].nom,
                                  id_utilisateur:vm.id_utilisateur
                          });
                                
                          apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
                          });
                      /***********Fin add historique***********/

                    }).error(function (data)
                      {
                        vm.showAlert('Erreur','Erreur lors de l\'insertion de donnée');
                      });
               
                },
                //creation region
                create: function(e)
                {
                    var config ={headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                    
                    var datas = $.param({
                            supprimer: 0,
                            id:        0,      
                            code:      e.data.models[0].code,
                            nom:       e.data.models[0].nom              
                        });
                    apiFactory.add("region/index",datas, config).success(function (data)
                    { 
                      e.data.models[0].id = String(data.response);               
                      e.success(e.data.models);

                      /***********Debut add historique***********/
                        var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                        var datas = $.param({
                                action:"Creation : Region de nom de " + e.data.models[0].nom,
                                id_utilisateur:vm.id_utilisateur
                        });
                              
                        apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
                        });
                    /***********Fin add historique***********/

                    }).error(function (data)
                      {
                        vm.showAlert('Erreur','Erreur lors de l\'insertion de donnée');
                      });
                },
            },
                
            //data: valueMapCtrl.dynamicData,
            batch: true,
            autoSync: false,
            schema:
            {
                model:
                {
                    id: "id",
                    fields:
                    {
                        code: {type: "string",validation: {required: true}},
                        nom: {type: "string", validation: {required: true}}
                    }
                }
            },

            pageSize: 10//nbr affichage
            //serverPaging: true,
            //serverSorting: true
          }),
          
          // height: 550,
          toolbar: [{               
               template: "<label id='table_titre'>REGION </label>"
          },{
               name: "create",
               text:"",
               iconClass: "k-icon k-i-table-light-dialog"
               
          }],
          editable:{ mode:"inline",update: true,destroy: true},
          //selectable:"row",
          sortable: true,
          //pageable: true,
          reorderable: true,
          scrollable: false,              
          filterable: true,
          //groupable: true,
          pageable:{refresh: true,
                    pageSizes: true, 
                    buttonCount: 3,
                    messages: {
                      empty: "Pas de donnée",
                      display: "{0}-{1} pour {2} items",
                      itemsPerPage: "items par page",
                      next: "Page suivant",
                      previous: "Page précédant",
                      refresh: "Actualiser",
                      first: "Première page",
                      last: "Dernière page"
                    }
                  },
          
          //dataBound: function() {
                //this.expandRow(this.tbody.find("tr.k-master-row").first());
            //},
          columns: [
            {
              field: "code",
              title: "Code",
              width: "Auto"
            },
            {
              field: "nom",
              title: "Nom",
              width: "Auto"
            },
            { 
              title: "Action",
              width: "Auto",
              command:[{
                      name: "edit",
                      text: {edit: "",update: "",cancel: ""},
                      click: function (e){
                        e.preventDefault();
                        var row = $(e.currentTarget).closest("tr");
                        console.log(e);
                        var data = this.dataItem(row);
                        console.log(data);
                        row.addClass("k-state-selected");
                      }
                  },{name: "destroy", text: ""}]
            }]
          };
      /* ***************Fin region**********************/

      /* ***************Debut district**********************/

      vm.alldistrict = function(id_region) {
        return {
          dataSource:
          {
            type: "json",
            transport: {
              //recuperation district
              read: function (e)
              {
                apiFactory.getAPIgeneraliserREST("district/index","cle_etrangere",id_region).then(function(result)
                {
                    e.success(result.data.response);

                }, function error(result)
                  {
                      vm.showAlert('Erreur','Erreur de lecture');
                  })
              },
              //modification district
              update : function (e)
              {
                  var config ={headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                
                  var datas = $.param({
                          supprimer: 0,
                          id:        e.data.models[0].id,      
                          code:      e.data.models[0].code,
                          nom:       e.data.models[0].nom,
                          region_id: e.data.models[0].region.id               
                      });
                  apiFactory.add("district/index",datas, config).success(function (data)
                  {                
                    e.success(e.data.models);

                  /***********Debut add historique***********/
                      var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                      var datas = $.param({
                              action:"Modification : District de nom de " + e.data.models[0].nom,
                              id_utilisateur:vm.id_utilisateur
                      });
                            
                      apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
                      });
                  /***********Fin add historique***********/

                  }).error(function (data)
                    {
                      vm.showAlert('Erreur','Erreur lors de l\'insertion de donnée');
                    });       
              },

              //supression district
              destroy : function (e)
              {
                  var config ={headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                  
                  var datas = $.param({
                          supprimer: 1,
                          id:        e.data.models[0].id               
                      });
                  
                  apiFactory.add("district/index",datas, config).success(function (data)
                  {                
                    e.success(e.data.models);

                    /***********Debut add historique***********/
                        var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                        var datas = $.param({
                                action:"Suppression : District de nom de " + e.data.models[0].nom,
                                id_utilisateur:vm.id_utilisateur
                        });
                              
                        apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
                        });
                    /***********Fin add historique***********/ 
                  }).error(function (data)
                    {
                      vm.showAlert('Erreur','Erreur lors de l\'insertion de donnée');
                    });      
              },
              //creation district
              create : function (e)
              {
                  
                  var config ={headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                  
                  var datas = $.param({
                          supprimer: 0,
                          id:        0,      
                          code:      e.data.models[0].code,
                          nom:       e.data.models[0].nom,
                          region_id: id_region               
                      });
                  
                  apiFactory.add("district/index",datas, config).success(function (data)
                  { 
                    
                      e.data.models[0].id = String(data.response);                    
                      e.data.models[0].region={id:id_region};                                 
                      e.success(e.data.models);

                  /***********Debut add historique***********/
                      var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                      var datas = $.param({
                              action:"Creation : District de nom de " + e.data.models[0].nom,
                              id_utilisateur:vm.id_utilisateur
                      });
                            
                      apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
                      });
                  /***********Fin add historique***********/ 

                  }).error(function (data)
                    {
                      vm.showAlert('Error','Erreur lors de l\'insertion de donnée');
                    }); 

              }
            },
            batch: true,
            schema:
            {
                model:
                {
                    id: "id",
                    fields:
                    {
                        code: {type: "string",validation: {required: true}},
                        nom: {type: "string", validation: {required: true}}
                    }
                }
            },
            //serverPaging: true,
            //serverSorting: true,
            serverFiltering: true,
            pageSize: 5,
          },
          toolbar: [{               
               template: "<label id='table_titre'>DISTRICT </label>"
          },{
               name: "create",
               text:"",
               iconClass: "k-icon k-i-table-light-dialog"
               
          }],
          editable: {
            mode:"inline"
          },
          //selectable:"row",
          scrollable: false,
          sortable: true,
          filterable: true,
          pageable:{refresh: true,
                    pageSizes: true, 
                    buttonCount: 3,
                    messages: {
                      empty: "Pas de donnée",
                      display: "{0}-{1} pour {2} items",
                      itemsPerPage: "items par page",
                      next: "Page suivant",
                      previous: "Page précédant",
                      refresh: "Actualiser",
                      first: "Première page",
                      last: "Dernière page"
                    }
                  },
          //dataBound: function() {
                   // this.expandRow(this.tbody.find("tr.k-master-row").first());
               // },
          columns: [
            {
              field: "code",
              title: "Code",
              width: "Auto"
            },
            {
              field: "nom",
              title: "Nom",
              width: "Auto"
            },
            { 
              title: "Action",
              width: "Auto",
              command:[{
                      name: "edit",
                      text: {edit: "",update: "",cancel: ""},
                     // iconClass: {edit: "k-icon k-i-edit",update: "k-icon k-i-update",cancel: "k-icon k-i-cancel"
                       // },
                  },{name: "destroy", text: ""}]
            }]
        };
      };
      /* ***************Fin district**********************/

      /* ***************Debut commune**********************/
      vm.allcommune = function(id_district) {
        return {
          dataSource:
          {
            type: "json",
            transport: {
              //recuperation commune
              read: function (e)
              {
                apiFactory.getAPIgeneraliserREST("commune/index","cle_etrangere",id_district).then(function(result)
                {console.log(result.data.response);
                    e.success(result.data.response);
                }, function error(result)
                  {
                      vm.showAlert('Erreur','Erreur de lecture');
                  })
              },
              //modification commune
              update : function (e)
              {
                  var config ={headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                  
                  var datas = $.param({
                          supprimer: 0,
                          id:        e.data.models[0].id,      
                          code:      e.data.models[0].code,
                          nom:       e.data.models[0].nom,
                          district_id: e.data.models[0].district.id               
                      });
                  apiFactory.add("commune/index",datas, config).success(function (data)
                  {                
                    e.success(e.data.models);

                    /***********Debut add historique***********/
                        var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                        var datas = $.param({
                                action:"Modification : Commune de nom de " + e.data.models[0].nom,
                                id_utilisateur:vm.id_utilisateur
                        });
                              
                        apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
                        });
                    /***********Fin add historique***********/   
                  }).error(function (data)
                    {
                      vm.showAlert('Erreur','Erreur lors de l\'insertion de donnée');
                    });      
              },
              //suppression commune
              destroy : function (e)
              {
                  
                  var config ={headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                  
                  var datas = $.param({
                          supprimer: 1,
                          id:        e.data.models[0].id               
                      });
                  
                  apiFactory.add("commune/index",datas, config).success(function (data)
                  {                
                    e.success(e.data.models);

                    /***********Debut add historique***********/
                        var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                        var datas = $.param({
                                action:"Suppression : Commune de nom de " + e.data.models[0].nom,
                                id_utilisateur:vm.id_utilisateur
                        });
                              
                        apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
                        });
                    /***********Fin add historique***********/  
                  }).error(function (data)
                    {
                      vm.showAlert('Erreur','Erreur lors de l\'insertion de donnée');
                    });

              },
              //creation commune
              create : function (e)
              {
                  
                  var config ={headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                  
                  var datas = $.param({
                          supprimer: 0,
                          id:        0,      
                          code:      e.data.models[0].code,
                          nom:       e.data.models[0].nom,
                          district_id: id_district              
                      });
                  
                  apiFactory.add("commune/index",datas, config).success(function (data)
                  { 
                    
                    e.data.models[0].id = String(data.response);
                    
                    e.data.models[0].district={id:id_district};              
                    e.success(e.data.models);

                    /***********Debut add historique***********/
                        var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                        var datas = $.param({
                                action:"Creation : Commune de nom de " + e.data.models[0].nom,
                                id_utilisateur:vm.id_utilisateur
                        });
                              
                        apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
                        });
                    /***********Fin add historique***********/  
                  }).error(function (data)
                    {
                      vm.showAlert('Error','Erreur lors de l\'insertion de donnée');
                    });      
              }
            },
            batch: true,
            schema:
            {
                model:
                {
                    id: "id",
                    fields:
                    {
                        code: {type: "string",validation: {required: true}},
                        nom: {type: "string", validation: {required: true}}
                    }
                }
            },
            //serverPaging: true,
            //serverSorting: true,
            serverFiltering: true,
            pageSize: 5,
          },
          toolbar: [{               
               template: "<label id='table_titre'>COMMUNE </label>"
          },{
               name: "create",
               text:"",
               iconClass: "k-icon k-i-table-light-dialog"
               
          }],
          editable: {
            mode:"inline"
          },
          //selectable:"row",
          scrollable: false,
          sortable: true,
          pageable:{refresh: true,
                    pageSizes: true, 
                    buttonCount: 3,
                    messages: {
                      empty: "Pas de donnée",
                      display: "{0}-{1} pour {2} items",
                      itemsPerPage: "items par page",
                      next: "Page suivant",
                      previous: "Page précédant",
                      refresh: "Actualiser",
                      first: "Première page",
                      last: "Dernière page"
                    }
                  },
          //dataBound: function() {
                   // this.expandRow(this.tbody.find("tr.k-master-row").first());
               // },
          columns: [
            {
              field: "code",
              title: "Code",
              width: "Auto"
            },
            {
              field: "nom",
              title: "Nom",
              width: "Auto"
            },
            { 
              title: "Action",
              width: "Auto",
              command:[{
                      name: "edit",
                      text: {edit: "",update: "",cancel: ""},
                      //iconClass: {edit: "k-icon k-i-edit",update: "k-icon k-i-update",cancel: "k-icon k-i-cancel"
                       // },
                  },{name: "destroy", text: ""}]
            }]
        };
      };
    /* ***************Fin commune**********************/

    /* ***************Debut fokontany**********************/
      vm.allfokontany = function(id_commune) {
        return {
          dataSource:
          {
            type: "json",
            transport: {
              //recuperation fokontany
              read: function (e)
              {
                apiFactory.getAPIgeneraliserREST("fokontany/index","cle_etrangere",id_commune).then(function(result)
                {console.log(result.data.response);
                    e.success(result.data.response)
                }, function error(result)
                  {
                      vm.showAlert('Erreur','Erreur de lecture');
                  })
              },
              //modification fokontany
              update : function (e)
              {                  
                  var config ={headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                  
                  var datas = $.param({
                          supprimer: 0,
                          id:        e.data.models[0].id,      
                          code:      e.data.models[0].code,
                          nom:       e.data.models[0].nom,
                          latitude:  e.data.models[0].latitude,
                          longitude: e.data.models[0].longitude,
                          id_commune: e.data.models[0].commune.id               
                      });
                  apiFactory.add("fokontany/index",datas, config).success(function (data)
                  {                
                     e.success(e.data.models);

                  /***********Debut add historique***********/
                      var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                      var datas = $.param({
                              action:"Modification : Fokontany de nom de " + e.data.models[0].nom,
                              id_utilisateur:vm.id_utilisateur
                      });
                            
                      apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
                      });
                  /***********Fin add historique***********/ 
                  }).error(function (data)
                    {
                      vm.showAlert('Error','Erreur lors de l\'insertion de donnée');
                    });       
              },
              //suppression fokontany
              destroy : function (e)
              {
                  
                  var config ={headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                  
                  var datas = $.param({
                          supprimer: 1,
                          id:        e.data.models[0].id               
                      });
                  
                  apiFactory.add("fokontany/index",datas, config).success(function (data)
                  {                
                    e.success(e.data.models);                    

                  /***********Debut add historique***********/
                      var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                      var datas = $.param({
                              action:"Suppression : Fokontany de nom de  " + e.data.models[0].nom,
                              id_utilisateur:vm.id_utilisateur
                      });
                            
                      apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
                      });
                  /***********Fin add historique***********/ 
                  }).error(function (data)
                    {
                      vm.showAlert('Erreur','Erreur lors de l\'insertion de donnée');
                    });     
              },
              //creation fokontany
              create : function (e)
              {
                  
                  var config ={headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                  
                  var datas = $.param({
                          supprimer: 0,
                          id:        0,      
                          code:      e.data.models[0].code,
                          nom:       e.data.models[0].nom,
                          latitude:  e.data.models[0].latitude,
                          longitude: e.data.models[0].longitude,
                          id_commune: id_commune              
                      });
                  apiFactory.add("fokontany/index",datas, config).success(function (data)
                  { 
                    
                    e.data.models[0].id = String(data.response);
                    
                    e.data.models[0].commune={id:id_commune};              
                    e.success(e.data.models);

                  /***********Debut add historique***********/
                      var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
                      var datas = $.param({
                              action:"Creation : Fokontany de nom de " + e.data.models[0].nom,
                              id_utilisateur:vm.id_utilisateur
                      });
                            
                      apiFactory.add("historique_utilisateur/index",datas, config).success(function (data) {
                      });
                  /***********Fin add historique***********/ 
                  }).error(function (data)
                    {
                      vm.showAlert('Erreur','Erreur lors de l\'insertion de donnée');
                    });     
              }
            },
            batch: true,
            schema:
            {
                model:
                {
                    id: "id",
                    fields:
                    {
                        code: {type: "string",validation: {required: true}},
                        nom: {type: "string", validation: {required: true}},
                        latitude: {type: "number", validation: {required: true}},
                        longitude: {type: "number", validation: {required: true}}

                    }
                }
            },
            //serverPaging: true,
            //serverSorting: true,
            serverFiltering: true,
            pageSize: 5,
          },
          toolbar: [{               
               template: "<label id='table_titre'>Fokontany </label>"
          },{
               name: "create",
               text:"",
               iconClass: "k-icon k-i-table-light-dialog"
               
          }],
          editable: {
            mode:"inline"
          },
          //selectable:"row",
          scrollable: false,
          sortable: true,
          pageable:{refresh: true,
                    pageSizes: true, 
                    buttonCount: 3,
                    messages: {
                      empty: "Pas de donnée",
                      display: "{0}-{1} pour {2} items",
                      itemsPerPage: "items par page",
                      next: "Page suivant",
                      previous: "Page précédant",
                      refresh: "Actualiser",
                      first: "Première page",
                      last: "Dernière page"
                    }
                  },
          //dataBound: function() {
                   // this.expandRow(this.tbody.find("tr.k-master-row").first());
               // },
          columns: [
            {
              field: "code",
              title: "Code",
              width: "Auto"
            },
            {
              field: "nom",
              title: "Nom",
              width: "Auto"
            },
            {
              field: "latitude",
              title: "Latitude",
              width: "Auto"
            },
            {
              field: "longitude",
              title: "Longitude",
              width: "Auto"
            }
            ,
            { 
              title: "Action",
              width: "Auto",
              command:[{
                      name: "edit",
                      text: {edit: "",update: "",cancel: ""},
                      //iconClass: {edit: "k-icon k-i-edit",update: "k-icon k-i-update",cancel: "k-icon k-i-cancel"
                       // },
                  },{name: "destroy", text: ""}]
            }]
        };
      };
    /* ***************Fin fokontany**********************/
/* ***************FIN Découpage admninistratif**********************/
        
        //Alert
        vm.showAlert = function(titre,content)
        {
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(false)
            .parent(angular.element(document.body))
            .title(titre)
            .textContent(content)
            .ariaLabel('Alert')
            .ok('Fermer')
            .targetEvent()
          );
        }
    }
})();
