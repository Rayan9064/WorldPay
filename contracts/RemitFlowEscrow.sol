// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Mock World ID interface for testnet
interface IWorldID {
    function verifyProof(
        uint256 root,
        uint256 signalHash,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external view;
}

contract RemitFlowEscrow is Ownable {
    IWorldID public worldId;
    uint256 public nextRoot; // Placeholder for the next Merkle root from World ID
    uint256 public groupId; // The group ID for World ID verification

    mapping(bytes32 => bool) public nullifierHashes; // To prevent double-spending with World ID nullifiers
    mapping(bytes32 => bool) public processedTransfers; // To track processed transfers

    struct Transfer {
        address sender;
        address recipient;
        IERC20 token;
        uint256 amount;
        uint256 depositTime;
        bool released;
        bytes32 nullifierHash;
    }

    mapping(bytes32 => Transfer) public transfers; // Mapping from transferId to Transfer struct

    event FundsDeposited(bytes32 indexed transferId, address indexed sender, address indexed recipient, uint256 amount, address tokenAddress);
    event FundsReleased(bytes32 indexed transferId, address indexed sender, address indexed recipient, uint256 amount, address tokenAddress);
    event SybilAttemptRejected(address indexed attemptedSender, bytes32 indexed nullifierHash);

    constructor(address _worldId, uint256 _groupId) Ownable(msg.sender) {
        worldId = IWorldID(_worldId);
        groupId = _groupId;
    }

    function setNextRoot(uint256 _nextRoot) public onlyOwner {
        nextRoot = _nextRoot;
    }

    function deposit(
        address _recipient,
        IERC20 _token,
        uint256 _amount,
        uint256 _root,
        uint256 _nullifierHash,
        uint256[8] calldata _proof
    ) external {
        require(_amount > 0, "Amount must be greater than zero");
        require(!nullifierHashes[bytes32(_nullifierHash)], "World ID nullifier already used");

        // Verify World ID proof (mock for testnet)
        // For testnet, we'll skip the actual verification since we're using a mock address
        if (address(worldId) != address(0)) {
            try worldId.verifyProof(
                _root,
                uint256(keccak256(abi.encodePacked(msg.sender))), // signal
                _nullifierHash,
                _proof
            ) {
                // Proof verified successfully
            } catch {
                // For testnet, we'll allow the transaction but log it
                emit SybilAttemptRejected(msg.sender, bytes32(_nullifierHash));
                revert("World ID verification failed");
            }
        }
        // If worldId is address(0), we skip verification for testnet

        // Mark nullifier as used
        nullifierHashes[bytes32(_nullifierHash)] = true;

        // Transfer funds to the escrow contract
        _token.transferFrom(msg.sender, address(this), _amount);

        bytes32 transferId = keccak256(abi.encodePacked(msg.sender, _recipient, _token, _amount, block.timestamp));
        transfers[transferId] = Transfer({
            sender: msg.sender,
            recipient: _recipient,
            token: _token,
            amount: _amount,
            depositTime: block.timestamp,
            released: false,
            nullifierHash: bytes32(_nullifierHash)
        });

        emit FundsDeposited(transferId, msg.sender, _recipient, _amount, address(_token));
    }

    function release(
        bytes32 _transferId,
        uint256 _root,
        uint256 _nullifierHash,
        uint256[8] calldata _proof
    ) external {
        Transfer storage transfer = transfers[_transferId];
        require(transfer.sender != address(0), "Transfer does not exist");
        require(!transfer.released, "Funds already released");
        require(msg.sender == transfer.recipient, "Only recipient can release funds");
        require(!nullifierHashes[bytes32(_nullifierHash)], "World ID nullifier already used");

        // Verify World ID proof for the recipient (mock for testnet)
        // For testnet, we'll skip the actual verification since we're using a mock address
        if (address(worldId) != address(0)) {
            try worldId.verifyProof(
                _root,
                uint256(keccak256(abi.encodePacked(msg.sender))), // signal
                _nullifierHash,
                _proof
            ) {
                // Proof verified successfully
            } catch {
                revert("World ID verification failed for recipient");
            }
        }
        // If worldId is address(0), we skip verification for testnet

        // Mark nullifier as used
        nullifierHashes[bytes32(_nullifierHash)] = true;

        transfer.released = true;
        transfer.token.transfer(transfer.recipient, transfer.amount);

        emit FundsReleased(_transferId, transfer.sender, transfer.recipient, transfer.amount, address(transfer.token));
    }

    // Emergency function to withdraw stuck funds (only owner)
    function emergencyWithdraw(IERC20 _token, uint256 _amount) external onlyOwner {
        _token.transfer(owner(), _amount);
    }
}