import React from "react";
import "./Dashboard.css"
import List from "./List";
import {useMutation, useQuery} from "@apollo/client";
import {ADD_LIST, GET_LISTS, getRefresher} from "../queries";
import CardFooter from "./CardFooter";
import Tasks from "../models/Tasks";

type Lists = {
    id: number;
    title: string;
    order: number;
    getTasks: Tasks[];
}

export default function Dashboard() {
    const {loading, data} = useQuery(GET_LISTS, {
        pollInterval: 500
    });
    const [addListVisible, setAddListVisible] = React.useState(false);
    const [addList] = useMutation(ADD_LIST, getRefresher(GET_LISTS));

    return (
        <section className="py-5 lists-container">
            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>) : data.lists.map((list: Lists) => (
                <List key={list.id} id={list.id} title={list.title} items={list.getTasks}/>
            ))}

            <div>
                <input type="text" className="add-list-btn btn btn-primary" placeholder="Add a list..." id="add_list" onClick={() => {
                    setAddListVisible(true);
                }}/>
                <CardFooter name="add_list" visible={addListVisible} toggleVisibility={setAddListVisible} onAdd={async (value: String) => {
                    await addList({variables: {title: value}})
                }}/>
            </div>
        </section>
    );
}