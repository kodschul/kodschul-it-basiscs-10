from random import randint

random_num = randint(1, 10)

guess = int(input("Guess a num between 1-10: "))


if guess == random_num: 
    print("you won!")
else: 
    print(f"you lost, the correct num was: {random_num}")


