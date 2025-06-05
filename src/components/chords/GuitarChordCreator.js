import React, { useState } from 'react';
import { useChords } from '../../context/ChordContext';
import ChordList from './ChordList';

const GuitarChordCreator = () => {
  const { chords, saveChord, deleteChord } = useChords();
  const [currentChord, setCurrentChord] = useState({
    name: '',
    notes: Array(6).fill().map(() => Array(5).fill(false)),
    openStrings: Array(6).fill(true)
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [showEditor, setShowEditor] = useState(true);
  
  const strings = ['E', 'A', 'D', 'G', 'B', 'e'];
  const frets = [0, 1, 2, 3, 4];
  
  // Handle edit chord
  const handleEditChord = (chord) => {
    setCurrentChord({
      ...chord,
      notes: JSON.parse(JSON.stringify(chord.notes)),
    });
    setEditingId(chord.id);
    setShowEditor(true);
  };
  
  const toggleNote = (stringIndex, fretIndex) => {
    const newNotes = currentChord.notes.map((stringNotes, sIndex) => {
      if (sIndex === stringIndex) {
        const newStringNotes = [...stringNotes];

        if (newStringNotes[fretIndex]) {
          newStringNotes[fretIndex] = false;
        } else {
          newStringNotes.fill(false);
          newStringNotes[fretIndex] = true;
        }
        
        return newStringNotes;
      }
      return stringNotes;
    });
    
    setCurrentChord({
      ...currentChord,
      notes: newNotes
    });
  };
  
  const toggleOpenString = (index) => {
    const newOpenStrings = [...currentChord.openStrings];
    newOpenStrings[index] = !newOpenStrings[index];
    setCurrentChord({
      ...currentChord,
      openStrings: newOpenStrings
    });
  };
  
  // Handle save chord
  const handleSaveChord = () => {
    // Validate chord name
    if (!currentChord.name.trim()) {
      setError('Please enter a chord name');
      return;
    }
    
    // Check if any notes are selected or open strings are active
    const hasNotes = currentChord.notes.some((string, index) => 
      string.some(fret => fret) || currentChord.openStrings[index]
    );
    
    if (!hasNotes) {
      setError('Please select at least one note on the fretboard');
      return;
    }
    
    setError('');
    
    try {
      // If editing, keep the same ID
      const chordToSave = editingId 
        ? { ...currentChord, id: editingId }
        : { ...currentChord };
      
      saveChord(chordToSave);
      
      // Reset form
      setCurrentChord({
        name: '',
        notes: Array(6).fill().map(() => Array(5).fill(false)),
        openStrings: Array(6).fill(true)
      });
      setEditingId(null);
    } catch (err) {
      setError('Failed to save chord');
    }
  };
  
  // Handle cancel edit
  const handleCancelEdit = () => {
    setCurrentChord({
      name: '',
      notes: Array(6).fill().map(() => Array(5).fill(false)),
      openStrings: Array(6).fill(true)
    });
    setEditingId(null);
    setError('');
  };
  
  // Handle delete chord
  const handleDeleteChord = (id) => {
    if (window.confirm('Are you sure you want to delete this chord?')) {
      deleteChord(id);
      
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };
  
  // Toggle between editor and list on mobile
  const toggleView = () => {
    setShowEditor(!showEditor);
  };
  
  return (
    <div className="flex flex-col mx-auto max-w-6xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Guitar Chord Creator</h2>
      
      {/* Mobile View Switcher */}
      <div className="md:hidden mb-4">
        <button 
          onClick={toggleView}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {showEditor ? 'View Saved Chords' : 'Create New Chord'}
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Chord Editor */}
        <div className={`w-full md:w-1/2 ${showEditor ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-4">
              {editingId ? 'Edit Chord' : 'Create New Chord'}
            </h3>
            
            {/* Chord Name Input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="chordName">
                Chord Name
              </label>
              <input
                type="text"
                id="chordName"
                value={currentChord.name}
                onChange={(e) => setCurrentChord({...currentChord, name: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="e.g. C Major, Am7"
              />
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="mb-4 text-red-500">
                {error}
              </div>
            )}
            
            {/* Fretboard */}
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Fretboard
              </label>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded p-4">
                {/* Fret Numbers */}
                <div className="flex border-b border-gray-300 pb-2">
                  <div className="w-10"></div>
                  {frets.map((fret, index) => (
                    <div key={index} className="flex-1 text-center font-semibold">
                      {fret}
                    </div>
                  ))}
                </div>
                
                {/* Strings */}
                {strings.map((string, stringIndex) => (
                  <div key={stringIndex} className="flex items-center py-2 border-b border-gray-200">
                    {/* String Label / Open String Toggle */}
                    <div className="w-10 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => toggleOpenString(stringIndex)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center 
                          ${currentChord.openStrings[stringIndex] 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-300 text-gray-700'}`}
                      >
                        {string}
                      </button>
                    </div>
                    
                    {/* Frets */}
                    {frets.map((fret, fretIndex) => (
                      <div 
                        key={fretIndex} 
                        className="flex-1 flex items-center justify-center h-12 border-r border-gray-300 fretboard-cell"
                      >
                        <button
                          type="button"
                          onClick={() => toggleNote(stringIndex, fretIndex)}
                          className={`note-marker ${
                            currentChord.notes[stringIndex][fretIndex]
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-transparent hover:bg-gray-300'
                          }`}
                        >
                          •
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSaveChord}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {editingId ? 'Update Chord' : 'Save Chord'}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Chord List */}
        <div className={`w-full md:w-1/2 ${!showEditor ? 'block' : 'hidden md:block'}`}>
          <ChordList 
            chords={chords} 
            onEdit={handleEditChord}
            onDelete={handleDeleteChord}
            strings={strings}
            frets={frets}
          />
        </div>
      </div>
    </div>
  );
};

export default GuitarChordCreator;