type WindowProps = {
  title: string;
  children: React.ReactNode;
};

export default function Window({ title, children }: WindowProps) {
  return (
    <div className="relative mx-auto mt-12 w-full max-w-[520px] overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_0_40px_rgba(255,255,255,0.08)]">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
        <h2 className="text-cyan-300 font-semibold tracking-wide">
          {title}
        </h2>

        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-gray-200">
        {children}
      </div>

    </div>
  );
}