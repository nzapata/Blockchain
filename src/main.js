const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }


    //Calculating the Hash
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    //Proof of work, AKA mining 
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("BLOCK MINED: " + this.hash);
    }
}


class Blockchain {
    constructor() {
        this.chain = [this.createNateBlock()];
        this.difficulty = 5;
    }


    //Creating a new block 
    createNateBlock() {
        return new Block(0, "12/04/2014", "Nate block", "0");
    }

    //Getting the latest block of the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    //Adding new block into the chain
    addBlock(newBlock) {
        //calculating the previous hash 
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    //Validating
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            //taking the i position in the chain
            const currentBlock = this.chain[i];
            //making sure the previous block is the same
            const previousBlock = this.chain [i - 1];
            //Checking that this block are link together
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}


let nateCoin = new Blockchain(); //Creating an instance of Blockchain


console.log('Mining block 1...');
nateCoin.addBlock(new Block(1, "10/21/15", {amount: 4}));

console.log('Mining block 2...');
nateCoin.addBlock(new Block(2, "10/21/15", {amount: 10}));

