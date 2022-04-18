a = int(input("enter number 1 "))
b = int(input("enter number 2 "))
c = int(input("enter number 3 "))
if (a > b):
    y = (a-c)
    if y > 0:
        return a
    else:
        return c
else:
    z = (b-c)
    if z > 0:
        return b
    else:
        return c
