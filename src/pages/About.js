import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

const About = () => {
  const [allTodos, setTodos] = useState([]);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updateTodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setTodos(savedTodo);
    }
  }, []);

  return (
    <div>
      {/* About */}
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: 500, maxWidth: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />

        <Button variant="contained" color="success" onClick={handleAddTodo}>
          add item
        </Button>
      </Box>
      <div>
        {allTodos.map((item, index) => {
          return (
            <Card sx={{ minWidth: 275 }} key={index}>
              <CardContent
                style={{
                  width: "30%",
                  margin: "1rem auto 1rem auto",
                  border: "2px solid black",
                }}
              >
                <Typography variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {item.description}
                </Typography>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default About;
