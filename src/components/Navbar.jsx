import { Navbar as HeroUi, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { queryClient } from "../App";

export default function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();
    function logOut() {
        localStorage.removeItem("token");
        queryClient.clear();
        setIsLoggedIn(false);
        navigate("/login");
    }

    return (
        <HeroUi>
            <NavbarBrand>
                <Link to={"/"} className="font-bold text-inherit">
                    FAKHR
                </Link>
            </NavbarBrand>

            <NavbarContent justify="center">
                <NavbarItem>
                    <Link to={"/profile"} className="font-bold text-inherit">
                        Profile
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                {isLoggedIn ? (
                    <NavbarItem>
                        <Button onPress={logOut} color="danger" variant="flat">
                            Sign Out
                        </Button>
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="flex">
                            <Button
                                as={Link}
                                to="/login"
                                color="default"
                                variant="flat"
                            >
                                Login
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button
                                as={Link}
                                to="/signup"
                                color="primary"
                                variant="flat"
                            >
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>
        </HeroUi>
    );
}
