
var result1 = " ";
var shipr2result = " ";
var result3 = " ";


function MenuChoice() {
    if (document.getElementById("menu").value == "Create Customer") {
        
        document.getElementById("area1").style.visibility = "visible";
        document.getElementById("area2").style.visibility = "hidden";
        document.getElementById("area3").style.visibility = "hidden";
 
    }
    else  if (document.getElementById("menu").value == "Change Ship-To Address"){
        document.getElementById("area1").style.visibility = "hidden";
        document.getElementById("area2").style.visibility = "visible";
        document.getElementById("area3").style.visibility = "hidden";
         
    }
    else  if (document.getElementById("menu").value == "Delete Customer"){
        document.getElementById("area1").style.visibility = "hidden";
        document.getElementById("area2").style.visibility = "hidden";
        document.getElementById("area3").style.visibility = "visible";
    }
    
    else {
        document.getElementById("area1").style.visibility = "hidden";
        document.getElementById("area2").style.visibility = "hidden";
        document.getElementById("area3").style.visibility = "hidden";
    }
}

function CreateCustomer() {
    var objRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    //collect customer data from web page
    var custrid = document.getElementById("custid").value;
    var custrname = document.getElementById("custname").value;
    var custrcity = document.getElementById("custcity").value;
     
    //create the parameter string
    var newcustomer = '{"CustomerID":"'+custrid+'","CompanyName":"'+custrname+'","City":"'+custrcity+'"}';
    
    //checking fo Ajax operation return
    objRequest.onreadystatechange = function() {
        
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            result1 = JSON.parse(objRequest.responseText);
            OperationResult(result1);
        }
    }
    
//start Ajax request
objRequest.open("POST", url, true);
objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
objRequest.send(newcustomer);

}


function OperationResult(result1) {
    if (result1.WasSuccessful == 1) {
        document.getElementById("result").innerHTML = "The operation was successful!!"
         
        }
    else {
        document.getElementById("result").innerHTML = "The operation was not successful!" +"<br>" + result1.Exception;
        } 
}


function ShipToAddr() {
    var objRequest2 = new XMLHttpRequest();
    var url2 = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    //collect customer data from web page
    var orderid = 0;
     
    orderid = Number(document.getElementById("orderno").value);
    var ship2name = document.getElementById("shiptoname").value;
    var ship2addr = document.getElementById("shiptoaddr").value;
    var ship2city = document.getElementById("shiptocity").value;
    var ship2zip = 0;
    ship2zip = Number(document.getElementById("shiptozip").value);
    
    
    //create the parameter string
    var newaddress = '{"OrderID": + orderid +,"ShipAddress":"'+ship2addr+'","ShipCity":"'+ship2city+'","ShipName":"'+ship2name+'","ShipPostcode": + ship2zip +}';
    
    //checking fo Ajax operation return
    objRequest2.onreadystatechange = function() {
    
    var rState = objRequest2.readyState;
    var rStatus = objRequest2.status;
    if (objRequest2.readyState == 4 && objRequest2.status == 200) {
            shipr2result = JSON.parse(objRequest2.responseText);
            OperationResult2(shipr2result);
        }
    }
    //start Ajax request
    objRequest2.open("POST", url2, true);
    objRequest2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest2.send(newaddress);
}



function OperationResult2(shipr2result) {
    var newStatus = shipr2result.value;
    
    if (shipr2result.WasSucessful  == 1) {
        document.getElementById("ship2result").innerHTML = "The operation was successful!! ";
         
        }
    else  if (shipr2result.WasSuccessful == 0) {
        document.getElementById("ship2result").innerHTML = "The operation was not successful! unspecified error  " + shipr2result.Exception;
        }
    else  if (shipr2result.WasSuccessful == -2) {
        document.getElementById("ship2result").innerHTML = "The operation was not successful! deserialized data string  "+ shipr2result.Exception;
        }
    else  if (shipr2result.WasSuccessful == -3) {
        document.getElementById("ship2result").innerHTML = "The operation was not successful! record not found   " + shipr2result.Exception;
        }        
         
}

function DeleteCust() {
    var objRequest3 = new XMLHttpRequest();
    var url3 = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/"
    
    
    //collect customer data from web page
    var custrid3 = document.getElementById("custid3").value;
    url3 += custrid3;
    
    //checking fo Ajax operation return
    objRequest3.onreadystatechange = function() {
 
     
    if (objRequest3.readyState == 4 && objRequest3.status == 200) {
            result3 = JSON.parse(objRequest3.responseText);
            OperationResult3(result3);
        }
    }
    //start Ajax request
    objRequest3.open("GET", url3, true);
//    objRequest3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest3.send();
}
    
function OperationResult3(result3) {
    var newStatus3 = result3.value;
    
    if (result3.DeleteCustomerResult.WasSucessful  == 1) {
        document.getElementById("delcustresult").innerHTML = "The operation was successful!! ";
         
        }
    else   if (result3.DeleteCustomerResult.WasSuccessful == 0) {
        document.getElementById("delcustresult").innerHTML = "The operation was not successful! unspecified error  " + result3.Exception;
        }
           
         
}    
 