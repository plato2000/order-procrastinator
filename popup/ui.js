$("#grab").click(function() {
    function messageForCart(tab) {
        console.log("messaging");
        browser.tabs.sendMessage(tab.id, {
            command: "grabCart"
        }).then(showCart)
    }
    
    function getToRightURL(tabs) {
        console.log("hello getting url");
        browser.tabs.get(tabs[0].id).then(function(tabInfo) {
            console.log(tabInfo);
            if (tabInfo.url.indexOf("vexrobotics") >= 0) {
                if (tabInfo.url == "https://www.vexrobotics.com/checkout/cart/") {
                    messageForCart(tabs[0]);
                } else {
                    browser.tabs.update(tabs[0].id, {url: "https://www.vexrobotics.com/checkout/cart/"}).then(messageForCart);
                }
            } else if (tabInfo.url.indexOf("wcproducts") >= 0) {
                if (tabInfo.url == "http://www.wcproducts.net/checkout/cart/") {
                    messageForCart(tabs[0]);
                } else {
                    browser.tabs.update(tabs[0].id, {url: "http://www.wcproducts.net/checkout/cart/"}).then(messageForCart);
                }
            } else if (tabInfo.url.indexOf("therobotspace") >= 0) {
                if (tabInfo.url == "https://www.therobotspace.com/AjaxCart.asp") {
                    messageForCart(tabs[0]);
                } else {
                    browser.tabs.update(tabs[0].id, {url: "https://www.therobotspace.com/AjaxCart.asp"}).then(messageForCart);
                }
            } else if (tabInfo.url.indexOf("andymark") >= 0) {
                if (tabInfo.url == "https://www.andymark.com/cart") {
                    messageForCart(tabs[0]);
                } else {
                    browser.tabs.update(tabs[0].id, {url: "https://www.andymark.com/cart"}).then(messageForCart);
                }
            }
        }).catch(error);
    }

    browser.tabs.query({active: true, currentWindow: true})
        .then(getToRightURL);
});

function error(reason) {
    alert(reason);
}

function showCart(message) {
    // alert("message cart:" +  message.cart);
    let box = $("#cartOutput");
    box.val("");
    for (let item of message.cart) {
        box.val(box.val() + item.name + "\t" + item.number + "\t" + item.url + "\t" + item.vendor + "\t" + item.price + "\t" + item.quantity + "\n");
    }
}