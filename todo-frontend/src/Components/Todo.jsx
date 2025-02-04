import React, { useState, useEffect } from 'react';

const Todo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const APIURL = "http://localhost:5000/api";

    const handleSubmit = () => {
        setError("");
        console.log("Button Clicked handle submit");

        if (title.trim() !== '' && description.trim() !== '') {
            fetch(APIURL + "/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description })
            }).then((res) => {
                if (res.ok) {
                    res.json().then((data) => {
                        setTodos(prevTodos => [...prevTodos, { title, description }]);
                        setMessage("Todo item added successfully");
                        setTimeout(() => {
                            setMessage("");
                        }, 3000);
                        setTitle("");  // Clear input fields
                        setDescription("");  // Clear input fields
                    });
                } else {
                    setError("Unable to create Todo item");
                }
            }).catch((err) => {
                setError("Error occurred while adding Todo item");
            });
        } else {
            setError("Title and description cannot be empty");
        }
    };


    useEffect(() => {
        getItems();
    }, []);

    // get items

    const getItems = () => {

        fetch(APIURL + "/todos")
            .then((res) => res.json())
            .then((res) => {
                setTodos(res)
            })
    }



    return (
        <>
            <div className='row p-3 bg-success text-light'>
                <h1 className="h3 text-center">TODO Project with MERN</h1>
            </div>

            <div className='row'>
                <h3>Add Items</h3>
                {message && <p className='text-success'>{message}</p>}

                <div className='form-group d-flex gap-2'>
                    <input className='form-control' type="text" value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                    <input className='form-control' type="text" value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                    <button className='btn btn-dark' onClick={handleSubmit}>Submit</button>
                </div>

                {error && <p className='text-danger'>{error}</p>}

            </div>

            <div className='row mt-3'>
                <h3>Taks</h3>

                <ul className='list-group'>

                    {
                        todos.map((item) =>

                            <li className='list-group-item bg-info d-flex justify-content-between align-items-center my-2'>
                                <div className='d-flex flex-column'>
                                    <span className='fw-bold'>{item.title}</span>
                                    <span>{item.description}</span>
                                </div>
                                <div className='d-flex gap-2'>
                                    <button className='btn btn-warning'>Edit</button>
                                    <button className='btn btn-danger'>Delete</button>
                                </div>
                            </li>


                        )
                    }





                </ul>

            </div>

        </>
    );
};

export default Todo;
