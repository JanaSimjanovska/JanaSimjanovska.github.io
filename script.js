let newUserUsername = document.getElementById("newUserUsername");
let newUserPassword = document.getElementById("newUserPass");
let usernameInput = document.getElementById("userName");
let passwordInput = document.getElementById("pass");
let registerBtn = document.getElementById("registerBtn");
let loginBtn = document.getElementById("loginBtn");
let isAdminBtn = document.getElementById("yes");
let isNotAdminBtn = document.getElementById("no");
let alertPar = document.getElementById("alertPar");
let resPar = document.getElementById("resPar");
let logOutBtn = document.getElementById("logOut");
let showIfAdmin = document.getElementById("showIfAdmin");
let welcomePar = document.getElementById("welcome");
let usernamesList = document.getElementById("usernamesList");

console.log(resPar, logOutBtn, showIfAdmin, welcomePar, usernamesList, logOutBtn);

logOutBtn.style.display = "none";


function User (username, password, isAdmin) {
    this.username = username;
    this.pass = password;
    this.isAdmin = isAdmin;
}


let admin = new User("JanaS", "jana123", true);
console.log(typeof(admin.username));
let testUser = new User("NadjaI", "nadja123", false);
let users = [testUser, admin];


function createUser(username, pass){
    if(username === "" || pass === ""){
        alertPar.innerText = `Username and password fields can't be empty!`
        document.getElementById("usernamesList").innerHTML = "";
    }
    else if(username.length < 4){
        alertPar.innerText = `Username must contain at least 4 characters!`
        document.getElementById("usernamesList").innerHTML = "";
    }
    else if(pass.length < 6){
        alertPar.innerText = `Password must contain at least 6 characters!`
        document.getElementById("usernamesList").innerHTML = "";
    }
    else {
        document.getElementById("usernamesList").innerText = "";
        users.push(new User(username, pass, false));
        welcomePar.innerText = `Welcome ${username}! Go ahead and login with the username and password you created!`
        for(let i = 0; i < users.length; i++){
            usernamesList.innerHTML += 
            `<li>${users[i].username}</li>`
        }
        alertPar.innerText = ""; 
    }
}


let usersIndex = "";
function checkIfExists(username, pass, array){
    usersIndex = array.findIndex(x => x.username === username && x.pass === pass);
}


function checkStatus(array, username, pass){
    if(username.length === 0 || pass.length === 0){
        resPar.innerText = `Username and password fields can't be empty!`
    }
    else {
        if(usersIndex === -1){
            resPar.innerText = `User doesn't exist! Try again!`;
            showIfAdmin.innerHTML = "";
            logOutBtn.style.display = "none";
        }
        else {
            if(array[usersIndex].isAdmin === true){
                for(let j = 0; j < array.length; j++){
                    resPar.innerText = `Welcome Admin ${username}!`;
                    showIfAdmin.innerHTML += `<li>Username: ${array[j].username}; Password: ${array[j].pass}; isAdmin: ${array[j].isAdmin};</li>` 
                }
            }
            else if(array[usersIndex].isAdmin === false) {
                showIfAdmin.innerHTML = "";
                resPar.innerText = `Welcome ${username}!`;
            }
            logOutBtn.style.display = "block";
        }
    }  
}


logOutBtn.addEventListener("click", function(){
    resPar.innerText = "";
    showIfAdmin.innerHTML = "";
    logOutBtn.style.display = "none";

})


registerBtn.addEventListener("click", function(){
    alertPar.innerText = "";
    welcomePar.innerText = "";
    resPar.innerText = "";
    showIfAdmin.innerHTML = "";
    logOutBtn.style.display = "none";
    createUser(newUserUsername.value, newUserPassword.value);
    document.getElementsByClassName("user-img")[1].style.display = "initial";
    document.getElementsByClassName("pass-img")[1].style.display = "initial";
    newUserUsername.value = "";
    newUserPassword.value = "";
})


loginBtn.addEventListener("click", function(){
    welcomePar.innerText = "";
    usernamesList.innerText = "";
    alertPar.innerText = "";
    checkIfExists(usernameInput.value, passwordInput.value, users);
    checkStatus(users, usernameInput.value, passwordInput.value);
    document.getElementsByClassName("user-img")[0].style.display = "initial";
    document.getElementsByClassName("pass-img")[0].style.display = "initial";
    usernameInput.value = "";
    passwordInput.value = "";
})


document.getElementById("userName").addEventListener("keypress", function(){
    document.getElementsByClassName("user-img")[0].style.display = "none";
})

document.getElementById("pass").addEventListener("keypress", function(){
    document.getElementsByClassName("pass-img")[0].style.display = "none";
})

document.getElementById("newUserUsername").addEventListener("keypress", function(){
    document.getElementsByClassName("user-img")[1].style.display = "none";
})

document.getElementById("newUserPass").addEventListener("keypress", function(){
    document.getElementsByClassName("pass-img")[1].style.display = "none";
})
