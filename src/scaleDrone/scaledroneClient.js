// scaledroneClient.js
const Scaledrone = require('scaledrone-react-native');
const CHANNEL_ID = "Bk47b4jhrAJpS7Tj"; // Scaledrone 채널 ID

export const drone = new Scaledrone(CHANNEL_ID, {
  data: {
    clientName: "Rank System",
  },
});

drone.on("open", (error) => {
  if (error) {
    console.error("Scaledrone connection error:", error);
  } else {
    console.log("Scaledrone connected successfully!");
  }
});

export default drone;
