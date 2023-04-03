import { ImSpinner2 } from 'react-icons/im'

export default function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <ImSpinner2 className="animate-spin text-neutral-100 text-xl" />
    </div>
  )
}
