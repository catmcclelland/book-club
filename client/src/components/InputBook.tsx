import React, { useState } from "react";
const InputBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { title, author };
      const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location.href = "/";
    } catch (error:any) {
      console.error(error.message);
    }
  };
  return (
    <>
      <h1 className="text-center mt-5 text-blue-500 text-4xl">Book List</h1>

      <form className="w-1/2 flex flex-col" onSubmit={onSubmitForm}>
        <label className="mt-2 flex justify-between">
          {" "}
          Title
          <input
            type="text"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-4/5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="mt-2 flex justify-between">
          Author
          <input
            type="text"
            className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-4/5"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <button className="mt-2 ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add
        </button>
      </form>
    </>
  );
};
export default InputBook;
