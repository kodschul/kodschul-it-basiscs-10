from random import randint

random_num = randint(1, 10)


max_attemps = 3
attempt_no = 1

is_running = True 
is_won = False


while is_running and attempt_no  <= max_attemps: 
    guess = int(input(f"Guess a num between 1-10 ({attempt_no}/{max_attemps}): "))

    if guess == random_num: 
        is_running = False 
        is_won = True
        print("Well done! You won!")
    else: 
        print("Sorry, please try again!")

    attempt_no += 1

if not is_won: 
    print(f"Sorry you lost, the correct number was: {random_num}")






