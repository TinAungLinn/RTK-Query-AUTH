import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@mantine/core";
import { setSearchTerm } from "../redux/services/ContactSlice";
import { BiSearch } from "react-icons/bi";

const Navbar = () => {
  const searchTerm = useSelector((state) => state.ContactSlice.searchTerm);

  const dispatch = useDispatch();

  return (
    <div className=" flex justify-between items-center p-7 shadow-lg">
      <h1 className=" text-2xl text-gray-600 font-semibold">MMS</h1>
      <div className=" my-7 mx-7 flex items-center gap-5 ">
        <Link to={"/createContact"}>
          <button className=" bg-blue-600 hover:bg-blue-500 py-1 px-6 text-white rounded">
            Create Contact
          </button>
        </Link>
        <div>
          <Input
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            icon={<BiSearch />}
            variant="filled"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
