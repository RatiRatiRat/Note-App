"use client";
import { useState } from "react";
import Note from "../../templates/todo/note";
import { Reorder } from "framer-motion";

type NoteData = {
  id: number;
  color: string;
  tasks: string[];
};

const AddTodo = () => {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [showColors, setShowColors] = useState(false);

  const addNewNote = (color: string) => {
    setNotes([...notes, { id: Date.now(), color, tasks: [] }]);
    setShowColors(false);
  };

  const toggleColorButtons = () => {
    setShowColors(!showColors);
  };

  const updateNoteTasks = (id: number, tasks: string[]) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, tasks } : note))
    );
  };

  const downloadAllTasks = () => {
    const allTasks = notes
      .map((note) => `Note ID: ${note.id}\nTasks:\n${note.tasks.join("\n")}`)
      .join("\n\n");

    const blob = new Blob([allTasks], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "all_tasks.txt";
    link.click();
  };

  return (
    <>
      <div className="flex items-center bg-white justify-end h-[80px]">
        <button
          onClick={downloadAllTasks}
          className="bg-emerald-800 text-white justify-start h-[50px] rounded-md w-[150px]"
        >
          Download All Tasks
        </button>
        <button
          className="w-[50px] h-[50px] rounded-[40px] bg-slate-700 text-white justify-end text-[27px] ml-[30px]"
          onClick={toggleColorButtons}
        >
          +
        </button>
      </div>

      {showColors && (
        <div className="flex justify-center mt-4 space-x-4">
          {["blue", "green", "yellow", "purple", "red"].map((color) => (
            <button
              key={color}
              className={`w-[70px] h-[70px] rounded-full bg-${color}-500`}
              onClick={() => addNewNote(`bg-${color}-500`)}
            />
          ))}
        </div>
      )}

      <Reorder.Group
        axis="y"
        values={notes}
        onReorder={setNotes}
        className="mt-4"
      >
        {notes.map((note) => (
          <Reorder.Item key={note.id} value={note}>
            <Note
              color={note.color}
              onTaskUpdate={(tasks: string[]) =>
                updateNoteTasks(note.id, tasks)
              }
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </>
  );
}; 

export default AddTodo;
