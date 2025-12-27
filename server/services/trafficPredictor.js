/**
 * AI Traffic Prediction Service
 * Designed for Google Gemini / OpenAI integration
 */

async function predictTraffic({ city, day, time }) {
  if (day === "Monday" && time.includes("9")) {
    return { traffic: "High", multiplier: 1.7 };
  }
  if (time.includes("6")) {
    return { traffic: "High", multiplier: 1.7 };
  }
  return { traffic: "Medium", multiplier: 1.3 };
}

module.exports = predictTraffic;
