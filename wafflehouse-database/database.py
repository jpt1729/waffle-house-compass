import requests
import pandas as pd
import time

slugs = pd.read_csv("waffle_house_slugs.csv")
slugs = slugs.slugs
base_url = "https://locations.wafflehouse.com/_next/data/HwqrOQMbRrOikx9_MtwZV/"

waffle_house_data = []

for slug in slugs:
    response = requests.get(f'{base_url}/{slug}.json')
    
    if response.status_code != 200:
        print(f'Failed to fetch {slug}')
        continue
    with open('example.txt', 'wb') as file:
        file.write(response.content)
    data = response.json()
    loc = data.get("pageProps", {}).get("location", {})
    
    waffle_house_data.append({
        "slug": slug,
        "longitude": loc.get("longitude"),
        "latitude": loc.get("latitude"),
        "special_hours": loc.get("specialHours"),
        "business_hours": loc.get("businessHours"),
        "formatted_business_hours": loc.get("formattedBusinessHours", ["N/A"])[0] 
    })
    time.sleep(0.5)
    
df = pd.DataFrame(waffle_house_data)

df.to_csv("waffle_house.csv", index=False)