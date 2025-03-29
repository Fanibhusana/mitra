import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState({ zip: "", city: "", state: "", country: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchParams);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h2 className="text-3xl font-bold text-gradient mb-4">Search Charities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    name="zip"
                    placeholder="Zip"
                    value={searchParams.zip}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={searchParams.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={searchParams.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={searchParams.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <button type="submit" className="px-6 py-3 rounded-full text-white text-lg font-semibold shadow-lg transition-all bg-button">
                Search
            </button>
        </form>
    );
};

export default SearchForm;