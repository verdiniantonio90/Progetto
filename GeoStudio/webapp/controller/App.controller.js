sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("GeoStudio.controller.App", {
        onInit: function () {
            // Inizializza il router
            this.getOwnerComponent().getRouter().initialize();
        },
        onNavToMain: function () {
          
            // Naviga alla rotta "main"
            this.getOwnerComponent().getRouter().navTo("main");
          
        }
    });
});