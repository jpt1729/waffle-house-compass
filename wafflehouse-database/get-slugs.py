# gets waffle-house slugs from https://locations.wafflehouse.com/sitemap-0.xml as a source

import pandas as pd
import xml.etree.ElementTree as ET

root = ET.parse("sitemap-0.xml")

slugs = []

for element in root.iter():
    if element.tag.endswith('loc'):
        url_text = element.text
        
        if "locations.wafflehouse.com" in url_text:
            slug = url_text.split("/")[-2]
            slugs.append(slug)

data = {"slugs": slugs}

df = pd.DataFrame(data)
     
df.to_csv('waffle_house_slugs.csv', index=False)