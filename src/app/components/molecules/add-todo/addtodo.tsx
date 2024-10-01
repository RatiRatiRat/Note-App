"use client";
import { useState } from "react";
import Note from "../../templates/todo/note";

type NoteData = {
  id: number;
  color: string; //ფერები ნოუთებისთის
};

const AddTodo = () => {
  const [notes, setNotes] = useState<NoteData[]>([]); 
  const [showColors, setShowColors] = useState(false); 

  
  const addNewNote = (color: string) => {
    setNotes([...notes, { id: Date.now(), color }]);
    setShowColors(false); //ფერების არჩევანი ქრება 1 კონკრეტული ფერის არჩევის შემდეგ
  };

 
  const toggleColorButtons = () => {
    setShowColors(!showColors);
  };

  return (
    <>
      <div className="flex items-center bg-white justify-end h-[80px]">
        <button className="bg-emerald-800 text-white justify-start h-[50px] rounded-md w-[150px]">
          Download All Tasks
        </button>
        <button
          className="w-[50px] h-[50px] rounded-[40px] bg-slate-700 text-white justify-end text-[27px] ml-[30px]"
          onClick={toggleColorButtons} //+ კლიკის შემდეგ გამოდის ნოუთის 5 ფერიანი არჩევანი
        >
          +
        </button>
      </div>

      {showColors && (
        <div className="flex justify-center mt-4 space-x-4 ">
          <button
            className="w-[70px] h-[70px] rounded-full bg-blue-500"
            onClick={() => addNewNote("bg-blue-500")} 
          />
          <button
            className="w-[70px] h-[70px] rounded-full bg-green-500"
            onClick={() => addNewNote("bg-green-500")} 
          />
          <button
            className="w-[70px] h-[70px] rounded-full bg-yellow-500"
            onClick={() => addNewNote("bg-yellow-500")} 
          />
          <button
            className="w-[70px] h-[70px] rounded-full bg-purple-500"
            onClick={() => addNewNote("bg-purple-500")} 
          />
          <button
            className="w-[70px] h-[70px] rounded-full bg-red-500"
            onClick={() => addNewNote("bg-red-500")} 
          />
        </div>
      )}

      
      <div className="mt-4">
        {notes.map((note) => (
          <Note key={note.id} color={note.color} /> 
        ))}
      </div>
    </>
  );
};

export default AddTodo;
