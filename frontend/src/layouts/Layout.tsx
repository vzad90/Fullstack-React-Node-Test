import Header from "./Header.tsx";
import {Outlet} from "react-router";

export default function Layout() {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
}