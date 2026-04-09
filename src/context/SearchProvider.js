import React, { useState } from "react";
import { SearchContext } from "./SearchContext";

export const SearchProvider = ({ children }) => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <SearchContext.Provider value={{
            searchValue,
            setSearchValue
        }}>
            {children}
        </SearchContext.Provider>
    );
};