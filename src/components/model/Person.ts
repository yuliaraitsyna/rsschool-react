export enum Gender {
    Female = "Female",
    Male = "Male"
}

type Person = {
    name: string,
    age: number,
    gender: Gender,
    email: string,
    password: string,
    repeatPassword: string,
    img: string,
    country: string,
    terms: boolean
}

export default Person;