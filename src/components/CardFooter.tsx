import React from "react";

export default function CardFooter(props: {name: string, visible: boolean, toggleVisibility: Function, onAdd: Function}) {
    return (
        <div className="row p-4" style={{display: props.visible ? "flex" : "none"}}>
            <button className="btn btn-primary m-1" onClick={() => {
                const input = document.getElementById(`${props.name}`) as HTMLInputElement;
                props.onAdd(input.value);
                input.value = "";
            }}>Add a card
            </button>
            <button className="btn m-1" onClick={() => props.toggleVisibility()}>❌</button>
        </div>
    )
}