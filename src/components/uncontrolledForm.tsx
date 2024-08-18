import React, { useRef, useState } from "react";
import './forms.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import * as yup from "yup";
import Person, { Gender } from "./model/Person";
import { convertToBase64 } from "./model/convertImageBase64";
import { setData } from "./redux/formSlice";
import { countries } from "../info/countries";
import { useNavigate } from "react-router-dom";

const UncontrolledForm: React.FC = () => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        name: yup.string().required("Name can't be empty").matches(/^[A-Z][a-zA-Z]*$/, "Name must start with a capital letter"),
        age: yup.number().required("Age is required").min(0, "Age must be positive").max(120, "Age must be less than 120"),
        email: yup.string().email("Invalid email").required("Email is required"),
        password: yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, "Password must contain at least 1 number, 1 upper letter, 1 lower letter and 1 special char"),
        repeatPassword: yup.string()
            .oneOf([yup.ref('password'), ""], "Passwords must match")
            .required("Repeat password is required"),
        gender: yup.string().required("Gender is required"),
        img: yup.mixed().required("Image is required"),
        country: yup.string().required("Country is required"),
        terms: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
    });

    const countriesList = useSelector((state: RootState) => state.countries.countries);
    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const repeatPasswordRef = useRef<HTMLInputElement>(null);
    const genderFemaleRef = useRef<HTMLInputElement>(null);
    const genderMaleRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLSelectElement>(null);
    const termsRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const file = fileRef.current?.files?.[0];
        let url = "";

        if(file) {
            const isValidSize = file.size <= 2 * 1024 * 1024;
            const isValidExtension = file.type === "image/jpeg" || file.type === "image/png";
            if (!isValidSize) {
                alert("File size should be less than 2MB");
                return;
            }

            if (!isValidExtension) {
                alert("Only JPEG and PNG files are allowed");
                return;
            }

            try {
                const base64String = await convertToBase64(file);
                url = base64String;
                
            } catch (error) {
                console.error("Error converting file to base64: ", error);
            }
        }

        const formData: Person = {
            name: nameRef.current?.value || "",
            age: parseInt(ageRef.current?.value || "") || 0,
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || "",
            repeatPassword: repeatPasswordRef.current?.value || "",
            gender: genderFemaleRef.current?.checked ? Gender.Female : (genderMaleRef.current?.checked ? Gender.Male : Gender.Female),
            img: url,
            country: countryRef.current?.value || countries[0],
            terms: termsRef.current?.checked || false,
        };

        try {
            await schema.validate(formData, { abortEarly: false });
            setErrors({});
            dispatch(setData(formData));
            navigate("/");

        } catch (err: any) {
            const validationErrors: { [key: string]: string } = {};
            err.inner.forEach((error: yup.ValidationError) => {
                validationErrors[error.path as string] = error.message;
            });
            setErrors(validationErrors);
        }
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={nameRef} />
                <div className="error-container">
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <label htmlFor="age">Age</label>
                <input type="number" id="age" ref={ageRef} />
                <div className="error-container">
                    {errors.age && <p className="error">{errors.age}</p>}
                </div>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={emailRef} />
                <div className="error-container">
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={passwordRef} />
                <div className="error-container">
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <label htmlFor="repeatPassword">Repeat Password</label>
                <input type="password" id="repeat-password" ref={repeatPasswordRef} />
                <div className="error-container">
                    {errors.repeatPassword && <p className="error">{errors.repeatPassword}</p>}
                </div>

                <label>Gender</label>
                <span>
                    <input type="radio" id="female" value="Female" name="gender" ref={genderFemaleRef} />
                    <label htmlFor="female">Female</label>

                    <input type="radio" id="male" value="Male" name="gender" ref={genderMaleRef} />
                    <label htmlFor="male">Male</label>
                </span>
                <div className="error-container">
                    {errors.gender && <p className="error">{errors.gender}</p>}
                </div>

                <label htmlFor="img">Upload Image</label>
                <input type="file" id="img" ref={fileRef} />
                <div className="error-container">
                    {errors.img && <p className="error">{errors.img}</p>}
                </div>

                <label htmlFor="country">Country</label>
                <select className="countries-list" ref={countryRef}>
                    <option value="">Select your country</option>
                    {countriesList.map((country: string, index: number) => (
                        <option key={index} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
                <div className="error-container">
                    {errors.country && <p className="error">{errors.country}</p>}
                </div>

                <div className="terms">
                    <input type="checkbox" id="terms" ref={termsRef} />
                    <label htmlFor="terms">I agree with the terms and conditions</label>
                </div>
                <div className="error-container">
                    {errors.terms && <p className="error">{errors.terms}</p>}
                </div>

                <button className="submit-btn" type="submit">Submit</button>
            </form>
        </>
    );
};

export default UncontrolledForm;
