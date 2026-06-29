# Constants & Defaults

## Macroeconomic Defaults

| Parameter | Value | Source |
|-----------|-------|--------|
| Risk-Free Rate (Rf) — USD | 4.50% | 10Y US Treasury (2026) |
| Risk-Free Rate (Rf) — EUR | 2.80% | 10Y German Bund (2026) |
| Risk-Free Rate (Rf) — THB | 3.60% | 10Y Thai Bond (2026) |
| Equity Risk Premium (US) | 4.94% | Damodaran, Jan 2026 |
| Equity Risk Premium (Global) | 5.20% | Damodaran, Jan 2026 |
| Terminal Growth Rate | 2.50% | Nominal US GDP long-term |
| Corporate Tax Rate (US) | 21.00% | US Federal (post-TCJA) |

## Country Risk Premiums (CRP)

| Country | CRP | Total ERP |
|---------|-----|-----------|
| Thailand | 1.80% | 6.74% |
| Indonesia | 2.20% | 7.14% |
| India | 1.95% | 6.89% |
| China | 1.10% | 6.04% |
| Brazil | 2.85% | 7.79% |
| Russia | 8.50% | 13.44% |
| UK | 0.70% | 5.64% |
| Japan | 0.55% | 5.49% |
| Germany | 0.40% | 5.34% |

## Beta Defaults

| Profile | Beta | When Used |
|---------|------|-----------|
| Default (no data) | 1.00 | No metric data from Finnhub |
| Defensive | 0.65 | Utilities, consumer staples |
| Cyclical | 1.40 | Automotive, luxury goods |
| Growth | 1.30 | High-growth tech |

## DCF Defaults

| Parameter | Default | Notes |
|-----------|---------|-------|
| Projection Years | 5 | Industry standard |
| Stage 1 Growth | 8.00% | Default: 2× GDP growth |
| Terminal Growth | 2.50% | Cannot exceed GDP growth |
| Margin of Safety | 15% | For "Buy Below" recommendation |

## Sensitivity Ranges

| Input | Min | Max | Step |
|-------|-----|-----|------|
| WACC | Rf + 1% | Rf + 7% | 0.5% |
| Terminal Growth | 1.0% | 4.0% | 0.5% |
| Stage 1 Growth | 2.0% | 20.0% | 2.0% |

## Related

- [[Quick-Reference/formulas]] — how these constants are used in formulas
- [[Valuation-Core/capm-model]] — Rf, ERP usage
- [[Valuation-Core/wacc-theory]] — CRP adjustment
- [[Valuation-Core/terminal-value]] — terminal growth rate justification
