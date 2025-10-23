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

            
            this.getRouter().initialize();
        }
    });
});