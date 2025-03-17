import React, { useEffect, useState } from 'react'
import { getClothes } from '../backendApi/api';
import { Link } from 'react-router-dom';
import "./Allitems.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Allitems = () => {
    const [allitems, setAllitems] = useState([]);
    const [forLoader, setForLoader] = useState(false);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);

    const fetchAll = async () => {
        try {
            const response = await getClothes();
            setTimeout(() => {
                setAllitems(response);
                setFilteredItems(response);
                setForLoader(true);
            }, 1000);
        } catch (error) {
            console.error("Error in Allitems(page)...")
        }
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory((prev) => {
            let updatedCategories;
            if (prev.includes(category)) {
                updatedCategories = prev.filter((c) => c !== category);
            } else {
                updatedCategories = [...prev, category];
            }
            return updatedCategories;
        })
    }

    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategory((prev) => {
            let updatedSubCategory;
            if(prev.includes(subCategory)) {
                updatedSubCategory = prev.filter((c) => c !== subCategory)
            } else {
                updatedSubCategory = [...prev, subCategory];
            }
            return updatedSubCategory;
        })
    }

    useEffect(() => {
        if (selectedCategory.length === 0 && selectedSubCategory.length === 0) {
            setFilteredItems(allitems);
        } else if(selectedCategory.length > 0 && selectedSubCategory.length > 0) {
            setFilteredItems(allitems.filter((item) => selectedCategory.includes(item.category) && selectedSubCategory.includes(item.subCategory)));
        } else if(selectedCategory.length > 0) {
            setFilteredItems(allitems.filter((item) => selectedCategory.includes(item.category) ));
        } else if(selectedSubCategory.length > 0) {
            setFilteredItems(allitems.filter((item) => selectedSubCategory.includes(item.subCategory)));
        }
    }, [selectedCategory, selectedSubCategory, allitems])

    useEffect(() => {
        fetchAll();
    }, [])

    return (
        <div>
            {forLoader ? (
                <div className='flex md:flex-row flex-col allItems gap-10 md:p-12 mt-[70px]'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-2xl'>FILTERS</p>
                        <div className='border-[2px] border-[solid] border-[gray] md:px-3 md:py-3 md:pr-25 px-3 py-3 pr-55'>
                            <p className='font-semibold'>CATEGORIES</p>
                            {["Men", "Women", "Kids"].map((category) => (
                                <div className='flex gap-2' key={category}>
                                    <input 
                                    type="checkbox" 
                                    checked={selectedCategory.includes(category)}
                                    onChange={() => {handleCategoryChange(category)}}
                                    />
                                    <p>{category}</p>
                                </div>
                            ))}
                        </div>

                        <div className='border-[2px] border-[solid] border-[gray] px-3 py-3 pr-25'>
                            <p className='font-semibold'>TYPE</p>
                            {["Topwear", "Bottomwear", "Winterwear"].map((subCategory) => (
                                <div className='flex gap-2'>
                                <input 
                                type="checkbox" 
                                checked={selectedSubCategory.includes(subCategory)}
                                onChange={() => {handleSubCategoryChange(subCategory)}}
                                />
                                <p>{subCategory}</p>
                            </div>
                            ))}
                        </div>
                    </div>

                    <div className='allCollection flex flex-col mb-30'>
                        <div className='headerAll'>
                            <div className='text-center text-3xl flex items-center'><span className='latest'>ALL</span> COLLECTIONS <div className='spanLine2 ml-1'></div></div>
                        </div>
                        <div className='itemsHere flex flex-wrap gap-10'>
                            {filteredItems.length > 0 ? (
                                filteredItems.map((dress) => (
                                    <div className='dress1 lg:h-[320px] lg:w-[250px] mt-7 animateAppear' key={dress._id}>
                                        <Link to={`/item/${dress._id}`}>
                                            <div className='cloth'>
                                                <img src={dress.image} className='image'></img>
                                            </div>
                                        </Link>
                                        <p className='md:text-sm text-xs'>{dress.name}</p>
                                        <p className='font-bold'>${dress.price}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xl font-semibold mt-5">No item found.</p>
                            )}
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center mt-[70px]">
                    <div className="flex items-center gap-2">
                        {/* First dot */}
                        <div className="w-4 h-4 bg-black rounded-full animate-[bounce_1s_infinite_0ms]" />

                        {/* Second dot */}
                        <div className="w-4 h-4 bg-black rounded-full animate-[bounce_1s_infinite_200ms]" />

                        {/* Third dot */}
                        <div className="w-4 h-4 bg-black rounded-full animate-[bounce_1s_infinite_400ms]" />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Allitems