import axios from "axios";
import fs from "fs/promises";
import path from "path";

const apiUrl = "https://ironrest.fly.dev/api/avatar-collection";
const filePath = new URL("./data.json", import.meta.url);

const pushData = async () => {
  try {
    const rawData = await fs.readFile(filePath);
    const data = JSON.parse(rawData);

    for (const item of data) {
      await axios.post(apiUrl, item);
    }
    console.log("Data pushed successfully");
  } catch (error) {
    console.error("Error pushing data:", error);
  }
};

pushData();
