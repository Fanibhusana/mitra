import React from "react";

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button mx-2"
            >
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`px-4 py-2 rounded-full text-white text-lg font-semibold shadow-lg transition-all mx-2 ${currentPage === i + 1 ? 'bg-blue-500' : 'bg-button'}`}
                >
                    {i + 1}
                </button>
            ))}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button mx-2"
            >
                Next
            </button>
        </div>
    );
};

export default PaginationControls;