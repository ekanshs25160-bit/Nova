import React from "react";

const Header = () => {
  return (
    <nav className="flex justify-between items-center p-6 bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold tracking-widest bg-gradient-to-r from-[#00f2ff] to-[#0070ff] bg-clip-text text-transparent uppercase">
                Nova
            </h1>
            <h3 className="text-[10px] text-slate-400 uppercase tracking-[0.2em] -mt-1 font-semibold">
                Data Intelligence Dashboard
            </h3>
        </div>
        <div className="flex gap-4">
            {/* Nav actions could go here */}
        </div>
    </nav>
  );
};

export default Header;