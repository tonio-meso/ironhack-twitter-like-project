import axios from "axios";

const apiUrl = "https://ironrest.fly.dev/api/tweet-collection";

const deleteAllItems = async () => {
  try {
    const response = await axios.get(apiUrl);
    const items = response.data;
    for (const item of items) {
      await axios.delete(`${apiUrl}/${item._id}`);
    }
    console.log("All items deleted successfully");
  } catch (error) {
    console.error("Error deleting items:", error);
  }
};

deleteAllItems();
