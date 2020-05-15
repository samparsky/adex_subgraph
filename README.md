# AdEx Protocol Subgraph

Subgraph for AdEx Network

GrahpQL playgroud Link - 

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

Bond -> 
Unbond -> Bond
UnbondRequest -> Bond 

Channel -> withdraws, withrawexpired, Identity

Identity -> Channel