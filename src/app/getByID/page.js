"use client";
import { useState } from 'react';

export default function FetchNFTById() {
    const [contractAddress, setContractAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [tokenId, setTokenId] = useState('');
    const [nftData, setNftData] = useState(null);
    const [error, setError] = useState(null);
    const [chainNetwork, setchainNetwork] = useState('CELO');


    const fetchNFT = async () => {
        if (!contractAddress || !tokenId) {
            setError('Both Contract Address and Token ID are required');
            return;
        }
        setLoading(true)
        const url = `https://api.rarible.org/v0.1/items/${chainNetwork}:${contractAddress}:${tokenId}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-API-KEY': process.env.NEXT_PUBLIC_RARIBLE_API_KEY,
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error('Failed to fetch NFT data');
            const data = await response.json();
            setNftData(data);
            setError(null);
            setLoading(false)

        } catch (err) {
            setError(err.message);
            setNftData(null);
            setLoading(false)

        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5 text-center">Fetch Specific NFT</h1>

            <div className="mb-5">
                <div className='my-1'>Choose BlockChain Network</div>

                <select
                    value={chainNetwork}
                    className="border rounded p-2 w-1/9"
                    onChange={(e) => setchainNetwork(e.target.value)}
                >
                    <option value="5IRECHAIN">5ireChain</option>
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

                <label> Search and get a specific NFT from {chainNetwork} Network</label>

                <input
                    type="text"
                    placeholder="Enter Contract Address"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    className="border rounded p-2 w-full my-2"
                />
                <input
                    type="text"
                    placeholder="Enter Token ID"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                    className="border rounded p-2 w-full my-2"
                />
                <button
                    onClick={fetchNFT}
                    disabled={loading}
                    className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600"
                >
                    {loading ? "Fetching NFT Data..." : 'Fetch Data'}
                </button>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {nftData && (
                    <div className="border rounded shadow-lg p-5 mt-5 overflow-hidden col-span-full ">
                        {nftData.meta?.content && nftData.meta.content.length > 0 && (
                            <div className='w-full text-center justify-center flex items-center'>
                                <img
                                    src={nftData.meta.content[0].url}
                                    alt={nftData.meta.name || 'NFT Image'}
                                    className="object-cover mb-4 rounded"
                                />
                            </div>
                        )}
                        <h3 className="text-lg font-semibold mb-2">{nftData.meta?.name || 'Unnamed NFT'}</h3>
                        <p className="text-gray-600 mb-2">{nftData.meta?.description || 'No description available'}</p>
                        <p className="text-sm text-gray-500"><strong className='text-lg font-bold text-gray-600'>Contract:</strong> {nftData.contract}</p>
                        <p className="text-sm text-gray-500"><strong className='text-lg font-bold text-gray-600'>Token ID:</strong> {tokenId}</p>
                        <p className="text-sm text-gray-500"><strong className='text-lg font-bold text-gray-600'>Minted At:</strong> {nftData.mintedAt ? new Date(nftData.mintedAt).toLocaleString() : 'N/A'}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
