sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";
    return UIComponent.extend("GeoStudio.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            
            UIComponent.prototype.init.apply(this, arguments);
            var AnagraficaModel = new JSONModel();
            this.setModel(AnagraficaModel,"ANAGRAFICA");
              var DocumentiModel = new JSONModel();
            this.setModel(DocumentiModel,"DOCUMENTI");

                        var oData ={
                "id": "",
                "nome": "",
                "cognome": "",
                "indirizzo": "",
                "cap": "",
                "dataNascita": "",
                "telefono": "",
                "cellulare": "",
                "email": "",
                "pec": "",
                "cf": "",
                "p_iva": ""
                }
            var oModel = new JSONModel(oData);
            this.setModel(oModel,"insAnag");
           
            var oModelIdoc = new JSONModel([]);
            this.setModel(oModelIdoc,"insDoc");

            
            this.getRouter().initialize();
        }
    });
});