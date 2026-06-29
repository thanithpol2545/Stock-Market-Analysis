# GAAP Concept Mapping

## Overview

Finnhub returns raw SEC XBRL data. Each financial concept has a unique GAAP-standardized tag. Companies use different tags for the same economic concept (especially shares outstanding and operating cash flow).

## Income Statement Concepts

| Economic Concept | Primary GAAP Tag | Fallback Tags |
|-----------------|------------------|---------------|
| **Revenue** | `us-gaap_RevenueFromContractWithCustomerExcludingAssessedTax` | `us-gaap_SalesRevenueNet`, `us-gaap_RevenueFromContractWithCustomer` |
| **Cost of Revenue** | `us-gaap_CostOfRevenue` | — |
| **Gross Profit** | `us-gaap_GrossProfit` | `Revenue − CostOfRevenue` |
| **Operating Income** | `us-gaap_OperatingIncomeLoss` | `us-gaap_IncomeLossFromContinuingOperationsBeforeInterestExpense` |
| **Net Income** | `us-gaap_NetIncomeLoss` | `us-gaap_IncomeLossFromContinuingOperations`, `us-gaap_ProfitLoss` |
| **Depreciation & Amortization** | `us-gaap_DepreciationDepletionAndAmortization` | Included in `OperatingIncomeLoss` implicitly |

## Balance Sheet Concepts

| Economic Concept | Primary GAAP Tag | Fallback |
|-----------------|------------------|----------|
| **Cash & Equivalents** | `us-gaap_CashAndCashEquivalentsAtCarryingValue` | `us-gaap_CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents` |
| **Total Assets** | `us-gaap_Assets` | — |
| **Total Debt** | Sum of `us-gaap_LongTermDebtNoncurrent` + `us-gaap_ShortTermBorrowings` | `us-gaap_NotesPayable` |
| **Total Equity** | `us-gaap_StockholdersEquity` | `us-gaap_ShareholdersEquity` |
| **Retained Earnings** | `us-gaap_RetainedEarningsAccumulatedDeficit` | `us-gaap_RetainedEarnings` |
| **Current Assets** | `us-gaap_AssetsCurrent` | — |
| **Current Liabilities** | `us-gaap_LiabilitiesCurrent` | — |
| **Inventory** | `us-gaap_InventoryNet` | `us-gaap_Inventory` |

## Cash Flow Concepts

| Economic Concept | Primary GAAP Tag | Fallback |
|-----------------|------------------|----------|
| **Operating Cash Flow** | `us-gaap_NetCashProvidedByUsedInOperatingActivities` | `us-gaap_CashFlowsFromOperatingActivities` |
| **CapEx** | `us-gaap_PaymentsToAcquirePropertyPlantAndEquipment` | — |
| **Free Cash Flow** | Computed: OperatingCF − CapEx | — |

## Shares Outstanding — The Trickiest Concept

Different companies report shares outstanding under different tags:

- `us-gaap_CommonStockSharesOutstanding` — most common
- `us-gaap_WeightedAverageNumberOfSharesOutstandingBasic` — sometimes used in earnings release
- `us-gaap_CommonStockSharesIssued` — different from outstanding!
- Profile fallback: `profile.shareOutstanding` from `/stock/profile2`

We try these in order and fall back to the profile endpoint. See [[Implementation/math-engine]] for the full fallback chain.

## The INTC Case

Intel (`INTC`) has `CommonStockSharesOutstanding = null` in its XBRL. We fixed this by using `profile.shareOutstanding` as the final fallback.

## Related

- [[Data-Layer/finnhub-endpoints]] — where this data comes from
- [[Implementation/data-flow-pipeline]] — how these concepts get transformed into FinancialYear objects
- [[Valuation-Core/dcf-implementation]] — how Free Cash Flow uses OperatingCF and CapEx
