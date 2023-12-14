import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [booksData, setBooksData] = useState([]);
  const [booksDataLoading, setBooksDataLoading] = useState(false);
  const [booksDataError, setBooksDataError] = useState("");

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/books");
        const data = await res.json();
        setBooksData(data);
        setBooksDataLoading(false);
        setBooksDataError("");
      } catch (error) {
        setBooksDataError(error.message);
        setBooksDataLoading(false);
      }
    };
    fetchAllBooks();
  }, []);

  if (booksDataLoading) return <p>Loading</p>;
  if (booksDataError) return <p>{booksDataError}</p>;
  return (
    <>
      {booksData.length > 0 ? (
        <div>
          <ul className="grid grid-cols-3 gap-10">
            {booksData?.map((item) => (
              <li key={item.id} className="border p-5">
                <div>
                  <img className="w-full h-[150px] bg-slate-600" src={item.cover} alt="book image" />
                </div>
                <h2 className="font-semibold text-2xl capitalize">{item.title}</h2>
                <p>{item.desc}</p>

                <div className="flex gap-2">
                  <Link className="bg-green-700 px-2 py-1 inline-block capitalize" to={`/update/${item.id}`}>
                    update
                  </Link>
                  <BooksDeleteBtn key={item.id} id={item.id}>
                    delete
                  </BooksDeleteBtn>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h3 className="text-center text-2xl text-red-500 capitalize">No books to display!!</h3>
      )}
    </>
  );
};

export default Home;

// delete books button
const BooksDeleteBtn = ({ children, id }) => {
  const deleteHandler = async () => {
    const agree = confirm("Are you sure!");
    if (agree) {
      try {
        const res = await fetch(`http://localhost:5000/books/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.serverStatus) {
          alert("Deleted successfully!");
          window.location.reload();
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <button className="bg-red-700 px-2 py-1 inline-block capitalize" onClick={deleteHandler}>
      {children}
    </button>
  );
};
