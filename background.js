async function sendPutRequest(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        referrer: 'https://usedcars.vwfs.com/',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Language': 'en',
            'Ocp-Apim-Subscription-Key': key,
            'oidc-access-token': token,
            'User-Agent': userAgent,
            'X-GIS-BUSINESSPARTNER-ID': businessPartnerId,
            'X-GIS-CLIENT-ID': clientId,
            'X-GIS-USER-ID': ivgpiduser,
            'Content-Type': 'application/json' ,
            'Origin': 'https://usedcars.vwfs.com',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site'
        },

        //referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
}

function gatherHeaderInformation(e) {
    "use strict"
    if(e.url.toString().match(/^(http|https):\/\/(api.usedcars.vwfs.com\/gis-functions\/V3\/offers\/)+.+(\/vehicles\/)+.+(\/details)/g) ){
        realOfferID = e.url.match(/((DEU)+\d+(G-)\d{1,10})/g)[0].toString();
        realFileID = e.url.match(/((DEU)+\d+(V-)\d{1,10})/g)[0].toString();
	}
    e.requestHeaders.forEach((header) => {
        if(header.name == "Ocp-Apim-Subscription-Key"){
            key = header.value;
            //browser.tabs.query({ currentWindow: true }).then(sendMessageToTabs);
        }
        if(header.name == "oidc-access-token"){
            token = header.value;
            //browser.tabs.query({ currentWindow: true }).then(sendMessageToTabs);
        }
        if(header.name == "X-GIS-CLIENT-ID"){
            clientId = header.value;
            //browser.tabs.query({ currentWindow: true }).then(sendMessageToTabs);
        }
        if(header.name == "X-GIS-USER-ID"){
            ivgpiduser = header.value;
           //browser.tabs.query({ currentWindow: true }).then(sendMessageToTabs);
        }
        if(header.name == "User-Agent"){
            userAgent = header.value;
            //browser.tabs.query({ currentWindow: true }).then(sendMessageToTabs);
        }
        if(header.name == "X-GIS-BUSINESSPARTNER-ID"){
            businessPartnerId = header.value;
            //browser.tabs.query({ currentWindow: true }).then(sendMessageToTabs);
        }
    });
}

browser.webRequest.onBeforeSendHeaders.addListener(
    gatherHeaderInformation,
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]
);

function rewriteUserAgentHeader(e) {
    "use strict"

	for (const header of e.requestHeaders) {
        if(header.name.toLowerCase() === "origin"){
            header.value = 'https://usedcars.vwfs.com';
        };
		if(header.name.toLowerCase() === "cookie"){
			header.name = '';
            header.value = '';
        };
        console.debug(header.name + ": " + header.value);
    };
    console.debug("Header inserted successfully!");
    console.debug(e.requestHeaders);
	return { requestHeaders: e.requestHeaders };
}


browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader,
    {urls: ["https://api.usedcars.vwfs.com/gis-functions/V3/offers/*/bids"]},
    ["blocking", "requestHeaders"]
);

var token = "token";
var key = "";
var ivgpiduser = "";
var clientId = "";
var userAgent = "";
var businessPartnerId = "";
var ivFileId = "";
var realOfferID = "";
var realFileID = "";

browser.runtime.onMessage.addListener((request) => {
    "use strict"
    let url = "https://api.usedcars.vwfs.com/gis-functions/V3/offers/" + realOfferID + "/bids";
    let putData = request.msg;
	putData["ivFileId"] = realFileID;
    console.debug(sendPutRequest(url, putData));
    return Promise.resolve({ response: "transaction done"});
});





