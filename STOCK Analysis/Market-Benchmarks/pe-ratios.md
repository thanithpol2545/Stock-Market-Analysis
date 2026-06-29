# P/E and P/BV Ratios by Sector

## P/E Ratios (Damodaran, Jan 2026)

| Industry | Trailing P/E | Forward P/E | PEG |
|----------|-------------|-------------|-----|
| **Internet Software** | 45.2× | 38.1× | 2.1× |
| **Enterprise Software** | 35.8× | 30.2× | 2.0× |
| **Pharmaceuticals** | 32.5× | 28.1× | 2.0× |
| **Semiconductors** | 28.3× | 24.5× | 1.6× |
| **Medical Equipment** | 27.5× | 23.8× | 1.9× |
| **Technology Hardware** | 24.1× | 21.2× | 2.0× |
| **Retail (E-commerce)** | 22.4× | 19.5× | 1.5× |
| **Consumer Packaged** | 20.5× | 18.8× | 2.3× |
| **Restaurants** | 24.5× | 21.2× | 1.7× |
| **Regional Banks** | 14.2× | 12.8× | N/A |
| **Oil & Gas** | 11.5× | 10.2× | 1.8× |
| **Utilities** | 18.5× | 17.2× | 2.5× |
| **Automotive** | 10.2× | 9.1× | 1.1× |
| **Airlines** | 9.5× | 8.4× | 0.8× |
| **Steel/Mining** | 8.8× | 7.5× | 1.0× |

## P/BV Ratios (Selected)

| Industry | P/BV | ROE | Justified P/BV (Theory) |
|----------|------|-----|------------------------|
| **Software** | 12.5× | 28% | P/BV = ROE / Kₑ ≈ 28% / 9% = 3.1× (trading above justified) |
| **Pharmaceuticals** | 6.8× | 18% | 18% / 9% = 2.0× |
| **Regional Banks** | 1.4× | 10% | 10% / 10% = 1.0× |
| **Insurance** | 1.3× | 12% | 12% / 9% = 1.3× (fair) |
| **Utilities** | 2.1× | 11% | 11% / 8% = 1.4× |
| **Steel** | 1.1× | 8% | 8% / 11% = 0.7× |

## Cyclically Adjusted P/E (CAPE)

- **10-year average inflation-adjusted earnings**
- Current S&P 500 CAPE: ~35× (above historical mean of ~17×)
- Best for: Index-level valuation, long-term return prediction
- Shiller, R.J. (1981). "Do Stock Prices Move Too Much to be Justified by Subsequent Changes in Dividends?"

## EquiValue Integration

The P/E and P/BV for the **target company** are computed automatically:
```
P/E = Price / EPS(ttm)
P/BV = Price / (Book Value per Share)
```

Then compared against the sector average to show **premium/discount**:
```
Premium/Discount = (Company Multiple − Sector Avg) / Sector Avg
```

## Related

- [[Market-Benchmarks/sector-ev-ebitda]] — EV-based multiples
- [[Market-Benchmarks/trading-comps]] — full comps methodology
- [[Valuation-Core/dcf-implementation]] — DCF as cross-check
