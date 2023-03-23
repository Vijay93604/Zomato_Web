// changePage();
showHotels();
$("#forUpi").hide();
$("#showDeliveryBoyDetailsAfterOrdered").hide();
$("#OrderPage").hide();
var mainPage = document.getElementById("userFirstPage");
var orderPage = document.getElementById("OrderPage");
var cssLink = document.getElementById("cssL");

$('#viewProfile').hide();
$('#viewHistory').hide();
$('#logoutShow').hide();
var mainAndOrderPage = 0;

// hideAndShow("viewHistory");

function hideAndShow(id){
    $('.hideAndShow').hide();
    // TODO change
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

function viewProfile(){

    var name = document.getElementById("userProfileName");
    var number = document.getElementById("userProfileNumber");
    var location = document.getElementById("userProfileLocation");

    var xhr = new XMLHttpRequest();
    xhr.open("POST","ViewProfile",true);

    xhr.onreadystatechange = () => {

        if(xhr.readyState == 4 && xhr.status == 200){

            var values = JSON.parse(xhr.responseText);

            name.innerText = values.userName;
            number.innerText = values.userNumber;
            location.innerText = values.userLocation;

        }

    }

    xhr.send();

}
console.log("sdfg");

// The below function is for order food page change 
var page = 0;
function changePage(){
    console.log("hrllo")
    if(page == 0){
        $("#userFirstPage").hide();
        $("#OrderPage").show();
        // cssLink.setAttribute("href","OrderFood.css");
        page++;
    }else{
        $("#userFirstPage").show();
        $("#OrderPage").hide();
        // cssLink.setAttribute("href","UserMain.css");
        page--;
    }
}



function showHotels(){

    var orderFood = document.getElementById("toAppend");
    orderFood.innerHTML = "";
    var xhr = new XMLHttpRequest();
    xhr.open("POST","ShowHotels",true);

    xhr.onreadystatechange = () => {

        if(xhr.readyState == 4 && xhr.status == 200){

            var values = JSON.parse(xhr.responseText);
            
            for(let i = 0 ; i < values.length ; i++){

                const hotelCoverDetails = document.createElement("div");
                hotelCoverDetails.classList.add("hotelCoverDetails");
                hotelCoverDetails.setAttribute("id",values[i].hotelId);
                hotelCoverDetails.setAttribute("onclick","changePage();orderSelectedFood(this.id)");
                const hotelName = document.createElement("div");
                hotelName.classList.add("infoHotel");
                const hotelIcon1 = document.createElement("lord-icon");
                hotelIcon1.setAttribute("src", "https://cdn.lordicon.com/jqnthkou.json");
                hotelIcon1.setAttribute("trigger", "hover");
                hotelIcon1.setAttribute("style", "width:50px;height:50px");
                const hotelDetails1 = document.createElement("span");
                hotelDetails1.classList.add("hotelDetails");
                hotelDetails1.textContent = values[i].hotelName;
                hotelName.appendChild(hotelIcon1);
                hotelName.appendChild(hotelDetails1);
        
                const hotelLocation = document.createElement("div");
                hotelLocation.classList.add("infoHotel");
                const hotelIcon2 = document.createElement("lord-icon");
                hotelIcon2.setAttribute("src", "https://cdn.lordicon.com/zzcjjxew.json");
                hotelIcon2.setAttribute("trigger", "hover");
                hotelIcon2.setAttribute("style", "width:50px;height:50px");
                const hotelDetails2 = document.createElement("span");
                hotelDetails2.classList.add("hotelDetails");
                hotelDetails2.textContent = values[i].hotelLocation;
                hotelLocation.appendChild(hotelIcon2);
                hotelLocation.appendChild(hotelDetails2);
        
                const restaurantName = document.createElement("div");
                restaurantName.classList.add("infoHotel");
                const restaurantIcon = document.createElement("lord-icon");
                restaurantIcon.setAttribute("src", "https://cdn.lordicon.com/coqbeapw.json");
                restaurantIcon.setAttribute("trigger", "hover");
                restaurantIcon.setAttribute("style", "width:50px;height:50px");
                const restaurantDetails = document.createElement("span");
                restaurantDetails.classList.add("hotelDetails");
                restaurantDetails.textContent = values[i].hotelCuisine;
                restaurantName.appendChild(restaurantIcon);
                restaurantName.appendChild(restaurantDetails);
        
                const hotelRating = document.createElement("div");
                hotelRating.classList.add("infoHotel");
                const hotelIcon3 = document.createElement("lord-icon");
                hotelIcon3.setAttribute("src", "https://cdn.lordicon.com/mdgrhyca.json");
                hotelIcon3.setAttribute("trigger", "morph");
                hotelIcon3.setAttribute("style", "width:50px;height:50px");
                const hotelDetails3 = document.createElement("span");
                hotelDetails3.classList.add("hotelDetails");
                hotelDetails3.textContent = values[i].ratings;
                hotelRating.appendChild(hotelIcon3);
                hotelRating.appendChild(hotelDetails3);
        
                const price =  document.createElement("div");
                price.classList.add("infoHotel");
                const icon = document.createElement("lord-icon");
                icon.setAttribute("src", "https://cdn.lordicon.com/qhviklyi.json");
                icon.setAttribute("trigger", "hover");
                icon.setAttribute("style", "width:50px;height:50px");
        
                const hotelDetails4 = document.createElement("span");
                hotelDetails4.classList.add("hotelDetails");
                hotelDetails4.textContent = "₹"+values[i].price+" for 2 person";
                price.appendChild(icon);
                price.appendChild(hotelDetails4);
        
        
                hotelCoverDetails.appendChild(hotelName);
                hotelCoverDetails.appendChild(hotelLocation);
                hotelCoverDetails.appendChild(restaurantName);
                hotelCoverDetails.appendChild(hotelRating);
                hotelCoverDetails.appendChild(price);
        
              
                orderFood.appendChild(hotelCoverDetails);
        
            }
           

        }

    }

    xhr.send();

}

var selectedHotelDetails = {};

function orderSelectedFood(id){
    console.log("Selected Hotel")
    var xhr = new XMLHttpRequest();
    var val = id;
    console.log(id);
    xhr.onreadystatechange = () => {

        if(xhr.readyState == 4 && xhr.status == 200){
            selectedHotelDetails = JSON.parse(xhr.responseText);
            document.getElementById("hoName").innerText = selectedHotelDetails.hotelName;
            document.getElementById("hotloca").innerText = selectedHotelDetails.location;
            document.getElementById("hotAddress").innerText = selectedHotelDetails.address;
            document.getElementById("hotstar").innerText = selectedHotelDetails.averageRating;
            $('.hideAndShowForOrderFood').hide();
            $('#showMenu').show();
            showMenu();
            
        }
    }

    xhr.open("POST","SelectedHotelInfo");
    xhr.setRequestHeader("Content-Type" ,"application/x-www-form-urlencoded");
    xhr.send("hotelId="+val);

}

function showMenu(){
    var count1 = 0;
    var count2 = 0;
    var parent = document.getElementById("menuDiv");
    parent.innerHTML = "";
    parent.innerHTML = "<div class='containersHead'><h1>Food Name</h1></div><div class='containersHead2'><h1>Food Price</h1></div>";

    for(let i = 0 ; i < selectedHotelDetails.foodName.length*2; i++){
        if(i % 2 == 0){

            const restaurantIcon = document.createElement("lord-icon");
            restaurantIcon.setAttribute("src", "https://cdn.lordicon.com/coqbeapw.json");
            restaurantIcon.setAttribute("trigger", "hover");
            restaurantIcon.setAttribute("style", "width:50px;height:50px");
            
            var container = document.createElement("div");
            container.setAttribute("class","containers");
            container.appendChild(restaurantIcon);
            var foodName = document.createElement("p");
            container.appendChild(foodName);
            foodName.innerText = selectedHotelDetails.foodName[count1];
            // container.innerHTML = "Biryani";
            count1++;
            parent.appendChild(container);

        }else{

            const icon = document.createElement("lord-icon");
            icon.setAttribute("src", "https://cdn.lordicon.com/qhviklyi.json");
            icon.setAttribute("trigger", "hover");
            icon.setAttribute("style", "width:50px;height:50px");
            var foodPrice = document.createElement("p");
            foodPrice.innerText = "₹"+selectedHotelDetails.foodPrice[count2];
            count2++;
            var container = document.createElement("div");
            container.setAttribute("class","containers");
            container.appendChild(icon);
            container.appendChild(foodPrice);
            parent.appendChild(container);
        }
       
    }
}

// selectedHotelDetails.foodName.length


// changePage();
// showMenu();

const inp = document.getElementById("searchBox");

inp.addEventListener("input",() => {
    
    var orderFood = document.getElementById("toAppend");
    orderFood.innerHTML = "";

    var value = inp.value;
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        
        if(xhr.readyState == 4 && xhr.status == 200){

            if(xhr.responseText == "No Hotel Found"){
                orderFood.innerText = xhr.responseText;
                return;
            }
            console.log(xhr.responseText);
            var values = JSON.parse(xhr.responseText);
        
            for(let i = 0 ; i < values.length ; i++){

                const hotelCoverDetails = document.createElement("div");
                hotelCoverDetails.classList.add("hotelCoverDetails");
                hotelCoverDetails.setAttribute("id",values[i].hotelId);
                hotelCoverDetails.setAttribute("onclick","changePage();orderSelectedFood(this.id)");
                const hotelName = document.createElement("div");
                hotelName.classList.add("infoHotel");
                const hotelIcon1 = document.createElement("lord-icon");
                hotelIcon1.setAttribute("src", "https://cdn.lordicon.com/jqnthkou.json");
                hotelIcon1.setAttribute("trigger", "hover");
                hotelIcon1.setAttribute("style", "width:50px;height:50px");
                const hotelDetails1 = document.createElement("span");
                hotelDetails1.classList.add("hotelDetails");
                hotelDetails1.textContent = values[i].hotelName;
                hotelName.appendChild(hotelIcon1);
                hotelName.appendChild(hotelDetails1);
        
                const hotelLocation = document.createElement("div");
                hotelLocation.classList.add("infoHotel");
                const hotelIcon2 = document.createElement("lord-icon");
                hotelIcon2.setAttribute("src", "https://cdn.lordicon.com/zzcjjxew.json");
                hotelIcon2.setAttribute("trigger", "hover");
                hotelIcon2.setAttribute("style", "width:50px;height:50px");
                const hotelDetails2 = document.createElement("span");
                hotelDetails2.classList.add("hotelDetails");
                hotelDetails2.textContent = values[i].hotelLocation;
                hotelLocation.appendChild(hotelIcon2);
                hotelLocation.appendChild(hotelDetails2);
        
                const restaurantName = document.createElement("div");
                restaurantName.classList.add("infoHotel");
                const restaurantIcon = document.createElement("lord-icon");
                restaurantIcon.setAttribute("src", "https://cdn.lordicon.com/coqbeapw.json");
                restaurantIcon.setAttribute("trigger", "hover");
                restaurantIcon.setAttribute("style", "width:50px;height:50px");
                const restaurantDetails = document.createElement("span");
                restaurantDetails.classList.add("hotelDetails");
                restaurantDetails.textContent = values[i].hotelCuisine;
                restaurantName.appendChild(restaurantIcon);
                restaurantName.appendChild(restaurantDetails);
        
                const hotelRating = document.createElement("div");
                hotelRating.classList.add("infoHotel");
                const hotelIcon3 = document.createElement("lord-icon");
                hotelIcon3.setAttribute("src", "https://cdn.lordicon.com/mdgrhyca.json");
                hotelIcon3.setAttribute("trigger", "morph");
                hotelIcon3.setAttribute("style", "width:50px;height:50px");
                const hotelDetails3 = document.createElement("span");
                hotelDetails3.classList.add("hotelDetails");
                hotelDetails3.textContent = values[i].ratings;
                hotelRating.appendChild(hotelIcon3);
                hotelRating.appendChild(hotelDetails3);
        
                const price =  document.createElement("div");
                price.classList.add("infoHotel");
                const icon = document.createElement("lord-icon");
                icon.setAttribute("src", "https://cdn.lordicon.com/qhviklyi.json");
                icon.setAttribute("trigger", "hover");
                icon.setAttribute("style", "width:50px;height:50px");
        
                const hotelDetails4 = document.createElement("span");
                hotelDetails4.classList.add("hotelDetails");
                hotelDetails4.textContent = "₹"+values[i].price+" for 2 person";
                price.appendChild(icon);
                price.appendChild(hotelDetails4);
        
        
                hotelCoverDetails.appendChild(hotelName);
                hotelCoverDetails.appendChild(hotelLocation);
                hotelCoverDetails.appendChild(restaurantName);
                hotelCoverDetails.appendChild(hotelRating);
                hotelCoverDetails.appendChild(price);
        
              
                orderFood.appendChild(hotelCoverDetails);
            }

        }
    }

    xhr.open("POST","SearchHotels");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send("SearchValue="+value);



});

$('.hideAndShowForOrderFood').hide();
// TODO change into showMenu Id 
$('#orderfoodFromSelectedHotel').show();

function hideAndShowforOrderFood(id){
    console.log("Works")
    $('.hideAndShowForOrderFood').hide();
    $('#'+id).slideDown(1000);
}

// The below function is for get all ratings

function showRatingsOfSelectedHotel(){

    var parent = document.getElementById("viewRatings");

    var toDelete = document.querySelectorAll(".commentsAboutHotel");

    var descriptionOfHotel = document.getElementById("hotelDescp");
    descriptionOfHotel.innerText = selectedHotelDetails.description;

    for(let i = 0 ; i < toDelete.length ; i++){
        toDelete[i].remove();
    }

    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){

            var json =  JSON.parse(xhr.responseText);

            console.log(json);

            for(let i = 0 ; i < json.length ; i++){

                
                var subParent = document.createElement("div");
                subParent.setAttribute("class","commentsAboutHotel");

                var detailsOfCommenter = document.createElement("div");
                detailsOfCommenter.setAttribute("class","detailsOfCommenter");

                subParent.appendChild(detailsOfCommenter);
                
                var commenterInfo = document.createElement("div");

                var commenterName = document.createElement("h1");
                commenterName.setAttribute("style","color:#F45050;padding-left: 20px;");
                // TODO add commenter Name
                commenterName.innerText = json[i].name;
                commenterInfo.appendChild(commenterName);

                var commentDate = document.createElement("p");
                commentDate.setAttribute("style","padding-left: 30px;font-size:25px");
                // TODO add commented date
                var dateOnly = json[i].date.substring(0,12);
                commentDate.innerText = dateOnly;
                commenterInfo.appendChild(commentDate);

                var star = document.createElement("div");
                star.setAttribute("class","star");

                var icon = document.createElement("lord-icon");
                icon.setAttribute("src","https://cdn.lordicon.com/mdgrhyca.json");
                icon.setAttribute("style","width:50px;height:50px");
                icon.setAttribute("trigger","morph");

                var ratings = document.createElement("p");
                ratings.setAttribute("class","starInRating");
                // TODO add hotel rating star
                ratings.innerText = json[i].star;

                var mainCommentConatiner = document.createElement("div");
                mainCommentConatiner.setAttribute("class","mainCommentContentContainer");

                var mainCommentContainerAppend = document.createElement("div");
                mainCommentContainerAppend.setAttribute("class", "mainCommentContainer");

                mainCommentConatiner.appendChild(mainCommentContainerAppend);

                var mainComment =  document.createElement("p");
                mainComment.setAttribute("class","actualComment");
                // TODO add hotel review
                mainComment.innerText = json[i].comments;

                mainCommentContainerAppend.appendChild(mainComment);

                star.appendChild(icon);
                star.appendChild(ratings)
                detailsOfCommenter.appendChild(commenterInfo);
                detailsOfCommenter.appendChild(star);
                subParent.appendChild(mainCommentConatiner);
                parent.appendChild(subParent);

            }

        }
    }

    xhr.open("POST","getRatingsOfSelectedHotel");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send("hotelId="+selectedHotelDetails.hotelId);

}

// The below function is for add review to selected Hotel

function addReview(){
    var val = document.getElementById("commentValue").value;
    let star = document.getElementById("starRatingByCustomer").value;

    if(val.trim() == "" || star == ""){
        alert("Enter Valid Input");
        return;
    }

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            if(xhr.responseText == "Added"){
                document.getElementById("updatedMessageForUser").innerText = "Comment Updated";
                document.getElementById("commentValue").value = "";
            }
        }
    }

    xhr.open("POST" ,"AddRatings");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send("hotelId="+selectedHotelDetails.hotelId+"&comment="+val+"&star="+star);
}


var foodNameForSelectedHotel = ["Idly","Poori","Pongal","Dosa","Vada"];
var foodPriceForSelectedHotel = [30,50,60,40,20];
var cf = [0,0,0,0,0];
var countForFood = [];



function showFoodAndPriceForOrder(){
  
    var parent = document.getElementById("foodShow");
    var cartParent = document.getElementById("cartItems");
    cartParent.innerHTML = "";
    cartParent.innerHTML += "<div id='cartShowHeader'><h1>Cart</h1></div>";
    parent.innerHTML = "";

    countForFood = [];
    for(let i = 0 ; i < selectedHotelDetails.foodName.length ; i++){
        countForFood.push(0);
    }
    // TODO change all for server
    // selectedHotelDetails.foodName.length
    
    for(let i = 0 ; i < selectedHotelDetails.foodName.length ; i++){


        var subparent = document.createElement("div");
        subparent.setAttribute("class","mainFoodDetailsContainer");
        subparent.setAttribute("id",i);

        var foodNameAndPriceContainer = document.createElement("div");
        foodNameAndPriceContainer.setAttribute("class","foodNameAndPriceContainer");
        subparent.appendChild(foodNameAndPriceContainer);

        var foodName = document.createElement("h1");
        foodName.setAttribute("class","fName");
        // TODO add Food Name from java
        console.log(foodName[i]);
        foodName.innerText = selectedHotelDetails.foodName[i];
        // foodName.innerText = foodNameForSelectedHotel[i];
        foodNameAndPriceContainer.appendChild(foodName);

        var foodPrice = document.createElement("h1");
        foodPrice.setAttribute("class","fPrice");
        // TODO add Food Price from Java
        foodPrice.innerText = "₹"+selectedHotelDetails.foodPrice[i];
        // foodPrice.innerText = "₹"+foodPriceForSelectedHotel[i];
        foodNameAndPriceContainer.appendChild(foodPrice);

        subparent.appendChild(document.createElement("br"));
        subparent.appendChild(document.createElement("br"));

        var addQuantityDetails = document.createElement("div");
        addQuantityDetails.setAttribute("class","addQuantityDetails");
        subparent.appendChild(addQuantityDetails);

        var add = document.createElement("p");
        add.setAttribute("class","addItem");
        add.setAttribute("id","add"+i+1);
        add.setAttribute("onclick","addFoodCount(this.id);addToCart(this.id)")
        // TODO add function for add
        add.innerText = "+";
        addQuantityDetails.appendChild(add);

        var count = document.createElement("p");
        // count.setAttribute("id",i+3);
        count.setAttribute("class","count");
        // TODO count increase
        count.innerText = countForFood[i];
        // count.innerText = cf[i];
        addQuantityDetails.appendChild(count);

        var minus = document.createElement("p");
        minus.setAttribute("class","minusCount");
        minus.setAttribute("id","minus"+i+2);
        minus.setAttribute("onclick","minusFoodCount(this.id);minusFormCart(this.id)");
        // TODO count increase
        minus.innerText = "-";
        addQuantityDetails.appendChild(minus);

        parent.appendChild(subparent);
    }

}

function addFoodCount(id){
    var toaddElement = document.getElementById(id);
    console.log(toaddElement)
    var parent = toaddElement.parentNode.parentNode;

    console.log(parent.id);
    countForFood[parent.id] += 1;
    console.log(countForFood);

    toaddElement.nextSibling.innerText = countForFood[parent.id];

    console.log(toaddElement.nextSibling);
    
}

function minusFoodCount(id){
    
    var toaddElement = document.getElementById(id);
    var parent = toaddElement.parentNode.parentNode;
    if(countForFood[parent.id] == 0){
        return;
    }
    countForFood[parent.id] -= 1;

    toaddElement.previousSibling.innerText = countForFood[parent.id];
    
    console.log(countForFood);
    console.log(countForFood[parent.id]);


}

function addToCart(id){

    var parent = document.getElementById("cartItems");

    var toaddElement = document.getElementById(id);

    var parentforId = toaddElement.parentNode.parentNode;

    var price = parentforId.children[0].children[1];

    var allCart = document.querySelectorAll(".addedToCart");

    for(let i = 0 ; i < allCart.length ; i++){
        if(allCart[i].classList.contains(""+parentforId.id)){
            allCart[i].lastChild.innerText = toaddElement.nextSibling.innerText;
            return;
        }
    }
    

        var subParent = document.createElement("div");
        subParent.setAttribute("class","addedToCart");
        subParent.classList.add(""+parentforId.id);
        var fName = document.createElement("h2");
        fName.innerText =  parentforId.children[0].children[0].innerText;

        var fPrice = document.createElement("h2");
        fPrice.innerText = price.innerText;

        var fQuantity = document.createElement("h2");
        fQuantity.innerText = toaddElement.nextSibling.innerText;

        subParent.appendChild(fName);
        subParent.appendChild(fPrice);
        subParent.appendChild(fQuantity);

        parent.appendChild(subParent);

    
}

function minusFormCart(id){
    var minus = document.getElementById(id);
    var parentforId = minus.parentNode.parentNode;

    var allCart = document.querySelectorAll(".addedToCart");

    for(let i = 0 ; i < allCart.length ; i++){
        if(allCart[i].classList.contains(""+parentforId.id)){
            if(minus.previousSibling.innerText == 0){
                allCart[i].remove();
                return;
            }
        }
    }

    for(let i = 0 ; i < allCart.length ; i++){
        if(allCart[i].classList.contains(""+parentforId.id)){
            allCart[i].lastChild.innerText = countForFood[parentforId.id];
            return;
        }
    }
 
}

var confirmOrder = 0;

function confirmOrderForUser(){

    var allCart = document.querySelectorAll(".addedToCart");

    if(allCart.length == 0){
        alert("Add any items to Cart to Continue");
        return;
    }

    if(confirmOrder == 0){
        $("#confirmOrder").fadeIn();
        showCartInConfirm();
        confirmOrder++;
    }else{
        $("#confirmOrder").hide();
        confirmOrder--;
    }


}
// showCartInConfirm();

function showCartInConfirm(){

    var allCart = document.querySelectorAll(".addedToCart");
    var parent = document.getElementById("orderedFoodConfirmMenu");

    var foodPrice = selectedHotelDetails.foodPrice;

    var total = 0;

    parent.innerHTML = "";

    for(let i = 0 ; i < countForFood.length ; i++){
        if(countForFood[i] != 0){
            total += countForFood[i]*foodPrice[i];
        }
    }

    for(let i = 0 ; i < allCart.length ; i++){
    
        var subParent = document.createElement("div");
        subParent.setAttribute("class","addedItemsInBill");
        var fName = document.createElement("h1");
        // TODO add food Name
        fName.innerText = allCart[i].children[0].innerText;
        var fPrice = document.createElement("h2");
        // TODO add food Price
        fPrice.innerText = allCart[i].children[1].innerText;
        var fCount = document.createElement("h2");
        // TODO add food Count
        fCount.innerText = allCart[i].children[2].innerText;
        subParent.appendChild(fName);
        subParent.appendChild(fPrice);
        subParent.appendChild(fCount);
        parent.appendChild(subParent);
            
    }
    

    document.getElementById("totalRupee").innerText = "₹"+total;


}

function choosePayment(){
    var payment = document.getElementById("selectPayment").value;
    
    if(payment == "cashOnDelivery"){
        $("#forUpi").hide();
        return;
    }

    $("#forUpi").slideDown(1000);
}

function sendOrderDetailsToDb(){

    var total = document.getElementById("totalRupee").innerText;

    var address = document.getElementById("addressToBeDelivered").value;

    if(address.trim() == ""){
        alert("Enter address to Continue");
        return;
    }

    var paymentWay = document.getElementById("selectPayment").value;
    
    if(paymentWay == "default"){
        alert("Select payment way");
        return;
    }

    if(paymentWay == "upi"){
        var crNum = document.getElementById("creditCardNumber").value;
        var cvvNum = document.getElementById("cvvNumber").value;
        if(crNum.trim() == ""){
            alert("Enter Payment Details");
            return;
        }else if(cvvNum.trim() == ""){
            alert("Enter Payment Details");
            return;
        }
    }

    var orderedFoodName = [];
    var orderedFoodCount = [];

    for(let i = 0; i < countForFood.length ; i++){
        if(countForFood[i] != 0){
            orderedFoodName.push(selectedHotelDetails.foodName[i]);
            orderedFoodCount.push(countForFood[i]);
        }
    }

    var xhr = new XMLHttpRequest();
    var orderDetails = {};

    orderDetails.hotelName = selectedHotelDetails.hotelName;
    orderDetails.hotelId = selectedHotelDetails.hotelId;
    orderDetails.address = address;
    orderDetails.totalAmount = total.substring(1);
    orderDetails.orderFoodNames = orderedFoodName;
    orderDetails.orderedFoodCount = orderedFoodCount;

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            var deliveryBoyDetails = JSON.parse(xhr.responseText);
            document.getElementById("delName").innerText = deliveryBoyDetails.name;
            document.getElementById("delPhone").innerText = deliveryBoyDetails.phoneNumber;
        }
    }

    xhr.open("POST","OrderFood");
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.send(JSON.stringify(orderDetails));

    console.log(orderDetails);

    lastOkHideAndShow();


}

var lastDeliveryBoyDetails = 0;

function lastOkHideAndShow(){
    console.log(lastDeliveryBoyDetails);
    if(lastDeliveryBoyDetails == 0){
        console.log("first if");
        $("#showDeliveryBoyDetailsAfterOrdered").show();
        lastDeliveryBoyDetails++;
    }else{
        console.log("second if");
        $("#showDeliveryBoyDetailsAfterOrdered").hide();
        lastDeliveryBoyDetails--;
    }
}

function lastHomePage(){
    $("#confirmOrder").hide();
    $("#showDeliveryBoyDetailsAfterOrdered").hide();
    changePage();
}

var historyOfCurrentUser = {};

function viewHistory(){

    var parent = document.getElementById("viewHistory");

    var xhr = new XMLHttpRequest();

    xhr.open("POST","viewHistory",true);

    historyOfCurrentUser = {};

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
           historyOfCurrentUser = JSON.parse(xhr.responseText);
           
           for(let i = 0 ; i < historyOfCurrentUser.length ; i++){


            var subParent = document.createElement("div");
            subParent.setAttribute("id",i);
            subParent.setAttribute("class","historyParent");
    
            var heraderInfo = document.createElement("div");
            heraderInfo.setAttribute("class" ,"headerInfo");
    
            var hotellable = document.createElement("h1");
            hotellable.setAttribute("style","padding-left: 30px;color: #F45050;");
            hotellable.innerText = "Hotel-Name :";
            heraderInfo.appendChild(hotellable);
    
            var hotelName = document.createElement("h1");
            hotelName.setAttribute("style" ,"padding-left: 10px;");
            // TODO add hotel Name
            hotelName.innerText = historyOfCurrentUser[i].hotelName;
            heraderInfo.appendChild(hotelName);
    
            // var location = document.createElement("h1");
            // location.setAttribute("style","padding-left:100px;");
            // // TODO add hotel Location
            // location.innerText = historyOfCurrentUser[i].
            // heraderInfo.appendChild(location);
            
            var dateLable = document.createElement("h1");
            dateLable.setAttribute("style","padding-left: 350px;color:#F45050");
            dateLable.innerText = "Date :"
            heraderInfo.appendChild(dateLable);
    
            var date = document.createElement("h1");
            date.setAttribute("style","padding-left: 10px;");
            // TODO add order Date
            var curdate = historyOfCurrentUser[i].date.substring(0,12);
            date.innerText = curdate;
            heraderInfo.appendChild(date);
    
            subParent.appendChild(heraderInfo);
    
            subParent.appendChild(document.createElement("hr"));
    
            var addressTolable = document.createElement("h1");
            addressTolable.setAttribute("style","padding-left:26px;padding-top:10px;color:#F45050");
            addressTolable.innerText = "Delivered To";
            subParent.appendChild(addressTolable);
    
            var address = document.createElement("p");
            address.setAttribute("class","addressForHistory");
            // TODO add address
            address.innerText = historyOfCurrentUser[i].deliveredAddress;
            subParent.appendChild(address);
    
            subParent.appendChild(document.createElement("br"));
    
            var foodl = document.createElement("h1");
            foodl.setAttribute("style" ,"color:#F45050;padding-left:28px;padding-top: 10px;");
            foodl.innerText = "Ordered Food";
            subParent.appendChild(foodl);
    
            var fhis = document.createElement("div");
            fhis.setAttribute("class","foodHis");
    
            var orderedFood = document.createElement("p");
            orderedFood.setAttribute("class" ,"orderedFoodDetailsForHistory");
            // TODO add ordered Food

            var orf = "";
            for(let j = 0 ; j < historyOfCurrentUser[i].foodName.length-1 ; j++){
                orf += historyOfCurrentUser[i].foodName[j]+" x "+historyOfCurrentUser[i].foodCount[j]+", ";
            }

            orf += historyOfCurrentUser[i].foodName[historyOfCurrentUser[i].foodName.length-1]+" x "+historyOfCurrentUser[i].foodCount[historyOfCurrentUser[i].foodName.length-1];

            orderedFood.innerText = orf;
            fhis.appendChild(orderedFood);
    
            subParent.appendChild(fhis);
    
            var footer = document.createElement("div");
            footer.setAttribute("class","historyFooter");
            
            var totalAmount = document.createElement("h1");
            totalAmount.setAttribute("style" ,"color:#F45050;padding-left: 28px;");
            totalAmount.innerText = "Total Amount :";
    
            footer.appendChild(totalAmount);
    
            var amount = document.createElement("h2");
            amount.setAttribute("style","padding-left: 10px;padding-top: 5px;");
            // TODO add amount
            amount.innerText = "₹"+historyOfCurrentUser[i].totalAmount;
    
            footer.appendChild(amount);
    
            // var reorder = document.createElement("button");
            // reorder.setAttribute("class","reOrder");
            // reorder.setAttribute("id","but"+i);
            // reorder.setAttribute("onclick","reorder(this.id)")
            // reorder.innerText = "re-order";
    
            // footer.appendChild(reorder);
    
            subParent.appendChild(footer);
    
            parent.appendChild(subParent);
    
        }

        }
    }

    xhr.send();
    
}

function reorder(id){
    var selectedHistory = document.getElementById(id);
    console.log(selectedHistory.parentElement.parentElement.id);
    $("#confirmOrder").fadeIn();

}
var subParent = document.createElement("div");
subParent.setAttribute("id",i);
subParent.setAttribute("class","historyParent");

var heraderInfo = document.createElement("div");
