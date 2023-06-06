import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  contacts: [],
  searchTerm: "",
};

export const ContactSlice = createSlice({
  name: "ContactSlice",
  initialState,
  reducers: {
    addContacts: (state, { payload }) => {
      state.contacts = payload;
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
  },
});

export const { addContacts, setSearchTerm } = ContactSlice.actions;
export default ContactSlice.reducer;
