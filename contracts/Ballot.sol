// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import '@openzeppelin/contracts/interfaces/IERC721.sol';
// import 'hardhat/console.sol';

/// @title Voting system.
contract Ballot {
  struct Voter {
    bool voted; // if true, that person already voted
    uint256 vote; // index of the voted proposal
  }

  struct Proposal {
    bytes32 name; // short name (up to 32 bytes)
    uint256 voteCount; // number of accumulated votes
  }

  address nftContractAddress;

  mapping(address => Voter) public voters;

  Proposal[] public proposals;

  constructor(bytes32[] memory proposalNames, address _nftContractAddress) {
    nftContractAddress = _nftContractAddress;

    for (uint256 i = 0; i < proposalNames.length; i++) {
      proposals.push(Proposal({name: proposalNames[i], voteCount: 0}));
    }
  }

  function vote(uint256 proposal) external {
    require(
      IERC721(nftContractAddress).balanceOf(msg.sender) > 0,
      'Does not hold the right access NFT'
    );
    require(!voters[msg.sender].voted, 'The voter already voted.');
    Voter storage sender = voters[msg.sender];
    sender.voted = true;
    sender.vote = proposal;

    proposals[proposal].voteCount += 1;
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

  function winnerName() external view returns (bytes32 winnerName_) {
    winnerName_ = proposals[winningProposal()].name;
  }

  // will check if the caller has the right to vote
  function isElligibleToVote() public view returns (bool) {
    return IERC721(nftContractAddress).balanceOf(msg.sender) > 0;
  }
}
