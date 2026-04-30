import axios from "axios";

export async function makeEntry(user) {
    try {
        console.log("sending info for user entry")
        const result = await axios.post("http://localhost:3002/add_user", user);
        return result.data; 
    } catch (err) {
        console.error("Error in makeEntry:", err);
        throw err;
    }
}

export async function removeEntry(sub){
    try {
        console.log("Sending info for user removal")
        const result = await axios.delete(`http://localhost:3002/remove_user/${sub}`);
        return result.data; 
    } catch (err) {
        console.error("Error in makeEntry:", err);
        throw err;
    }
}