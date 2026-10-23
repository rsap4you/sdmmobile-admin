import { Suspense } from "react";
import Repairs from "@/Components/Repairs/Page";

export const metadata = { title: "Repairs | SDM Admin" };

// useSearchParams() inside needs a Suspense boundary
export default function Page() {
  return (
    <Suspense fallback={null}>
      <Repairs />
    </Suspense>
  );
}
