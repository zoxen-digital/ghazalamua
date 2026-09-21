"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

export default function LoadingImage({
  className,
  spinnerSize = 22,
  ...props
}: ImageProps & { spinnerSize?: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[color:var(--color-cream-3)]">
          <Loader2 size={spinnerSize} className="animate-spin text-[color:var(--color-rose)]" />
        </div>
      )}
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps and passed via props */}
      <Image
        {...props}
        className={clsx(className, "transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
        onLoad={(e) => {
          setLoaded(true);
          props.onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          props.onError?.(e);
        }}
      />
    </>
  );
}
