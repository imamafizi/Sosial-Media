import { configureStore } from "@reduxjs/toolkit";
import usersReduser from "../redux/slices/usersSlice";

export default configureStore({
  reducer: {
    user: usersReduser,
  },
});
