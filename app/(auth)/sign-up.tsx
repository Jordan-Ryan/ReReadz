import { useEffect } from "react";
import { useRouter } from "expo-router";

/**
 * Sign up is handled on the login screen via the "Sign up" tab.
 * This route redirects so deep links to /sign-up open the auth screen on the signup tab.
 */
export default function SignUpRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace({ pathname: "/(auth)/login", params: { tab: "signup" } } as any);
  }, [router]);
  return null;
}
