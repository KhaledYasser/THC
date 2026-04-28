from duckduckgo_search import DDGS
import requests
import os
import time
import json

products = {
  "p2": "Zebra DS2208 Barcode Scanner product white background",
  "p4": "Canon PIXMA G6020 printer product white background",
  "p5": "Honeywell Voyager 1200g scanner product white background",
  "p6": "Fujitsu ScanSnap iX1600 product white background",
  "p7": "HP 58A Black Toner Cartridge CF258A product white background",
  "p8": "Zebra ZD421 Thermal Printer product white background",
  "p9": "Epson EcoTank ET-4760 printer product white background",
  "p10": "Canon imageFORMULA R40 scanner product white background",
  "p11": "HP ENVY 6055e printer product white background",
  "p12": "Zebra LS2208 Barcode Scanner product white background",
  "p13": "Logitech MX Keys S Keyboard product white background",
  "p14": "Canon PG-245XL Black Ink product white background",
  "p15": "HP Aruba Instant On AP22 product white background",
  "p16": "Epson TM-T88VI POS Printer product white background",
  "p17": "Honeywell HD Dome Camera product white background",
  "p18": "Logitech Circle View Camera product white background"
}

out_dir = "/Users/khaled/Projects/THC/site/images"
os.makedirs(out_dir, exist_ok=True)

downloaded = {}

for pid, query in products.items():
    print(f"Searching for {pid}...")
    try:
        with DDGS() as ddgs:
            results = ddgs.images(query, max_results=3)
            success = False
            for res in results:
                url = res['image']
                try:
                    r = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
                    if r.status_code == 200:
                        ext = url.split('.')[-1].split('?')[0].lower()
                        if ext not in ['jpg', 'png', 'jpeg', 'webp']:
                            ext = 'jpg'
                        filename = f"{pid}.{ext}"
                        filepath = os.path.join(out_dir, filename)
                        with open(filepath, 'wb') as f:
                            f.write(r.content)
                        if os.path.getsize(filepath) > 1024:
                            print(f"Downloaded {pid} from {url}")
                            downloaded[pid] = f"images/{filename}"
                            success = True
                            break
                except Exception as e:
                    pass
            if not success:
                print(f"Failed to find valid image for {pid}")
    except Exception as e:
        print(f"Search failed for {pid}: {e}")
    time.sleep(5)

with open("downloaded_images_slow.json", "w") as f:
    json.dump(downloaded, f)
