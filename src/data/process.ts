// Steps shown in SEQ // HOW_I_BUILD. Draft copy — edit freely. `glyph` is a tiny ASCII mark shown on each card.

export interface ProcessStep {
  code: string;
  title: string;
  body: string;
  glyph: string;
}

export const processSteps: ProcessStep[] = [
  {
    code: "01",
    title: "DECODE",
    body: "Strip the problem to first principles. Who is it for, what actually hurts, and what would make it measurably better.",
    glyph: "?·?",
  },
  {
    code: "02",
    title: "ARCHITECT",
    body: "Pick the simplest system that survives real load: data model first, then boundaries, then the interface.",
    glyph: "[■]",
  },
  {
    code: "03",
    title: "BUILD",
    body: "Ship in thin vertical slices. Typed, tested where it matters, and fast on a mid-range phone, not just my laptop.",
    glyph: "</>",
  },
  {
    code: "04",
    title: "SHIP_&_ITERATE",
    body: "Deploy early, instrument everything, and let real usage, not opinion, decide the next iteration.",
    glyph: "↻→",
  },
];
