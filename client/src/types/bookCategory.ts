export interface BookCategoryTypes {

    _id: string,
    name: string,
    description: string,
    status: boolean,
    __v: number

}

export interface BookCategoryErrors {
    type: string,
    value?: string,
    msg: string,
    path: string,
    location: string
}

export interface BookCategoryInitialStateType {
    isBookCategoryLoading: boolean
    isLoading: boolean
    bookCategoryData: BookCategoryTypes[]
    validationErrors: BookCategoryErrors[]
    deletingBookCategory:boolean
}