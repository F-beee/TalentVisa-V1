export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-primary animate-spin mb-4"></div>
      <p className="text-gray-400">Loading pitch deck...</p>
    </div>
  )
}
