# Error Handling — Failover Strategy

## 3-Tier Fallback System

```
Tier 1: Real Finnhub API
   │
   ├─ Success → Return data
   │
   └─ Failure (rate limit, no key, network error)
        │
        ▼
Tier 2: Math Engine (Deterministic)
   │
   ├─ Success → Return simulated data
   │
   └─ Failure (ticker too short, hash error)
        │
        ▼
Tier 3: Hardcoded Defaults
        └─ "Welcome" screen with empty state
```

## Error Types

| Error | Trigger | UI Behavior |
|-------|---------|-------------|
| `NO_API_KEY` | `VITE_FINNHUB_API_KEY` not set | Silently use math engine, show info badge |
| `INVALID_TICKER` | Symbol has non-alphanumeric chars | Show validation message: "Enter valid ticker" |
| `FINNHUB_QUOTA` | 429 response | Fallback to math engine, show "Limited" badge |
| `FINNHUB_EMPTY` | No data returned for ticker | Show "No data found" with math engine fallback |
| `NETWORK_ERROR` | fetch() fails (offline, CORS) | Fallback to math engine, show "Offline mode" |
| `CALCULATION_ERROR` | Negative FCF, division by zero | Show warning, suggest comps method |

## Error Boundaries

React Error Boundary wrapping the analysis panels:

```typescript
class AnalysisErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-fallback">
        <h3>⚠️ Analysis Error</h3>
        <p>Something went wrong. Try a different ticker or check your API key.</p>
      </div>;
    }
    return this.props.children;
  }
}
```

## User Feedback Patterns

- **Loading:** Skeleton bars for price, financials, DCF
- **Info:** "Using simulated data (no API key)" — subtle badge
- **Warning:** "Negative FCF — DCF may not be reliable" — yellow banner
- **Error:** "Failed to fetch AAPL data" — red banner with retry button

## API Key Detection

```typescript
function hasApiKey(): boolean {
  return import.meta.env.VITE_FINNHUB_API_KEY?.length > 0;
}
```

If false → math engine silently, no error shown.

## Related

- [[Implementation/data-flow-pipeline]] — where errors occur in the flow
- [[Implementation/math-engine]] — the Tier 2 fallback
- [[Data-Layer/data-quality]] — known gotchas that trigger errors
