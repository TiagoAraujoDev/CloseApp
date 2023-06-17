import { ImSpinner2 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ImSpinner2 className="animate-spin text-xl text-neutral-100" />
    </div>
  );
}
