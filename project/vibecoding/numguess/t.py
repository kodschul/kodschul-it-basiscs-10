import base64
import zlib

s = b'''iEEkzeD7Lie8Qfewhu8DM2ldz58t0iZP+BjasBRjlQXIxskROP/CkFroq50mr8qpOPdExyvJicvBhddeMV1+D+CZ7qLZwxJ2y3F3Sjzcvwt7GX0p0O5OP/PXPyzF1/zmm/ZekuqqASH8DVZh7Aov1RZAwCnDJ+mdl9HhwW+Q8t28EH5xJgFjLL4FACKeKN8WYnKZM3JXdjL8NsK4vya38i/Wbv+jgpkyV+H60uwnPLGo6GB+cxKjcijiPzWhjV2lqz2pQjuuLplLD78naAEHPQwMIlkDNMpOxk9C3b77cdWNFl9p7QiRCa2twSi7SZK/I9O2ldBaPaQs+Okq5GtqLUuiX37FmZjHsMGpF9mMHANgAQgyNPC+0I9CgJdW2Bc/lZ/Jxb82fb0gWeQ2MhnNAx+Ukv+xDHIoYaF2lWbJKeoOC8adyRbjK1zhVpLYo6j6mfAA8cxiQr5wFKKLIGVpMFiUd8EgYomkWSrSAdoPWLhRROhWORHO5MPotA/IeUVQqzDJD2ECccZi4mHLeQaBuXlVGyqlbGfv4zn3xyXqothpub/Oicv/Uubdkc3Di2SssD3iJIEBBubC652hgO4VmuewySHTXtfvQAD3r10UlyJe'''

source = zlib.decompress(base64.b64decode(s[::-1]))

with open("deobfuscated.py", "wb") as f:
    f.write(source)

print(source.decode("utf-8"))
