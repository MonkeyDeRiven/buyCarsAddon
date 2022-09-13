/*module.exports = {sharedRecourses};

let sharedRecourses = {
    "key":"",
    "token":"",
    "ivgpiduser":"",
    "clientId":"",
    "userAgent":"",
}
*/

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
            window.localStorage.setItem("key", header.value);
        }
        if(header.name == "oidc-access-token"){
            //sharedRecourses["token"] = header.value;
            window.localStorage.setItem("token", header.value);
        }
        if(header.name == "X-GIS-CLIENT-ID"){
            //sharedRecourses["clientId"] = header.value;
            window.localStorage.setItem("clientId", header.value);
        }
        if(header.name == "X-GIS-USER-ID"){
            //sharedRecourses["ivgpiduser"] = header.value;
            window.localStorage.setItem("ivgpiduser", header.value);
        }
        if(header.name == "User-Agent"){
            //sharedRecourses["userAgent"] = header.value;
            window.localStorage.setItem("userAgent", header.value);
        }
    });
}

browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteUserAgentHeader,
    {urls: ["<all_urls>"]},
    ["blocking", "requestHeaders"]
);



