import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as nftIDL } from './nft.did';
import { Principal } from '@dfinity/principal';

// Define the NFT structure
type NFT = {
  id: string;
  owner: Principal;
  name: string;
  description: string;
  attributes: Record<string, any>;
  dynamic: boolean;
};

const NFT_COLLECTION: NFT[] = [];

export const createNFT = async (
  name: string,
  description: string,
  attributes: Record<string, any>,
  dynamic: boolean
): Promise<string> => {
  const id = `nft-${NFT_COLLECTION.length + 1}`;
  const newNFT: NFT = {
    id,
    owner: Principal.anonymous(),
    name,
    description,
    attributes,
    dynamic,
  };
  NFT_COLLECTION.push(newNFT);
  return id;
};

export const updateNFT = async (
  id: string,
  newAttributes: Record<string, any>
): Promise<boolean> => {
  const nft = NFT_COLLECTION.find((nft) => nft.id === id);
  if (nft && nft.dynamic) {
    nft.attributes = { ...nft.attributes, ...newAttributes };
    return true;
  }
  return false;
};

export const getNFT = async (id: string): Promise<NFT | null> => {
  return NFT_COLLECTION.find((nft) => nft.id === id) || null;
};

// Other functions like transferOwnership, listNFTs, etc. can be added similarly
