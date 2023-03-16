import utils from "./utils.js";
export default {
  async selfMint (from) {
    try {
      let abi = utils.contractAbi("ERC721Template");
      const contract = await utils.contractAt({ abi }, process.env.VUE_APP_CORE_CARD);
      let result = await contract.selfMint({ from })
      return result
    } catch (e) {
      return { error: e.message };
    }
  },
  async depositCard (tokenId, from) {
    try {
      let result = ''
      let abi = utils.contractAbi("ERC721Template");
      const contract = await utils.contractAt({ abi }, process.env.VUE_APP_CORE_CARD);
      const isApproved = await contract.isApprovedForAll(from, process.env.VUE_APP_CORE_CARD_ESCROW)
      if (isApproved === false) {
        await contract.setApprovalForAll(process.env.VUE_APP_CORE_CARD_ESCROW, true, { from })
      }
      let abiEscrow = utils.contractAbi("Escrow");
      const contractEscrow = await utils.contractAt({ abi: abiEscrow }, process.env.VUE_APP_CORE_CARD_ESCROW);
      result = await contractEscrow.deposit(tokenId, { from })
      return result
    } catch (e) {
      return { error: e.message };
    }
  },
  async withdrawCard (tokenId, from) {
    try {
      let abiEscrow = utils.contractAbi("Escrow");
      const contractEscrow = await utils.contractAt({ abi: abiEscrow }, process.env.VUE_APP_CORE_CARD_ESCROW);
      let result = await contractEscrow.withdraw(tokenId, { from })
      return result
    } catch (e) {
      return { error: e.message };
    }
  }
};
