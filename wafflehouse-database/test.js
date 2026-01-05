function getDistanceInMiles(lat1, lon1, lat2, lon2) {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function isStoreOpen(store) {
    // 1. The "Waffle House Rule": If it says "24 hours", it's open.
    // We check the formatted string first because it's the safest bet.
    const formatted = store.formattedBusinessHours || [];
    const rawHours = store.businessHours || [];

    if (formatted.some(str => str.toLowerCase().includes("24 hours"))) {
        return true;
    }

    // 2. Detailed Time Check (if not 24h)
    const now = new Date();
    
    // Javascript getDay(): 0 = Sunday, 1 = Monday, ... 6 = Saturday
    // But Waffle House data usually starts Monday (Index 0). 
    // We need to shift the index: Sunday(0) -> becomes 6, Mon(1) -> 0
    let dayIndex = now.getDay() - 1;
    if (dayIndex === -1) dayIndex = 6; 

    const todaysHours = rawHours[dayIndex]; // e.g., ["06:00", "22:00"]
    
    if (!todaysHours || todaysHours.length < 2) return false; // No data = assume closed

    const [openStr, closeStr] = todaysHours;
    
    // If times are "00:00" to "00:00", it usually implies 24h in their system
    if (openStr === "00:00" && closeStr === "00:00") return true;

    // Convert current time to "HH:MM" for string comparison
    const currentH = String(now.getHours()).padStart(2, '0');
    const currentM = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${currentH}:${currentM}`;

    // Standard check: Open < Now < Close
    // Note: This simple check fails for overnight hours like "22:00 to 05:00"
    // But Waffle House usually uses 24h or standard day hours.
    return currentTime >= openStr && currentTime <= closeStr;
}

/**
 * MAIN FUNCTION: Find the nearest open store
 */
function findNearestOpenWaffle(myLat, myLong, allStores) {
    let nearestStore = null;
    let minDist = Infinity;

    // Loop through every single store
    for (const store of allStores) {
        
        // 1. Check if it's open FIRST (save math if it's closed)
        if (!isStoreOpen(store)) {
            continue;
        }

        // 2. Calculate Distance
        // Ensure inputs are numbers (parseFloat) just in case
        const dist = getDistanceInMiles(
            myLat, myLong, 
            parseFloat(store.latitude), parseFloat(store.longitude)
        );

        // 3. Keep the winner
        if (dist < minDist) {
            minDist = dist;
            nearestStore = { ...store, distanceMiles: dist.toFixed(2) };
        }
    }

    return nearestStore;
}

const locations = require("./waffle_house_data.json")
console.log(findNearestOpenWaffle("29.7120527", "-95.8427632", locations))