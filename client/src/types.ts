const fruits: Array<string> = ["mango", "apple"]
const grades: Array<number> = [34, 56]


interface Person<T>{
    firstname: string
    lastname: string
    age: T
}

const person1: Person<string> = {
    firstname: "",
    lastname: "",
    age: "34"
}

const person2: Person<number> = {
    firstname: "",
    lastname: "",
    age: 34
}

export {}