import React, { useRef, useEffect } from 'react';  
import DragItem from './DragItem';  
import DropZone from './DropZone'; 

const DragAndDrop = ({   
  items,   
  saveEditedItem,   
  deleteItem,   
  newItemName,   
  handleInputChange,   
  isAddingCard,   
  setIsAddingCard,   
  editItem,   
  addItem,   
  droppedItemsColumn1,   
  droppedItemsColumn2,   
  handleDrop,   
  deleteDroppedItem   
}) => {  
  const inputRef = useRef(null);   

  const handleClickOutside = (event) => {  
    if (inputRef.current && !inputRef.current.contains(event.target)) {  
      setIsAddingCard(false);  
    }  
  };  

  useEffect(() => {  
    document.addEventListener('mousedown', handleClickOutside);  
    return () => {  
      document.removeEventListener('mousedown', handleClickOutside);  
    };  
  }, []);  

  return (  
    <>  
      <div className="drag-area">  
        <div className="drag-area-container">  
          <h3>Drag the examples to each step.</h3>  
        </div>  

        {items.map((item) => (  
          <DragItem  
            key={item.id}  
            item={item}  
            onUpdateItem={saveEditedItem}  
            onDeleteItem={deleteItem}  
          />  
        ))}  

        {isAddingCard && (  
          <div className="input-container" ref={inputRef}>   
            <input  
              type="text"  
              value={newItemName}  
              onChange={handleInputChange}  
              placeholder="Type card name..."  
            />  
            <button  
              className="save-btn"  
              onClick={editItem ? saveEditedItem : addItem}  
            >  
              Save  
            </button>  
          </div>  
        )}  

        {/* Add Card Button */}  
        <div className="add-card-container">  
          <button  
            className="add-card-btn"  
            onClick={() => setIsAddingCard(true)}  
          >  
            <span className="circle">+</span> Add Card  
          </button>  
        </div>  
      </div>  

      <DropZone  
        title="Is this column 1 question?"  
        onDrop={(item) => handleDrop(item, 1)}  
        items={droppedItemsColumn1}  
        onDelete={(id) => deleteDroppedItem(id, 1)}  
        style={{  
          backgroundColor: "#e5f8f0",  
          border: "2px solid #5dd3a0",  
        }}  
      />  

      <DropZone  
        title="Is this column 2 question?"  
        onDrop={(item) => handleDrop(item, 2)}  
        items={droppedItemsColumn2}  
        onDelete={(id) => deleteDroppedItem(id, 2)}  
        style={{  
          backgroundColor: "#fff5e5",  
          border: "2px solid #ffc563",  
        }}  
      />  
    </>  
  );  
};  

export default DragAndDrop;