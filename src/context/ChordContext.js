import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const ChordContext = createContext();

export const ChordProvider = ({ children }) => {
  const [chords, setChords] = useState([]);
  const { currentUser } = useAuth();

  // Load chords for current user
  useEffect(() => {
    if (currentUser) {
      const userChords = JSON.parse(localStorage.getItem(`chords_${currentUser.id}`) || '[]');
      setChords(userChords);
    } else {
      setChords([]);
    }
  }, [currentUser]);

  // Save chord
  const saveChord = (chord) => {
    if (!currentUser) return;
    
    let updatedChords;
    
    if (chord.id) {
      updatedChords = chords.map(c => c.id === chord.id ? chord : c);
    } else {
      updatedChords = [...chords, { ...chord, id: Date.now().toString() }];
    }
    
    setChords(updatedChords);
    localStorage.setItem(`chords_${currentUser.id}`, JSON.stringify(updatedChords));
    return updatedChords;
  };

  // Delete chord
  const deleteChord = (chordId) => {
    if (!currentUser) return;
    
    const updatedChords = chords.filter(chord => chord.id !== chordId);
    setChords(updatedChords);
    localStorage.setItem(`chords_${currentUser.id}`, JSON.stringify(updatedChords));
    return updatedChords;
  };

  const value = {
    chords,
    saveChord,
    deleteChord
  };

  return (
    <ChordContext.Provider value={value}>
      {children}
    </ChordContext.Provider>
  );
};

export const useChords = () => useContext(ChordContext);