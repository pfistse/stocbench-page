export type SeriesPoint = {
  x: number;
  y: number;
};

export type LineStyle = "solid" | "dashed" | "dotted";

export type BenchmarkSeries = {
  name: string;
  color: string;
  lineStyle?: LineStyle;
  points: SeriesPoint[];
};

export type Sampler = {
  name: string;
  color: string;
  lineStyle?: LineStyle;
};

export type BenchmarkChart = {
  title: string;
  yLabel: string;
  yMin: number;
  yMax: number;
  series: BenchmarkSeries[];
};

const colors = {
  SI: "#2563eb",
  FM: "#ea580c",
  "DPM-2o": "#eab308",
  DDIM: "#e11d48",
  DDPM: "#16a34a",
  "CD-1": "#9ca3af",
  "CD-2": "#6b7280",
};

export const samplers: Sampler[] = [
  { name: "DDIM", color: colors.DDIM },
  { name: "DDPM", color: colors.DDPM },
  { name: "DPM-2o", color: colors["DPM-2o"] },
  { name: "FM", color: colors.FM },
  { name: "SI", color: colors.SI },
  { name: "CD-1", color: colors["CD-1"], lineStyle: "dotted" },
  { name: "CD-2", color: colors["CD-2"], lineStyle: "dashed" },
];

const X_MIN = 10;
const X_MAX = 400;

const flat = (value: number): SeriesPoint[] => [
  { x: X_MIN, y: value },
  { x: X_MAX, y: value },
];

const STEPS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 400] as const;

const series = (ys: readonly number[]): SeriesPoint[] =>
  STEPS.map((x, i) => ({ x, y: ys[i] }));

export const charts: BenchmarkChart[] = [
  {
    title: "Mean",
    yLabel: "Mean relative L2 error",
    yMin: 0.03,
    yMax: 0.1,
    series: [
      { name: "SI", color: colors.SI, points: series([0.2048, 0.1242, 0.0915, 0.0736, 0.0631, 0.0567, 0.0522, 0.0490, 0.0469, 0.0443, 0.0357]) },
      { name: "FM", color: colors.FM, points: series([0.0376, 0.0339, 0.0337, 0.0336, 0.0337, 0.0339, 0.0339, 0.0340, 0.0341, 0.0341, 0.0345]) },
      { name: "DPM-2o", color: colors["DPM-2o"], points: series([0.0490, 0.0493, 0.0487, 0.0491, 0.0490, 0.0490, 0.0489, 0.0489, 0.0489, 0.0490, 0.0490]) },
      { name: "DDIM", color: colors.DDIM, points: series([0.0471, 0.0476, 0.0481, 0.0485, 0.0481, 0.0477, 0.0476, 0.0478, 0.0481, 0.0480, 0.0487]) },
      { name: "DDPM", color: colors.DDPM, points: series([0.0413, 0.0407, 0.0412, 0.0415, 0.0420, 0.0426, 0.0428, 0.0433, 0.0433, 0.0432, 0.0444]) },
      { name: "CD-1", color: colors["CD-1"], lineStyle: "dotted", points: flat(0.0657) },
      { name: "CD-2", color: colors["CD-2"], lineStyle: "dashed", points: flat(0.0603) },
    ],
  },
  {
    title: "Std",
    yLabel: "Std relative L2 error",
    yMin: 0.02,
    yMax: 0.1,
    series: [
      { name: "SI", color: colors.SI, points: series([0.3552, 0.2278, 0.1691, 0.1361, 0.1146, 0.1003, 0.0894, 0.0818, 0.0736, 0.0684, 0.0333]) },
      { name: "FM", color: colors.FM, points: series([0.3343, 0.1759, 0.1209, 0.0916, 0.0733, 0.0621, 0.0530, 0.0479, 0.0432, 0.0391, 0.0213]) },
      { name: "DPM-2o", color: colors["DPM-2o"], points: series([0.0235, 0.0258, 0.0275, 0.0291, 0.0293, 0.0293, 0.0295, 0.0296, 0.0293, 0.0297, 0.0297]) },
      { name: "DDIM", color: colors.DDIM, points: series([0.1739, 0.1022, 0.0769, 0.0644, 0.0572, 0.0514, 0.0483, 0.0461, 0.0440, 0.0416, 0.0314]) },
      { name: "DDPM", color: colors.DDPM, points: series([0.2614, 0.1548, 0.1135, 0.0914, 0.0780, 0.0694, 0.0632, 0.0575, 0.0537, 0.0515, 0.0325]) },
      { name: "CD-1", color: colors["CD-1"], lineStyle: "dotted", points: flat(0.0302) },
      { name: "CD-2", color: colors["CD-2"], lineStyle: "dashed", points: flat(0.0315) },
    ],
  },
  {
    title: "Energy distance",
    yLabel: "Energy distance",
    yMin: 0.03,
    yMax: 0.1,
    series: [
      { name: "SI", color: colors.SI, points: series([0.2346, 0.1419, 0.1035, 0.0827, 0.0701, 0.0622, 0.0563, 0.0522, 0.0489, 0.0461, 0.0328]) },
      { name: "FM", color: colors.FM, points: series([0.1359, 0.0736, 0.0547, 0.0456, 0.0405, 0.0376, 0.0355, 0.0345, 0.0335, 0.0327, 0.0302]) },
      { name: "DPM-2o", color: colors["DPM-2o"], points: series([0.0405, 0.0414, 0.0412, 0.0417, 0.0416, 0.0416, 0.0416, 0.0417, 0.0415, 0.0417, 0.0417]) },
      { name: "DDIM", color: colors.DDIM, points: series([0.0794, 0.0571, 0.0506, 0.0480, 0.0460, 0.0445, 0.0438, 0.0436, 0.0434, 0.0430, 0.0419]) },
      { name: "DDPM", color: colors.DDPM, points: series([0.1083, 0.0692, 0.0562, 0.0499, 0.0464, 0.0447, 0.0433, 0.0424, 0.0416, 0.0410, 0.0384]) },
      { name: "CD-1", color: colors["CD-1"], lineStyle: "dotted", points: flat(0.0527) },
      { name: "CD-2", color: colors["CD-2"], lineStyle: "dashed", points: flat(0.0495) },
    ],
  },
  {
    title: "Enstrophy",
    yLabel: "Enstrophy spectrum error",
    yMin: 0,
    yMax: 40,
    series: [
      { name: "SI", color: colors.SI, points: series([51.293, 36.885, 28.777, 24.105, 20.112, 17.717, 15.448, 14.381, 13.317, 11.881, 4.570]) },
      { name: "FM", color: colors.FM, points: series([30.220, 16.844, 11.515, 8.611, 6.711, 5.461, 4.485, 3.857, 3.290, 2.836, 0.534]) },
      { name: "DPM-2o", color: colors["DPM-2o"], points: series([5.523, 8.073, 8.213, 8.544, 8.553, 8.551, 8.588, 8.605, 8.530, 8.620, 8.614]) },
      { name: "DDIM", color: colors.DDIM, points: series([21.669, 15.752, 13.436, 12.196, 11.631, 11.142, 10.729, 10.525, 10.464, 10.173, 8.669]) },
      { name: "DDPM", color: colors.DDPM, points: series([26.008, 17.103, 13.287, 11.069, 9.970, 8.807, 8.017, 7.563, 7.150, 6.571, 4.395]) },
      { name: "CD-1", color: colors["CD-1"], lineStyle: "dotted", points: flat(5.697) },
      { name: "CD-2", color: colors["CD-2"], lineStyle: "dashed", points: flat(1.406) },
    ],
  },
];
