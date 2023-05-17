import axios from "axios";
import { sleep } from "./utils.js";
const apiUrl = "https://ironrest.fly.dev/api/tweet-collection";

// doing an asychronous function
const deleteAllItems = async () => {
  try {
    //storing the data into the response
    const response = await axios.get(apiUrl);
    // extract the data and assign it to the item
    const items = response.data;
    // iterate for each item
    for (const item of items) {
      await axios.delete(`${apiUrl}/${item._id}`);
      console.log("We deleted: ", item._id);

      await sleep(200);
    }
    console.log("All items deleted successfully");
  } catch (error) {
    console.error("Error deleting items:", error);
  }
};

deleteAllItems();
