# EXPERIMENTAL CONTRACTS

the contracts in this folder are marked as experimental and are not actually advised for implementation or production use yet.
however you can draw inference from work in progress from the conracts in this folder.

## L1 messaging paymaster

this paymaster is being developed to have direct interaction with the ethereum L1 blockchain.
as part of the initial proposal, it is meant to check for arbitrary conditions on L1 before settling transactions on L2
however the zksync evm has not achieved instant finality as the time for a transaction to be accepted in L2 and finalised in L1 takes hours.
additional hours will be consumed when the L1 blockchain (ethereum) sends its return message back to zkSync.
the process is outlined as:

- L2 -> L1 message
- L1 -> L2 return mesasge

the L1 <-> L2 communication is not happening in a single transaction and that is a constraint

will keep you posted.
