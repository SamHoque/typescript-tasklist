import React from "react";

export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-dark">
                <span className="navbar-brand">Task List 📃</span>
                <div className="collapse navbar-collapse" />
                <form className="form-inline my-2 my-lg-0">
                    <span>Coded with ❤ By <a href="https://samhoque.dev">SamHoque</a></span>
                </form>
            </nav>
        );
    }
}