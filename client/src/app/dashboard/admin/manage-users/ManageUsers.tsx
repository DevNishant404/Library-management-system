"use client";

import { AppDispatch, RootState } from "@/src/redux/store";
import { addUser, deleteUser, getUsers } from "@/src/redux/userReducer/userSlice";

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
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Buttonloader from "@/src/components/Buttonloader";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import DeleteButtonLoader from "@/src/components/DeleteButtonloader";

const ManageUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false)
  const [selectedUser,setSelectedUser]=useState<null|string>()

  const { allUsers, validationErrors, userAdding, userDeleting } = useSelector(
    (state: RootState) => state.user
  );

  console.log("validationErrors")
  console.log(validationErrors)

  const [openDialog, setOpenDialog] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    role: "user",
    password: "",
  });

  console.log("allUsers");
  console.log(allUsers);

  // ------------------------------------------
  // Get Users
  // ------------------------------------------

  useEffect(() => {
    dispatch(getUsers())
      .unwrap()
      .then((res) => {
        console.log("users list res");
        console.log(res);
      })
      .catch((er) => {
        console.log("users list error");
        console.log(er);
      });
  }, [dispatch]);

  // ------------------------------------------
  // Input Change
  // ------------------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------------------------------------------
  // Submit
  // ------------------------------------------

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();



    const payload = {
      firstName: userData.firstName.trim(),
      middleName: userData.middleName.trim(),
      lastName: userData.lastName.trim(),
      phone: userData.phone.trim() === ""
        ? ""
        : Number(userData.phone.trim()),
      email: userData.email.trim(),
      role: userData.role,
      password: userData.password,
    };



    dispatch(addUser(payload)).unwrap().then((res) => {
      console.log("user res")
      console.log(res)
      toast.success(res.data.message)
      setOpenDialog(false)
      dispatch(getUsers())
    }).catch((er) => {
      console.log("add user error")
      console.log(er)
      toast.error(er.error.message)
    })
  };

  const getFieldError = (field: string) => {
    return validationErrors?.find((error) => error.path === field)?.msg;
  };


  function handleDeleteUser() {

     dispatch(deleteUser(selectedUser)).unwrap().then((res)=>{
      console.log("user deletion res")
      console.log(res)
      toast.success(res.data.message)
      setOpenDeleteDialog(false)
      dispatch(getUsers())
     }).catch((er)=>{
      console.log("user deletion errr")
      console.log(er)
      toast.error(er.error.message)
     })
  }

  return (
    <div className="space-y-6">

      {/* ------------------------------------------ */}
      {/* Header */}
      {/* ------------------------------------------ */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-webtheme-dark">
            Manage Users
          </h1>

          <p className="text-sm text-gray-500">
            Manage all registered users and their roles.
          </p>
        </div>

        <Button
          onClick={() => setOpenDialog(true)}
          className="bg-webtheme-light text-white"
        >
          Add New User
        </Button>
      </div>

      {/* ------------------------------------------ */}
      {/* Users Table */}
      {/* ------------------------------------------ */}

      <div className="overflow-hidden rounded-xl border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-left">

            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-5 py-2 text-webtheme-light text-sm font-semibold">
                  Name
                </th>

                <th className="px-5 py-2 text-webtheme-light text-sm font-semibold">
                  Email
                </th>

                <th className="px-5 py-2 text-webtheme-light text-sm font-semibold">
                  Phone
                </th>

                <th className="px-5 py-2 text-webtheme-light text-sm font-semibold">
                  DOB
                </th>

                <th className="px-5 py-2 text-webtheme-light text-sm font-semibold">
                  Qualification
                </th>

                <th className="px-5 py-2 text-webtheme-light text-sm font-semibold">
                  Role
                </th>

                <th className="px-5 py-2 text-webtheme-light text-sm font-semibold">
                  Joined
                </th>

                <th className="px-5 py-2 text-webtheme-light text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {allUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-10 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                allUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    {/* Name */}

                    <td className="px-5 py-1.5 font-medium">
                      {user.firstName}
                    </td>

                    {/* Email */}

                    <td className="px-5 py-1.5 text-sm text-gray-600 ">
                      {user.email}
                    </td>

                    {/* Phone */}

                    <td className="px-5 py-1.5 text-sm">
                      {user.phone}
                    </td>

                    {/* DOB */}

                    <td className="px-5 py-1.5 text-sm">
                      {user.dob || "-"}
                    </td>

                    {/* Qualification */}

                    <td className="px-5 py-1.5 text-sm">
                      {user.qualification || "-"}
                    </td>

                    {/* Role */}

                    <td className="px-5 py-1.5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : user.role === "librarian"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Created */}

                    <td className="px-5 py-1.5 text-sm text-gray-600">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </td>

                    {/* Actions */}

                    <td className="px-5 flex gap-2 items-center py-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        className={"cursor-pointer"}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() =>{setOpenDeleteDialog(true);setSelectedUser(user?._id)} }
                        variant="outline"
                        size="sm"
                        className={"cursor-pointer bg-red-50 border-red-400"}
                      >
                        <Trash2 className="text-red-600"></Trash2>
                      </Button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
          <Dialog
            open={openDeleteDialog}
            onOpenChange={setOpenDeleteDialog}
          >
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Delete User</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this user? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className={"cursor-pointer"}
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
              {
                userDeleting?<DeleteButtonLoader></DeleteButtonLoader>:(
                    <Button
                  className={"cursor-pointer"}
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteUser}
                >
                  Confirm Delete
                </Button>
                )
              }
              
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* ------------------------------------------ */}
      {/* Add User Dialog */}
      {/* ------------------------------------------ */}

      <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        <DialogContent className="sm:max-w-lg">

          <DialogHeader>
            <DialogTitle>
              Add New User
            </DialogTitle>

            <DialogDescription>
              Create a new user account.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* First Name */}

            {/* First Name */}
            <div className="space-y-0.5">
              <Label htmlFor="firstName">
                First Name
              </Label>

              <Input
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
              />
              {getFieldError("firstName") && (
                <p className=" text-xs text-red-500">
                  {getFieldError("firstName")}
                </p>
              )}
            </div>

            {/* Middle Name */}
            <div className="space-y-0.5">
              <Label htmlFor="middleName">
                Middle Name
              </Label>

              <Input
                id="middleName"
                name="middleName"
                value={userData.middleName}
                onChange={handleChange}
                placeholder="Enter middle name"
              />
              {getFieldError("middleName") && (
                <p className=" text-xs text-red-500">
                  {getFieldError("middleName")}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-0.5">
              <Label htmlFor="lastName">
                Last Name
              </Label>

              <Input
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
              />
              {getFieldError("lastName") && (
                <p className=" text-xs text-red-500">
                  {getFieldError("lastName")}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-0.5">
              <Label htmlFor="phone">
                Phone
              </Label>

              <Input
                id="phone"
                name="phone"
                type="tel"
                value={userData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
              {getFieldError("phone") && (
                <p className=" text-xs text-red-500">
                  {getFieldError("phone")}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-0.5">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
              />
              {getFieldError("email") && (
                <p className=" text-xs text-red-500">
                  {getFieldError("email")}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-0.5">
              <Label>Role</Label>

              <Select
                value={userData.role}
                onValueChange={(value: any) => {
                  setUserData((prev) => ({
                    ...prev,
                    role: value,
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="user">
                    User
                  </SelectItem>

                  <SelectItem value="librarian">
                    Librarian
                  </SelectItem>

                  <SelectItem value="admin">
                    Admin
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Password */}
            <div className="space-y-0.5">
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter password"
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
              {
                userAdding ? <Buttonloader></Buttonloader> : (
                  <Button
                    type="submit"
                    className="bg-webtheme-light text-white"
                  >
                    Create User
                  </Button>
                )
              }


            </div>

          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageUsers;