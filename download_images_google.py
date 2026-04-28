import requests
import re
import os
import json
import time

products = {
  "p6": "Fujitsu ScanSnap iX1600 product",
  "p7": "HP 58A Black Toner Cartridge CF258A product",
  "p8": "Zebra ZD421 Thermal Printer product",
  "p9": "Epson EcoTank ET-4760 printer product",
  "p10": "Canon imageFORMULA R40 scanner product",
  "p11": "HP ENVY 6055e printer product",
  "p12": "Zebra LS2208 Barcode Scanner product",
  "p13": "Logitech MX Keys S Keyboard product",
  "p14": "Canon PG-245XL Black Ink product",
  "p15": "HP Aruba Instant On AP22 product",
  "p16": "Epson TM-T88VI POS Printer product",
  "p17": "Honeywell HD Dome Camera product",
  "p18": "Logitech Circle View Camera product"
}

out_dir = "/Users/khaled/Projects/THC/site/images"
os.makedirs(out_dir, exist_ok=True)

try:
    with open("downloaded_images.json", "r") as f:
        downloaded = json.load(f)
except:
    downloaded = {}

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}

for pid, query in products.items():
    print(f"Searching {pid}")
    url = f"https://www.google.com/search?tbm=isch&q={requests.utils.quote(query)}"
    try:
        r = requests.get(url, headers=headers)
        urls = re.findall(r'(https?://[^\s\"\'<>]+?\.(?:jpg|png|jpeg))', r.text)
        success = False
        for img_url in urls:
            if "google" in img_url or "gstatic" in img_url or "logo" in img_url.lower():
                continue
            try:
                img_r = requests.get(img_url, headers=headers, timeout=5)
                if img_r.status_code == 200 and len(img_r.content) > 5000:
                    ext = "jpg"
                    if ".png" in img_url.lower(): ext = "png"
                    filename = f"{pid}.{ext}"
                    filepath = os.path.join(out_dir, filename)
                    with open(filepath, 'wb') as f:
                        f.write(img_r.content)
                    downloaded[pid] = f"images/{filename}"
                    print(f"Downloaded {pid} from {img_url}")
                    success = True
                    break
            except:
                pass
        if not success:
            print(f"Failed {pid}")
    except Exception as e:
        print(f"Error {pid} {e}")
    time.sleep(1)

with open("downloaded_images.json", "w") as f:
    json.dump(downloaded, f)
