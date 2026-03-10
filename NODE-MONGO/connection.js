import mongoose from "mongoose";
import dns from "node:dns";

// Force Node to use reliable DNS servers
dns.setServers(["1.1.1.1", "8.8.8.8"]);

export const connectMongoDB = async (connectionURL) => {
  const connection = await mongoose.connect(connectionURL);

  console.log("Connected DB:");

  return connection;
};
