import {gql, QueryOptions} from "@apollo/client";

const GET_LISTS = gql`
    query {
        lists {
            id
            title,
            order,
            getTasks {
                id,
                title,
                order,
                status
            }
        }
    }
`;

const ADD_LIST = gql`
    mutation AddList($title: String!) {
        createList(title: $title) {
            id,
            title,
            order
        }
    }
`

const DELETE_LIST = gql`
    mutation DeleteList($id: Float!) {
        deleteList(id: $id)
    }
`

const DELETE_TASK = gql`
    mutation DeleteTask($id: Float!) {
        deleteTask(id: $id)
    }
`

const getRefresher = (QUERY: any,) => {
    return {
        refetchQueries: [
            {query: QUERY} as QueryOptions<{ foo: string }>
        ]
    };
}

const ADD_TASK = gql`
    mutation AddTask($title: String!, $listId: Float!) {
        createTask(title: $title, listId: $listId) {
            id,
            title,
            order,
            status
        }
    }
`

const UPDATE_TASK_ORDER = gql`
    mutation UpdateTask($id: Float!, $order: Float!) {
        updateTask(id: $id, order: $order) {
            id,
            title,
            order,
            status
        }
    }
`

const UPDATE_TASK_STATUS = gql`
    mutation UpdateTask($id: Float!, $status: Float!) {
        updateTask(id: $id, status: $status) {
            id,
            title,
            order,
            status
        }
    }
`

export {
    GET_LISTS,
    ADD_LIST,
    DELETE_LIST,
    ADD_TASK,
    DELETE_TASK,
    UPDATE_TASK_ORDER,
    UPDATE_TASK_STATUS,
    getRefresher,
};