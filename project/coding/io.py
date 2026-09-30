products = ["Mango", "Apple", "Lemonade"]

with open("beleg.txt", "+w") as file:
    file.write("----------------\n")
    file.write("-----INVOICE----\n")

    file.write("Qty\t| Name\t\t\t| Price\n")

    for product in products: 
        file.write(f"01 \t| {product}\t\t\t| 0,00 EUR\n")