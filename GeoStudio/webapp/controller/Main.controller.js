sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    'sap/ui/core/Fragment',
    "./BaseController"
], function (Controller, MessageToast, JSONModel, Fragment,BaseController) {
    "use strict";
    return BaseController.extend("GeoStudio.controller.Main", {
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

                    oResponse.data ? this.getView().getModel("ANAGRAFICA").setData(oResponse.data) : this.getView().getModel("ANAGRAFICA").setData([]);
                }.bind(this),
                error: function (oError) {


                }.bind(this)
            });
           this.openDialog("Anagrafica");
        },
        onSalva: function (oEvent) {

        },
        onEdit: function (oEvent) {
            var oSource = oEvent.getSource();
            var oContext = oSource.getBindingContext("ANAGRAFICA")
            var id = oContext.sPath.replace('/','')
            var oTable = sap.ui.getCore().byId("Tb_anag").getItems()[id]
            var cells = oTable.getCells() 
            if(oSource.getIcon() === 'sap-icon://save'){
                MessageToast.show("salvato")
            };
            for(var i = 0 ; i < cells.length; i++){
                var items = cells[i].getItems();
                for(var x = 0 ; x < items.length;x++){
                    if(items[x].setEditable !== undefined){
                        oSource.getIcon() === 'sap-icon://edit'  ? items[x].setEditable(true) : items[x].setEditable(false);
                    };
                };
            };
            oSource.getIcon() === 'sap-icon://edit' ? oSource.setIcon('sap-icon://save') : oSource.setIcon('sap-icon://edit');

        },
        onClose : function(oEvent,nomeDialog, id){
            this.closeDialog(nomeDialog,id)
        },
        onDelete: function (oEvent) {

        },
        onDetail: function (oEvent) { 
            var oSource = oEvent.getSource();
            var oContext = oSource.getBindingContext("ANAGRAFICA")
            var headers={id:oContext.getObject().id};
            this.read("http://localhost:4000/DocById",headers,'DOCUMENTI');
            this.openDialog("Documenti");
        },
        onAdd: function(oEvent){

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
            
            this.getView().getModel("insAnag").setData(oData);
           
            this.getView().getModel("insDoc").setData([]);
            
            this.openDialog('InsertAnagrafica');
        },
        onInsert : function(oEvent,sDialog){
            switch(sDialog){
                case "insAnag":
                    debugger
                    var oEntry = this.getView().getModel("insAnag").getData();
                    var oEntryDoc = this.getView().getModel("insDoc").getData();
                    this.createAnagraficaDoc(oEntry,oEntryDoc);
                break;                
            }
        },
        onAddDoc : function(oEvent){
            debugger
            var oData = {fk_id:"",tipologia:"",num_doc:""};
            this.getView().getModel("insDoc").getData().push(oData);
            this.getView().getModel("insDoc").refresh();

        }

    });
});