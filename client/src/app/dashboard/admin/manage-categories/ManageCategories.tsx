"use client";

import { createBookCategories, deleteBookCategory, getBookCategories } from "@/src/redux/categoryReducer/categorySlice";
import { AppDispatch, RootState } from "@/src/redux/store";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-toastify";
import Buttonloader from "@/src/components/Buttonloader";
import { Trash, Trash2 } from "lucide-react";
import DeleteButtonLoader from "@/src/components/DeleteButtonloader";

const categoryDataInitialState = {
  name: "",
  description: "",
  status: true,
}

const ManageCategories = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { bookCategoryData, validationErrors, isBookCategoryLoading, isLoading, deletingBookCategory } = useSelector(
    (state: RootState) => state.bookCategory
  );



  const [openDialog, setOpenDialog] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);

  const [categoryData, setCategoryData] = useState(categoryDataInitialState);

  useEffect(() => {
    dispatch(getBookCategories())
      .unwrap()
      .then((res) => {
        console.log("res category get");
        console.log(res);
      })
      .catch((er) => {
        console.log("get category error");
        console.log(er);
      });
  }, [dispatch]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    const payload = {
      name: categoryData.name.trim(),

      description: categoryData.description.trim(),

      status: categoryData.status,
    };

    console.log("CREATE CATEGORY PAYLOAD");
    console.log(payload);

    dispatch(createBookCategories(payload)).unwrap().then((res) => {
      console.log("category creation res")
      console.log(res)
      toast.success(res.data.message)
      setOpenDialog(false)
      setCategoryData(categoryDataInitialState)
      dispatch(getBookCategories())
    }).catch((er) => {
      console.log("category createion error")
      console.log(er)

      toast.error(er.error.message)
    })
  };


  function deleteBookCat(categoryId: string) {
    setDeletingCategoryId(categoryId);

    dispatch(deleteBookCategory(categoryId))
      .unwrap()
      .then((res: any) => {
        toast.success(res?.data?.message);
        dispatch(getBookCategories());
      })
      .catch((er) => {
        toast.error(er?.error?.message || "Something went wrong");
      })
      .finally(() => {
        setDeletingCategoryId(null);
      });
  }

  const getFieldError = (field: string) => {
    return validationErrors.find((error) => error.path === field)?.msg;
  };

  return (
    <div className="space-y-6">

      {/* -------------------------------------- */}
      {/* Header */}
      {/* -------------------------------------- */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-webtheme-dark">
            Categories
          </h1>

          <p className="text-sm text-gray-500">
            Manage book categories in your library.
          </p>
        </div>

        <Button
          onClick={() => setOpenDialog(true)}
          className="bg-webtheme-light text-white"
        >
          Create Category
        </Button>
      </div>

      {/* -------------------------------------- */}
      {/* Category Table */}
      {/* -------------------------------------- */}

      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-sm text-webtheme-light font-semibold">
                  Name
                </th>

                <th className="px-3 py-2 text-sm text-webtheme-light font-semibold">
                  Description
                </th>

                <th className="px-3 py-2 text-sm text-webtheme-light font-semibold">
                  Status
                </th>

                <th className="px-3 py-2 text-sm text-webtheme-light font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {isBookCategoryLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-20 text-center text-gray-500"
                  >
                    Loading categories...
                  </td>
                </tr>
              ) : bookCategoryData.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-3 py-20 text-center text-gray-500"
                  >
                    No categories found.
                  </td>
                </tr>
              ) : (
                bookCategoryData.map((category) => (
                  <tr
                    key={category._id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="px-3 py-2 font-medium">
                      {category.name}
                    </td>

                    <td className="px-3 py-2 text-sm text-gray-600">
                      {category.description || "-"}
                    </td>

                    <td className="px-3 py-2">
                      {category.status ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="px-3 py-2">
                      <Button
                        onClick={() => deleteBookCat(category._id)}
                        className="cursor-pointer bg-red-50 border border-red-300"
                        variant="outline"
                        size="sm"
                      >
                        {deletingCategoryId === category._id ? (
                          <DeleteButtonLoader />
                        ) : (
                          <Trash2 className="text-red-500" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------------------------------------- */}
      {/* Create Category Dialog */}
      {/* -------------------------------------- */}

      <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Create Category
            </DialogTitle>

            <DialogDescription>
              Create a new category for your library books.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}

            <div className="space-y-1">
              <Label htmlFor="name">
                Category Name
              </Label>

              <Input
                id="name"
                name="name"
                value={categoryData.name}
                onChange={handleChange}
                placeholder="Enter category name"
              />
              {getFieldError("name") && (
                <p className=" text-xs text-red-500">
                  {getFieldError("name")}
                </p>
              )}
            </div>

            {/* Description */}

            <div className="space-y-1">
              <Label htmlFor="description">
                Description
              </Label>

              <Textarea
                id="description"
                name="description"
                value={categoryData.description}
                onChange={handleChange}
                placeholder="Enter category description"
                rows={4}
              />
              {getFieldError("description") && (
                <p className=" text-xs text-red-500">
                  {getFieldError("description")}
                </p>
              )}
            </div>

            {/* Status */}

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="status">
                  Status
                </Label>

                <p className="text-sm text-gray-500">
                  Make this category active.
                </p>
              </div>

              <Switch
                id="status"
                checked={categoryData.status}
                onCheckedChange={(checked) => {
                  setCategoryData((prev) => ({
                    ...prev,
                    status: checked,
                  }));
                }}
              />
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-webtheme-light text-white"
              >
                {
                  isLoading ? <Buttonloader></Buttonloader> : "Create Category"
                }

              </Button>
            </div>

          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCategories;