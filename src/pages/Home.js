import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Home = () => {
  const [inputData, setInputData] = useState("");

  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [items, setItems] = useState(getLocalItems());
  const [isEditItem, setEditItem] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("Please fill the data");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );

      setToggleSubmit(true);
      setInputData("");
      setEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setEditItem(id);
  };

  const deleteItem = (index) => {
    console.log(index);
    const updateitems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateitems);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <div>
      {/* Home */}
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
          label="Heading"
          variant="outlined"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />

        {toggleSubmit ? (
          <Button variant="contained" color="success" onClick={addItem}>
            add item
          </Button>
        ) : (
          <Button variant="outlined" color="secondary" onClick={addItem}>
            update Item
          </Button>
        )}
      </Box>
      <div>
        <table>
          <tr>
            <th>Heading</th>
            <th>Description</th>
            <th></th>
            <th></th>
          </tr>

          {items.map((elem) => {
            return (
              <tr>
                <td>{elem.name}</td>
                <td>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.{" "}
                </td>
                <td>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => editItem(elem.id)}
                  >
                    edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteItem(elem.id)}
                  >
                    delet
                  </Button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Button variant="outlined" color="error" onClick={removeAll}>
          clear all
        </Button>
      </Box>
    </div>
  );
};

export default Home;
