
def modern_lists():
    prods = [
        {'name': "Mango", 'price': 2, 'qty': 1}, 
        {'name': "Lemonade", 'qty': 2, 'price': 1.5,}, 
        { 'price': 3.5, 'qty': 3, 'name': "Orange",},
    ]

    for prod in prods: 
        print(f"{prod.get("qty")}x {prod.get("name")} à {prod.get("price")} EUR/Menge")

modern_lists()
















def super_lists():
    products = ["Mango", "Lemonade", "Orange"]
    prices = [2,          1.5,      3.5]
    quantities = [1,     2,     3]

    i = 0
    while i < len(products):

        product_name = products[i]
        product_price = prices[i]
        qty  = quantities[i]

        print(f"{qty}x {product_name} à {product_price} EUR/Menge")

        i = i + 1


    pass 

#super_lists()

def number_arrays():
    start_time = time()
    scores = [ 8, 9, 100, 5, 20]
    #scores = range(50_000_000)


    min_score = min(scores)
    max_score = max(scores)

    # erste Zahl auswählen -> spielt keine Rolle
    # min_score = scores[0]
    # max_score = scores[0]

    for score in scores:
        if score < min_score:
            min_score = score

        if score > max_score:
            max_score = score
        

    end_time = time()

    duration = end_time - start_time 
    print(f"Es hat ca. {duration * 1000}ms")

    print(f"min_score: {min_score}")
    print(f"max_score: {max_score}")

    pass

# Hier wird das Programm gestartet.
#number_arrays()

def string_arrays():
    fruits = ["mango", "avocdo", "lemon" ]
    # Aktualisiere die Position 2, 0 -> Position 1, 1 -> Position 2 .... usw
    fruits[1] = "avocado_is_last"

    fruits.append("orange")

    for fruit in fruits: 
        print(f"Fruit name is: {fruit}")

#string_arrays()