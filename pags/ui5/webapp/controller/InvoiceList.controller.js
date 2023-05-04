sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {

		formatter: formatter,

		onInit: function () {

			var vv = [
				{
				  "ProductName": "Pineapple",
				  "Quantity": 21,
				  "ExtendedPrice": 87.2,
				  "ShipperName": "Fun Inc.",
				  "ShippedDate": "2015-04-01T00:00:00",
				  "Status": "A"
				},
				{
				  "ProductName": "Milk",
				  "Quantity": 4,
				  "ExtendedPrice": 10,
				  "ShipperName": "ACME",
				  "ShippedDate": "2015-02-18T00:00:00",
				  "Status": "B"
				},
				{
				  "ProductName": "Canned Beans",
				  "Quantity": 3,
				  "ExtendedPrice": 6.85,
				  "ShipperName": "ACME",
				  "ShippedDate": "2015-03-02T00:00:00",
				  "Status": "B"
				},
				{
				  "ProductName": "Salad",
				  "Quantity": 2,
				  "ExtendedPrice": 8.8,
				  "ShipperName": "ACME",
				  "ShippedDate": "2015-04-12T00:00:00",
				  "Status": "C"
				},
				{
				  "ProductName": "Bread",
				  "Quantity": 1,
				  "ExtendedPrice": 2.71,
				  "ShipperName": "Fun Inc.",
				  "ShippedDate": "2015-01-27T00:00:00",
				  "Status": "A"
				}
			  ]
			  

			

			var oViewModel = new JSONModel({
				currency: vv
			});
			this.getView().setModel(oViewModel, "view");
		},

		onFilterInvoices: function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
			});
		}
	});

});