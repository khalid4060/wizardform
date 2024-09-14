import React, { useState, useRef, useEffect } from 'react';
import { useDraggable } from '@dnd-kit/core';
import deleteIcon from '../../assets/icons/Delete.svg';

const DragItem = ({ item, onDeleteItem, onEditItem }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const inputRef = useRef(null);

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    onDeleteItem(item.id);
  };

  const handleSaveEdit = () => {
    onEditItem(item.id, newName);
    setIsEditing(false);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      handleSaveEdit();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {isEditing ? (
        <div className="input-container" ref={inputRef}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="delete-image-container" onClick={handleDelete}>
            <img className="delete-image" src={deleteIcon} alt="delete" />
          </div>
        </div>
      ) : (
        <div className="drag-item" onClick={handleEdit}>
          {item.name}
          {/* <div className="delete-image-container" onClick={handleDelete}>
            <img className="delete-image" src={deleteIcon} alt="delete" />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default DragItem;
