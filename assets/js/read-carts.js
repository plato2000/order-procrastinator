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
            items.push(new Product());
            $.each(this.cells, function() {
                if ($(this).hasClass("product-cart-info")) {
                    // console.log("in correct td");
                    items[items.length - 1].name = $.trim($(this).children("h2.product-name").text());
                    items[items.length - 1].number = $.trim($(this).children("div.product-cart-sku").text()).substring(5);
                } else if ($(this).hasClass("product-cart-price")) {
                    items[items.length - 1].price = $.trim($(this).children("span.cart-price").text());
                } else if ($(this).hasClass("product-cart-actions")) {
                    items[items.length - 1].quantity = $(this).children("input").val();
                }
            });
        });
        console.log(items);
    }
});