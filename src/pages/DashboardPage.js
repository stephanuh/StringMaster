import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useChords } from '../context/ChordContext';
import GuitarChordCreator from '../components/chords/GuitarChordCreator';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const { chords } = useChords();

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {currentUser.username}!
        </h1>
        <p className="text-gray-600 text-lg">
          You have {chords.length} saved chord{chords.length !== 1 ? 's' : ''} in your library
        </p>
      </div>
      
      <GuitarChordCreator />
    </div>
  );
};

export default DashboardPage;