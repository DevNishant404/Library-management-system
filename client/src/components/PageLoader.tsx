import React from 'react'

const PageLoader = () => {
    return (
        <div
            className="flex min-h-75 items-center justify-center"
            role="status"
            aria-label="Loading"
        >
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#9F5C23]" />
        </div>
    )
}

export default PageLoader