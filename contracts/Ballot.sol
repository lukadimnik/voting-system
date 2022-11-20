// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import '@openzeppelin/contracts/interfaces/IERC721.sol';
import 'hardhat/console.sol';

/// @title Voting with delegation.
contract Ballot {
  // This declares a new complex type which will
  // be used for variables later.
  // It will represent a single voter.
  struct Voter {
    uint256 weight; // weight is accumulated by delegation
    bool voted; // if true, that person already voted
    uint256 vote; // index of the voted proposal
  }

  // This is a type for a single proposal.
  struct Proposal {
    bytes32 name; // short name (up to 32 bytes)
    uint256 voteCount; // number of accumulated votes
  }

  address public chairperson;
  address nftContractAddress;

  // This declares a state variable that
  // stores a `Voter` struct for each possible address.
  mapping(address => Voter) public voters;

  // A dynamically-sized array of `Proposal` structs.
  Proposal[] public proposals;

  /// Create a new ballot to choose one of `proposalNames`.
  constructor(bytes32[] memory proposalNames, address _nftContractAddress) {
    nftContractAddress = _nftContractAddress;
    chairperson = msg.sender;
    voters[chairperson].weight = 1;

    // For each of the provided proposal names,
    // create a new proposal object and add it
    // to the end of the array.
    for (uint256 i = 0; i < proposalNames.length; i++) {
      // 'Proposal({...})' creates a temporary
      // Proposal object and 'proposals.push(...)'
      // appends it to the end of 'proposals'.
      proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
    }
  }

  /// Give your vote (including votes delegated to you)
  /// to proposal `proposals[proposal].name`.
  function vote(uint256 proposal) external {
    require(
      IERC721(nftContractAddress).balanceOf(msg.sender) > 0,
      'Does not hold the right access NFT'
    );
    require(!voters[msg.sender].voted, 'The voter already voted.');
    voters[msg.sender].weight = 1;
    Voter storage sender = voters[msg.sender];
    sender.voted = true;
    sender.vote = proposal;

    // If `proposal` is out of the range of the array,
    // this will throw automatically and revert all
    // changes.
    proposals[proposal].voteCount += sender.weight;
  }

  /// @dev Computes the winning proposal taking all
  /// previous votes into account.
  function winningProposal() public view returns (uint256 winningProposal_) {
    uint256 winningVoteCount = 0;
    for (uint256 p = 0; p < proposals.length; p++) {
      if (proposals[p].voteCount > winningVoteCount) {
        winningVoteCount = proposals[p].voteCount;
        winningProposal_ = p;
      }
    }
  }

  // Calls winningProposal() function to get the index
  // of the winner contained in the proposals array and then
  // returns the name of the winner
  function winnerName() external view returns (bytes32 winnerName_) {
    winnerName_ = proposals[winningProposal()].name;
  }

  // will check if the caller has the right to vote
  function walletHoldsToken() public view returns (bool) {
    console.log('msg.sender: ', msg.sender);
    console.log('nftContractAddress: ', nftContractAddress);

    return IERC721(nftContractAddress).balanceOf(msg.sender) > 0;
  }
}
