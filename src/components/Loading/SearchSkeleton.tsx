export function SearchSkeleton() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8]; // Quantity of cards
  return (
    <>
      <div className="w-full md:w-80 mx-auto rounded bg-neutral-500 my-4 overflow-hidden">
        <h2 className="bg-emerald-500 p-4 text-center text-base md:text-xl font-semibold text-white">
          Search results
        </h2>
        <div className="flex flex-col py-2">
          <button
            className={`flex items-center justify-between p-2 text-sm md:text-base
          text-white border-gray-300 bg-emerald-500`}
          >
            Movie
            <span
              className={`text-[10px] md:text-sm text-neutral-600 rounded bg-neutral-200 
            px-2 py-1 font-normal flex items-center justify-center leading-none shadow
            shadow-neutral-800 w-10 h-6 animate-pulse`}
            ></span>
          </button>
          <button
            className={`flex items-center justify-between p-2 text-sm md:text-base  
          hover:bg-neutral-600 text-white border-gray-300`}
          >
            Tv
            <span
              className={`text-[10px] md:text-sm text-neutral-600 rounded bg-neutral-200 
            px-2 py-1 font-normal flex items-center justify-center leading-none shadow
            shadow-neutral-800 w-10 h-6 animate-pulse`}
            ></span>
          </button>
        </div>
      </div>
      {arr.map((_item, i) => (
        <div
          key={i}
          className="flex items-center space-x-8 w-full h-48 border rounded-lg overflow-hidden mb-3"
        >
          {/* Image */}
          <div className="w-48 h-full bg-neutral-600 animate-pulse"></div>
          {/* Info */}
          <div className="w-full space-y-2">
            <div className="w-2/12 h-5 bg-neutral-400 rounded animate-pulse"></div>
            <div className="w-4/12 h-5 bg-neutral-400 rounded animate-pulse"></div>
            <div className="w-9/12 h-10 bg-neutral-400 rounded animate-pulse"></div>
            <div className="w-5/12 h-5 bg-neutral-400 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </>
  );
}
