
export interface Settings{
    currency: "USD" | "EUR"
    language: "EN" | "RU" | "UA"
}

export interface CartItem{
    productId: string
    count: number
}

interface FavoriteItem{
    productId: string
}
export interface User{
    _id: string
    username: string
    email: string
    avatar: string
    cart: CartItem[]
    favorite: FavoriteItem[]
}

export interface Product {
    _id: string
    name: string
    price: number
    discount: number
    availability: 'In stock' | 'Out of stock'
    category: string
    characteristics: object
    description: string[]
    tags: string[]
    images: string[]
    rating: number
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