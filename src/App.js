import React, {useState} from "react";
import TextField from '@mui/material/TextField';
// import logo from './logo.svg';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



const bookObject = {
  bookName: "",
  authorName: "",
  borrowedBy: ""
}

function App() {
  const [modal, setmodal] = useState(bookObject);
  const [bookList, setbookList] = useState([]);
  const [edit, setedit] = useState=(false);


  const changeHandler = (e) => {
    const value = e.target.value
    setmodal(modal =>({
      ...modal,
      [e.target.name]: value
    }))
  }

  const AddBook= () =>{
    if(edit){
      const updateBookList = bookList.map((row) => row.id === modal.id ? modal: row);
      setbookList(updateBookList);
      setedit(false);
      setmodal(bookObject);
    }
    else{
    let listItems = bookList;
    const item = {
        id: bookList.length,
        ...modal
    }
    listItems= [...bookList, item]
    setbookList(listItems);
    ClearData()
    }
  }

  const ClearData= () =>{
    setmodal(bookObject);
  }

  const deleteRow = (id) => {
    const filtered = bookList.filter(item => item.id != id)
    setbookList(filtered);
  }
  
  const editRow = (data) => {
    setmodal(data);
    setedit(true);
  }

  return (
    <div className="App">
      <Box sx={{ m: 2, p: 2, border: "1px solid grey"}}>
      <TextField label="Book Name" name= "bookName" variant= "outlined" onChange= {changeHandler} FullWidth sx = {{ mr: 2, mb: 2}} value= {modal.bookName}/>
      <TextField label="Book Author" name= "bookAuthor" variant= "outlined" onChange= {changeHandler} FullWidth sx = {{ mr: 2, mb: 2}} value = {modal.authorName}/>
      <TextField label="Borrowed By" name= "studentName" variant= "outlined" onChange= {changeHandler} FullWidth sx = {{ mr: 2, mb: 2}} value = {modal.borrowedBy}/>
      </Box>
      
      <Box textAlign = "center">
        <Button variant= "contained" color= "sucess" onClick={AddBook}>
         { edit ? "Update" : "Submit" }
        </Button>

        <Button variant= "contained" sx= {{ ml: 3}} onClick={ClearData} >
          Clear
        </Button>
      </Box>


      <Box sx={{ m: 2, p: 2, border: "1px solid grey"}}>
        <table style= {{width: "100%"}}>
          <tr style={{ background: "grey"}}>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Borrowed By</th>
            <th>Date</th>
          </tr>
            {bookList && bookList.map((row, index) =>
            <tr>
              <td>{row.bookName}</td>
              <td>{row.authorName}</td>
              <td>{row.borrowedBy}</td>
              <td> <EditIcon style={{ color: "green", cursor: "pointer"}} onClick={()=>editRow(row)} /> <DeleteForeverIcon style = {{ color: "red", cursor: "pointer"}} onClick={()=>deleteRow(row.id)} /> </td>
            </tr>
            )}

        </table>
      </Box>

    </div>
  );
}

export default App;
