import Image from "next/image";
import type { CSSVars } from "@/hooks/cssVars";
import type { VisualKind } from "@/data/projects";

const z = (value: number, extra: CSSVars = {}): CSSVars => ({
  "--z": value,
  ...extra,
});

const IMAGE_MAP: Record<VisualKind, string> = {
  shop: "/project-images/monorepo-ecommerce-app.png",
  therapy: "/project-images/bright-path-therapy.png",
  sora: "/project-images/sora-project.png",
};

function ProjectArtwork({ kind }: { kind: VisualKind }) {
  return (
    <div className="visual project-art" aria-hidden="true">
      <Image
        src={IMAGE_MAP[kind]}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 360px"
        priority
        style={{
          objectFit: "contain",
          objectPosition: "center",
          borderRadius: "18px",
          background: "rgba(255,255,255,0.7)",
        }}
      />
      <div
        className="layer"
        style={z(14, {
          left: "7%",
          top: "12%",
          width: "60%",
          height: "72%",
          opacity: 0,
        })}
      />
    </div>
  );
}

export function Visual({ kind }: { kind: VisualKind }) {
  return <ProjectArtwork kind={kind} />;
}
