import { ValidationError } from "./authType"

export interface UsersType {
    _id: string,
    firstName: string,
    phone: number,
    email: string,
    dob: string,
    qualification: string,
    role: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}



export interface UsersInititalStateType{
    isLoading:boolean,
    allUsers:UsersType[],
    userAdding:boolean
    userDeleting:boolean
    validationErrors:ValidationError[] |null
}