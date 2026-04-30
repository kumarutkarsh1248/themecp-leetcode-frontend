import axios from "axios";

async function getUserData(user) {
    try {
        const result = await axios.get(`http://localhost:3002/leetcode/${user}`, user);
        return result.data; 
    } catch (err) {
        console.error("Error in makeEntry:", err);
        throw err;
    }
}

async function saveProfileName(user_profile_name, email){

    try{
        const result = await axios.post("http://localhost:3002/users/save_profile_name", {
            user_profile_name: user_profile_name,
            email: email
        })
    }
    catch(err){
        console.log("error while saving the profile name")
    }
}

async function getContestHistory(email) {
    console.log("&&&&&&", email)
    try {
        const result = await axios.get(
            "http://localhost:3002/contest/contest_history",
            {
                params: { email }
            }
        );
        console.log("insdie get contest history")
        console.log(result.data);
        return result.data.data;
    } catch (err) {
        console.log("some error getting the contest history");
        console.log(err);
    }
}
function getRatings(level) {
    if (level == null || isNaN(level)) {
        return [1000, 1200, 1400, 1600];
    }

    let r1 = 1000;
    let r2 = 1200;
    let r3 = 1400;
    let r4 = 1600;

    for (let i = 0; i <= level; i++) {
        if (i % 4 === 1) r1 += 100;
        else if (i % 4 === 2) r2 += 100;
        else if (i % 4 === 3) r3 += 100;
        else if (i !== 0) r4 += 100;
    }
    return [r1, r2, r3, r4]; // return numbers, not strings
}

export {
    saveProfileName,
    getUserData,
    getContestHistory,
    getRatings
};