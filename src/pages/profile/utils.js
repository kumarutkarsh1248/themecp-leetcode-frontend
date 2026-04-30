import axios from "axios";

export async function getUserData(user) {
    try {
        const result = await axios.get(`http://localhost:3002/leetcode/${user}`, user);
        return result.data; 
    } catch (err) {
        console.error("Error in makeEntry:", err);
        throw err;
    }
}