//import {sharedRecourses} from './background.js';
let token = "";
let clientId = "";
let businessPartnerId = "";
let userId = "";
let userAgent = "";

//json Data
let ivFileId = "";
let kvps = "";


let request = new XMLHttpRequest();
//document.onload = buyCar();

function sleep(ms) {
    "use strict"
    return new Promise(resolve => setTimeout(resolve, ms));
}

waitTillSiteIsLoaded();

async function waitTillSiteIsLoaded() {
    "use strict"
    while (true) {
        try {
            addRigedEvent();
            break;
        } catch {
            await sleep(50);
        }
    }
}

//add a new buy button to the website
function embedRigedBuyButton() {
    "use strict"
    let hereOld = document.getElementsByClassName("column-third");
    let here = document.getElementsByClassName("o-layout__item u-1/1");
    let clickMeButton = document.createElement("button");
    clickMeButton.style = here[1].getElementsByClassName("c-btn")[0].style;
    here[1].removeChild(here[1].getElementsByClassName("c-btn")[0]);

    let notInForm = document.getElementsByClassName("o-layout__item u-2/4 u-1/1@s");

    clickMeButton.innerText = "kaufen";
    clickMeButton.id = "riged"
    clickMeButton.type = "button";

    notInForm[1].appendChild(clickMeButton);

    //here[1].appendChild(clickMeButton);
    document.getElementById("riged").addEventListener("click", test);

    //get carID and kvps
    let carId = document.getElementsByTagName("h6")[0].innerText;
    kvps = document.getElementById("kvpsSelection").firstChild.innerText;
    ivFileId = kvps + "-" + carId;
}

function addRigedEvent(){
    "use strict"
    let trigger = document.getElementsByClassName("c-btn c-btn--icon o-button-container__button");
    trigger[1].addEventListener("click", embedRigedBuyButton);
}

function test(){
    "use strict"
    console.log(document.domain);
}

function buyCar(){
    "use strict"
    let jsonDataArray = {
        "ivFileId":ivFileId,
        "ivPackageId":"",
        "ivBuyFixedPrice":"X",
        "ivKvpsFixedPrice":kvps,
        "itBidAssistant":[]
    };

    let jsonData = JSON.parse(JSON.stringify(jsonDataArray));
    //https://api.usedcars.vwfs.com/gis-functions/B2C/offers/DEU80260G-2022724832/bids
    let url = "https://www.google.com/";

    request.open("POST", url); // URL für HTTP-PUT
    //request.onreadystatechange = processData; //Callback-Handler zuordnen
    for(let i = 0; i < sharedRecourses.length; i++){
        console.log(sharedRecourses[i]);
    }
    request.setRequestHeader("Accept", "*/*");
    request.setRequestHeader("Accept-Language", "en");
    request.setRequestHeader("Ocp-Apim-Subscription-Key", sharedRecourses.key);
    request.setRequestHeader("oidc-access-token", sharedRecourses.token);
    request.setRequestHeader("User-Agent", sharedRecourses.userAgent);
    //request.setRequestHeader("X-GIS-BUSINESSPARTNER-ID", sharedRecourses.businessPartnerId);
    request.setRequestHeader("X-GIS-CLIENT-ID", sharedRecourses.clientId);
    request.setRequestHeader("X-GIS-USER-ID", sharedRecourses.ivgpiduser);
    request.setRequestHeader("Content-Type", "application/json")
    request.send(jsonData); // Request abschicken
}

function processData() {
    "use strict";
    if (request.readyState === 4) { // Uebertragung = DONE
        if (request.status === 200) { // HTTP-Status = OK
            if (request.responseText != null) {
                //some response handling
                alert("Auto erfolgreich gekauft");
            }
            else console.error("Dokument ist leer");
        } else console.error("Uebertragung fehlgeschlagen" + request.status);
    }
}

browser.runtime.onMessage.addListener((request) => {
    "use strict"

    token = request.t;
    /*
    key = request.k;
    userId = request.userId;
    clientId = request.cId;
    userAgent = request.uAgent;
     */

    console.log(token);
    return Promise.resolve({ response: "transaction done"});
});

