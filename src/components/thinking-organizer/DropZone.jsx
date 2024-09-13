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
        {items.length === 0 && (
          <p className="drop-here-style">
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_10264_26251)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 0H0V2H2V0ZM2 4H0V6H2V4ZM0 8H2V10H0V8ZM2 12H0V14H2V12ZM0 16H2V18H0V16ZM5 16H4V18H5V18.5C5 20.1569 6.34315 21.5 8 21.5H14V19.5H8C7.44772 19.5 7 19.0523 7 18.5V8C7 7.44772 7.44772 7 8 7H18.5C19.0523 7 19.5 7.44772 19.5 8V10.8696L21.5 12.6087V8C21.5 6.34315 20.1569 5 18.5 5H18V4H16V5H8C6.34315 5 5 6.34315 5 8V16ZM4 0H6V2H4V0ZM10 0H8V2H10V0ZM12 0H14V2H12V0ZM18 0H16V2H18V0ZM17.5134 12.3092C17.2872 12.0305 16.8973 11.9266 16.5535 12.0536C16.1965 12.193 15.974 12.5371 16.0024 12.9056V21.4258C15.999 21.7122 16.146 21.9811 16.3935 22.1415C16.5443 22.2275 16.7158 22.2745 16.8913 22.2779C17.0085 22.3018 17.1296 22.3018 17.2468 22.2779L19.5577 21.2725L20.4999 23.4536C20.6386 23.7776 20.9701 23.9871 21.3354 23.9819C21.4465 24.006 21.5619 24.006 21.6731 23.9819C21.8924 23.8989 22.0673 23.7343 22.1578 23.5255C22.2482 23.3168 22.2465 23.0818 22.1531 22.8743L21.1576 20.5738L23.4685 19.6196C23.7391 19.5048 23.9324 19.2684 23.984 18.9891C24.0402 18.7148 23.9463 18.432 23.7352 18.2393L17.5134 12.3092Z"
                    fill="#485465"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10264_26251">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
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
