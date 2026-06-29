# DCF vs. Comps — Intrinsic vs. Relative

## Core Philosophy

| | DCF (Intrinsic) | Comps (Relative) |
|--|----------------|-------------------|
| **Question** | "What is this company worth?" | "What is the market paying for similar companies?" |
| **Approach** | Model cash flows | Find comparable multiples |
| **Key Input** | FCF, WACC, growth | Industry multiple, peer set |
| **Assumptions** | Explicit (transparent) | Implicit (market is correct) |
| **Output** | Point estimate (with sensitivity) | Range (from peer dispersion) |

## When DCF Is Better

- **Mature, stable companies** (predictable FCF)
- **Cash-flow-positive firms** (negative FCF breaks DCF)
- **Unique business models** (no true comps)
- **Minority stake** (no control premium needed)
- **Long-term investors** (buying cash flows, not relative pricing)

## When Comps Are Better

- **Quick valuation** (less model-building)
- **Comparable-rich industries** (retail, banks, REITs)
- **Pre-revenue companies** (no FCF for DCF)
- **M&A context** (control premium matters)
- **Market validation** (DCF may be wrong if market disagrees)

## Triangulation

The best approach uses **both**:

```
Fair Value Range = [DCF Low, Comps High]
```

Or weighted average:
```
Fair Value = 0.6 × DCF + 0.4 × Comps Median
```

Weight depends on:
- DCF reliability (cash flow predictability)
- Comps reliability (peer homogeneity)

## The Damodaran Rule

> "Every number in a DCF is a guess, but a disciplined one. Every number in a comp is not a guess — it's a fact about what someone else paid. But whether that transaction is relevant to the company you are valuing is the guess."

## When Neither Works

- **Distressed firms** → Asset-Based (see [[Research-Methods/lbo-and-sotp]])
- **Startups** → VC Method
- **Cyclical peaks** → Normalized earnings in both methods

## EquiValue Implementation

The app shows both:
1. DCF → intrinsic value (primary output)
2. Sector multiple → implied value (reference line)
3. [[Research-Methods/football-field\|Football field]] → visual comparison

## Related

- [[Valuation-Core/dcf-implementation]] — DCF deep dive
- [[Market-Benchmarks/trading-comps]] — comps methodology
- [[Research-Methods/institutional-overview]] — all 10 methods compared
