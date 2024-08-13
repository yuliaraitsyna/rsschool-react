import React from "react";
import './forms.css'
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const UncontrolledForm: React.FC = () => {
    const countriesList = useSelector((state: RootState) => state.countries.countries);

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
                        <label htmlFor="Female">Female</label>
                    <input type="radio" name="Male"></input>
                        <label htmlFor="Male">Male</label>
                    <br/>
                </span>
                <input type="file" name="filename"></input>
                <select className="countries-list">
                    {
                        countriesList.map((country: string, index: number) => 
                            <option key={index}>{country}</option>
                        )
                    }
                </select>
                <div className="terms">
                    <input type="checkbox" name="terms_and_conditions"></input>
                    <label htmlFor="terms_and_conditions">Agree with terms and condiitions</label>
                </div>
                <button className="submit-btn">Submit</button>
            </form>
        </>
    )
}

export default UncontrolledForm;