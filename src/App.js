import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';


const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.png',
    left: 0
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: '/images/cato.png',
    left: 0
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: '/images/kvn.png',
    left: 0
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: '/images/mooncake.png',
    left: 0
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: '/images/quinn.png',
    left: 0
  }
]

function App() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  const [texts, setTexts] = useState('');

  const handleSubmit = () =>{
    const obj = {
      id: 'new',
      name: texts,
      thumb: '',
      left: 0
    }
    const items2 = Array.from(characters);
    items2.push(obj)
    updateCharacters(items2);
    setTexts('');
  }

  const handleChange = (event) => {
    setTexts(event.target.value);
  }


  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  const shiftLeft = (index) => {
    const items = Array.from(characters);
    if(items[index].left>= 40)
    {items[index].left -= 40;}
    updateCharacters(items)
  }

  const shiftRight = (index) => {
    const items = Array.from(characters);
    items[index].left += 40;
    updateCharacters(items)
  }

  const deleteStandard = (index) => {
    const items = Array.from(characters);
    items.splice(index,1);
    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Standards</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({id, name, left}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <OpenWithIcon/>
                          <ArrowBackIcon onClick={()=>shiftLeft(index)}/>
                          <ArrowForwardIcon onClick={()=>shiftRight(index)}/>
                          <DeleteIcon onClick={()=>deleteStandard(index)}/>
                          <div className="movable" style={{marginLeft: left}}>
                            <div className="black"></div>
                            <p>
                              { name }
                            </p>
                          </div>
                          
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
                <input
                  id="new-text"
                  onChange={handleChange}
                  value={texts}
                />
                <button onClick={handleSubmit}>Add</button>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;