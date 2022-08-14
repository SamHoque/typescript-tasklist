import {ReactSortable} from "react-sortablejs";
import React, {ChangeEvent, useEffect} from "react";
import {useMutation} from "@apollo/client";
import {DELETE_TASK, GET_LISTS, getRefresher, UPDATE_TASK_ORDER, UPDATE_TASK_STATUS} from "../queries";
import Tasks from "../models/Tasks";

export default function TaskList(props: { id: number, tasks: Tasks[] }) {
    const getFixedTasks = (array: Tasks[]) => {
        const fixedArray = [...array.map((x) => ({...x, chosen: true}))];
        fixedArray.sort((a, b) => a.order - b.order)
        return fixedArray;
    }

    const [sortableItems, setSortableItems] = React.useState(getFixedTasks(props.tasks));
    const [updateTaskOrder] = useMutation(UPDATE_TASK_ORDER, getRefresher(GET_LISTS));
    const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS, getRefresher(GET_LISTS));
    const [deleteTask] = useMutation(DELETE_TASK, getRefresher(GET_LISTS));

    const shouldUpdate = React.useRef(false);

    const onCompletedToggled = async (item: Tasks, e: ChangeEvent<HTMLInputElement>) => {
        item.status = e.target.checked ? 1 : 0;
        await updateTaskStatus({variables: {id: item.id, status: item.status}});
    }

    const onDelete = async (item: Tasks) => {
        await deleteTask({variables: {id: item.id}});
    }

    useEffect(() => {
        //Check if a new task has been added or removed, if so update the sortable items
        if (props.tasks.length !== sortableItems.length)
            setSortableItems(getFixedTasks(props.tasks));

        if (shouldUpdate.current) {
            for (let i = 0; i < sortableItems.length; i++) {
                updateTaskOrder({variables: {id: sortableItems[i].id, order: i}});
            }
            shouldUpdate.current = false;
        }
    }, [sortableItems, updateTaskOrder, props.tasks]);

    return (
        <ReactSortable
            group={props.id + "_sortable"}
            className="list-items"
            tag='ul'
            list={sortableItems}
            setList={setSortableItems}
            onEnd={() => {
                shouldUpdate.current = true;
            }}>
            {sortableItems.map((item) => (
                <li key={item.id} className="row justify-content-around">
                    <input type="checkbox" className="custom-control custom-checkbox"
                           onChange={(e) => onCompletedToggled(item, e)} checked={item.status === 1}/>
                    {item.title}
                    <button className="btn" onClick={() => onDelete(item)}>❌</button>
                </li>
            ))}
        </ReactSortable>
    )
}