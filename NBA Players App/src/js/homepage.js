
//#region Selecting DOM elements

const signInBtn = document.getElementById("signInBtn");
const usernameInputSignIn = document.getElementById("usernameSignIn");
const passInputSignIn = document.getElementById("passwordSignIn");
const signUpBtn = document.getElementById("signUpBtn");
const emailInputSignUp = document.getElementById("email");
const usernameInputSignUp = document.getElementById("usernameSignUp");
const passInputSignUp = document.getElementById("passwordSignUp");
const pageMask = document.getElementById("page-mask");
const popUpSignUp = document.getElementById("popup-window");
const linkToSignUp = document.getElementById("openSignInPanel");
const errMsgParSignIn = document.getElementById("errorMsgParagraphSignIn");
const errMsgParSignUp = document.getElementById("errorMsgParagraphSignUp");
const backToSignIn = document.getElementById("backToSignInBtn");

//#endregion

//#region Event listeners

linkToSignUp.addEventListener("click", function(){
    togglePopUp(true);
})

backToSignIn.addEventListener("click", function(){
    errMsgParSignUp.innerText = "";
    errMsgParSignIn.innerText = "";
    togglePopUp(false);
})

signInBtn.addEventListener("click", function(){
    errMsgParSignIn.innerText = "";
    loggedInUser = ValidateSignIn(usernameInputSignIn.value, passInputSignIn.value, allUsers, errMsgParSignIn, mainPage); 
    usernameInputSignIn.value = "";
    passInputSignIn.value = "";
})

signUpBtn.addEventListener("click", function(){
    errMsgParSignUp.innerText = "";
    ValidateSignUp(emailInputSignUp.value, usernameInputSignUp.value, passInputSignUp.value, allUsers, errMsgParSignUp);
    emailInputSignUp.value = "";
    usernameInputSignUp.value = "";
    passInputSignUp.value = "";
})



//#endregion
