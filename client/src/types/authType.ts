// register type
export interface RegisterTypes {
    firstName: string,
    middleName: string,
    lastName: string,
    phone: number | null |string,
    email: string,
    password: string,
    role: string
}

// login types
export interface LoginTypes {
    email: string,
    password: string
}

// register validation
export interface ValidationError {
    type: string;
    value?: string | null;
    msg: string;
    path: string;
    location: string;
};


// logged in user data
export interface LoggedInUserType {
    firstName: string,
    lastName:string
    middelName:string
    phone: number,
    email:string,
    role: string
};



export interface RegisterInitialState {
    isLoading: boolean,
    validationErrors: ValidationError[]
    loogedInuserData:LoggedInUserType |null
}