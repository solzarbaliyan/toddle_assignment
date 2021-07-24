import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';

const finalStandards = [
  {
    id: '1',
    name: 'Numbers',
    left: 50
  },
  {
    id: '2',
    name: 'Count to determine the number of objects in a set',
    left: 50
  },
  {
    id: '3',
    name: 'Measurement',
    left: 50
  },
  {
    id: '4',
    name: 'Use simple fraction names in real-life situations',
    left: 50
  }
]

function App() {
  const [characters, updateCharacters] = useState(finalStandards);
  const [texts, setTexts] = useState('');

  const handleSubmit = () =>{
    const obj = {
      id: 'new',
      name: texts,
      left: 50
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
    if(items[index].left>= 100)
    {items[index].left -= 50;}
    updateCharacters(items)
  }

  const shiftRight = (index) => {
    const items = Array.from(characters);
    items[index].left += 50;
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
        <h3 className='gray'>Mathematics</h3>
        <div className='line'></div>
        <div className="heading">
          <div className="heading-left">
            <h4>Actions</h4>
            <p>Move, Ident, Outdent, Delete</p>
          </div>
          <div className="heading-right">
            <h4>Standard</h4>
            <p>The text of the standard</p>
          </div>
        </div>
        <div className='line'></div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({id, name, left}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="line"></div>
                          <div className="card">
                            <OpenWithIcon style={{marginRight: '10px', color: 'gray'}}/>
                            <ArrowBackIcon onClick={()=>shiftLeft(index)} style={{marginRight: '10px', color: 'gray', cursor: 'pointer'}}/>
                            <ArrowForwardIcon onClick={()=>shiftRight(index)} style={{marginRight: '10px', color: 'gray', cursor: 'pointer'}}/>
                            <DeleteIcon onClick={()=>deleteStandard(index)} style={{marginRight: '10px', color: 'gray', cursor: 'pointer'}}/>
                            <div className="movable" style={{marginLeft: left}}>
                              <div className="black"></div>
                              <p className = {left===50 ? 'blue' : 'black-font'}>
                                { name }
                              </p>
                            </div>
                          </div>                          
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
                
                <div className="line"></div>
                <div className="new">
                  <input
                    id="new-text"
                    onChange={handleChange}
                    value={texts}
                    placeholder="Type ..."
                    className="new-input"
                  />
                  <button onClick={handleSubmit} className="add-button"><AddCircleOutlineSharpIcon/> <h4>Add a standard</h4></button>
                </div>
                
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;