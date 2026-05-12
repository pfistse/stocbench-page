export type Reference = {
  id: string;
  authors: string;
  year: string;
  title: string;
  venue?: string;
  url?: string;
};

export const references: Reference[] = [
  {
    id: "chen2024",
    authors: "Y. Chen, M. Goldstein, M. Hua, M. S. Albergo, N. M. Boffi, E. Vanden-Eijnden",
    year: "2024",
    title: "Probabilistic Forecasting with Stochastic Interpolants and Föllmer Processes",
    venue: "ICML",
    url: "https://arxiv.org/abs/2403.13724",
  }
];

export const referenceIndex: Record<string, number> = Object.fromEntries(
  references.map((ref, i) => [ref.id, i + 1])
);
