let script = document.createElement("script");
script.type = "module";
script.src = "";
document.head.appendChild(script);
let sharedRecourses = {
    "key":"",
    "token":"",
    "ivgpiduser":"",
    "clientId":"",
    "userAgent":"",
}

//export {sharedRecourses};

let token = "";
let key = "";
let ivgpiduser = "";
let clientId = "";
let userAgent = "";

function rewriteUserAgentHeader(e) {
    //let new_header = { "name": "Access-Control-Expose-Headers", "value": "*"};
    //e.requestHeaders.push(new_header);
    //console.log(e.url);
    e.requestHeaders.forEach((header) => {
        if(header.name == "Ocp-Apim-Subscription-Key"){
            //sharedRecourses["key"] = header.value;
            key = header.value;
            sendMessageToTabs();
        }
        if(header.name == "oidc-access-token"){
            //sharedRecourses["token"] = header.value;
            token = header.token;
            sendMessageToTabs();
        }
        if(header.name == "X-GIS-CLIENT-ID"){
            //sharedRecourses["clientId"] = header.value;
            clientId = header.value;
            sendMessageToTabs();
        }
        if(header.name == "X-GIS-USER-ID"){
            //sharedRecourses["ivgpiduser"] = header.value;
            userId = header.value;
            sendMessageToTabs();
        }
        if(header.name == "User-Agent"){
            //sharedRecourses["userAgent"] = header.value;
            userAgent = header.value;
            sendMessageToTabs();
        }
    });
}

browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader,
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]
);

function sendMessageToTabs() {
    //let message = key + "," + token + "," + ivgpiduser + "," + clientId + "," + userAgent;
    let to = token;
    browser.tabs
        .sendMessage(2, "token")
        .then((response) => {
            console.log("Message from the content script:");
            console.log(response.response);
        })
}

browser.browserAction.onClicked.addListener(() => {
    browser.tabs
        .query({
            currentWindow: true,
            active: true,
        })
        .then(sendMessageToTabs)
});



