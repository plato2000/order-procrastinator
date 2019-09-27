class Product {
    name = "";
    number = "";
    price = "";
    quantity = 0;
    constructor(name, number, price, quantity) {
        this.name = name;
        this.number = number;
        this.price = price;
        this.quantity = quantity;
    }
}

$(function() {
    if (window.location.href.indexOf("vexrobotics.com/checkout/cart") >= 0) {
        var items = [];
        $("#shopping-cart-table tbody tr").each(function() {
            var p = new Product();
            $.each(this.cells, function() {
                if ($(this).hasClass("product-cart-info")) {
                    // console.log("in correct td");
                    p.name = $.trim($(this).children("h2.product-name").text());
                    p.number = $.trim($(this).children("div.product-cart-sku").text()).substring(5);
                } else if ($(this).hasClass("product-cart-price")) {
                    p.price = $.trim($(this).children("span.cart-price").text());
                } else if ($(this).hasClass("product-cart-actions")) {
                    p.quantity = $(this).children("input").val();
                }
            });
            items.push(p);
        });
        console.log(items);
    }
});