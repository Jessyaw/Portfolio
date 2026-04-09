import { useContext } from "react";
import { SearchContext } from "./SearchContext";

const WithSearch = (Component) => {
    const ComponentWithSearch = (props) => {
        const search = useContext(SearchContext);
        return (
            <Component
                {...props}
                search={search}
            />
        )
    }
    return ComponentWithSearch;
}

export default WithSearch;