"use strict"
let key = "";
let token = "";

let tokenGathered = false;
let keyGathered = false;

function rewriteUserAgentHeader(e) {
    //let new_header = { "name": "Access-Control-Expose-Headers", "value": "*"};
    //e.requestHeaders.push(new_header);
    e.requestHeaders.forEach((header) => {
        if(keyGathered == false && header.name == "Ocp-Apim-Subscription-Key"){
            key = header.value;
            keyGathered = true;
            console.log("Subscription-Key: " + header.value);
        }
        if(tokenGathered == false && header.name == "oidc-access-token"){
            token = header.value;
            tokenGathered = true;
            console.log("Access-Token: " + header.value);
        }
    });
}

browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader,
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]
);



