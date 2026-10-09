import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const FinesComponent = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-webtheme-light">
                    Fines
                </h1>

                <p className=" text-sm text-gray-500">
                    Track overdue charges and payment status.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Total Fine */}
                <div className="rounded-lg border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-webtheme-light">
                        Total Fines
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-gray-900">
                        ₹0
                    </h2>
                </div>

                {/* Unpaid */}
                <div className="rounded-lg border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-webtheme-light">
                        Unpaid Fines
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-red-600">
                        ₹0
                    </h2>
                </div>

                {/* Paid */}
                <div className="rounded-lg border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-webtheme-light">
                        Paid Fines
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-green-600">
                        ₹0
                    </h2>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <input
                    type="text"
                    placeholder="Search borrower or book..."
                    className="w-full rounded-md border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 sm:w-80"
                />

                <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Fines Table */}
            <div className="overflow-x-auto rounded-lg border bg-white">
                <table className="w-full min-w-225 text-left text-sm">
                    <thead className="border-b bg-gray-50">
                        <tr>
                            <th className="px-5 py-4 font-semibold text-webtheme-light">
                                SN.
                            </th>

                            <th className="px-5 py-4 font-semibold text-webtheme-light">
                                Borrower
                            </th>

                            <th className="px-5 py-4 font-semibold text-webtheme-light">
                                Book
                            </th>

                            <th className="px-5 py-4 font-semibold text-webtheme-light">
                                Due Date
                            </th>

                            <th className="px-5 py-4 font-semibold text-webtheme-light">
                                Return Date
                            </th>

                            <th className="px-5 py-4 font-semibold text-webtheme-light">
                                Fine
                            </th>

                            <th className="px-5 py-4 font-semibold text-webtheme-light">
                                Status
                            </th>

                            <th className="px-5 py-4 text-center font-semibold text-webtheme-light">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Empty State */}
                        <tr>
                            <td
                                colSpan={8}
                                className="h-64 px-5 py-10 text-center"
                            >
                                <div className="flex flex-col items-center justify-center">
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                                        <span className="text-2xl">₹</span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-900">
                                        No fines found
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        There are no outstanding or recorded fines
                                        at the moment.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FinesComponent;