import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import otherSlice from "./other/otherSlice";
import ui from "./ui/ui-slice";        
const rootReducer = combineReducers({
  auth: authSlice,
  other: otherSlice,
  ui:  ui,
});

export default rootReducer;
