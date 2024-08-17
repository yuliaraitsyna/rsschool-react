import React, { useState } from "react";
import './forms.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { SubmitHandler, useForm } from "react-hook-form";
import Person from "./model/Person";
import { setData } from "./redux/formSlice";
import { useNavigate } from "react-router-dom";

const ReactHookForm: React.FC = () => {
    const countriesList = useSelector((state: RootState) => state.countries.countries);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState<string>("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        reset,
    } = useForm<Person>({
        mode: "onChange",
    });

    const password = watch('password');

    const handleFormSubmit: SubmitHandler<Person> = (data) => {
        console.log(selectedFile);
        data.img = selectedFile;
        console.log(data);
        dispatch(setData(data));
        reset();
        navigate("/");
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
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
                console.log("Base64 Image: ", base64String);
                setSelectedFile(base64String);
            } catch (error) {
                console.error("Error converting file to base64: ", error);
            }
        } else {
            setSelectedFile("");
        }
    };

    const handlePasswordStrength = (password: string) => {
        const hasNumber = /[0-9]/.test(password);
        const hasUpperLetter = /[A-Z]/.test(password);
        const hasLowerLetter = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return hasNumber && hasUpperLetter && hasLowerLetter && hasSpecialChar
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" {...register('name', { required: true, pattern: /^[A-Z][a-zA-Z]*$/ })} />
                <div className="error-container">
                    {errors.name && <p className="error">Name must start with capital letter</p>}
                </div>

                <label htmlFor="age">Age</label>
                <input type="number" id="age" {...register('age', { required: true, min: 0, max: 120 })} />
                <div className="error-container">
                    {errors.age && <p className="error">Age is required and must be between 0 and 120.</p>}
                </div>

                <label htmlFor="email">Email</label>
                <input type="email" id="email" {...register('email', { required: true })} />
                <div className="error-container">
                    {errors.email && <p className="error">Valid email is required.</p>}
                </div>

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    {...register('password', {
                        required: true,
                        pattern: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/
                    })}
                />
                <div className="error-container">
                    {errors.password && <p className="error">Password must contain at least 1 number, 1 upper letter, 1 lower letter and 1 special char</p>}
                </div>

                <label htmlFor="repeatPassword">Repeat Password</label>
                <input
                    type="password"
                    id="repeat-password"
                    {...register('repeatPassword', {
                        required: true,
                        validate: (value) => value === password || 'Passwords do not match',
                    })}
                />
                <div className="error-container">
                    {errors.repeatPassword && <p className="error">{errors.repeatPassword.message}</p>}
                </div>

                <label>Gender</label>
                <span>
                    <input type="radio" id="female" value="Female" {...register('gender', { required: true })} />
                    <label htmlFor="female">Female</label>
                    
                    <input type="radio" id="male" value="Male" {...register('gender', { required: true })} />
                    <label htmlFor="male">Male</label>
                </span>
                <div className="error-container">
                    {errors.gender && <p className="error">Gender is required.</p>}
                </div>

                <label htmlFor="img">Upload Image</label>
                <input type="file" id="img" {...register('img', { required: true })} onChange={handleFileChange}/>
                <div className="error-container">
                    {errors.img &&  <p className="error">Please upload an image.</p>}
                </div>

                <label htmlFor="country">Country</label>
                <select className="countries-list" {...register('country', { required: true })}>
                    <option value="">Select your country</option>
                    {countriesList.map((country: string, index: number) => (
                        <option key={index} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
                <div className="error-container">
                    {errors.country && <p className="error">Country is required.</p>}
                </div>

                <div className="terms">
                    <input type="checkbox" id="terms" {...register('terms', { required: true })} />
                    <label htmlFor="terms">I agree with the terms and conditions</label>
                </div>
                <div className="error-container">
                    {errors.terms && <p className="error">You must agree to the terms and conditions.</p>}
                </div>

                <button disabled={!isValid} className="submit-btn" type="submit">Submit</button>
            </form>
        </>
    );
};

export default ReactHookForm;
