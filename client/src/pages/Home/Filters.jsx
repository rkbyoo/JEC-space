import React from 'react'

const categories = [
    {
        name: "Electronics",
        value: "electronics",
    },
    {
        name: "Home",
        value: "home"
    },
    {
        name: "Fashion",
        value: "fashion",
    },
    {
        name: "Sports",
        value: "sports",
    },
    {
        name: "Books",
        value: "books",
    },
];

const ages = [
    {
        name: "0-2 months old",
        value: "0-2",
    },
    {
        name: "3-5 months old",
        value: "3-5",
    },
    {
        name: "6-8 months old",
        value: "6-8",
    },
    {
        name: "9-12 months old",
        value: "9-12",
    },
    {
        name: "13+ months old",
        value: "12-20",
    },

];



function Filters({
    filters,
    showFilters,
    setShowFilters,
    setFilters,
}) {
    return (
        <div className='w-72 sticky top-24 h-fit'>
            <div className="flex justify-between">
                <h1 className="text-xl">
                    Filter
                </h1>
                <i className="text-xl ri-close-line cursor-pointer"
                    onClick={() => setShowFilters(!showFilters)}
                ></i>
            </div>

            <div className='flex flex-col gap-1 mt-5'>
                <h1 className='text-white-600'>
                    Categories
                </h1>
                <div className="flex flex-col gap-1">
                    {categories.map((category,index) => {

                        return (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="category"
                                    checked={filters.category.includes(category.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFilters({
                                                ...filters,
                                                category: [...filters.category, category.value],
                                            });
                                        } else {
                                            setFilters({
                                                ...filters,
                                                category: filters.category.filter((item) => item !== category.value),
                                            });
                                        }
                                    }}
                                />
                                <label htmlFor='category'>{category.name}</label>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='flex flex-col gap-1 mt-5'>
                <h1 className='text-white-600'>
                    Ages
                </h1>
                <div className="flex flex-col gap-1">
                    {ages.map((age,index) => {

                        return (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="category"
                                    checked={filters.age.includes(age.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFilters({
                                                ...filters,
                                                age: [...filters.age, age.value],
                                            });
                                        } else {
                                            setFilters({
                                                ...filters,
                                                age: filters.age.filter((item) => item !== age.value),
                                            });
                                        }
                                    }}
                                />
                                <label htmlFor='age'>{age.name}</label>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    )
}

export default Filters
