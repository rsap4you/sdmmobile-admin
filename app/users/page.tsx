import { Suspense } from "react";
import Users from "@/Components/users/Page";

export const metadata = { title: "Users | SDM Admin" };

// useSearchParams() inside needs a Suspense boundary
export default function Page() {
  return (
    <Suspense fallback={null}>
      <Users />
    </Suspense>
  );
}