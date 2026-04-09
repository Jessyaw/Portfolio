import { useContext } from "react";
import { ToastContext } from "./ToastContext";

const WithToaster = (Component) => {
    const ComponentWithToaster = (props) => {
        const toast = useContext(ToastContext);
        return (
            <Component
                {...props}
                toast={toast}
            />
        )
    }
    return ComponentWithToaster;
}

export default WithToaster;