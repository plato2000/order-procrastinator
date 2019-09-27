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
    let items = [];
    if (window.location.href.indexOf("vexrobotics.com/checkout/cart") >= 0) {
        $("#shopping-cart-table tbody tr").each(function() {
            let p = new Product();
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
        let data = JSON.parse($("div.cart").attr("data-analytics"));
        console.log(data);
        for (let item of data.payload.items) {
            items.push(new Product(item.product_name, item.sku, "https://www.andymark.com/" + item.sku, "AndyMark", item.price, item.quantity));
        }
    } else if (window.location.href.indexOf("wcproducts.net/checkout/cart") >= 0) {
        $("#shopping-cart-table tbody tr").each(function() {
            let p = new Product();
            $.each(this.cells, function() {
                if ($(this).children("h2").hasClass("product-name")) {
                    // console.log("in correct td");
                    p.name = $.trim($(this).children("h2.product-name").text());
                    p.url = $.trim($(this).children("h2.product-name").children("a").attr("href"));
                    p.number = p.url.split("/").pop();
                } else if ($(this).hasClass("col-unit-price")) {
                    p.price = $.trim($(this).children("span.cart-price").text());
                } else if ($(this).attr("class") == "a-center") {
                    p.quantity = $(this).children("input").val();
                }
            });
            p.vendor = "West Coast Products";
            items.push(p);
        });
    } else if (window.location.href.indexOf("therobotspace.com/AjaxCart.asp") >= 0) { 
        let jsn = JSON.parse($(document).text());
        console.log(jsn);
        let products = jsn.Products;
        for (let item of products) {
            console.log(item);
            items.push(new Product(item.ProductName, item.ProductCode, "https://www.therobotspace.com/ProductDetails.asp?ProductCode=" + item.ProductCode, "The Robot Space", item.ProductPrice, item.Quantity));
        }
    }

    return items;
}

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "grabCart") {
        console.log("grabbing cart...");
        let items = grabCart();
        console.log(items);
        return Promise.resolve({cart: items});
    }
});