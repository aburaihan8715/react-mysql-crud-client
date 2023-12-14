import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
  const [booksData, setBooksData] = useState({
    title: "",
    desc: "",
    cover: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setBooksData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!booksData.title || !booksData.desc || !booksData.cover) alert("input should not be empty!!");

    try {
      const res = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(booksData),
      });
      const data = await res.json();
      if (data?.insertId > 0) {
        alert("Books have been created successfully!");
        e.target.reset();
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={submitHandler} className="max-w-md mx-auto border p-5 flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="title">Book title</label>
        <input className="w-full p-3 text-black" onChange={changeHandler} type="text" name="title" id="title" placeholder="Enter book title" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="desc">Book desc</label>
        <input className="w-full p-3 text-black" onChange={changeHandler} type="text" name="desc" id="desc" placeholder="Enter book desc" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cover">Book image url</label>
        <input className="w-full p-3 text-black" onChange={changeHandler} type="text" name="cover" id="cover" placeholder="Enter book image url" />
      </div>

      <div>
        <button className="bg-green-700 p-3 inline-block capitalize w-full" type="submit">
          submit
        </button>
      </div>
    </form>
  );
};

export default AddBook;

// ==========end=========
