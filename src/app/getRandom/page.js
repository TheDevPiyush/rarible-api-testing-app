"use client"
import { useEffect, useState } from 'react';

export default function Home() {
    const [nfts, setNfts] = useState([]);
    const [size, setSize] = useState(0);
    const [loading, setLoading] = useState(false);

    // ONE DEFAULT BLOCK CHAIN NETWORK
    const [chainNetwork, setchainNetwork] = useState('CELO');

    const fetchNFTs = async () => {
        if (size < 1) return alert("Please provide how many NFTs to fetch.");
        const url = `https://testnet-api.rarible.org/v0.1/items/all?blockchains=${chainNetwork}&size=${size}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-API-KEY': process.env.NEXT_PUBLIC_RARIBLE_API_KEY,
            },
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setNfts(data.items || []);
        } catch (error) {
            console.error('Error fetching NFTs:', error);
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5 text-center">Random NFT Viewer</h1>
            <div className=''>Choose BlockChain Network</div>
            <select
                value={chainNetwork}
                className="border rounded p-2 w-1/9"
                onChange={(e) => setchainNetwork(e.target.value)}
            >
                <option value="FIVIRE">5ireChain</option>
                <option value="ETHEREUM">Ethereum</option>
                <option value="POLYGON">Polygon</option>
                <option value="CELO">Celo</option>
                <option value="BSC">Binance Smart Chain</option>
                <option value="SOLANA">Solana</option>
                <option value="AVALANCHE">Avalanche</option>
                <option value="ARBITRUM">Arbitrum</option>
                <option value="FANTOM">Fantom</option>
                <option value="OPTIMISM">Optimism</option>
            </select>
            <div className="mb-5 flex justify-center gap-2">
                <label className='items-center justify-center flex-col flex' htmlFor="size">Fetch some random NFTs from {chainNetwork} network :</label>
                <input
                    id='size'
                    type="number"
                    placeholder="Enter number of NFTs to fetch"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="border rounded p-2 w-1/3"
                />
                <button
                    onClick={fetchNFTs}
                    disabled={loading}
                    className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                >
                    {loading ? "Fetching NFT Data..." : 'Fetch Data'}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
                {nfts.length > 0 ? (
                    nfts.map((nft) => (
                        <div key={nft.id} className="border rounded shadow-lg p-5 overflow-hidden">
                            {nft.meta?.content && nft.meta.content.length > 0 && (
                                <img
                                    src={nft.meta.content[0].url}
                                    alt={nft.meta.name || 'NFT Image'}
                                    className="w-full h-48 object-cover mb-4 rounded"
                                />
                            )}
                            <h3 className="text-lg font-semibold mb-2">{nft.meta?.name || 'Unnamed NFT'}</h3>
                            <p className="text-gray-600 mb-2">{nft.meta?.description || 'No description available'}</p>
                            <p className="text-sm text-gray-500"><strong className='text-lg font-bold text-gray-600'>Contract:</strong> {nft.contract}</p>
                            <p className="text-sm text-gray-500"><strong className='text-lg font-bold text-gray-600'>Token ID:</strong> {nft.tokenId || 'Unknown Token ID'}</p>
                            <p className="text-sm text-gray-500"><strong className='text-lg font-bold text-gray-600'>Minted At:</strong> {new Date(nft.mintedAt).toLocaleString()}</p>
                            <p className="text-sm text-gray-500"><strong className='text-lg font-bold text-gray-600'>Collection:</strong> {nft.itemCollection?.name || 'Unknown Collection'}</p>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">No NFT to Display.</p>
                )}
            </div>
        </div>
    );
}
