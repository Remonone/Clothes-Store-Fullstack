import * as yup from "yup"

export const loginSchema = yup.object({
    email: yup.string().email({message: "Input is not email"}).required("Email field are required."),
    password: yup.string().required("Password field are required.")
}).required()

// .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: "Password must consider 8 charachters, at least 1 upper case letter, 1 lower case letter, 1 digit, 1 special character."})