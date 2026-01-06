export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-electric border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-charcoal-400 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

