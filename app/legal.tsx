import { Redirect } from "expo-router";

/** Alias so /legal never 404s — Legal lives on You. */
export default function LegalAlias() {
  return <Redirect href="/(tabs)/account/legal" />;
}
