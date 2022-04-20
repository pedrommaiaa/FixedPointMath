# <h1 align="center"> FixedPointMath in Huff </h1>


Implementing the [FixedPointMath](https://github.com/Rari-Capital/solmate/blob/main/src/utils/FixedPointMathLib.sol) 
library from [Solmate](https://github.com/Rari-Capital/solmate) in Huff.


### Gas Usage

|  libraries  |  mulDivDown  |  mulDivUp |
| ----------- | ------------ | --------- |
| SolmateMath |    22131     |   21975   |
|  HuffMath   |    21819     |   21663   |


### Building and Testing

To compile your contracts, write:

```sh
make build
```

To test your contracts, write:

```sh
npx hardhat test
```
