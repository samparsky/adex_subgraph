# AdEx Protocol Subgraph

Subgraph for AdEx Network

GrahpQL playgroud Link - https://thegraph.com/explorer/subgraph/samparsky/adex-protocol

#### Example Query

Fetch all available bonds

```
{
    bonds(first: 5) {
        id
        owner
        amount
        poolId
    }
}
```

### License

MIT