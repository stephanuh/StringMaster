import React from 'react';
import ChordItem from './ChordItem';

const ChordList = ({ chords, onEdit, onDelete, strings, frets }) => {
  return (
    <div className="bg-white shadow-md rounded p-6">
      <h3 className="text-xl font-bold mb-4">Your Saved Chords ({chords.length})</h3>
      
      {chords.length === 0 ? (
        <p className="text-gray-500">
          No chords saved yet. Create your first chord to see it here!
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {chords.map(chord => (
            <ChordItem
              key={chord.id}
              chord={chord}
              onEdit={() => onEdit(chord)}
              onDelete={() => onDelete(chord.id)}
              strings={strings}
              frets={frets}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChordList;