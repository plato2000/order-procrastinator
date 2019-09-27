$("#grab").click(function() {
    function messageForCart(tabs) {
        console.log("messaging");
        browser.tabs.sendMessage(tabs[0].id, {
            command: "grabCart"
        }).then(showCart)
    }
    
    browser.tabs.query({active: true, currentWindow: true})
        .then(messageForCart);
});

function showCart(message) {
    // alert("message cart:" +  message.cart);
    var box = $("#cartOutput");
    box.val("");
    for (var item of message.cart) {
        box.val(box.val() + item.name + "\t" + item.number + "\t" + item.url + "\t" + item.vendor + "\t" + item.price + "\t" + item.quantity + "\n");
    }
}