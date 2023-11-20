import axios from "axios";

export default async function fetchCoins() {
  try {
    const response = await axios.get("/api/coins");
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
