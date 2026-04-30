import "./profile_info.css"
import { getUserData, saveProfileName } from "./utils"
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react"
import ProfileNavbar from "./navbar"


export default function ProfileInfo({ leetcodeProfileName, setProfile }) {

    const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

    const contest_rating = 1306
    const best_performance = 1640
    const contest_attempt = 63
    const email = "kumar.utkarsh.cd.mec22@itbhu.ac.in"

    const [value, setValue] = useState(leetcodeProfileName);
    useEffect(() => {
        setValue(leetcodeProfileName);
    }, [leetcodeProfileName]);

    return <>
        <div className="profile-info">
            {
                leetcodeProfileName==="" ? <div className="add-profile">
                <b>Add Leetcode profile :</b>
                <input
                    type="text"
                    placeholder="ex: your-username"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <button
                    onClick={async () => {
                        setProfile(value)
                        await saveProfileName(value, user.email);
                    }}
                >
                    submit
                </button>
            </div> : null
            }
            
            <div className="details">
                <h1>Pupil</h1>
                <h3>{value}</h3>
                <p>&#128200; Contest Rating: {contest_rating} </p>
                <p>&#127775; Best Performance: {best_performance}</p>
                <p>&#127775; Contest Attempt: {contest_attempt}</p>
                <p>&#128231; Email: {email}</p>
            </div>
        </div>
    </>
}