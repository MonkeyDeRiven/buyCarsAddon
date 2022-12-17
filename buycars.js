/*let key = "";
let token = "";
let clientId = "";
let businessPartnerId = "";
let userAgent = "";
let userId = "";
 */
//json Data
let ivFileId = "";
let kvps = "";

let request = new XMLHttpRequest();

function sleep(ms) {
    "use strict"
    return new Promise(resolve => setTimeout(resolve, ms));
}

waitTillSiteIsLoaded();

async function waitTillSiteIsLoaded() {
    "use strict"
    let counter = 0;
    while (true) {
        try {
            addRigedEvent();
            break;
        } catch {
            counter++;
            if(counter == 40){
                console.log("Website wurde noch nicht vollständig geladen!");
                counter = 0;
            }
            await sleep(50);
        }
    }
}

//add a new buy button to the website
function embedRigedBuyButton() {
    "use strict"
    //let hereOld = document.getElementsByClassName("column-third");
    let inFormDiv = document.getElementsByClassName("o-layout__item u-1/1");
    let clickMeButton = document.createElement("button");
    clickMeButton.style = inFormDiv[1].getElementsByClassName("c-btn")[0].style;
    inFormDiv[1].removeChild(inFormDiv[1].getElementsByClassName("c-btn")[0]);

    let notInFormDiv = document.getElementsByClassName("dialogMain ng-star-inserted");

    clickMeButton.innerText = "kaufen";
    clickMeButton.id = "riged"
    clickMeButton.type = "button";

    notInFormDiv[0].appendChild(clickMeButton);

    //inFormDiv[1].appendChild(clickMeButton);
    document.getElementById("riged").addEventListener("click", sendBody);

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

//not used
function buyCar(){
    "use strict"
    let jsonDataArray = {
        "ivFileId":ivFileId,
        "ivPackageId":"",
        "ivBuyFixedPrice":"X",
        "ivKvpsFixedPrice":kvps,
        "itBidAssistant":[]
    };

    let jsonData = JSON.stringify(jsonDataArray);
    //api.usedcars.vwfs.com
    let url = "https://google.com/gis-functions/V3/offers/" + ivFileId + "/bids";

    request.open("PUT", url); // URL für HTTP-PUT
    request.mozAnon = true;
    request.onreadystatechange = processData; //Callback-Handler zuordnen


    request.setRequestHeader("Accept", "*/*");

    request.setRequestHeader("Accept-Language", "en");
    request.setRequestHeader("Referer", "https://usedcars.vwfs.com/");
    request.setRequestHeader("Ocp-Apim-Subscription-Key", key);
    request.setRequestHeader("oidc-access-token", token);
    request.setRequestHeader("User-Agent", userAgent);
    request.setRequestHeader("X-GIS-BUSINESSPARTNER-ID", businessPartnerId);
    request.setRequestHeader("X-GIS-CLIENT-ID", clientId);
    request.setRequestHeader("X-GIS-USER-ID", userId);
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("Origin", "https://usedcars.vwfs.com");
    request.setRequestHeader("Sec-Fetch-Dest", "empty");
    request.setRequestHeader("Sec-Fetch-Mode", "cors");
    request.setRequestHeader("Sec-Fetch-Site", "same-site");

    request.send(jsonData); // Request abschicken
}

//not used
function processData() {
    "use strict";
    if (request.readyState === 4) { // Uebertragung = DONE
        if (request.status === 200) { // HTTP-Status = OK
            if (request.responseText != null) {
                //some response handling
                console.debug(request.getAllResponseHeaders());
                console.debug(request.responseText);
            }
            else console.debug("Dokument ist leer\n" + "Response Header: " + request.getAllResponseHeaders() + "\n" + "Response Body:" + request.responseText);
        } else console.debug("Uebertragung fehlgeschlagen!\n"
            + "Request Status: " + request.status + "\n"
            + "Response Header: " + request.getAllResponseHeaders() + "\n"
            + "Response Body:" + request.responseText);
    }
}


function sendBody(){
    let jsonDataArray = {
        "ivFileId":ivFileId,
        "ivPackageId":"",
        "ivBuyFixedPrice":"X",
        "ivKvpsFixedPrice":kvps,
        "itBidAssistant":[]
    };
    let msgText = JSON.parse(JSON.stringify(jsonDataArray));
    let message = {
        msg:msgText,
        fileId:ivFileId
    }
    browser.runtime.sendMessage(message).then((response) => {
        console.log("Message from the background script:");
        console.log(response.response);
    })
}

