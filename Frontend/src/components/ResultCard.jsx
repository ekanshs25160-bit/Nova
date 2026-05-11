import React from "react";

const ResultCard = ({ host }) => {
  const ports = host.ports || (host.data ? [...new Set(host.data.map(d => d.port))] : []);
  const country = host.location?.country_name || host.country_name || "Unknown";
  const org = host.org || "Unknown Organization";
  const lastUpdate = host.last_update ? new Date(host.last_update).toLocaleDateString() : "N/A";

  return (
    <div className="bg-[#10141c]/70 border border-white/10 rounded-2xl p-6 transition-all hover:translate-y-[-5px] hover:border-[#00f2ff] hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#00f2ff] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="mb-4">
            <h3 className="font-mono text-xl text-[#00f2ff] font-bold">
                {host.ip_str || host.ip}
            </h3>
        </div>
        
        <div className="space-y-2">
            <p className="text-sm text-slate-400 flex justify-between">
                Organization <span className="text-[#e0e6ed] font-medium">{org}</span>
            </p>
            <p className="text-sm text-slate-400 flex justify-between">
                Country <span className="text-[#e0e6ed] font-medium">{country}</span>
            </p>
            <p className="text-sm text-slate-400 flex justify-between">
                Ports <span className="text-[#e0e6ed] font-medium">{ports.slice(0, 5).join(", ")}{ports.length > 5 ? "..." : ""}</span>
            </p>
            <p className="text-sm text-slate-400 flex justify-between">
                Last Seen <span className="text-[#e0e6ed] font-medium">{lastUpdate}</span>
            </p>
        </div>
        
        {host.os && (
            <p className="text-sm text-slate-400 flex justify-between mt-2 border-t border-white/5 pt-2">
                OS <span className="text-[#e0e6ed] font-medium">{host.os}</span>
            </p>
        )}
        {host.isp && (
            <p className="text-sm text-slate-400 flex justify-between mt-1">
                ISP <span className="text-[#e0e6ed] font-medium">{host.isp}</span>
            </p>
        )}
    </div>
  );
};

export default ResultCard;
