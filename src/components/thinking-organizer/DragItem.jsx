import React, { useState, useRef, useEffect } from 'react';  
import { useDrag } from 'react-dnd';  

const DragItem = ({ item, onDeleteItem }) => {  
    const [{ isDragging }, drag] = useDrag(() => ({  
        type: 'item',  
        item,  
        collect: (monitor) => ({  
            isDragging: monitor.isDragging(),  
        }),  
    }));  

    const [isEditing, setIsEditing] = useState(false);  
    const inputRef = useRef(null);  

    const handleClick = () => {  
        setIsEditing(true);  
    };  

    const handleDelete = () => {  
        onDeleteItem(item.id);  
    };  

    const handleClickOutside = (event) => {  
        if (inputRef.current && !inputRef.current.contains(event.target)) {  
            setIsEditing(false);  
        }  
    };  

    useEffect(() => {  
        document.addEventListener('mousedown', handleClickOutside);  
        return () => {  
            document.removeEventListener('mousedown', handleClickOutside);  
        };  
    }, []);  

    return (  
        <div  
            ref={drag}  
            style={{  
                opacity: isDragging ? 0.5 : 1,  
            }}  
        >  
            {isEditing ? (  
                <div className="input-container" ref={inputRef}>  
                    <input  
                        type="text"  
                        value={item.name}  
                        disabled  
                    />  
                    <div className='delete-image-container' onClick={handleDelete}>  
                        <img className='delete-image' src={`${process.env.PUBLIC_URL}/delete.png`} alt='delete' />   
                    </div>  
                </div>  
            ) : (  
                <div  
                    className="drag-item"  
                    onClick={handleClick}  
                >  
                    {item.name}  
                </div>  
            )}  
        </div>  
    );  
};  

export default DragItem;