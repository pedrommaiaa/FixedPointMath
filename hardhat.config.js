require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require("hardhat-huff");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        version: "0.8.0",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    huff: {
        version: "0.0.17",
    },
};
