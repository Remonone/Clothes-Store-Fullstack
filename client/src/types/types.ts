
export interface Settings{
    currency: "USD" | "EUR"
    language: "EN" | "RU" | "UA"
}

export interface CartItem{
    productId: string
    count: number
}
export interface User{
    _id: string
    username: string
    email: string
    avatar: string
    cart: CartItem[]
}

export interface IRegisterCredentials{
    username: string
    email: string
    password: string
    repassword: string
}

export interface ILoginCredentials {
    email: string
    password: string
}