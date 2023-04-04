import {useEffect, useState} from "react";
import {GetAllTodos} from "../Service/todoService";

const ListTodo = () => {
    const [todo, setTodo] = useState([])
    const [newTodo, setNewTodo] = useState([]);
    /*get Data*/
    const getTodo = async () => {
        try {
            const {data, status} = await GetAllTodos()
            setTodo(data.todos)
            setNewTodo(data.todos.map((item) => ({
                ...item, active: false
            })));
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getTodo()
    }, [])
    /* check active checkBox*/
    const checked = (id) => {
        const clonedData = [...newTodo];
        setNewTodo(
            clonedData.map((i) => (i.id === id ? {...i, active: !i.active} : i))
        )

    };
    /*  log item Checked and not checked */

    const submit = () => {
        let chechked = newTodo.filter(i => i.active === true).map(i => i)
        let Notchechked = newTodo.filter(i => i.active === false).map(i => i)
        console.log("chacked", chechked)
        console.log("notChecked", Notchechked)
    }
    if (todo.length > 0) {
        return (
            <div className="bg-black  ">

                <div className="   ">
                    <div className="w-75  mx-auto">

                        <button
                            className="border-0 btn-success btn non-hover my-2"
                            onClick={submit}
                        >
                            submit
                        </button>
                    </div>

                    <div>
                        {todo.map((item, index) => (
                            <div key={index} className="rtl text-center  w-75 mx-auto my-2 bg-dark text-light p-2 rounded">
                                <div className="  auction-item-2 text-center  ">
                                    <div className="auction-content">
                                        <div className=" row bid-area">


                                            <div className="col-lg-11">
                                                <div className="row">
                                                      <span className=" col-lg-3 m-auto p-2 ">

                                                          <b>user Id</b> {" "} : {" "}
                                                          {item.userId}
                          </span>
                                                    <span className="col-lg-9 m-auto p-2">
                            <b>todo </b>:{" "}
                                                        {item.todo}
                          </span>


                                                </div>

                                            </div>

                                            <span className="col-lg-1 text-center  m-auto button-auction">

                            <input
                                id={`custom-checkbox-${index}`}
                                checked={item.active}
                                type="checkbox"
                                required
                                value={item}
                                name={item}
                                onClick={(event) => checked(item.id)}
                            />

                      </span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <br/>
                        <br/>

                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="bg-black w-100 h-100 position-fixed">

                <div className="text-center m-5 text-light p-5 bg-dark rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24">
                        <path
                            d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z"/>
                    </svg>
                    <div>No information to display</div>
                </div>
            </div>
        );
    }
}
export default ListTodo