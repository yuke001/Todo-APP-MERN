import React, { useState, useEffect } from 'react';

const Todo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(-1);

    // edit

    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const APIURL = import.meta.env.VITE_API_URL;

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
                    res.json().then(() => {
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
            }).catch(() => {
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

    // edit

    const handleEdit = (item) => {

        setEditId(item._id);
        setEditTitle(item.title);
        setEditDescription(item.description)

    }

    // update
    const handleUpdate = () => {
        setError("");
        console.log("Button Clicked handle update");

        if (editTitle.trim() !== '' && editDescription.trim() !== '') {
            fetch(APIURL + "/todos/" + editId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: editTitle, description: editDescription })
            })
                .then((res) => {
                    if (res.ok) {
                        res.json().then((data) => {
                            // Update the todos state correctly
                            const updatedTodos = todos.map((item) =>
                                item._id === editId ? { ...item, title: editTitle, description: editDescription } : item
                            );

                            setTodos(updatedTodos);
                            setMessage("Todo item updated successfully");

                            // Clear edit state
                            setEditId(-1);
                            setEditTitle("");
                            setEditDescription("");

                            setTimeout(() => {
                                setMessage("");
                            }, 3000);
                        });
                    } else {
                        setError("Unable to update Todo item");
                    }
                })
                .catch(() => {
                    setError("Error occurred while updating Todo item");
                });
        } else {
            setError("Title and description cannot be empty");
        }
    };


    //handleEditCancel

    const handleEditCancel = () => {
        setEditId(-1);
    }

    // delete function 

    const handleDelete = (_id) => {
        if (window.confirm('Are you sure to delete this item?')) {
            fetch(APIURL + "/todos/" + _id, {
                method: "DELETE"
            }).then((res) => {
                if (res.ok) {
                    res.json().then(() => {
                        setTodos(todos.filter((item) => item._id !== _id));
                        setMessage("Todo item deleted successfully");
                        setTimeout(() => {
                            setMessage("");
                        }, 3000);
                    });
                } else {
                    setError("Unable to delete Todo item");
                }
            }).catch(() => {
                setError("Error occurred while deleting Todo item");
                console.log("Error occurred while deleting Todo item");
            });
        }
    }





    return (
        <div className='container p-4'>

            <div className="row p-4 bg-dark text-light shadow-lg">
                <h1 className="h3 text-center fw-bold">TODO Project with MERN</h1>
            </div>


            <div className="row p-4 bg-light shadow rounded">
                <h3 className="text-primary fw-bold">Add Items</h3>

                {message && <p className="text-success fw-semibold">{message}</p>}

                <div className="form-group d-flex gap-3 align-items-center">
                    <input
                        className="form-control border-primary shadow-sm"
                        type="text"
                        value={title}
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className="form-control border-primary shadow-sm"
                        type="text"
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className="btn btn-primary px-4 fw-bold shadow-sm" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>

                {error && <p className="text-danger fw-semibold mt-2">{error}</p>}
            </div>







            <div className='row mt-3'>
                <h3>Taks</h3>
                <ul className='list-group'>

                    {
                        todos.map((item) =>

                            <li className='list-group-item bg-info d-flex justify-content-between align-items-center my-2'>
                                {/* <li key={item._id} className='list-group-item bg-info d-flex justify-content-between align-items-center my-2'> */}

                                <div className='d-flex flex-column me-2'>
                                    {
                                        editId == -1 || editId !== item._id ? <>
                                            <span className='fw-bold'>{item.title}</span>
                                            <span>{item.description}</span>
                                        </> : <>
                                            <div className='form-group d-flex gap-2'>
                                                <input className='form-control' type="text" value={editTitle} placeholder='Title' onChange={(e) => setEditTitle(e.target.value)} />
                                                <input className='form-control' type="text" value={editDescription} placeholder='Description' onChange={(e) => setEditDescription(e.target.value)} />
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className='d-flex gap-2'>

                                    {editId == -1 || editId !== item._id ? <button className='btn btn-warning' onClick={() => handleEdit(item)}>Edit</button> : <button onClick={handleUpdate}>Update</button>}

                                    {editId == -1 ? <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button> :
                                        <button className='btn btn-danger' onClick={handleEditCancel}>Cancel</button>}
                                </div>
                            </li>
                        )
                    }





                </ul>

            </div>

        </div>
    );
};

export default Todo;
