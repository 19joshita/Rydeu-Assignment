import { loginSuccess } from "@/src/redux/authSlice";
import { store } from "@/src/redux/store";
import { getToken, getUser } from "@/src/utils/storage";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

function AuthBootstrap() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      const user = await getUser();

      if (token) {
        dispatch(
          loginSuccess({
            token,
            user,
          })
        );
        router.replace("/Home");
      } else {
        router.replace("/Login");
      }
    };

    checkAuth();
  }, []);

  return <Stack screenOptions={{ headerShown: true }} />;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthBootstrap />
    </Provider>
  );
}
