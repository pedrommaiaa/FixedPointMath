const { expect } = require("chai");
const { ethers } = require("hardhat");

let math;
let solmateMath;

describe("FixedPointMath", function() {
    beforeEach(async function () {
        const FixedPointMath = await ethers.getContractFactory("FixedPointMath");
        math = await FixedPointMath.deploy();
        await math.deployed();

        const SolmateMath = await ethers.getContractFactory("SolmateMath");
        solmateMath = await SolmateMath.deploy();
        await solmateMath.deployed();
    });

    it("Gas MulDivDown", async function () {
        const huffMulDivDown = await math.estimateGas.mulDivDown(
            ethers.utils.parseUnits("2.5", 18), 
            ethers.utils.parseUnits("0.5", 18), 
            ethers.utils.parseUnits("1", 18)
        );

        const solmateMulDivDown = await solmateMath.estimateGas.mulDivDown(
            ethers.utils.parseUnits("2.5", 18), 
            ethers.utils.parseUnits("0.5", 18), 
            ethers.utils.parseUnits("1", 18)
        );

        console.log("\tsolmateMulDivDown", solmateMulDivDown.toNumber());
        console.log("\thuffMulDivDown", huffMulDivDown.toNumber());
    });

    it("Gas MulDivUp", async function () {
        const huffMulDivUp = await math.estimateGas.mulDivDown(
            369, 
            271, 
            1e2
        );

        const solmateMulDivUp = await solmateMath.estimateGas.mulDivDown(
            369, 
            271, 
            1e2
        );
        
        console.log("\tsolmateMulDivUp", solmateMulDivUp.toNumber());
        console.log("\thuffMulDivUp", huffMulDivUp.toNumber());
    });

    it("test MulDivDown", async function () {
        expect(await math.mulDivDown(
            ethers.utils.parseUnits("2.5", 27), 
            ethers.utils.parseUnits("0.5", 27), 
            ethers.utils.parseUnits("1", 27)
        )).to.equal(ethers.utils.parseUnits("1.25", 27));

        expect(await math.mulDivDown(
            ethers.utils.parseUnits("2.5", 18), 
            ethers.utils.parseUnits("0.5", 18), 
            ethers.utils.parseUnits("1", 18)
        )).to.equal(ethers.utils.parseUnits("1.25", 18));

        expect(await math.mulDivDown(
            ethers.utils.parseUnits("2.5", 8), 
            ethers.utils.parseUnits("0.5", 8), 
            ethers.utils.parseUnits("1", 8)
        )).to.equal(ethers.utils.parseUnits("1.25", 8));

        expect(await math.mulDivDown(
            369, 
            271, 
            1e2
        )).to.equal(999);


        expect(await math.mulDivDown(
            ethers.utils.parseUnits("1", 27), 
            ethers.utils.parseUnits("1", 27), 
            ethers.utils.parseUnits("2", 27)
        )).to.equal(ethers.utils.parseUnits("0.5", 27));

        expect(await math.mulDivDown(
            ethers.utils.parseUnits("1", 18), 
            ethers.utils.parseUnits("1", 18), 
            ethers.utils.parseUnits("2", 18)
        )).to.equal(ethers.utils.parseUnits("0.5", 18));

        expect(await math.mulDivDown(
            ethers.utils.parseUnits("1", 8), 
            ethers.utils.parseUnits("1", 8), 
            ethers.utils.parseUnits("2", 8)
        )).to.equal(ethers.utils.parseUnits("0.5", 8));


        expect(await math.mulDivDown(
            ethers.utils.parseUnits("2", 27), 
            ethers.utils.parseUnits("3", 27), 
            ethers.utils.parseUnits("2", 27)
        )).to.equal(ethers.utils.parseUnits("3", 27));

        expect(await math.mulDivDown(
            ethers.utils.parseUnits("3", 18), 
            ethers.utils.parseUnits("2", 18), 
            ethers.utils.parseUnits("3", 18)
        )).to.equal(ethers.utils.parseUnits("2", 18));

        expect(await math.mulDivDown(
            ethers.utils.parseUnits("2", 8), 
            ethers.utils.parseUnits("3", 8), 
            ethers.utils.parseUnits("2", 8)
        )).to.equal(ethers.utils.parseUnits("3", 8));
    });

    it("test MulDivDown Edge Cases", async function () {
        await expect(math.mulDivDown(
            0, 
            ethers.utils.parseUnits("1", 18), 
            ethers.utils.parseUnits("1", 18)
        )).to.be.reverted;

        await expect(math.mulDivDown(
            ethers.utils.parseUnits("1", 18), 
            0, 
            ethers.utils.parseUnits("1", 18)
        )).to.be.reverted;

        await expect(math.mulDivDown( 
            0,
            0,
            ethers.utils.parseUnits("1", 18),
        )).to.be.reverted;
    });

    it("test MulDivDown Zero Denominator", async function () {
        await expect(math.mulDivDown( 
            ethers.utils.parseUnits("1", 18),
            ethers.utils.parseUnits("1", 18),
            0,
        )).to.be.reverted;
    });

    it("MulDivUp", async function () {
        expect(await math.mulDivUp(
            ethers.utils.parseUnits("2.5", 27), 
            ethers.utils.parseUnits("0.5", 27), 
            ethers.utils.parseUnits("1", 27)
        )).to.equal(ethers.utils.parseUnits("1.25", 27));

        expect(await math.mulDivUp(
            ethers.utils.parseUnits("2.5", 18), 
            ethers.utils.parseUnits("0.5", 18), 
            ethers.utils.parseUnits("1", 18)
        )).to.equal(ethers.utils.parseUnits("1.25", 18));

        expect(await math.mulDivUp(
            ethers.utils.parseUnits("2.5", 8), 
            ethers.utils.parseUnits("0.5", 8), 
            ethers.utils.parseUnits("1", 8)
        )).to.equal(ethers.utils.parseUnits("1.25", 8));

        expect(await math.mulDivUp(
            369, 
            271, 
            1e2
        )).to.equal(1000);


        expect(await math.mulDivUp(
            ethers.utils.parseUnits("1", 27), 
            ethers.utils.parseUnits("1", 27), 
            ethers.utils.parseUnits("2", 27)
        )).to.equal(ethers.utils.parseUnits("0.5", 27));

        expect(await math.mulDivUp(
            ethers.utils.parseUnits("1", 18), 
            ethers.utils.parseUnits("1", 18), 
            ethers.utils.parseUnits("2", 18)
        )).to.equal(ethers.utils.parseUnits("0.5", 18));

        expect(await math.mulDivUp(
            ethers.utils.parseUnits("1", 8), 
            ethers.utils.parseUnits("1", 8), 
            ethers.utils.parseUnits("2", 8)
        )).to.equal(ethers.utils.parseUnits("0.5", 8));


        expect(await math.mulDivUp(
            ethers.utils.parseUnits("2", 27), 
            ethers.utils.parseUnits("3", 27), 
            ethers.utils.parseUnits("2", 27)
        )).to.equal(ethers.utils.parseUnits("3", 27));

        expect(await math.mulDivUp(
            ethers.utils.parseUnits("3", 18), 
            ethers.utils.parseUnits("2", 18), 
            ethers.utils.parseUnits("3", 18)
        )).to.equal(ethers.utils.parseUnits("2", 18));

        expect(await math.mulDivUp(
            ethers.utils.parseUnits("2", 8), 
            ethers.utils.parseUnits("3", 8), 
            ethers.utils.parseUnits("2", 8)
        )).to.equal(ethers.utils.parseUnits("3", 8));
    });

    it("test MulDivUp Edge Cases", async function () {
        await expect(math.mulDivUp(
            0, 
            ethers.utils.parseUnits("1", 18), 
            ethers.utils.parseUnits("1", 18)
        )).to.be.reverted;

        await expect(math.mulDivUp(
            ethers.utils.parseUnits("1", 18), 
            0, 
            ethers.utils.parseUnits("1", 18)
        )).to.be.reverted;

        await expect(math.mulDivUp( 
            0,
            0,
            ethers.utils.parseUnits("1", 18),
        )).to.be.reverted;
    });

    it("test MulDivUp Zero Denominator", async function () {
        await expect(math.mulDivUp( 
            ethers.utils.parseUnits("1", 18),
            ethers.utils.parseUnits("1", 18),
            0,
        )).to.be.reverted;
    });
});