import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import deleteIcon from '../../assets/icons/Delete.svg';
import dragIcon from '../../assets/icons/Union.svg';

const DropZone = ({ title, items, onDelete, style }) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div className="drop-zone-container">
      <div className="drop-here-container" style={style}>
        <h3>{title}</h3>
      </div>
      <div className="drop-zone" ref={setNodeRef}>
        {items.length === 0 && (
          <p className="drop-here-style">
            <span>
              <img src={dragIcon} alt="drag-icon" />
            </span>
            Drop Here
          </p>
        )}
        {items.map((item, index) => (
          <div key={index} className="dropped-item">
            {item.name}
            <div
              className="delete-image-container"
              onClick={() => onDelete(item.id)}
            >
              <img className="delete-image" src={deleteIcon} alt="delete" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropZone;
