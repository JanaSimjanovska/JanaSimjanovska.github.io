// main script

//#region Dummy users database

class User{
    constructor(username, password, email){
        this.username = username;
        this.password = password;
        this.email = email;
    }

    welcomeUser = function(){
        return `Welcome ${this.username}! Hope you enjoy our app :)\nGo ahead and login!`;
    }
}

let testUser = new User("User", "password", "email@example.com"); 

let allUsers = [testUser];

//#endregion

//#region SignIn/SignUp Validations

const usernameTooShort = "Username must be at least 3 characters long.\n";
const passTooShort = "Password must be at least 8 characters long.\n";
const usernameEmpty = "Username input field can't be empty.\n";
const passEmpty = "Password input field can't be empty.\n"
const emailEmpty = "Email input field can't be empty.\n";
const usernameExists = "Username already exists.\n";
const passwordExists = "Password already exists.\n";
const emailExists = "Email already exists.\n";
const noUser = "There is no such user. Please try again.\n";
const mainPage = "NBAPlayersPage/nba-players.html";


const ValidateSignIn = (username, password, users, errMsgPar, newPath) => {

    if(username.length < 3 || password.length < 8){
        if(username.length === 0)
            errMsgPar.innerText += usernameEmpty;
        
        else if(username.length < 3)
            errMsgPar.innerText += usernameTooShort;
            
        if(password.length === 0){
            errMsgPar.innerText += passEmpty;
            errMsgPar.innerText += "Please try again."
            return;
        }
        else if(password.length < 8){
            errMsgPar.innerText += passTooShort;
            errMsgPar.innerText += "Please try again."
            return;
        }
    }
    
    users.forEach(user => {
        if(username === user.username && password === user.password){
            localStorage.setItem("user", username);
            location.href = newPath;
            return loggedInUser;
        }
        else                   
            errMsgPar.innerText = noUser;        
    });
}


const ValidateSignUp = (email, username, password, users, errMsgPar) => {

    users.forEach(user => {
        userExists = false;
        if(email === user.email || username === user.username || password === user.password){
            if(email === user.email)
                errMsgPar.innerText += emailExists;
            
            if(username === user.username)
                errMsgPar.innerText += usernameExists;
            
            if(password === user.password)
                errMsgPar.innerText += passwordExists;
            
            errMsgPar.innerText += "Please try again."
            userExists = true;
            return userExists;
        }
    });

    if(!userExists){
        if(username.length < 3 || password.length < 8 || email.length === 0 || !email.includes("@")){
            if(email.length === 0)
                errMsgPar.innerText += emailEmpty;
            
            else if(!email.includes("@"))
                errMsgPar.innerText += "Email must include @.\n"
            
    
            if(username.length === 0)
                errMsgPar.innerText += usernameEmpty;
            
        
            else if(username.length < 3)
                errMsgPar.innerText += usernameTooShort;
            
    
            if(password.length === 0){
                errMsgPar.innerText += passEmpty;
                errMsgPar.innerText += "Please try again."
                return;
            }
    
            else if(password.length < 8){
                errMsgPar.innerText += passTooShort;
                errMsgPar.innerText += "Please try again."
                return;
            }
        
        }
        
        loggedInUser = new User(username, password, email);
        
        users.push(loggedInUser);
        errMsgPar.innerText += "Registration successful!\n";
        errMsgPar.innerText += loggedInUser.welcomeUser();
    }
}      

//#endregion

//#region App functionalities 


let apiData = null;

const togglePopUp = toggle => {
    if(toggle){
        popUpSignUp.style.display = "block";
        pageMask.style.display = "block";
    }
   
    else{
        popUpSignUp.style.display = "none";
        pageMask.style.display = "none";
    }
}

const toggleLoader = toggle => {
    if(toggle)
        loader.style.display = "block";
    else
        loader.style.display = "none";
}

const hideMainPage = () => {
    mainHeader.style.display = "none";
    filterTable.style.display = "none";
    mainTable.style.display = "none";
    navBtns.style.display = "none";
    myTeamPage.style.display = "block";
}

const showMainPage = () => {
    mainHeader.style.display = "block";
    filterTable.style.display = "flex";
    mainTable.style.display = "block";
    navBtns.style.display = "flex";
    myTeamPage.style.display = "none";

}
const displayPlayers = players =>{
    if(players !== null){
        resultTHead.innerHTML = "";
        resultTHead.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Position</th>
                <th>Team</th>
                <th>City</th>
                <th></th>
            <tr>
        </thead>`;

        result.innerHTML = "";
        for (const player of players) {
            if(player.position === ""){
                player.position = "No data available";
            }
            result.innerHTML += `
            <tr class="test">
                <td>${player.id}</td>
                <td>${player.first_name} ${player.last_name}</td>
                <td>${player.position}</td>
                <td>${player.team.full_name}</td>
                <td>${player.team.city}</td>
                <td><button type="button" class="btn table-btn addToMyTeamBtn ">Add to my team</button></td>    
            <tr>`;   
        }

        let addToMyTeamBtns = document.getElementsByClassName("addToMyTeamBtn");
        for(let i = 0; i < addToMyTeamBtns.length; i++){
            addToMyTeamBtns[i].addEventListener("click", function(event){
                let rowToAdd = event.target.parentElement.parentElement;
                let clone = rowToAdd.cloneNode(true);
                clone.children[5].firstChild.className = "clonedBtn btn table-btn";
                if(resultMyTeam.rows.length > 11){
                    warningMessage.innerText = "You can choose maximum 12 players. You have reached the limit. Click anywhere on this message window to close this message."
                    warningMessage.style.display = "block";
                    return;
                }
            
                else {
                    hideMainPage();
                    tHeadMyTeam.innerHTML = "";
                    tHeadMyTeam.innerHTML = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Team</th>
                            <th>City</th>
                            <th></th>
                        <tr>
                    </thead>`;
                    clone.children[5].firstChild.innerText = "Remove from my team";
                    resultMyTeam.appendChild(clone);
                    backToAllBtn.style.display = "none";
                    hideMainPage();
                }

                let removeFromMyTeamBtns = document.getElementsByClassName("clonedBtn");
                console.log(removeFromMyTeamBtns);
                for(let i = 0; i < removeFromMyTeamBtns.length; i++){
                    removeFromMyTeamBtns[i].addEventListener("click", function(event){
                        let rowToRemove = event.target.parentElement.parentElement;
                        console.log(removeFromMyTeamBtns[i]);
                        console.log(rowToRemove);
                        resultMyTeam.removeChild(rowToRemove);
                        if(resultMyTeam.rows.length === 0)
                        tHeadMyTeam.innerHTML = ""; 
                    
                    })
                };

            })
        };

    }

    else {
        warningMessage.innerHTML += `<h2 color="red">There is something wrong with the data</h2>`
    }
}

const getPlayers = () => {
    toggleLoader(true);
    fetch(`${baseUrl}?page=${currentPage}${shownPerPage}`)
        .then(response => response.json())
        .then(players => {
            apiData = players;
            toggleLoader(false);
            console.log(players);
            displayPlayers(players.data);
            toggleNavButtons(currentPage);
        })
        .catch(error => {
            toggleLoader(false);
            console.error(error)
        });
}

const toggleNavButtons = currPage => {
    
    if(currPage > 346)
        nextBtn.style.visibility = "hidden";
    else
        nextBtn.style.visibility = "visible";

    if(currPage === 1)
        prevBtn.style.visibility = "hidden";
    else
        prevBtn.style.visibility = "visible";
} 

const getNextPage = () => {
    ++currentPage;
    getPlayers(currentPage);
}

const getPreviousPage = () => {
    --currentPage;
    getPlayers(currentPage);
}

const filterByFullName = (first, last) => {
    toggleLoader(true);

    fetch(`${baseUrl}?search=${first}`)
        .then(response => response.json())
        .then(players => {
            toggleLoader(false);
            console.log(players);
            let filtered = players.data.filter(x => x.first_name.toLowerCase() === first && x.last_name.toLowerCase() === last);
            if(filtered.length === 0){
                warningMessage.innerText = "The search returned no result. Click anywhere on this message window to close this message."
                warningMessage.style.display = "block";
                return;
            }
            backToAllBtn.style.display = "block";
            navBtns.style.display = "none";
            displayPlayers(filtered);
            toggleNavButtons(currentPage);
        })
        .catch(error => {
            toggleLoader(false);
            console.error(error)
        });
}

const filterByPosition = (position) => {
    toggleLoader(true);
    backToAllBtn.style.display = "block";
    navBtns.style.display = "none";

    fetch(baseUrl)
        .then(response => response.json())
        .then(players => {
            toggleLoader(false);
            console.log(players);
            let filtered = players.data.filter(x => x.position === position);
            if(filtered.length === 0){
                return;
            }
            console.log(filtered);
            displayPlayers(filtered);
            toggleNavButtons(currentPage);
        })
        .catch(error => {
            toggleLoader(false);
            console.error(error)
        });
}

const sortByNameAsc = (player1, player2) => (player1.first_name).localeCompare(player2.first_name) // Ascending
const sortByNameDesc = (player1, player2) => (player2.first_name).localeCompare(player1.first_name) // Descending

const sortByAscending = () => {
    toggleLoader(true);
    backToAllBtn.style.display = "none";
    navBtns.style.display = "flex";
    let ascending = apiData.data.sort(sortByNameAsc);
    displayPlayers(ascending);
    toggleNavButtons(currentPage);
    toggleLoader(false);
    
}

const sortByDescending = () => {
    toggleLoader(true);
    backToAllBtn.style.display = "none";
    navBtns.style.display = "flex";
    let descending = apiData.data.sort(sortByNameDesc);
    displayPlayers(descending);
    toggleNavButtons(currentPage);
    toggleLoader(false);
}


//#endregion
