import React, { useEffect, useState, useRef } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import DragItem from './DragItem';
import DropZone from './DropZone';
import '../../styles/scss/components/thinking-organizer/thinking-organizer.scss';
import addCardIcon from '../../assets/icons/add-card.svg';
import saveCardIcon from '../../assets/icons/Save.svg';

const ThinkingOrganizer = ({ templateData, setThinkingOrganizerTitle }) => {
  const { thinking_organizer: thinkingOrganizer } = templateData;
  const [dataSets, setDataSets] = useState([]);
  const [optionsData, setOptionsData] = useState({
    items: [],
    column1: [],
    column2: [],
  });
  const [newItemName, setNewItemName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const inputRef = useRef(null);

  const [dragTitle, column1Title, column2Title] = dataSets[0]?.itemTitles || [];

  useEffect(() => {
    const initializeData = () => {
      if (!thinkingOrganizer?.alphanumericalid) return;
      const { items, options_label, options } =
        thinkingOrganizer.alphanumericalid;

      const extractData = (fileKey, componentId) =>
        templateData[fileKey]?.[componentId]?.data || '';

      const title = extractData(
        options_label.filename[0],
        options_label.component_id
      );
      const itemTitles = extractData(
        items[0]?.title.filename[0],
        items[0]?.title.component_id
      )
        .split('<br>')
        .map((title) => title.trim());
      const itemOptions = extractData(
        options[0]?.content.filename[0],
        options[0]?.content.component_id
      )
        .split('<br>')
        .map((option) => option.trim());

      setThinkingOrganizerTitle(title);

      const initialItems = itemOptions.map((title, index) => ({
        id: index + 1,
        name: title,
        editable: false,
      }));

      setOptionsData((prev) => ({ ...prev, items: initialItems }));
      setDataSets([{ itemTitles, itemOptions }]);
    };

    initializeData();
  }, [thinkingOrganizer]);

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    const newItem = { id: optionsData.items.length + 1, name: newItemName };
    setOptionsData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
    setNewItemName('');
    setIsAdding(false);
  };

  const handleToggleAdd = () => {
    setIsAdding(!isAdding);
    if (isAdding) {
      setNewItemName('');
    }
  };

  const handleDrop = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const sourceId = active.id;
    const destinationId = over.id;

    const sourceColumn = optionsData.items.find((item) => item.id === sourceId)
      ? 'items'
      : optionsData.column1.find((item) => item.id === sourceId)
      ? 'column1'
      : 'column2';

    const destinationColumn =
      destinationId === column1Title ? 'column1' : 'column2';

    setOptionsData((prev) => {
      const draggedItem = prev[sourceColumn].find(
        (item) => item.id === sourceId
      );
      return {
        ...prev,
        [sourceColumn]: prev[sourceColumn].filter(
          (item) => item.id !== sourceId
        ),
        [destinationColumn]: [...prev[destinationColumn], draggedItem],
      };
    });
  };

  const handleDeleteItem = (id) => {
    setOptionsData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
      column1: prev.column1.filter((item) => item.id !== id),
      column2: prev.column2.filter((item) => item.id !== id),
    }));
  };

  const handleEditItem = (id, newName) => {
    setOptionsData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      ),
    }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDrop}
    >
      <div className="app-container">
        <div className="drag-area">
          <h3>{dragTitle}</h3>

          {optionsData.items.map((item) => (
            <DragItem
              key={item.id}
              item={item}
              onDeleteItem={handleDeleteItem}
              onEditItem={handleEditItem}
            />
          ))}

          <div className={isAdding ? 'input-container' : 'add-input-container'}>
            {isAdding && (
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Type card name..."
                ref={inputRef}
              />
            )}
            <div
              className="save-btn"
              onClick={isAdding ? handleAddItem : handleToggleAdd}
            >
              <img
                src={isAdding ? saveCardIcon : addCardIcon}
                alt="add-save-card"
              />
            </div>
          </div>
        </div>

        <DropZone
          title={column1Title}
          items={optionsData.column1}
          onDelete={handleDeleteItem}
          style={{ backgroundColor: '#e5f8f0', border: '2px solid #5dd3a0' }}
        />
        <DropZone
          title={column2Title}
          items={optionsData.column2}
          onDelete={handleDeleteItem}
          style={{ backgroundColor: '#fff5e5', border: '2px solid #ffc563' }}
        />
      </div>
    </DndContext>
  );
};

export default ThinkingOrganizer;
