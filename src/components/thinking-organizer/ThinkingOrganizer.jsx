import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragAndDrop from './DragAndDrop';
import '../../styles/scss/components/thinking-organizer/thinking-organizer.scss';

const sampleData = {
  thinkingOrganizer: {
    allow_download: true,
    allow_add_card: true,
    items: [
      {
        id: 1,
        name: 'Solar Panel Installation',
        editable: false,
      },
      {
        id: 2,
        name: 'Battery Storage Solutions',
        editable: false,
      },
      {
        id: 3,
        name: 'Solar Energy Benefits',
        editable: false,
      },
    ],
    droppedItemsColumn1: [
      {
        id: 4,
        name: 'Government Incentives gg',
        editable: false,
      },
    ],
    droppedItemsColumn2: [
      {
        id: 5,
        name: 'Cost Savings Analysis',
        editable: false,
      },
      {
        id: 6,
        name: 'Environmental Impact',
        editable: false,
      },
    ],
  },
};

const ThinkingOrganizer = ({ templateData, setThinkingOrganizerTitle }) => {
  const { thinking_organizer: thinkingOrganizer } = templateData;
  const [dataSets, setDataSets] = useState([]);
  const [error, setError] = useState(null);

  const [items, setItems] = useState(sampleData.thinkingOrganizer.items);
  const [droppedItemsColumn1, setDroppedItemsColumn1] = useState(
    sampleData.thinkingOrganizer.droppedItemsColumn1
  );
  const [droppedItemsColumn2, setDroppedItemsColumn2] = useState(
    sampleData.thinkingOrganizer.droppedItemsColumn2
  );
  const [newItemName, setNewItemName] = useState('');
  const [editItem, setEditItem] = useState(null);
  const [isAddingCard, setIsAddingCard] = useState(false);

  useEffect(() => {
    const initializeDataSets = () => {
      try {
        if (!thinkingOrganizer.alphanumericalid) return;

        const {
          options_label: optionsLabel,
          items,
          options,
        } = thinkingOrganizer?.alphanumericalid;

        const extractData = (fileKey, componentId) =>
          templateData[fileKey]?.[componentId]?.data || '';

        const obtionTitle = extractData(
          optionsLabel.filename[0],
          optionsLabel.component_id
        );

        const itemTitle = extractData(
          items[0]?.title.filename[0],
          items[0].title.component_id
        )
          ?.split('<br>')
          .map((q) => q.trim());
        setError(null);

        const itmeOptions = extractData(
          options[0].content.filename[0],
          options[0].content.component_id
        )
          ?.split('<br>')
          .map((q) => q.trim());

        const initialData = {
          itemTitle: itemTitle,
          itmeOptions,
        };
        setThinkingOrganizerTitle(obtionTitle);
        setDataSets([initialData]);
        setError(null);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };
    initializeDataSets();
  }, [thinkingOrganizer]);

  const handleInputChange = (e) => {
    setNewItemName(e.target.value);
  };

  const addItem = () => {
    if (newItemName.trim() === '') return;

    const newItem = {
      id: items.length + 1,
      name: newItemName,
    };
    setItems([...items, newItem]);
    setNewItemName('');
    setIsAddingCard(false);
  };

  const handleDrop = (item, column) => {
    setItems((currentItems) => currentItems.filter((i) => i.id !== item.id));
    if (column === 1) {
      setDroppedItemsColumn1((currentItems) => [...currentItems, item]);
    } else {
      setDroppedItemsColumn2((currentItems) => [...currentItems, item]);
    }
  };

  const deleteDroppedItem = (id, column) => {
    if (column === 1) {
      setDroppedItemsColumn1((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    } else {
      setDroppedItemsColumn2((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    }
  };

  const saveEditedItem = (editedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === editedItem.id ? editedItem : item))
    );
    setEditItem(null);
    setNewItemName('');
    setIsAddingCard(false);
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setDroppedItemsColumn1((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
    setDroppedItemsColumn2((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  console.log('dataSets', dataSets);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <div className="content">
          <DragAndDrop
            items={items}
            saveEditedItem={saveEditedItem}
            deleteItem={deleteItem}
            newItemName={newItemName}
            handleInputChange={handleInputChange}
            isAddingCard={isAddingCard}
            setIsAddingCard={setIsAddingCard}
            editItem={editItem}
            addItem={addItem}
            droppedItemsColumn1={droppedItemsColumn1}
            droppedItemsColumn2={droppedItemsColumn2}
            handleDrop={handleDrop}
            deleteDroppedItem={deleteDroppedItem}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default ThinkingOrganizer;
