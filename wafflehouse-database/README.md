# Waffle House Location Data

Waffle house location data is fairly easy to scrape just with the way they run their website
- Slug for each waffle house location. 
- - They are all numbered but they have their city name in the slug (i.e. "riverdale-ga-298") so it isn't as easy as just incrementing a number
- - Using the locations.wafflehouse.com sitemap I was able to download an xml file with all the slugs and from that
- - After collecting all the wafflehouse slugs I saved them to a csv
- - All this work is done in "get-slugs.py"

- Using the slug to get longitude and latitude of each waffle house
- - Using the slugs we got we can now get all the data we need from each
- - as easy as sending a request to a url that looks something like "https://locations.wafflehouse.com/_next/data/HwqrOQMbRrOikx9_MtwZV/murfreesboro-tn-2215.json"
- - saving said data into a csv
- - *since not all waffle houses are open 24hrs (like genuinely wtf r they doing) I had to save that data to keep an accurate tracking so that the compass is always accurate (don't want someone going to a waffle house that doesn't exist)*

TURNS OUT I DIDN't NEED TO DO ALL THAT CAUSE THEY HAVE A JSON WITH ALL THE LOCATIONS IN THE SERVER SIDE PROPS, BUT DEBUGGING AN ERROR IN MY SCAPING CODE HELPED ME FIND THAT!!! imma leave this here cause ngl its kinda funny + i'm transparent worker :)