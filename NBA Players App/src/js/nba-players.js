
//#region Selecting DOM elements

const loader = document.getElementById("progressBar");
const getPlayersBtn = document.getElementById("displayPlayersBtn");
const baseUrl = "https://www.balldontlie.io/api/v1/players";
const resultTHead = document.getElementById("tHead");
const result = document.getElementById("result");
const usernameFieldMain = document.getElementById("usernameDisplay");
const nextBtn = document.getElementById("nextButton");
const prevBtn = document.getElementById("previousButton");
const mainTable = document.getElementById("mainTable");
const fullNameFilter = document.getElementById("fullName");
const filterByFullNameBtn = document.getElementById("fullNameBtn");
const positionFilter = document.getElementById("position");
const filterByPositionBtn = document.getElementById("positionBtn");
const ascDescFilterBtn = document.getElementById("ascendingDescendingBtn");
const usernameFieldMyTeam = document.getElementById("usernameDisplayMyTeam");
const linkToMyTeam = document.getElementById("goToMyTeamBtn");
const backToMainBtn = document.getElementById("backToMainBtn");
const myTeamPage = document.getElementById("myTeamPage");
const backToAllBtn = document.getElementById("backFromFiltered");
const warningMessage = document.getElementById("warningDiv");

myTeamPage.style.display = "none";
backToAllBtn.style.display = "none";

usernameFieldMain.innerText = localStorage.getItem("user");


const myTeamTable = document.getElementById("myTeamTable");
const resultMyTeam = document.getElementById("resultMyTeam");
const tHeadMyTeam = document.getElementById("tHeadMyTeam");


const navBtns = document.getElementById("prevNext");
const filterTable = document.getElementById("filterTable");
const mainHeader = document.getElementById("mainHeader");
usernameFieldMyTeam.innerText = localStorage.getItem("user");

//#endregion

//#region App flow and user interaction functionalities  

let currentPage = 1;
let shownPerPage = "&per_page=10"
const regExp = /^[A-Za-z]+$/g;

linkToMyTeam.addEventListener('click', function(){
    hideMainPage();
    backToAllBtn.style.display = "none";

})

backToMainBtn.addEventListener('click', function(){
    showMainPage();
    getPlayers();
})

backToAllBtn.addEventListener("click", function(){
    backToAllBtn.style.display = "none";
    navBtns.style.display = "flex";
    getPlayers();
})

window.addEventListener("load", function(){
    nextBtn.style.visibility = "hidden";
    prevBtn.style.visibility = "hidden";
    getPlayers(currentPage);
})

nextBtn.addEventListener("click", function(){
    getNextPage();
});

prevBtn.addEventListener("click", function(){
    getPreviousPage();
});

filterByFullNameBtn.addEventListener("click", function(){
    if(fullNameFilter.value === ""){
        warningMessage.innerText = "Input can't be empty. Please try again. Click anywhere on this message window to close this message."
        warningMessage.style.display = "block";
        return;
    }

    if(!fullNameFilter.value.includes(" ")){
        warningMessage.innerText = "Input must consist of both first name and last name. Please try again. Click anywhere on this message window to close this message."
        warningMessage.style.display = "block";
        fullNameFilter.value = "";
        return;
    }

    let first = fullNameFilter.value.split(" ")[0].toLowerCase();
    let last = fullNameFilter.value.split(" ")[1].toLowerCase();
    console.log(last);

    if(first.trim() === "" || last.trim() === ""){
        warningMessage.innerText = "Invalid input. You must enter both first and last name, with no extra blank spaces except the one between them. Please try again. Click anywhere on this message window to close this message."
        warningMessage.style.display = "block";
        fullNameFilter.value = "";
        return;
    }

    if(!last.match(regExp) || !first.match(regExp)){
        warningMessage.innerText = "First name and last name must consist of letters only. Please try again. Click anywhere on this message window to close this message."
        warningMessage.style.display = "block";
        fullNameFilter.value = "";
        return;
    }

    filterByFullName(first, last);
    fullNameFilter.value = "";

})

filterByPositionBtn.addEventListener("click", function(){
    console.log(positionFilter.value);
    filterByPosition(positionFilter.value);
})

ascDescFilterBtn.addEventListener("click", function(){
    if(ascDescFilterBtn.innerText === "First name / Ascending"){
        sortByAscending();
        ascDescFilterBtn.innerText = "First name / Descending"
    }
    else if(ascDescFilterBtn.innerText = "First name / Descending"){
        sortByDescending();
        ascDescFilterBtn.innerText = "First name / Ascending"
    }
})

warningMessage.addEventListener("click", function(){
    warningMessage.style.display = "none";

})

//#endregion

