import { Navigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { getLoggedinUser } from "../../features/useAuthSlice";

export default function PrivateRoute({ children }) {
  let auth = useAuth();

  const dispatch = useDispatch();
  if (auth) {
    dispatch(getLoggedinUser());
  }
  return auth ? children : <Navigate to="/login" replace={true} />;
}

export const useAuth = () => {
  const token = sessionStorage.getItem("okratoken");
  try {
    const decoded = jwt.decode(token);
    if (token && decoded.exp >= new Date().getTime() / 1000) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
};
