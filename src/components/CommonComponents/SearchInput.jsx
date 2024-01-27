import { IoSearch } from "react-icons/io5";

const SearchInput = ({ setSearchValue}) => {
    const handleKeyDownSearch=(e)=>{
        if (e.key === 'Enter') {
            setSearchValue(e.target.value)
        }
        
    }
    return (
        <div className="relative w-full">
                    <input
                        type="text"
                        id="SearchValue"
                        placeholder="Search..."
                        className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 w-full"
                        onKeyDown={handleKeyDownSearch}

                    />
                    <div onClick={() => setSearchValue(document.getElementById('SearchValue').value)} className="absolute inset-y-0 right-0 flex items-center px-3 rounded-e-md bg-indigo-500 text-white font-bold">
                        <IoSearch />
                    </div>
                </div>
    );
};

export default SearchInput;