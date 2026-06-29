# Football Field — Valuation Synthesis

## What Is a Football Field?

A football field chart shows a **valuation range from multiple methods** on a single horizontal bar chart. It's the "summary slide" of every investment banking pitch book.

## Example (Illustrative)

```
$80     $100    $120    $140    $160    $180    $200    $220
├────────┼────────┼────────┼────────┼────────┼────────┼────────┤
         ╔════════════════════╗  ← DCF (Low = $110, High = $155)
                         ╔═══════════════════════╗  ← Trading Comps ($130-$180)
   ╔═══════════════════════════════╗  ← Precedent Transactions ($100-$175)
                    ╔═════════════════════╗  ← DDM ($120-$160)
══════════════════════════════════════════════╗  ← 52W Range ($90-$210)
                     ● ← Current Price ($145)
```

## EquiValue's Football Field

### Methods Displayed

| Method | Low | High | Source |
|--------|-----|------|--------|
| DCF | WACC+1%, g−0.5% | WACC−1%, g+0.5% | [[Valuation-Core/dcf-implementation]] |
| Trading Comps | 25th percentile | 75th percentile | [[Market-Benchmarks/trading-comps]] |
| Sector Multiple | Industry avg − 20% | Industry avg + 20% | [[Market-Benchmarks/sector-ev-ebitda]] |
| DDM (if dividends) | Kₑ+1%, g−0.5% | Kₑ−1%, g+0.5% | Using dividend data |
| 52W Range | 52W low | 52W high | [[Data-Layer/finnhub-endpoints]] |

### Current Price Marker

A vertical line at the market price, with color:
- **Green dot** if price < DCF low (undervalued)
- **Red dot** if price > DCF high (overvalued)
- **Yellow dot** if within range (fair)

## Implementation (Planned)

Using Recharts:

```typescript
type FootballFieldEntry = {
  method: string;
  low: number;
  high: number;
  color: string;
};

const data: FootballFieldEntry[] = [
  { method: 'DCF', low: 110, high: 155, color: '#8884d8' },
  { method: 'Trading Comps', low: 130, high: 180, color: '#82ca9d' },
  { method: '52W Range', low: 90, high: 210, color: '#ffc658' },
];
```

## Interpretation

| Price vs. Field | Signal |
|-----------------|--------|
| Price below ALL ranges | ✅ Strong Buy |
| Price below 50%+ ranges | ✅ Buy |
| Price inside most ranges | ⏸️ Hold |
| Price above 50%+ ranges | ⚠️ Sell/Short |
| Price above ALL ranges | 🚨 Overvalued |

## Related

- [[Research-Methods/dcf-vs-comps]] — philosophical basis for triangulation
- [[Research-Methods/institutional-overview]] — all methods in one table
- [[Valuation-Core/sensitivity-analysis]] — DCF range driving the low/high
- [[Market-Benchmarks/trading-comps]] — comps range methodology
