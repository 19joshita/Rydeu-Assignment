import { Redirect } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../src/redux/store";

export default function Index() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuth ? <Redirect href="/Home" /> : <Redirect href="/Login" />;
}
