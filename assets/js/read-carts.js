class Product {
    name = "";
    number = "";
    url = "";
    vendor = "";
    price = "";
    quantity = 0;
    constructor(name, number, url, vendor, price, quantity) {
        this.name = name;
        this.number = number;
        this.url = url;
        this.vendor = vendor;
        this.price = price;
        this.quantity = quantity;
    }
}

function confirmSent() {
    console.log("sent");
}

function handleError() {

}

function grabCart() {
    var items = [];
    if (window.location.href.indexOf("vexrobotics.com/checkout/cart") >= 0) {
        $("#shopping-cart-table tbody tr").each(function() {
            var p = new Product();
            $.each(this.cells, function() {
                if ($(this).hasClass("product-cart-info")) {
                    // console.log("in correct td");
                    p.name = $.trim($(this).children("h2.product-name").text());
                    p.url = $.trim($(this).children("h2.product-name").children("a").attr("href"));
                    p.number = $.trim($(this).children("div.product-cart-sku").text()).substring(5);
                } else if ($(this).hasClass("product-cart-price")) {
                    p.price = $.trim($(this).children("span.cart-price").text());
                } else if ($(this).hasClass("product-cart-actions")) {
                    p.quantity = $(this).children("input").val();
                }
            });
            p.vendor = "Vex Robotics";
            items.push(p);
        });
    } else if (window.location.href.indexOf("andymark.com/cart") >= 0) {
        var data = JSON.parse($("div.cart").attr("data-analytics"));
        for (var item of data.items) {
            items.push(new Product(item.name, item.sku, "https://www.andymark.com/" + item.sku, "AndyMark", item.price, item.quantity));
        }
    }
    return items;
}

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "grabCart") {
        var items = grabCart();
        console.log(items);
        return Promise.resolve({cart: items});
    }
});