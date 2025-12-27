// function haversineDistance(coord1, coord2) {
//   const toRad = x => (x * Math.PI) / 180;

//   const [lon1, lat1] = coord1;
//   const [lon2, lat2] = coord2;

//   const R = 6371; // km
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRad(lat1)) *
//       Math.cos(toRad(lat2)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c;
// }

// function optimizeRoute(deliveries = [], vehicle, trafficMultiplier = 1) {
//   // ✅ SAFETY CHECK
//   if (!Array.isArray(deliveries) || deliveries.length === 0) {
//     return {
//       route: [],
//       totalDistance: "0 km",
//       eta: "0 hrs"
//     };
//   }

//   let current = vehicle.startLocation.coordinates;
//   let remaining = [...deliveries];
//   let ordered = [];
//   let totalDistance = 0;

//   while (remaining.length > 0) {
//     let nearestIndex = 0;
//     let nearestDistance = Infinity;

//     remaining.forEach((d, i) => {
//       const dist = haversineDistance(
//         current,
//         d.location.coordinates
//       );
//       if (dist < nearestDistance) {
//         nearestDistance = dist;
//         nearestIndex = i;
//       }
//     });

//     const next = remaining.splice(nearestIndex, 1)[0];
//     totalDistance += nearestDistance;
//     ordered.push(next);
//     current = next.location.coordinates;
//   }

//   const adjustedDistance = totalDistance * trafficMultiplier;
//   const eta = (adjustedDistance / 40).toFixed(2); // avg speed 40 km/h

//   return {
//     route: ordered,
//     totalDistance: adjustedDistance.toFixed(2) + " km",
//     eta: eta + " hrs"
//   };
// }

// module.exports = optimizeRoute;
const haversineDistance = require("./distance");

function optimizeRoute(deliveries = [], vehicle, trafficMultiplier = 1) {
  if (!Array.isArray(deliveries) || deliveries.length === 0 || !vehicle) {
    return {
      route: [],
      totalDistance: "0 km",
      eta: "0 hrs"
    };
  }

  let current = vehicle.startLocation.coordinates;
  let remaining = [...deliveries];
  let ordered = [];
  let totalDistance = 0;

  while (remaining.length > 0) {
    let nearestIndex = 0;
    let nearestDistance = Infinity;

    remaining.forEach((d, i) => {
      const dist = haversineDistance(
        current,
        d.location.coordinates
      );

      if (dist < nearestDistance) {
        nearestDistance = dist;
        nearestIndex = i;
      }
    });

    const next = remaining.splice(nearestIndex, 1)[0];
    totalDistance += nearestDistance;
    ordered.push(next);
    current = next.location.coordinates;
  }

  const adjustedDistance = totalDistance * trafficMultiplier;
  const eta = (adjustedDistance / 40).toFixed(2); // 40 km/h avg

  return {
    route: ordered,
    totalDistance: adjustedDistance.toFixed(2) + " km",
    eta: eta + " hrs"
  };
}

module.exports = optimizeRoute;
