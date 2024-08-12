import React from "react";
import './forms.css'

const ReactHookForm: React.FC = () => {
    return(
        <>
            <form className="form">
                <span>
                    Name
                    <input type="text"></input>
                    <br/>
                </span>
                <span>
                    Age
                    <input type="number" min={0} max={120}></input>
                    <br/>
                </span>
                <span>
                    Email
                    <input type="email"></input>
                    <br/>
                </span>
                <span>
                    Password
                    <input type="password"></input>
                    <p className="strength">Password strength</p>
                    <br/>
                </span>
                <span>
                    Repeat password
                    <input type="password"></input>
                    <p className="strength">Passwords don't match</p>
                    <br/>
                </span>
                <span>
                    Gender
                    <input type="radio" name="Female"></input>
                        <label>Female</label>
                    <input type="radio" name="Male"></input>
                        <label>Male</label>
                    <br/>
                </span>
                <input type="file" name="filename"></input>
                <button className="submit-btn">Submit</button>
            </form>
        </>
    )
}

export default ReactHookForm;