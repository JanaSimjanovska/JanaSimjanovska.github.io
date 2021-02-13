let userNumber = document.getElementById("numInput");
let submitBtn = document.getElementById("submitBtn");
let resHeading = document.getElementById("resHeading");


function convertToWords (number){
    let toNineteenArray = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    let tensArray = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    let toTrillionArray = ["", "", "", "hundred", "thousand", "million", "billion", "trillion"];

    if(number.length > 15){
        return `Please enter a number up to 15 digits!`;
    }
    else if(number === ""){
        return `Please enter a number!`;
    }
    else if(parseInt(number) < 0){
        return `Please enter numbers from 0 and up only!`;
    } 
    else if(number.length === 1){
        if(parseInt(number) === 0){
            return 'zero';
        }
        else {
            return `${toNineteenArray[number]}`;
        }
    }
    else if(number.length === 2){
        if(parseInt(number[0]) === 0){
            if(parseInt(number[1]) === 0){
                return 'zero';
            }
            else{
                return `${toNineteenArray[number[1]]}`;
            }
        }
        else if(parseInt(number) < 20){
            return `${toNineteenArray[number]}`;
        }
        else {
            if(parseInt(number[1]) === 0){
                return `${tensArray[number[0]]}`;
            } else {
                return `${tensArray[number[0]]}-${toNineteenArray[number[1]]}`;
            }
        }
    }
    else if(number.length === 3){
        if(parseInt(number[0]) === 0){
            return `${convertToWords(number.slice(1, 3))}`;
        }
        else {
            if(parseInt(number[1]) === 0 && parseInt(number[2]) === 0){
                return `${toNineteenArray[number[0]]} ${toTrillionArray[3]}`;
            }
            else {
                return `${toNineteenArray[number[0]]} ${toTrillionArray[3]} ${convertToWords(number.slice(1, 3))}`;
            }
        }
    }
    else if(number.length === 4){
        if(parseInt(number[0]) === 0){
            return `${convertToWords(number.slice(1, 4))}`;
        }
        else {
            if(parseInt(number[1]) === 0 && parseInt(number[2]) === 0 && parseInt(number[3]) === 0){
                return `${toNineteenArray[number[0]]} ${toTrillionArray[4]}`;
            }
            else {
                return `${toNineteenArray[number[0]]} ${toTrillionArray[4]} ${convertToWords(number.slice(1, 4))}`;
            }
        }
    }
    else if(number.length === 5){
        if(parseInt(number[0]) === 0){
            return `${convertToWords(number.slice(1, 5))}`;
        }
        else {
            if(parseInt(number[2]) === 0 && parseInt(number[3]) === 0 && parseInt(number[4]) === 0){
                return `${convertToWords(number.slice(0, 2))} ${toTrillionArray[4]}`;
            }
            else{
                return `${convertToWords(number.slice(0, 2))} ${toTrillionArray[4]} ${convertToWords(number.slice(2, 5))}`;
            }
        }
    }
    else if(number.length === 6){
        if(parseInt(number[0]) === 0){
            return `${convertToWords(number.slice(1, 6))}`;
        }
        else {
            if(parseInt(number[3]) === 0 && parseInt(number[4]) === 0 && parseInt(number[5]) === 0){
                return `${convertToWords(number.slice(0, 3))} ${toTrillionArray[4]}`;
            }
            else{
                return `${convertToWords(number.slice(0, 3))} ${toTrillionArray[4]} ${convertToWords(number.slice(3, 6))}`;
            }
        }
    }
    else if(number.length === 7){
        if(parseInt(number[0]) === 0){
            return `${convertToWords(number.slice(1, 7))}`;
        }
        else {
            if(parseInt(number[1]) === 0 && parseInt(number[2]) === 0 && parseInt(number[3]) === 0 && parseInt(number[4]) === 0 && parseInt(number[5]) === 0 && parseInt(number[6]) === 0){
                return `${convertToWords(number.slice(0, 1))} ${toTrillionArray[5]}`;
            }
            else {
                return `${convertToWords(number.slice(0, 1))} ${toTrillionArray[5]} ${convertToWords(number.slice(1, 7))}`;
            } 
        }
    }
    else if(number.length === 8){
        if(parseInt(number[0]) === 0){
            return `${convertToWords(number.slice(1, 8))}`;
        }
        else {
            if(parseInt(number[2]) === 0 && parseInt(number[3]) === 0 && parseInt(number[4]) === 0 && parseInt(number[5]) === 0 && parseInt(number[6]) === 0 && parseInt(number[7]) === 0){
                return `${convertToWords(number.slice(0, 2))} ${toTrillionArray[5]}`;
            }
            else {
            return `${convertToWords(number.slice(0, 2))} ${toTrillionArray[5]} ${convertToWords(number.slice(2, 8))}`;
            }
        }
    }
    else if(number.length === 9){
        if(parseInt(number[0]) === 0){
            return `${convertToWords(number.slice(1, 9))}`;
        }
        else {
            if(parseInt(number[3]) === 0 && parseInt(number[4]) === 0 && parseInt(number[5]) === 0 && parseInt(number[6]) === 0 && parseInt(number[7]) === 0 && parseInt(number[8]) === 0){
                return `${convertToWords(number.slice(0, 3))} ${toTrillionArray[5]}`;
            }
            else {
                return `${convertToWords(number.slice(0, 3))} ${toTrillionArray[5]} ${convertToWords(number.slice(3, 9))}`;
            }
        }
    }
    else if(number.length === 10){
        if(parseInt(number[0]) === 0){
            return `${convertToWords(number.slice(1, 10))}`;
        }
        else {
            if(parseInt(number[1]) === 0 && parseInt(number[2]) === 0 && parseInt(number[3]) === 0 && parseInt(number[4]) === 0 && parseInt(number[5]) === 0 && parseInt(number[6]) === 0 && parseInt(number[7]) === 0 && parseInt(number[8]) === 0 && parseInt(number[9]) === 0){
                return `${convertToWords(number.slice(0, 1))} ${toTrillionArray[6]}`;
            }
            else {
                return `${convertToWords(number.slice(0, 1))} ${toTrillionArray[6]} ${convertToWords(number.slice(1, 10))}`;
            }
        }
    }
    else if(number.length === 11){
        if(parseInt(number[0]) === 0){
            return `${convertToWords(number.slice(1, 11))}`;
        }
        else {
            if(parseInt(number[2]) === 0 && parseInt(number[3]) === 0 && parseInt(number[4]) === 0 && parseInt(number[5]) === 0 && parseInt(number[6]) === 0 && parseInt(number[7]) === 0 && parseInt(number[8]) === 0 && parseInt(number[9]) === 0 && parseInt(number[10]) === 0){
                return `${convertToWords(number.slice(0, 2))} ${toTrillionArray[6]}`;
            }
            else {
                return `${convertToWords(number.slice(0, 2))} ${toTrillionArray[6]} ${convertToWords(number.slice(2, 11))}`;
            }
        }
    }
    else if(number.length === 12){
        if(parseInt(number[0]) === 0){
            return `${convertToWords(number.slice(1, 12))}`;
        }
        else {
            if(parseInt(number[3]) === 0 && parseInt(number[4]) === 0 && parseInt(number[5]) === 0 && parseInt(number[6]) === 0 && parseInt(number[7]) === 0 && parseInt(number[8]) === 0 && parseInt(number[9]) === 0 && parseInt(number[10]) === 0 && parseInt(number[11]) === 0){
                return `${convertToWords(number.slice(0, 3))} ${toTrillionArray[6]}`;
            }
            else {
                return `${convertToWords(number.slice(0, 3))} ${toTrillionArray[6]} ${convertToWords(number.slice(3, 12))}`;
            }
        }
    }
    else if(number.length === 13){
        if(parseInt(number[0]) === 0){
            return `${convertToWords(number.slice(1, 13))}`;
        }
        else {
            if(parseInt(number[1]) === 0 && parseInt(number[2]) === 0 && parseInt(number[3]) === 0 && parseInt(number[4]) === 0 && parseInt(number[5]) === 0 && parseInt(number[6]) === 0 && parseInt(number[7]) === 0 && parseInt(number[8]) === 0 && parseInt(number[9]) === 0 && parseInt(number[10]) === 0 && parseInt(number[11]) === 0 && parseInt(number[3]) === 0){
                return `${convertToWords(number.slice(0, 1))} ${toTrillionArray[7]}`;
            }
            else {
                return `${convertToWords(number.slice(0, 1))} ${toTrillionArray[7]} ${convertToWords(number.slice(1, 13))}`;
            }
        }
    }
    else if(number.length === 14){
        if(parseInt(number[0]) === 0){
            return `${convertToWords(number.slice(1, 14))}`;
        }
        else {
            if(parseInt(parseInt(number[2]) === 0 && parseInt(number[3]) === 0 && parseInt(number[4]) === 0 && parseInt(number[5]) === 0 && parseInt(number[6]) === 0 && parseInt(number[7]) === 0 && parseInt(number[8]) === 0 && parseInt(number[9]) === 0 && parseInt(number[10]) === 0 && parseInt(number[11]) === 0 && parseInt(number[12]) === 0 && number[13]) === 0){
                return `${convertToWords(number.slice(0, 2))} ${toTrillionArray[7]}`;
            }
            else {
                return `${convertToWords(number.slice(0, 2))} ${toTrillionArray[7]} ${convertToWords(number.slice(2, 14))}`;
            }
        }
    }
    else if(number.length === 15){
        if(parseInt(number[0]) === 0){
            return `${convertToWords(number.slice(1, 15))}`;
        }
        else {
            if(parseInt(parseInt(number[3]) === 0 && parseInt(number[4]) === 0 && parseInt(number[5]) === 0 && parseInt(number[6]) === 0 && parseInt(number[7]) === 0 && parseInt(number[8]) === 0 && parseInt(number[9]) === 0 && parseInt(number[10]) === 0 && parseInt(number[11]) === 0 && parseInt(number[12]) === 0 && number[13]) === 0 && parseInt(number[2]) === 0){
                return `${convertToWords(number.slice(0, 3))} ${toTrillionArray[7]}`;
            }
            else {
                return `${convertToWords(number.slice(0, 3))} ${toTrillionArray[7]} ${convertToWords(number.slice(3, 15))}`;
            }
        }
    }
}    


submitBtn.addEventListener("click", function(){
    resHeading.innerText = `${convertToWords(userNumber.value)}`;
})