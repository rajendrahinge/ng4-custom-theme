import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export var API_ENDPOINT:string = 'http://crmapi.justbuylive.in/api';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  
})

export class DashboardComponent implements OnInit {


	/*public auth_token = this.localStorage.getItem('auth_token');
	public roleId     = this.localStorage.getItem('roleId');
	public userId     = this.localStorage.getItem('userId');*/
	userTypeStatus: string;
	closeResult: string;
	@ViewChild('clientsInformationModel') private clientsInformationModel;
	public constructor(protected localstorage: AsyncLocalStorage,protected modalService: NgbModal) {
		this.userTypeStatus = 'N/A';
	};

	dtOptions: DataTables.Settings = {};
	title       = 'anguler 4';  
	ngOnInit(): void {
		this.myMethod();
		this.listAccounts();    
	}	

	public myMethod () : any {
		console.log('dddd');
		console.log('dddddddddddddddd');
	}


	public listAccounts(): void {
		this.dtOptions = {  		
			"autoWidth": false,
			"processing": true,
			"serverSide":true,
			"destroy": true,
			"order": [[ 0, "desc" ]],		
			"ajax": {
				"url": API_ENDPOINT,
				"type": 'POST',
				"dataType": "json",
				"data": function( data ) {
					var new_data : any = data;
					new_data.parameters = 	[{
						"callName": [ "listRetailers" ],
						"params": {
							"auth_token": '3e8b5e97a24b239276a9237341ec6041',
							"verificationStatus": 'VC',
							"retailerUserType":""
							}
					}];
					return JSON.stringify( new_data );
				}
			},
			"drawCallback":function( settings ) {
				// Output the data for the visible rows to the browser's console
			},			
			"preDrawCallback": function( settings ) {
			},
			"columns": [
			{
				"data":"retailer_id", 
				"name":"retailer_id", 
				"title": "Retailer Id",
				"className": "retailer_id",
				"orderable": true,
				//"targets": [0]
			},
			{
				"data"      :"mobile_no", 
				"name"      :"mobile_no", 
				"title"     :"Mobile",
				"orderable" :false,
				"className" :"mobile_no",
				"render"    :function ( data, type, row ) {
					if (row.is_reserved == 1) {
						return '<div><a href="javascript:void(0);" class="tooltip action reserved view">'+data+'<span class="tooltiptext">Reserved By <br> '+row.reserved_by_name+'</span></a></br>'+row.alternate_mobiles+'</div>';
					} else { 
						return '<div><a href="javascript:void(0);" class="action view">'+data+'</a></br>'+row.alternate_mobiles+'</div>';
					}
				},
				/*"createdCell" : function(nTd, sData, oData, iRow, iCol) {	
					const self = this;
					$(nTd).find(".action").on('click',function(){
						//self.myMethod();
						setTimeout(this.myMethod(), 5000, 'hello again');
					});
			        // Unbind first in order to avoid any duplicate handler
			        // (see https://github.com/l-lin/angular-datatables/issues/87)
			        //$(nTd, iRow).unbind('click');
			        /*$(nTd, iRow).bind('click', () => {
			          self.myMethod(data);
			        });
			        return iRow;				
				},	*/		
			},
			{
				"data":"full_name", 
				"name":"full_name", 
				"title": "Retailer Name",
				"className": "full_name",
				"orderable": false
				//"targets": [0]
			},
			{
				"data":"company_name", 
				"name":"company_name", 
				"title": "Company Name",
				"className": "company_name",
				"orderable": false
				//"targets": [0]
			},
			{
				"data":"email_id", 
				"name":"email_id",
				"title": "Email",
				"className": "email_id",
				"orderable": false
				//"targets": [0]
			},
			{
				"data":"user_type", 
				"name":"user_type", 
				"title": "User Type",
				"className": "user_type",
				"orderable": false
				//"targets": [0]
			},
			{
				"data":"created_time", 
				"name":"created_time", 
				"title": "Reg. Date",
				"className": "created_time",
				"orderable": false
				//"targets": [0]
			},
			{
				"data":"retailer_type", 
				"name":"retailer_type", 
				"title": "Retailer Type",
				"className": "retailer_type",
				"orderable": false
				//"targets": [0]
			},
			{
				"data":"firm_type", 
				"name":"firm_type", 
				"title": "Firm Type",
				"className": "firm_type",
				"orderable": false
				//"targets": [0]
			},
			{
				"data"     : "verification_status", 
				"name"     : "verification_status",
				"className": "hide verification_status",
				"orderable": false
				//"visible"  : false, 
				//"targets": [0]
			},        
			{
				"data":"alternate_mobiles", 
				"name":"alternate_mobiles",
				"className": "hide alternate_mobiles",
				"orderable": false
				//"visible"  : false, 
				//"targets": [0]
			},     
			{
				"data":"mobile_no", 
				"name":"mobile_no",
				"className": "hide mobile_no",
				//"visible"  : false, 
				"orderable": false
				//"targets": [0]
			},
			{
				"data":"gender", 
				"name":"gender",
				"className": "hide gender",
				"orderable": false
				//"visible"  : false, 
				//"targets": [0]
			},
			{
				"data":"verification_time", 
				"name":"verification_time",
				"className": "hide verification_time",
				"orderable": false
				//"visible"  : false, 
				//"targets": [0]
			},          
			{
				"data":"dob", 
				"name":"dob",
				"className": "hide dob",
				"orderable": false
				//"visible"  : false, 
				//"targets": [0]
			},          
			{
				"data":"verification_status", 
				"name":"verification_status",
				"className": "hide verification_status",
				"orderable": false
				//"visible"  : false, 
				//"targets": [0]
			},
			{
				"data":"pan", 
				"name":"pan",
				"className": "hide pan",
				"orderable": false
				//"visible"  : false, 
				//"targets": [0]
			},
			{
				"data":"retailer_address", 
				"name":"retailer_address",
				"className": "hide",
				"orderable": false,
				//"targets": [0],
				//"visible"  : false, 
				"render": function ( data, type, row ) {
					return '<span class="hide retailer_address">'+encodeURIComponent(data)+'</span>';
				}
			},        
			{
				"data":"docsArray", 
				"name":"docsArray",
				"className": "hide",
				"orderable": false,
				// "visible"  : false, 
				//"targets": [0],
				"render": function ( data, type, row ) {
					return '<span class="hide docsArray">'+encodeURIComponent(JSON.stringify(data))+'</span>';
				}
			},
			{
				"data":"shopImagesArray", 
				"name":"shopImagesArray",
				"className": "hide",
				"orderable": false,
				//"visible"  : false, 
				//"targets": [0],
				"render": function(data, type, row) {
					return '<span class="hide shopImagesArray">'+encodeURIComponent(JSON.stringify(data))+'</span>';
				}
			},
			{
				"data":"gstin", 
				"name":"gstin",
				"className": "hide gstin",
				"orderable": false
				//"visible"  : false, 
				//"targets": [0]
			},
			{
				"data":"vat_no",
				"name":"vat_no",
				"className":"hide vat_no",
				"orderable":false
				//"visible"  : false, 
			},
			{
				"data":"shop_act",
				"name":"shop_act",
				"className":"hide shop_act",
				"orderable":false
				//"visible"  : false, 
			},
			{
				"data":"justpay_details",
				"name":"justpay_details",
				"className":"hide justpay_details",
				"orderable": false,
				//"targets": [0],
				"render": function(data, type, row) {
					return '<span class="hide justpay_details">'+encodeURIComponent(JSON.stringify(data))+'</span>';
				}
			}],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
		        const self = this;
		        // Unbind first in order to avoid any duplicate handler
		        // (see https://github.com/l-lin/angular-datatables/issues/87)
		        $('td.mobile_no', row).unbind('click');
		        $('td.mobile_no', row).bind('click', () => {
		          self.open(self.clientsInformationModel);
		        });
		        return row;
		    }    
		};
	}

	open(clientsInformationModel) {
		this.modalService.open(clientsInformationModel).result.then((result) => {
		  this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
		  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
		  return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
		  return 'by clicking on a backdrop';
		} else {
		  return  `with: ${reason}`;
		}
	}
}