sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    'sap/ui/core/Fragment'
], function (Controller, MessageToast, JSONModel, Fragment) {
    "use strict";
    return Controller.extend("GeoStudio.controller.Main", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // Attacca l'event handler alla route "detail"
            oRouter.getRoute("main").attachPatternMatched(this._onMainMatched, this);

        },
        _onMainMatched: function () {
            var oModelDoc = new JSONModel({ tipo: "", ndoc: "", delegato_tipo: "", delegato_ndoc: "" });
            this.getView().setModel(oModelDoc, "doc");
            var oModel = new JSONModel({


                sottoscritto: "",
                nato_il: "",
                luogo_nascita: "",
                cf: "",
                telefono: "",
                cell: "",
                tipodoc: "",
                email: "",
                pec: "",
                residente_in: "",
                via_piazza: "",
                cap: "",
                immobilestatus: "",
                richiestacondono: "",
                datarichiesta: "",


                delegato_nome: "",
                delegato_nato_il: "",
                delegato_luogo: "",
                delegato_cf: "",
                delegato_residente: "",
                delegato_via_piazza: "",
                delegato_cap: "",
                delegato_tipodoc: "",
                delegato_email: "",
                delegato_pec: "",

                presentare: false,
                richiedeCopie: false,
                ritirare: false,
                altro: false,
                altro_specifica: "",
                data: ""

            });
            this.getView().setModel(oModel);
        },
        onNavBack: function () {
            // Torna alla rotta "app"
            this.getOwnerComponent().getRouter().navTo("app");
            MessageToast.show("Tornato a App!");
        },
        onGeneraPdf: function () {
            debugger;
            var docModel = this.getView().getModel("doc").getData()
            var oData = this.getView().getModel().getData();
            oData.tipodoc = docModel.ndoc + " " + docModel.tipo;

            oData.delegato_tipodoc = docModel.delegato_ndoc + " " + docModel.delegato_ndoc;
            fetch('/fillpdf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(oData)
            })
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = 'delega_riempita.pdf';
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch(error => console.error('Errore:', error));
            // $.ajax({
            //     method:'POST',
            //     url:'http://localhost:4000/fillpdf',
            //     contentType: 'application/json',
            //     dataType: 'json',
            //     data: JSON.stringify(oData),
            //     success : function(oResponse){
            //         MessageToast.show("ok")
            //     },
            //     error : function(oError){
            //         MessageToast.show("ko")
            //     }

            // });
        },
        onOpenAnagrafica: function () {

            $.ajax({
                method: 'GET',
                url: 'http://localhost:4000/AnagraficaSet',
                contentType: 'application/json',
                dataType: 'json',
                success: function (oResponse) {
                    debugger;

                    this.getView().getModel("ANAGRAFICA").setData(oResponse.data);
                }.bind(this),
                error: function (oError) {


                }.bind(this)

            });
            if (!this._pDialog) {
                this._pDialog = sap.ui.xmlfragment("GeoStudio.view.Anagrafica", this);
                this.getView().addDependent(this._pDialog);
            }
            this._pDialog.open();
        }

    });
});