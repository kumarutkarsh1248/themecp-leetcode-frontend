import { useState, useEffect } from "react";
import { getSubmissionStatus, updateSubmission } from "./utility";
import { useAuth0 } from "@auth0/auth0-react"

import "./running-contest.css"

function Timer({ start_time }) {
  const [count, setCount] = useState(start_time);

  // sync when start_time updates
  useEffect(() => {
    setCount(start_time);
  }, [start_time]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const newCount = prev + 1;

        if (newCount >= 50) {
          clearInterval(interval);
          window.location.reload(); //reload entire app
        }

        return newCount;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <h1>Running time = {count}</h1>;
}

export function Running({
  questions,
  ratings,
  contestId,
  start_time,
  leetcodeProfileName
}) {
  console.log(questions)
  console.log(contestId);
  const [submissionStatus, setSubmissionStatus] = useState([false, false, false, false]);
  const { user } = useAuth0();
  console.log(questions)

  return (
    <>
      <div className="running-container">

        <Timer start_time={start_time} />
        <button onClick={async () => {

          try {
            await updateSubmission(user.email, leetcodeProfileName)
            const status = await getSubmissionStatus(contestId);
            setSubmissionStatus(status);

            // if all problems are solved then finish the contest
            let count = 0;
            for(const el of status){
              if(el) count+=1;
            }
            if(count == 4){
              alert("contest finished");
              window.location.reload();
            }
          }
          catch (err) {
            console.log("some error occured while getting the submissio status")
            console.log(err)
          }
        }}>Refresh to verify submission</button>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Rating</th>
                <th>Status</th>
              </tr>

            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td> <a href={`https://leetcode.com/problems/${questions[0][1]} `}
                  target="_blank"
                  rel="noopener noreferrer">Problem A</a> </td>
                <td>{ratings[0]}</td>
                <td>{submissionStatus[0] ? "Accepted" : "not yet done"}</td>
              </tr>
              <tr>
                <td>2</td>
                <td> <a href={`https://leetcode.com/problems/${questions[1][1]} `}
                  target="_blank"
                  rel="noopener noreferrer">Problem B</a> </td>
                <td>{ratings[1]}</td>
                <td>{submissionStatus[1] ? "Accepted" : "not yet done"}</td>
              </tr>
              <tr>
                <td>3</td>
                <td> <a href={`https://leetcode.com/problems/${questions[2][1]} `}
                  target="_blank"
                  rel="noopener noreferrer">Problem C</a> </td>
                <td>{ratings[2]}</td>
                <td>{submissionStatus[2] ? "Accepted" : "not yet done"}</td>
              </tr>
              <tr>
                <td>4</td>
                <td> <a href={`https://leetcode.com/problems/${questions[3][1]} `}
                  target="_blank"
                  rel="noopener noreferrer">Problem D</a> </td>
                <td>{ratings[3]}</td>
                <td>{submissionStatus[3] ? "Accepted" : "not yet done"}</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>
    </>
  );
}