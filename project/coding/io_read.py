
with open("input.txt", "r") as file: 

    lines = file.readlines()
    total = 0

    for line in lines:
        line_clean = line.replace("\n", "")
        num = int(line_clean)
        total = total + num

    print("Final SUM: ", total)