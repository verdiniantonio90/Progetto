sap.ui.define([

  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent",
  "sap/m/MessageBox"
], function (Controller, UIComponent,MessageBox) {

  "use strict";
 
  return Controller.extend("my.application.controller.BaseController", {
 
    openDialog : function(nomeDialog){
        debugger;
        var path = "GeoStudio.view."+nomeDialog
         if (!this[nomeDialog]) {
                this[nomeDialog] = sap.ui.xmlfragment(path, this);
                this.getView().addDependent(this[nomeDialog]);
            }
            this[nomeDialog].open();
    },
    closeDialog(nomeDialog, id){
        
        this[nomeDialog] = null;
        sap.ui.getCore().byId(id).destroy();
    },
    read : function(url, headers, nameModel){
           $.ajax({
                method: 'GET',
                url: url,
                headers: headers,
                contentType: 'application/json',
                dataType: 'json',
                success: function (oResponse) {
                    oResponse.data ? this.getView().getModel(nameModel).setData(oResponse.data) : this.getView().getModel(nameModel).setData([]);
                }.bind(this),
                error: function (oError) {


                }.bind(this)
            });
    },
    createAnagraficaDoc : function(oEntry, oEntryDoc){
      var Anagrafica = this.checkInserAnagrafica(oEntry);
      // se anagrafica true allora checkDocumenti
      if(Anagrafica){
        var documenti = this.checkDocumenti(oEntryDoc);
        if(documenti){
          
        }
      }
      // se CheckDocumenti true inserisci tutto in tabella
    },
    checkInserAnagrafica : function(oEntry){
        var message = ""
        message += oEntry.telefono && oEntry.cellulare ? ""  : "telefono o cellulare \n";
        message += oEntry.cf && oEntry.p_iva ? "" : "Codice Fiscale o Partita Iva \n";
        message += oEntry.nome ? "" : "Nome \n";
        message += oEntry.cognome ? "" : "Cognome \n";
        
        var sMs = message.length > 0 ? "Inserire i seguenti campi: \n" + message : "";
        if(sMs){
          MessageBox.error(sMs)
          return false
        }else{
          return true
        }

    },
    checkDocumenti : function(oEntry){
     
      var message = ""
      var aCheck = []
      if(oEntry){
        var oData = oEntry
        for( var i = 0 ; i < oData.length; i++){   
          oData[i].tipologia ? aCheck.push(true) : aCheck.push("Tipologia");
          oData[i].num_doc ? aCheck.push(true) : aCheck.push("Numero Documento");
        }
        message += aCheck.includes("Tipologia") ? "Tipologia \n" : "";
        message += aCheck.includes("Numero Documento") ? "Numero Documento \n" : "";
        var sMs = message.length > 0 ? "Inserire i seguenti campi: \n" + message : "";
        if(sMs){
          MessageBox.error(sMs)
          return false;
        }else{
          return true;
        }
      }

    }



 
  });
 
});