import { Link } from "react-router-dom";

const AppNav = () => {
  return (
    <>
      <header className="sticky top-0">
        <nav className="py-2 border px-4 bg-slate-700 flex justify-between items-center">
          <Link to={"/"} className="">
            <div>
              REAC<span className="text-2xl text-orange-700 opacity-95 font-bold">T</span>CRUD
            </div>
            <div className="text-xs">express and mysql</div>
          </Link>
          <Link to={"/add"}>
            <button className="border border-opacity-5 px-3 py-2 uppercase hover:ring-2 ring-orange-700 ">Add book</button>
          </Link>
        </nav>
      </header>
    </>
  );
};

export default AppNav;
