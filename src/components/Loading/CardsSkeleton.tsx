export function CardsSkeleton() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8]; // Quantity of cards

  return (
    <>
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
