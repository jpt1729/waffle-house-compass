export function getBearing(startLat, startLng, destLat, destLng) {
  const startLatRad = (startLat * Math.PI) / 180;
  const startLngRad = (startLng * Math.PI) / 180;
  const destLatRad = (destLat * Math.PI) / 180;
  const destLngRad = (destLng * Math.PI) / 180;

  const dLon = destLngRad - startLngRad;

  const y = Math.sin(dLon) * Math.cos(destLatRad);
  const x =
    Math.cos(startLatRad) * Math.sin(destLatRad) -
    Math.sin(startLatRad) * Math.cos(destLatRad) * Math.cos(dLon);

  let brng = Math.atan2(y, x);

  brng = (brng * 180) / Math.PI;

  return (brng + 360) % 360;
}
