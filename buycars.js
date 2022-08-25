setTimeout(function(){
    embedRigedBuyButton();
}, 4000);

//add a new buy button to the website
function embedRigedBuyButton(){
    let here = document.getElementsByClassName("column-third");
    alert(here.length);
    let clickMeButton = document.createElement("button");
    clickMeButton.innerText = "CLICK ME!!"
    clickMeButton.style.border = "true";
    clickMeButton.style.borderColor = "red"
    here[2].appendChild(clickMeButton);
    console.log("done");
}

function buyCar(){
    request.open("Put", url); // URL für HTTP-GET
    request.onreadystatechange = processData; //Callback-Handler zuordnen
    request.send(null); // Request abschicken
}

let request = new XMLHttpRequest();

function processData() {
    "use strict";
    if (request.readyState === 4) { // Uebertragung = DONE
        if (request.status === 200) { // HTTP-Status = OK
            if(request.responseText == "status 404"){
                console.log("Status 404");
            }
            else if (request.responseText != null) {
                let explanationContainer = document.getElementById("explanation"); // Daten verarbeiten
                console.log(request.responseText);
                explanationContainer.innerText = request.response.explanation;
            }
            else console.error("Dokument ist leer");
        } else console.error("Uebertragung fehlgeschlagen");
    } // else; // Uebertragung laeuft noch
}
