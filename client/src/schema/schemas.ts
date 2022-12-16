import * as yup from "yup"

export const loginSchema = yup.object({
    email: yup.string().email({message: "Input is not email"}).required("Email field are required."),
    password: yup.string().required("Password field are required.")
}).required()

export const registerSchema = yup.object({
    name: yup.string().min(6).max(24).required("Name field are required."),
    email: yup.string().email({message: "Input is not email"}).required("Email field are required."),
    password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: "Password must consider 8 charachters, at least 1 upper case letter, 1 lower case letter, 1 digit, 1 special character."}).required("Password field are required."),
    repassword: yup.string().oneOf([yup.ref('password')], {message: 'Passwords does not matches'}).required('Confirm your password')
}).required()
