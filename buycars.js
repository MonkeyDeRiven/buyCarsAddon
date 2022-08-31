
setTimeout(function(){
    "use strict"
    addRigedEvent();
}, 6000);

//add a new buy button to the website
function embedRigedBuyButton() {
    "use strict"
    let hereOld = document.getElementsByClassName("column-third");
    let here = document.getElementsByClassName("o-layout__item u-1/1");
    let clickMeButton = document.createElement("button");
    clickMeButton.style = here[1].getElementsByClassName("c-btn")[0].style;
    here[1].removeChild(here[1].getElementsByClassName("c-btn")[0]);

    clickMeButton.innerText = "kaufen";
    clickMeButton.id = "riged"

    here[1].appendChild(clickMeButton);
    document.getElementById("riged").addEventListener("click", buyCar);
}

function addRigedEvent(){
    let trigger = document.getElementsByClassName("c-btn c-btn--icon o-button-container__button");
    trigger[1].addEventListener("click", embedRigedBuyButton);
}

function test(){
    "use strict"
    let buttonList = document.getElementsByClassName("c-btn");
    alert(buttonList.length);
}

let request = new XMLHttpRequest();

function buyCar(){
    "use strict"

    let cookies = document.cookie;
    console.log(cookies);

    let jsonDataArray = {
        "ivFileId":"DEU80260V-2022651559",
        "ivPackageId":"",
        "ivBuyFixedPrice":"X",
        "ivKvpsFixedPrice":"DEUV22225",
        "itBidAssistant":[]
    };

    console.log(JSON.stringify(jsonDataArray));

    let jsonData = JSON.parse(JSON.stringify(jsonDataArray));
    console.log(jsonData);
    //https://api.usedcars.vwfs.com/gis-functions/B2C/offers/DEU80260G-2022724832/bids
    let url = "https://www.google.de/";

    request.open("PUT", url); // URL für HTTP-PUT
    request.onreadystatechange = processData; //Callback-Handler zuordnen
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
