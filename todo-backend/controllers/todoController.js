import Todo from "../models/Todo.js"; 

// create a new todo
export const postTodo = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Please provide title and description" });
    }

    let newTodo = await Todo.create({
      title,
      description,
    });

    res.status(201).json(newTodo); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all todos
export const getTodos = async (req, res) => {
  try {
    let todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  };

  // get a single todo by id

  export const getTodoById = async (req, res) => {
    const { id } = req.params;

    try {
      let todo = await Todo.findById(id);
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.status(200).json(todo);
    }catch (error)
      {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
      };

      // update a todo  by id

      export const putTodo = async (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;

        try {
           let updatedTodo =  await Todo.findByIdAndUpdate(
                id,
                {title, description},
                {new: true}
            )
            res.status(201).send("updated successfully")
        } catch (error) {
            console.log(error);
            
        }
      
      }

      // delete a todo by id

      export const deleteTodo = async (req, res) => {
        const { id } = req.params;

        try {
            await Todo.findByIdAndDelete(id);
            res.status(200).json({ message: "Todo deleted successfully" });
        } catch (error) {
            console.log(error);
            
        }

      }
