import React from 'react'

const ListGroup = (props) => {
    const { items, textProperty,selectedItem, valueProperty, onItemSelect } = props;
    return (
      <ul className="list-group" style={{ cursor: "pointer" }}>
        {items.map((item) => (
          <li onClick={() => onItemSelect(item)} key={item[valueProperty]} className={item === selectedItem ? "list-group-item active" : "list-group-item"}>
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
}
 
export default ListGroup;