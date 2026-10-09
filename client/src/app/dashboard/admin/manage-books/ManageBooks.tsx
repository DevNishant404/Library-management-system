"use client";

import BookGrid from "@/src/components/book/BookGrid";
import useBooks from "@/src/hooks/useBooks";
import { AppDispatch, RootState } from "@/src/redux/store";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBookCategories } from "@/src/redux/categoryReducer/categorySlice";
import { UploadBookTypes } from "@/src/types/bookTypes";
import { getAllBooks, uploadBook } from "@/src/redux/bookReducer/bookSlice";
import { toast } from "react-toastify";
import Buttonloader from "@/src/components/Buttonloader";


// ----------------------------------------------------
// Initial Form Data
// ----------------------------------------------------

const uploadBookInitialData: UploadBookTypes = {
    bookName: "",
    description: "",
    authorName: "",
    bookCategory: "",
    coverImage: "",
    isbn: "",
    publisher: "",
    publishedYear: null,
    totalCopies: null,
    availableCopies: null,
    language: "English",
    status: true,
};



const ManageBooks = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [uploadBookData, setUploadBookData] =
        useState<UploadBookTypes>(uploadBookInitialData);

    const [selectedCoverImage, setSelectedCoverImage] =
        useState<File | null>(null);

    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const { bookCategoryData, isBookCategoryLoading } = useSelector(
        (state: RootState) => state.bookCategory
    );
        const { bookUploading,validationErrors } = useSelector(
            
        (state: RootState) => state.book
    );

    console.log("validationErrors")
    console.log(validationErrors)




    const categoryItems = bookCategoryData.map((category) => ({
        label: category.name,
        value: category._id,
    }));

    const { isLoading, bookList, search, setSearch } = useBooks();

    // ----------------------------------------------------
    // ----------------------------------------------------

    useEffect(() => {
        dispatch(getBookCategories())
            .unwrap()
            .then((res) => {
                console.log("book category res");
                console.log(res);
            })
            .catch((er) => {
                console.log("book category error");
                console.log(er);
            });
    }, [dispatch]);

    // ----------------------------------------------------
    // Handle Input Change
    // ----------------------------------------------------

    const handleOnchange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setUploadBookData((prev) => ({
            ...prev,
            [name]:
                name === "publishedYear" ||
                    name === "totalCopies"
                    ? value === ""
                        ? null
                        : Number(value)
                    : value,
        }));
    };

    // ----------------------------------------------------
    // Handle Cover Image
    // ----------------------------------------------------

    const handleCoverImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setSelectedCoverImage(file);
    };

    // ----------------------------------------------------
    // Handle Category
    // ----------------------------------------------------

    const handleCategoryChange = (value: string | null) => {
        setUploadBookData((prev) => ({
            ...prev,
            bookCategory: value ?? "",
        }));
    };

    // ----------------------------------------------------
    // Handle Status
    // ----------------------------------------------------

    const handleStatusChange = (checked: boolean) => {
        setUploadBookData((prev) => ({
            ...prev,
            status: checked,
        }));
    };

    // ----------------------------------------------------
    // Handle Submit
    // ----------------------------------------------------

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        const payload = {
            bookName: uploadBookData.bookName.trim(),

            description: uploadBookData.description.trim(),

            authorName: uploadBookData.authorName.trim(),

            bookCategory: uploadBookData.bookCategory,

            coverImage: selectedCoverImage,

            isbn: uploadBookData.isbn.trim(),

            publisher: uploadBookData.publisher.trim(),

            publishedYear: uploadBookData.publishedYear,

            totalCopies: uploadBookData.totalCopies,

            availableCopies: uploadBookData.totalCopies,

            language: uploadBookData.language.trim() || "English",

            status: uploadBookData.status,
        };

        console.log("BOOK PAYLOAD:", payload);


        dispatch(uploadBook(payload)).unwrap().then((res) => {
            console.log("res")
            console.log(res)
            setUploadBookData(uploadBookInitialData);
        setSelectedCoverImage(null);
        setOpenDialog(false)

        dispatch(getAllBooks())

            toast.success(res.data.message)
        }).catch((er) => {
            console.log("upload book error")
            console.log(er)
            toast.error(er.error.message)
        })
    };


 

            const getFieldError = (field: string) => {
        return validationErrors.find((error:any) => error.path === field)?.msg;
    };

 

    return (
        <div>
            {/* --------------------------------------------- */}
            {/* Search + Add Book */}
            {/* --------------------------------------------- */}

            <div className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search book by name..."
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
                />

                <button
                    onClick={() => setOpenDialog(true)}
                    className="cursor-pointer whitespace-nowrap rounded-md bg-webtheme-light px-3 text-white"
                >
                    Upload a new book
                </button>
            </div>

            {/* --------------------------------------------- */}
            {/* Books */}
            {/* --------------------------------------------- */}

            <BookGrid bookList={bookList} />

            {/* --------------------------------------------- */}
            {/* Add Book Dialog */}
            {/* --------------------------------------------- */}

            <Dialog
                open={openDialog}
                onOpenChange={setOpenDialog}
            >
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add Book</DialogTitle>

                        <DialogDescription>
                            Add a new book to the library collection.
                        </DialogDescription>
                    </DialogHeader>

                    {/* ----------------------------------------- */}
                    {/* Form */}
                    {/* ----------------------------------------- */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* --------------------------------------- */}
                        {/* Book Name */}
                        {/* --------------------------------------- */}

                        <div className="space-y-2">
                            <Label htmlFor="bookName">
                                Book Name
                            </Label>

                            <Input
                                id="bookName"
                                name="bookName"
                                type="text"
                                value={uploadBookData.bookName}
                                onChange={handleOnchange}
                                placeholder="Enter book name"
                            />
                                     {getFieldError("bookName") && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {getFieldError("bookName")}
                                        </p>
                                )}
                        </div>

                        {/* --------------------------------------- */}
                        {/* Description */}
                        {/* --------------------------------------- */}

                        <div className="space-y-2">
                            <Label htmlFor="description">
                                Description
                            </Label>

                            <Textarea
                                id="description"
                                name="description"
                                value={uploadBookData.description}
                                onChange={handleOnchange}
                                placeholder="Enter book description"
                                rows={4}
                            />
                                     {getFieldError("description") && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {getFieldError("description")}
                                        </p>
                                )}
                        </div>

                        {/* --------------------------------------- */}
                        {/* Author + Category */}
                        {/* --------------------------------------- */}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {/* Author */}
                            <div className="space-y-2">
                                <Label htmlFor="authorName">
                                    Author Name
                                </Label>

                                <Input
                                    id="authorName"
                                    name="authorName"
                                    type="text"
                                    value={uploadBookData.authorName}
                                    onChange={handleOnchange}
                                    placeholder="Enter author name"
                                />
                                         {getFieldError("authorName") && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {getFieldError("authorName")}
                                        </p>
                                )}
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <Label htmlFor="bookCategory">
                                    Category
                                </Label>

                                <Select
                                    items={categoryItems}
                                    value={uploadBookData.bookCategory || null}
                                    onValueChange={(value) => {
                                        setUploadBookData((prev) => ({
                                            ...prev,
                                            bookCategory: value ?? "",
                                        }));
                                    }}
                                >
                                    <SelectTrigger
                                        id="bookCategory"
                                        className="w-full"
                                    >
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {categoryItems.map((category) => (
                                            <SelectItem
                                                key={category.value}
                                                value={category.value}
                                            >
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                             
                            </div>
                        </div>

                        {/* --------------------------------------- */}
                        {/* Cover Image */}
                        {/* --------------------------------------- */}

                        <div className="space-y-2">
                            <Label htmlFor="coverImage">
                                Cover Image
                            </Label>

                            <Input
                                id="coverImage"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] ?? null;
                                    setSelectedCoverImage(file);
                                }}
                            />

                            {selectedCoverImage && (
                                <p className="text-sm text-gray-500">
                                    Selected: {selectedCoverImage.name}
                                </p>
                            )}
                        </div>

                        {/* --------------------------------------- */}
                        {/* ISBN + Publisher */}
                        {/* --------------------------------------- */}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {/* ISBN */}
                            <div className="space-y-2">
                                <Label htmlFor="isbn">
                                    ISBN
                                </Label>

                                <Input
                                    id="isbn"
                                    name="isbn"
                                    type="text"
                                    value={uploadBookData.isbn}
                                    onChange={handleOnchange}
                                    placeholder="Enter ISBN"
                                />
                                         {getFieldError("isbn") && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {getFieldError("isbn")}
                                        </p>
                                )}
                            </div>

                            {/* Publisher */}
                            <div className="space-y-2">
                                <Label htmlFor="publisher">
                                    Publisher
                                </Label>

                                <Input
                                    id="publisher"
                                    name="publisher"
                                    type="text"
                                    value={uploadBookData.publisher}
                                    onChange={handleOnchange}
                                    placeholder="Enter publisher"
                                />
                                         {getFieldError("publisher") && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {getFieldError("publisher")}
                                        </p>
                                )}
                            </div>
                        </div>

                        {/* --------------------------------------- */}
                        {/* Published Year + Language */}
                        {/* --------------------------------------- */}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                            {/* Published Year */}
                            <div className="space-y-2">
                                <Label htmlFor="publishedYear">
                                    Published Year
                                </Label>

                                <Input
                                    id="publishedYear"
                                    name="publishedYear"
                                    type="number"
                                    value={
                                        uploadBookData.publishedYear ?? ""
                                    }
                                    onChange={handleOnchange}
                                    placeholder="e.g. 2024"
                                />
                                         {getFieldError("publishedYear") && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {getFieldError("publishedYear")}
                                        </p>
                                )}
                            </div>

                            {/* Language */}
                            <div className="space-y-2">
                                <Label htmlFor="language">
                                    Language
                                </Label>

                                <Input
                                    id="language"
                                    name="language"
                                    type="text"
                                    value={uploadBookData.language}
                                    onChange={handleOnchange}
                                    placeholder="English"
                                />
                                         {getFieldError("language") && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {getFieldError("language")}
                                        </p>
                                )}
                            </div>
                        </div>

                        {/* --------------------------------------- */}
                        {/* Total Copies */}
                        {/* --------------------------------------- */}

                        <div className="space-y-2">
                            <Label htmlFor="totalCopies">
                                Total Copies
                            </Label>

                            <Input
                                id="totalCopies"
                                name="totalCopies"
                                type="number"
                                min={1}
                                value={
                                    uploadBookData.totalCopies ?? ""
                                }
                                onChange={handleOnchange}
                                placeholder="Enter total copies"
                            />
                                     {getFieldError("totalCopies") && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {getFieldError("totalCopies")}
                                        </p>
                                )}

                        
                        </div>

                            <div className="space-y-2">
                            <Label htmlFor="totalCopies">
                                Available Copies
                            </Label>

                            <Input
                                id="totalCopies"
                                name="availableCopies"
                                type="number"
                                min={1}
                                value={
                                    uploadBookData.availableCopies ?? ""
                                }
                                onChange={handleOnchange}
                                placeholder="Enter total copies"
                            />
                                     {getFieldError("availableCopies") && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {getFieldError("availableCopies")}
                                        </p>
                                )}

                        </div>

                        {/* --------------------------------------- */}
                        {/* Status */}
                        {/* --------------------------------------- */}

                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div>
                                <Label htmlFor="status">
                                    Book Status
                                </Label>

                                <p className="text-sm text-muted-foreground">
                                    Make this book available in the library.
                                </p>
                            </div>

                            <Switch
                                id="status"
                                checked={uploadBookData.status}
                                onCheckedChange={handleStatusChange}
                            />
                        </div>

                        {/* --------------------------------------- */}
                        {/* Buttons */}
                        {/* --------------------------------------- */}

                        <div className="flex justify-end gap-3">

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpenDialog(false)}
                            >
                                Cancel
                            </Button>

                            <Button type="submit">
                                {
                                    bookUploading?<Buttonloader></Buttonloader>:"Add Book"
                                }
                                
                            </Button>

                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ManageBooks;