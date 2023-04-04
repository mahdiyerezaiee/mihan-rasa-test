import axios from "axios";
/* service Axios */

export const GetAllTodos=()=>{

    return axios.get(`https://dummyjson.com/todos`);

}