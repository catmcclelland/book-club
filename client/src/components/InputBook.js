import React, { useState } from "react";
const InputBook = () => {
  const [title, setTitle] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { title };
      const response = fetch("http://localhost:5000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <h1 className="text-center mt-5 text-blue-500 text-4xl">Book List</h1>
      <div className="flex justify-center items-center">
        <form
          className="w-1/2 flex justify-center items-center"
          onSubmit={onSubmitForm}>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add
          </button>
        </form>
      </div>
    </>
  );
};
export default InputBook;
