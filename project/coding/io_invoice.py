products = [
        {'name': "Mango", 'price': 2, 'qty': 1}, 
        {'name': "Lemonade", 'qty': 2, 'price': 1.5,}, 
        { 'price': 3.5, 'qty': 3, 'name': "Orange",},
    ]

with open("beleg.txt", "+w") as file:
    file.write("----------------\n")
    file.write("-----INVOICE----\n")

    file.write("Qty\t| Name\t\t\t| Unit Price \t\t| TOTAL\n")

    for product in products: 
        amount = product.get('price') * product.get('qty')

        file.write(f"{product.get("qty")} \t| {product.get("name")}\t\t\t| {product.get("price")} EUR\t\t| {amount} EUR\n")