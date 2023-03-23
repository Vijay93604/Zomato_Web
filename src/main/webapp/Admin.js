$('.showAndHide').hide();
$('#logoutShow').hide();

function hideAndShow(id){
    $('.showAndHide').hide();
    // $('#'+id).show();
    $('#'+id).slideDown(1000);
}

var logoutShow = 0;
function showLogOut(){
    console.log("hello");
    if(logoutShow == 0){
        $('#logoutShow').slideDown(200);
        logoutShow++;
    }else{
        $('#logoutShow').hide();
        logoutShow--;
    }
}

function logout(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            if(xhr.responseText == "Deleted"){
                window.location.href = "Signin_Login.html";
            }
        }
    }
    xhr.open("POST","DeleteCookie");
    xhr.send();

}


function addDelBoys(){

    var name = document.getElementById("delName").value;
    var phoneNumber = document.getElementById("delNum").value;
    var location = document.getElementById("delLoc").value;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            otDel.innerText = xhr.responseText;
        }
    }

    var deliveryBoyDetails = {};
    deliveryBoyDetails.name = name;
    deliveryBoyDetails.phoneNumber = phoneNumber;
    deliveryBoyDetails.location = location;


    xhr.open("POST" ,"http://localhost:8080/Zomato_Web/AddDeliveryBoy");
    xhr.setRequestHeader("Content-Type" ,"application/json");
    xhr.send(JSON.stringify(deliveryBoyDetails));

}

function show_Customer_Details(){


    var xhr = new XMLHttpRequest();
    xhr.open("POST" ,"ViewCustomerDetails",true);
    var parent = document.getElementById("viewCustomer");

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
           var jsonArr = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
           var parent = document.getElementById("viewCustomer");

           parent.innerHTML = "";
         
           var head = document.createElement("div");
           head.setAttribute("id","cusTitleDiv");
           var h1 = document.createElement("h1");
           h1.setAttribute("id","cusTitle");
           h1.innerText = "Customer Details";
           head.appendChild(h1);
           parent.appendChild(head);

           for(let i = 0 ; i < jsonArr.length ; i++){
            
              var minpar = document.createElement("div");
              minpar.setAttribute("class","cusDe");
          
              var name = document.createElement("div");
              name.setAttribute("class","userDe");
              
              var icon1 = document.createElement("lord-icon");
              icon1.setAttribute("src","https://cdn.lordicon.com/dxjqoygy.json");
              icon1.setAttribute("trigger","hover");
              icon1.style.width="50px";
              icon1.style.height="50px";
              
              var nameDet = document.createElement("span");
              nameDet.setAttribute("class","details");
              // Add name here
              // "Vijaya Kannan"
              nameDet.innerText = jsonArr[i].name;
          
              name.appendChild(icon1);
              name.appendChild(nameDet);
          
              var phone = document.createElement("div");
              phone.setAttribute("class","userDe");
          
              var icon2 = document.createElement("lord-icon");
              icon2.setAttribute("src","https://cdn.lordicon.com/fwafvpnq.json");
              icon2.setAttribute("trigger","hover");
              icon2.style.width="50px";
              icon2.style.height="50px";
          
              var phoneDet = document.createElement("span");
              phoneDet.setAttribute("class","details");
              // Add Phone Number
              // "9360450375"
              phoneDet.innerText = jsonArr[i].phoneNumber;
          
              phone.appendChild(icon2);
              phone.appendChild(phoneDet);
          
              var location = document.createElement("div");
              location.setAttribute("class","userDe");
          
              var icon3 = document.createElement("lord-icon");
              icon3.setAttribute("src","https://cdn.lordicon.com/zzcjjxew.json");
              icon3.setAttribute("trigger","hover");
              icon3.style.width="50px";
              icon3.style.height="50px";
          
              var locDet = document.createElement("span");
              locDet.setAttribute("class","details");
              // Add Location
              // "Sivakasi"
              locDet.innerText = jsonArr[i].location;
          
              location.appendChild(icon3);
              location.appendChild(locDet);
              
              minpar.appendChild(name);
              minpar.appendChild(phone);
              minpar.appendChild(location);
              parent.appendChild(minpar);
           }
        }
    }
    xhr.send();
    
}

function show_Delivery_Boy_Details(){
    console.log("Enter Delivery");
    var parent = document.getElementById("viewDel");
    parent.innerHTML = "";   


    var xhr = new XMLHttpRequest();
    xhr.open("POST" ,"ViewDeliveryBoyDetails",true);

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            var deliveryDetails = JSON.parse(xhr.responseText);
            console.log(deliveryDetails);
            for(let i = 0 ; i < deliveryDetails.length; i++){

                var header = document.createElement("div");
                var title = document.createElement("h1");
                header.setAttribute("class","header");
                title.setAttribute("class","headerTitle");
                title.innerText = "Delivery Boy Details"
                header.appendChild(title);
                parent.appendChild(header);

                var main1 = document.createElement("div");
                main1.setAttribute("class","delDetailsparent");
                parent.appendChild(main1);

                var d1 = document.createElement("div");
                d1.setAttribute("class","userDe");

                var l1 = document.createElement("lord-icon");
                l1.setAttribute("src","https://cdn.lordicon.com/eszyyflr.json");
                l1.setAttribute("trigger","hover");
                l1.style.width = "50px";
                l1.style.height = "50px";

                var s1 = document.createElement("span");
                s1.setAttribute("class","details");
                // TODO add Name
                s1.innerText = deliveryDetails[i].name;

                d1.appendChild(l1);
                d1.appendChild(s1);
                main1.appendChild(d1);
                

                // -----------

                var d2 = document.createElement("div");
                d2.setAttribute("class","userDe");

                var l2 = document.createElement("lord-icon");
                l2.setAttribute("src","https://cdn.lordicon.com/rqqkvjqf.json");
                l2.setAttribute("trigger","hover");
                l2.style.width = "50px";
                l2.style.height = "50px";

                var s2 = document.createElement("span");
                s2.setAttribute("class","details");
                // TODO add Name
                s2.innerText = deliveryDetails[i].id;

                d2.appendChild(l2);
                d2.appendChild(s2);
                main1.appendChild(d2);

                //-----------

                var d3 = document.createElement("div");
                d3.setAttribute("class","userDe");

                var l3 = document.createElement("lord-icon");
                l3.setAttribute("src","https://cdn.lordicon.com/fwafvpnq.json");
                l3.setAttribute("trigger","hover");
                l3.style.width = "50px";
                l3.style.height = "50px";

                var s3 = document.createElement("span");
                s3.setAttribute("class","details");
                // TODO add Name
                s3.innerText =  deliveryDetails[i].phoneNumber;

                d3.appendChild(l3);
                d3.appendChild(s3);
                main1.appendChild(d3);

                // ------------

                var d4 = document.createElement("div");
                d4.setAttribute("class","userDe");

                var l4 = document.createElement("lord-icon");
                l4.setAttribute("src","https://cdn.lordicon.com/zzcjjxew.json");
                l4.setAttribute("trigger","hover");
                l4.style.width = "50px";
                l4.style.height = "50px";

                var s4 = document.createElement("span");
                s4.setAttribute("class","details");
                // TODO add Name
                s4.innerText = deliveryDetails[i].location;

                d4.appendChild(l4);
                d4.appendChild(s4);
                main1.appendChild(d4);

                // ------------

                var d5 = document.createElement("div");
                d5.setAttribute("class","userDe");

                var l5 = document.createElement("lord-icon");
                l5.setAttribute("src","https://cdn.lordicon.com/mlnkdrif.json");
                l5.setAttribute("trigger","hover");
                l5.style.width = "50px";
                l5.style.height = "50px";

                var s5 = document.createElement("span");
                s5.setAttribute("class","details");
                // TODO add Name
                s5.innerText = deliveryDetails[i].status;

                d5.appendChild(l5);
                d5.appendChild(s5);
                main1.appendChild(d5);

            }
        }
    }

    xhr.send();

}

function createFoodNameInputBox(){

    var parent = document.getElementById("addHotelMain");
    var count = document.getElementById("foodItemCount").value;
    var toadd = document.getElementById("foodNameAndPrice");
    toadd.innerHTML = "";

    for(let i = 0 ; i < count ; i++){
        let parentDiv = document.createElement('div');
        parentDiv.setAttribute("class","main")
        // parentDiv.style.width='100%';
        let foodNameInput = document.createElement('input');
        foodNameInput.type='text';
        foodNameInput.setAttribute("class","foodName");
        foodNameInput.placeholder = "Enter Food Name";
        let foodPriceInput = document.createElement('input');
        foodPriceInput.setAttribute("class","foodPrice");
        foodPriceInput.type='number';
        foodPriceInput.placeholder = "Enter Food Price";
        parentDiv.appendChild(foodNameInput);
        parentDiv.appendChild(foodPriceInput);
        toadd.append(parentDiv);
    }

}

function addHotel(){
    
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(xhr.responseText);
            // ot.innerText = xhr.responseText;
            // document.getElementById("ot").innerText = xhr.responseText;
            alert("Hotel Added");
            location.reload();
        }
    }

    var hotelName = document.getElementById("hotelName").value;
    var hotelLocation = document.getElementById("hotelLocation").value;
    var actualAddress = document.getElementById("hotelAddress").value;
    var averagePrice = document.getElementById("averagePrice").value;
    var description = document.getElementById("description").value;

    var foodNames = [];
    var foodPrices = [];

    var selectElement = document.querySelector('select');
    var cuisine = selectElement.value;

    var foodNamesElements = document.querySelectorAll(".foodName");
    var foodPriceElements = document.querySelectorAll(".foodPrice");

    for(let i = 0 ; i < foodNamesElements.length ; i++){
        foodNames.push(foodNamesElements[i].value);
        foodPrices.push(foodPriceElements[i].value);
    }

    var hotelDetails = {};

    hotelDetails.hotelName = hotelName;
    hotelDetails.description = description;
    hotelDetails.hotelLocation = hotelLocation;
    hotelDetails.actualAddress = actualAddress;
    hotelDetails.cuisine = cuisine;
    hotelDetails.averagePrice = averagePrice;
    hotelDetails.foodNames = foodNames;
    hotelDetails.foodPrices = foodPrices;
    
    console.log(hotelDetails);

    xhr.open("POST","http://localhost:8080/Zomato_Web/AddHotel");
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(JSON.stringify(hotelDetails));

}