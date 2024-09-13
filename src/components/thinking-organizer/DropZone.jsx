import React from 'react';
import { useDrop } from 'react-dnd';
import deleteIcon from '../../assets/icons/Delete.svg';

const DropZone = ({ title, onDrop, items, onDelete, style }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="drop-zone-container">
      <div className="drop-here-container" style={style}>
        <h3>{title}</h3>
      </div>
      <div
        className="drop-zone"
        ref={drop}
        style={{ borderColor: isOver ? 'green' : '#ccc' }}
      >
        {items.length === 0 && <p className="drop-here-style">Drop Here</p>}
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
