# LBO, SOTP & Asset-Based Valuation

## LBO (Leveraged Buyout)

### When It Applies
Private Equity firms assessing acquisition targets with stable cash flows

### Core Logic
```
Maximum Entry Price → Target IRR (typically 20-25%)
```

### Key Drivers
- **Debt capacity** (max leverage the target can support)
- **Exit multiple** (what EBITDA multiple you can sell at in 5 years)
- **De-leveraging** (cash used to pay down debt, building equity value)

### Simplified Model

```
Year 0: Buy at $1,000M (60% debt = $600M, 40% equity = $400M)
Year 5: Exit at $1,500M (12× EBITDA of $125M)
         Remaining debt: $200M
         Equity returned: $1,500M − $200M = $1,300M
         IRR = ($1,300M / $400M)^(1/5) − 1 = 26.6% → GOOD DEAL
```

### EquiValue Relevance

LBO is more relevant for PE than retail investors. However, it provides:
- **Lower bound**: retail investors should not pay PE-level prices
- **Debt sustainability check**: excessive leverage = higher risk

## SOTP (Sum-of-the-Parts)

### When It Applies
Conglomerates, holding companies, companies with diverse business segments

### Core Logic
```
SOTP Value = Σ(Segment FV each segment) − Corporate Overhead
```

### Example: Conglomerate

| Segment | EBITDA | Sector Multiple | Segment Value |
|---------|--------|----------------|---------------|
| Industrial | $200M | 10× | $2,000M |
| Software | $80M | 25× | $2,000M |
| Consumer | $50M | 12× | $600M |
| **Gross SOTP** | | | **$4,600M** |
| Corporate Overhead | | | −$300M |
| **Net SOTP** | | | **$4,300M** |

### Conglomerate Discount

Conglomerates often trade at 10-20% discount to SOTP due to complexity/inefficiency.

## Asset-Based Valuation

### When It Applies
- **Distressed companies** (bankruptcy/liquidation scenario)
- **REITs** (NAV = portfolio property value − debt)
- **Investment companies** (holdings at market value)
- **Natura resource companies** (proven reserves × commodity price)

### Formula
```
Asset-Based Value = Fair Value of ALL Assets − ALL Liabilities
```

### Liquidation vs. Going Concern

| Scenario | Asset Value | When |
|----------|-------------|------|
| Going Concern | BV or FV of operating assets | Normal operations |
| Orderly Liquidation | 60-80% of FV | Distressed but time |
| Fire Sale | 30-50% of FV | Imminent bankruptcy |

### EquiValue Implementation

Asset-Based is the fallback when:
- FCF is negative (DCF breaks)
- No comparable companies (unique business)
- Distressed Z-score < 1.81 (see [[Financial-Health/altman-z-score]])

## Related

- [[Market-Benchmarks/precedent-transactions]] — M&A multiples (used in LBO exit)
- [[Research-Methods/dcf-vs-comps]] — when to use which method
- [[Research-Methods/institutional-overview]] — full methods matrix
- [[Financial-Health/_index]] — distress triggers asset-based
