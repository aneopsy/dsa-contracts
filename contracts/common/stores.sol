pragma solidity ^0.6.0;

import {MemoryInterface, EventInterface} from "./interfaces.sol";

contract Stores {
    /**
     * @dev Return ethereum address
     */
    function getEthAddr() internal pure returns (address) {
        return 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE; // ETH Address
    }

    /**
     * @dev Return memory variable address
     */
    function getMemoryAddr() internal pure returns (address) {
        return 0x56BfFaf06e24Cd2A940a49b37cebfD0A00C5D902; // InstaMemory Address
    }

    /**
     * @dev Return InstaEvent Address.
     */
    function getEventAddr() internal pure returns (address) {
        return 0xE61163575e644B52e31a04CE052D87fb48C7E6e9; // InstaEvent Address
    }

    /**
     * @dev Get Uint value from InstaMemory Contract.
     */
    function getUint(uint256 getId, uint256 val)
        internal
        returns (uint256 returnVal)
    {
        returnVal = getId == 0
            ? val
            : MemoryInterface(getMemoryAddr()).getUint(getId);
    }

    /**
     * @dev Set Uint value in InstaMemory Contract.
     */
    function setUint(uint256 setId, uint256 val) internal virtual {
        if (setId != 0) MemoryInterface(getMemoryAddr()).setUint(setId, val);
    }

    /**
     * @dev emit event on event contract
     */
    function emitEvent(bytes32 eventCode, bytes memory eventData)
        internal
        virtual
    {
        (uint256 model, uint256 id) = connectorID();
        EventInterface(getEventAddr()).emitEvent(
            model,
            id,
            eventCode,
            eventData
        );
    }

    /**
     * @dev Connector Details - needs to be changed before deployment
     */
    function connectorID() public pure returns (uint256 model, uint256 id) {
        (model, id) = (1, 1); // connectorID
    }
}
