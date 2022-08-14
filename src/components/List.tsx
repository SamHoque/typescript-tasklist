import React, {useEffect} from "react";
import {useMutation} from "@apollo/client";
import {GET_LISTS, DELETE_LIST, getRefresher, ADD_TASK} from "../queries";
import Tasks from "../models/Tasks";
import TaskList from "./TaskList";

export default function List(props: { id: number, title: string, items: Tasks[] }) {
    const [addTask, setAddTask] = React.useState(false);
    const [addList, {data: addData}] = useMutation(ADD_TASK, getRefresher(GET_LISTS));
    const [deleteList, {data: deleteData}] = useMutation(DELETE_LIST, getRefresher(GET_LISTS));

    async function toggleAdd() {
        const input = document.getElementById(`${props.id}_enter_title`);
        const newState = !addTask;

        if (input) {
            //Make the display a block, so we can focus on it
            input.style.display = newState ? "block" : "none";
            if (newState) input.focus();
        }

        setAddTask(newState);
    }

    useEffect(() => {
        if (addData) {
            (document.getElementById(`${props.id}_enter_title`) as HTMLInputElement).value = "";
            setAddTask(false);
        }
    }, [addData, props.id, deleteData])


    return (
        <div className="list">

            <h3 className="list-title">{props.title}
                <button className="btn" onClick={async () => {
                    await deleteList({variables: {id: props.id}})
                }}>❌
                </button>
            </h3>

            <TaskList tasks={props.items} id={props.id}/>

            <ul className="list-items">
                <input className="new-card" style={{display: addTask ? "flex" : "none"}} type="text"
                       id={`${props.id}_enter_title`}
                       placeholder="Enter a title for this card..."/>
            </ul>

            <button className="add-card-btn btn" onClick={toggleAdd}
                    style={{display: addTask ? "none" : "block"}}>➕ Add
                a card
            </button>

            <div className="row p-4" style={{display: addTask ? "flex" : "none"}}>
                <button className="btn btn-primary m-1" onClick={async () => {
                    const input = document.getElementById(`${props.id}_enter_title`) as HTMLInputElement;
                    await addList({
                        variables: {
                            title: input.value,
                            listId: props.id
                        }
                    })
                }}>Add a card
                </button>
                <button className="btn m-1" onClick={toggleAdd}>❌</button>
            </div>
        </div>
    );
}