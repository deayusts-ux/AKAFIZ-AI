"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

export function ShareButton({
  title,
  text,
  path,
  className,
}: {
  title: string;
  text: string;
  path: string;
  className?: string;
}) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}${path}`;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      markCopied();
      return;
    } catch {
      // Clipboard API can be blocked outside a focused document; fall back to a selection copy.
    }

    const field = document.createElement("textarea");
    field.value = url;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    let copiedManually = false;
    try {
      copiedManually = document.execCommand("copy");
    } catch {
      copiedManually = false;
    } finally {
      field.remove();
    }

    if (copiedManually) {
      markCopied();
    } else {
      toast("Salin tautan ini", url);
    }
  }

  function markCopied() {
    setCopied(true);
    toast("Tautan disalin", "Bagikan halaman ini ke tim atau temanmu.");
    window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn("btn-ghost h-11 px-4 text-sm", className)}
      aria-label={`Bagikan ${title}`}
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
      ) : (
        <Share2 className="h-4 w-4" aria-hidden="true" />
      )}
      <span>{copied ? "Tersalin" : "Bagikan"}</span>
    </button>
  );
}
