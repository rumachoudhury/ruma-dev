import type { CSSVars } from "@/hooks/cssVars";
import type { VisualKind } from "@/data/projects";

/**
 * Stylized illustrations for the project cards, built from layered CSS panels.
 * Each panel has a --z depth so it floats forward in 3D when you hover the card.
 * Replace a visual with a real screenshot by swapping the component for an <Image />.
 */

const z = (value: number, extra: CSSVars = {}): CSSVars => ({ "--z": value, ...extra });

function ShopVisual() {
  return (
    <div className="visual v-shop" aria-hidden="true">
      <span className="vbg" />
      <div className="layer" style={z(14, { left: "7%", top: "12%", width: "60%", height: "72%" })}>
        <div className="prod4">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="layer pad l-float" style={z(42, { right: "6%", top: "9%", width: "34%" })}>
        <i className="ln" />
        <i className="ln s" />
      </div>
      <div className="layer pad" style={z(74, { right: "8%", bottom: "9%", width: "46%" })}>
        <i className="ln" />
        <i className="ln s" />
        <div className="typing">
          <u />
          <u />
          <u />
        </div>
      </div>
    </div>
  );
}

// 4 weeks of a calendar: "on" days are available, "sel" is the picked day.
const calendar = [
  "", "on", "", "", "on", "", "",
  "on", "", "", "on", "", "", "on",
  "", "", "sel", "", "on", "", "",
  "on", "", "", "", "", "on", "",
];

function TherapyVisual() {
  return (
    <div className="visual v-thr" aria-hidden="true">
      <span className="vbg" />
      <div className="layer" style={z(14, { left: "7%", top: "12%", width: "58%", height: "74%", padding: "12px" })}>
        <i className="ln" style={{ width: "42%", height: 8 }} />
        <div className="cal">
          {calendar.map((c, i) => (
            <i key={i} className={c} />
          ))}
        </div>
      </div>
      <div className="layer pad" style={z(44, { right: "6%", top: "14%", width: "32%" })}>
        <b className="slot" />
        <b className="slot pick" />
        <b className="slot" />
      </div>
      <div className="layer okbadge l-float" style={z(76, { right: "14%", bottom: "9%", width: 50, height: 50 })}>
        <svg viewBox="0 0 24 24">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </div>
    </div>
  );
}

function SoraVisual() {
  return (
    <div className="visual v-sora" aria-hidden="true">
      <span className="vbg" />
      <div className="layer ringbox" style={z(14, { left: "50%", top: "44%", width: "44%", aspectRatio: "1" })}>
        <i />
        <i />
        <i />
      </div>
      <div className="layer pad" style={z(44, { left: "7%", bottom: "9%", width: "44%" })}>
        <i className="ln" />
        <i className="ln s" />
      </div>
      <div className="layer pillbtn l-float" style={z(74, { right: "8%", bottom: "11%", width: "28%" })} />
    </div>
  );
}

export function Visual({ kind }: { kind: VisualKind }) {
  if (kind === "shop") return <ShopVisual />;
  if (kind === "therapy") return <TherapyVisual />;
  return <SoraVisual />;
}
