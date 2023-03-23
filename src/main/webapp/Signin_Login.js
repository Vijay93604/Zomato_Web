let page = 0;
function changePage(){
    if(page == 0){
        document.getElementById("root").style.display = "none";
        document.getElementById("root2").style.display = "block";
        page = 1;
    }else{
        document.getElementById("root2").style.display = "none";
        document.getElementById("root").style.display = "block";
        page = 0;
    }
}

let showPass = 0;

passSign.onclick = () => {
    if(showPass == 0){
        document.getElementById("passwordForSignup").setAttribute("type","text");
        showPass++;
    }else{
        document.getElementById("passwordForSignup").setAttribute("type","password");
        showPass--;
    }
}

let showPass2 = 0;

passLogin.onclick = () => {
    if(showPass2 == 0){
        document.getElementById("password").setAttribute("type","text");
        showPass2++;
    }else{
        document.getElementById("password").setAttribute("type","password");
        showPass2--;
    }
}

let showPass3 = 0;

signUpSubmit.onclick = () => {

    var name = document.getElementById("nameForSignup").value;
    var phoneNum = document.getElementById("phoneNumberForSignup").value;
    var password = document.getElementById("passwordForSignup").value;
    var location = document.getElementById("locationForSignup").value;
    var numOnly = /^[0-9]+$/;

    if((name.trim() == "" || phoneNum.trim() == "" || password.trim() == "" || location.trim() == "") || (!((numOnly.test(phoneNum))) || (phoneNum.length != 10)) || (password.length < 8)){
        alert("Invalid Input Please check all input");
        return;
    }

    var xhr = new XMLHttpRequest();
     xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            output.innerText = xhr.responseText;
        }
    }

    var userdetails = {};

    userdetails.name = name;
    userdetails.phoneNum = phoneNum;
    userdetails.password = password;
    userdetails.location = location;

    xhr.open("POST" ,"http://localhost:8080/Zomato_Web/SignUp");
    xhr.setRequestHeader("Content-Type" ,"application/json");
    xhr.send(JSON.stringify(userdetails));

}

// The below function hits Login servlet

function login() {
    
    console.log("Hello");
    var phoneNumber = document.getElementById("phoneNumber").value;
    var password = document.getElementById("password").value;
    var numOnly = /^[0-9]+$/;

    if((!(numOnly.test(phoneNumber)) && phoneNumber.length != 10)){
        alert("Invalid Input Please check all input");
        return;
    }

    var xhr = new XMLHttpRequest();
     xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(xhr.responseText);
            if(xhr.responseText == "Admin Login Success"){
                window.location.href = "Admin.html";
                return;
            }
            if(xhr.responseText == "User Found"){
                window.location.href = "UserMain.html";
                return;
            }else{
                output2.innerText = "User Not found check your Password or Signin";
                return;
            }
            output2.innerText = "User Not found check your Password or Signin";
        }
    }
    console.log(phoneNumber ,password+"   .....");
    xhr.open("POST" ,"http://localhost:8080/Zomato_Web/Login");
    xhr.setRequestHeader("Content-Type" ,"application/x-www-form-urlencoded");
    xhr.send("phoneNum="+phoneNumber+"&password="+password);

}

// The below function is for Admin login

function adminLogin(){
    var adminPhone = document.getElementById("phoneNumberAd").value;
    var adminPass = document.getElementById("passwordAd").value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
            if(xhr.responseText == "Login Success"){
                window.location.href = "Admin.html";
            }else{
                outputAd.innerText = "Login Failed";
            }
        }
    }

    xhr.open("POST" ,"http://localhost:8080/Zomato_Servlet/AdminLogin");
    xhr.setRequestHeader("Content-Type" ,"application/x-www-form-urlencoded");
    xhr.send("phoneNum="+adminPhone+"&password="+adminPass);

}
// xhr.setRequestHeader("Content-Type" ,"application/json");
// var json = {};
// json.name=name;
// json.phoneNum=phoneNum;
// json.password=password;
// json.location=location;

// xhr.send(JSON.stringify(json));
