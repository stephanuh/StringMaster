import React from 'react';

const ChordItem = ({ chord, onEdit, onDelete, strings, frets }) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
        <h4 className="font-bold text-lg">{chord.name}</h4>
        <div className="flex space-x-2">
        <button
          onClick={onEdit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
        >
          Edit
        </button>
         <button
           onClick={onDelete}
           className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
         >
           Delete
         </button>
       </div>
     </div>
     
     {/* Mini Fretboard Display */}
     <div className="p-4">
       <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
         {/* Fret Numbers */}
         <div className="flex text-xs mb-1">
           <div className="w-6"></div>
           {frets.map((fret, index) => (
             <div key={index} className="w-8 text-center font-medium">
               {fret}
             </div>
           ))}
         </div>
         
         {/* Strings */}
         {strings.map((string, stringIndex) => (
           <div key={stringIndex} className="flex items-center mb-1">
             {/* String Label / Open String */}
             <div className="w-6 flex items-center justify-center">
               <div 
                 className={`w-4 h-4 rounded-full flex items-center justify-center text-xs
                   ${chord.openStrings[stringIndex] 
                     ? 'bg-green-500 text-white' 
                     : 'bg-gray-300 text-gray-700'}`}
               >
                 {string}
               </div>
             </div>
             
             {/* Frets */}
             {frets.map((fret, fretIndex) => (
               <div 
                 key={fretIndex} 
                 className="w-8 h-6 border-r border-b border-gray-300 flex items-center justify-center relative"
               >
                 {/* String line */}
                 <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-400"></div>
                 
                 {/* Note marker */}
                 {chord.notes[stringIndex][fretIndex] && (
                   <div className="w-3 h-3 rounded-full bg-blue-500 relative z-10"></div>
                 )}
               </div>
             ))}
           </div>
         ))}
       </div>
     </div>
   </div>
 );
};

export default ChordItem;