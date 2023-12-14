import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const { id } = useParams();
  const [booksData, setBooksData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDataById = async () => {
      try {
        const res = await fetch(`http://localhost:5000/books/${id}`);
        const data = await res.json();
        setBooksData(data[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDataById();
  }, [id]);
  // console.log(booksData);

  const submitHandler = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const cover = e.target[2].value;

    if (!title || !desc || !cover) {
      return alert("title, desc and cover can not be empty!");
    }

    const updateData = {
      title,
      desc,
      cover,
    };

    try {
      const res = await fetch(`http://localhost:5000/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      if (data.serverStatus) {
        alert("Updated successfully!");
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
        <input className="w-full p-3 text-black" defaultValue={booksData?.title} type="text" name="title" id="title" placeholder="Enter book title" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="desc">Book desc</label>
        <input className="w-full p-3 text-black" defaultValue={booksData?.desc} type="text" name="desc" id="desc" placeholder="Enter book desc" />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="cover">Book image url</label>
        <input
          className="w-full p-3 text-black"
          defaultValue={booksData?.cover}
          type="text"
          name="cover"
          id="cover"
          placeholder="Enter book image url"
        />
      </div>

      <div>
        <button className="bg-green-700 p-3 inline-block capitalize w-full" type="submit">
          submit
        </button>
      </div>
    </form>
  );
};

export default UpdateBook;
