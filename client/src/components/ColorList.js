import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  /*************************************GET COLOR */
  const upDataColor = () => {
    axiosWithAuth()
    .get('/colors')
    .then(res => updateColors(res.data))
    .catch(err => console.log(err));
  }

  //*******************************************PUT COLOR */
  const saveEdit = e => {
    // console.log(colorToEdit.id)
    e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(upDataColor())
    .then(setEditing(false))
    .catch(err => console.log(err))
  };

  /*************************************DELETE COLOR */
  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(res => {
      updateColors(colors.filter(col => col.id !== color.id))
    })
    .catch(err => console.log(err))
  };

  /********************************************POST COLOR */

  const [colorInfo, setColorInfo] = useState({
    color: '',
    code: '',
    id: Date.now()
  })

  const handleChange = e => {
    setColorInfo({
      ...colorInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e =>{
    e.preventDefault();
    console.log(colorInfo)
    axiosWithAuth()
    .post('/colors', colorInfo)
    .then(upDataColor())
    .catch(err => console.log(err))

    setColorInfo({
      color: '',
      code: ''
    })
  }




  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
        <form onSubmit={handleSubmit}>
              
          <input 
            type='text'
            placeholder='Color Name'
            name='color' 
            onChange={handleChange}
            value={colorInfo.color}
          />
          <input 
            type='text'
            placeholder='Hex code '
            name='code'
            onChange={handleChange}
            value={colorInfo.code}
          />
          
          <button type='submit'>Add Color</button>
        </form>

    </div>
  );
};

export default ColorList;
