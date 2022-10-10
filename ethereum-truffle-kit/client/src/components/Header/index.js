import "./index.css";
import { useDispatch } from "react-redux";
import { authActions } from "../Auth/auth-slice";

const Header = () => {

    const dispatch = useDispatch();

    const handleLogout = (e) => {
        dispatch(authActions.logout());
    }

    return (
        <header>
            <nav>
                <button
                    onClick = {handleLogout}
                    className="logout-btn"
                    type="submit">
                    Disconnect
                </button>
            </nav>
        </header>
    );
}

export default Header;