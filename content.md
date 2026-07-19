---
eyebrow: Preprint 2026
title: StocBench: A Benchmark for Generative Modeling of Stochastic Dynamics
authors: Sebastian Pfister, Benjamin Holzschuh, Nils Thuerey
affiliation: Technical University of Munich
links: [arXiv](#) [Dataset](https://huggingface.co/datasets/pfistse/stocbench-data) [BibTeX](#) **[GitHub](https://github.com/tum-pbs/stocbench)** **[Pip package](https://pypi.org/)**
---
> We benchmark flow- and diffusion-based methods for learning the next-step distribution for stochastic fluid flow problems with a particular focus on their performance under limited inference budgets. All methods are evaluated on a two-dimensional Kolmogorov flow with stochastic forcing. Performance is measured in terms of the mean, standard deviation, and energy distance of the generated distribution to the ground truth. In addition, to assess whether models generate the correct invariant measures, we evaluate the ensemble-averaged enstrophy spectrum over time using autoregressive rollouts.

## The benchmark

Following Chen et al. (2024), we simulate incompressible Navier–Stokes equations on the two-dimensional torus with stochastic forcing $f_t$. We evaluate every method on two prediction tasks:
a. **Stochastic.** The forcing is unobserved; the task is to learn the conditional next-state distribution $p(\omega_{t+\Delta t} \mid \omega_t)$.
b. **Deterministic control.** The forcing is part of the input, so the next state is fully determined and models should collapse to a single prediction.
|[1fr] ![Left: one-step prediction ensemble for a given initial condition. Right: pointwise std of the ensemble.](assets/samples.mp4 poster=assets/samples_poster.png, assets/std.png)

- **Mean error** Relative L2 error of the predicted conditional mean.
- **Std error** Relative L2 error of the predicted conditional standard deviation.
- **Energy distance** Distributional mismatch beyond the first two moments.
- **Enstrophy spectrum error** Degradation in average enstrophy spectrum during autoregressive rollout.

## Baselines

![Dotted: 1 inference step, dashed: 2 inference steps, solid: evaluated at every budget on the x-axis.](chart:baselines)

## Results

|[1.4fr] ### One-step distribution
1. **Flow Matching is most accurate at high budgets** Given a sufficient number of inference steps, it achieves the most accurate approximation of the one-step conditional distribution.
2. **DPM-2 is highly effective at low budgets.** Its second-order exponential integrator accurately predicts the conditional standard deviation with as few as 10 inference steps. For the conditional mean, however, it offers no clear advantage over first-order diffusion solvers.
3. **Few-step methods are very competitive** ADD-FM matches the accuracy of multi-step methods with a single inference step. Consistency Distillation has a slightly higher mean error, but still produces competitive one-step distributions while requiring only one or two evaluations.
| ![Relative L2 error of the predicted conditional mean vs. inference budget](chart:mean)
| ![Relative L2 error of the predicted conditional std vs. inference budget.](chart:std)

|[1.4fr] ### Invariant measure
4. **Few-step methods preserve enstrophy spectrum best** Despite their low inference cost, the distillation methods (ADD-FM and CD-2) achieve the lowest enstrophy spectrum error during autoregressive rollouts; interestingly, CD is not even among the best mean predictors. This indicates that fewer generative correction steps are beneficial for low artificial spectral damping.
5. **Stochastic Interpolation degrades over rollouts** Stochastic Interpolation is intuitive because it bridges nearby simulation states rather than transporting from pure noise, but its average enstrophy spectrum deteriorates more strongly during rollouts.
| ![Error in the average enstrophy spectrum accumulated over a 10-step autoregressive rollout as a function of inference budget.](chart:enstrophy)
| ![Enstrophy ratio per wavenumber after 10 rollout steps; 1.0 means the ground-truth spectrum is preserved.](chart:ratio)

|[1.4fr] ### Control with Deterministic flow
6. **Deterministic predictions under observed forcing** When the forcing is observed, the next state is deterministic and the target standard deviation is zero. In this setting, all methods except single-step CD collapse to deterministic predictions. CD predictions improve substantially with a second inference step. Compared with the stochastic case:
- SI and FM achieve the lowest mean error in both settings.
- CD requires carefully tuned sampling schedules, and the optimal schedule differs between the deterministic and stochastic settings.
| ![Mean error on the deterministic control task, corresponding to the deviation from the ground-truth next-step state.](chart:det_mean)
| ![Residual std error on the control task; the target std is zero.](chart:det_std)

## Benchmark your model in a few lines

Datasets for both Kolmogorov-flow variants, precomputed ground-truth ensembles, all four evaluation metrics, and reference implementations of all eight baselines ship in one Python package.

[Code](https://github.com/tum-pbs/stocbench) [Pip package](https://pypi.org/)