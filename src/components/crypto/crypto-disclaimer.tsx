import { ShieldAlert } from "lucide-react";

export function CryptoDisclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "crypto-disclaimer flex items-start gap-2 rounded-xl border border-amber-400/15 bg-amber-400/[0.04] p-3 text-[10px] leading-relaxed text-muted"
          : "crypto-disclaimer mt-8 flex items-start gap-3 rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] p-4 text-xs leading-relaxed text-muted"
      }
    >
      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden="true" />
      <p>
        <span className="font-semibold text-amber-200">Disclaimer edukasi. </span>
        Crypto Academy adalah materi pembelajaran, bukan nasihat investasi atau trading. Seluruh chart
        memakai data simulasi dan bukan harga pasar nyata. Crypto sangat volatil dan berisiko; keputusan
        serta kerugian sepenuhnya menjadi tanggung jawab pengguna. Jangan memakai dana yang tidak siap
        kehilangan.
      </p>
    </div>
  );
}
