import React from 'react';

import { useState, useLayoutEffect } from 'react';

import { Link } from 'react-router-dom'
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import TodayPicks from '../components/layouts/explore-01/TodayPicks'
import todayPickData from '../assets/fake-data/data-today-pick';

function fetchNFTs(contract){
    const options = {method: 'GET'};

    return fetch(`https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${contract}&order_direction=desc&offset=0&limit=20&include_orders=false`, options)
}


function getNFTdata(nfts){
    let data = []
  
    for(let nft of nfts){
      data.push({
        img: nft?.image_url ? nft?.image_url : nft?.asset_contract?.image_url,
        title: nft?.name ? nft?.name : nft?.asset_contract?.name,
        tags: nft.asset_contract.symbol,
        imgAuthor: nft.owner.profile_img_url,
        nameAuthor: nft.owner.user.username,
        price: `${nft?.last_sale?.payment_token?.eth_price ? parseFloat(nft?.last_sale?.payment_token?.eth_price) : "-"} ETH`,
        priceChange: "$12.246",
        wishlist: "100",
        imgCollection: nft.collection.image_url,
        nameCollection: nft.collection.name,
        tokenID: nft.token_id,
        contract: nft.asset_contract.address
    })
    }
  
    return data
}

const Explore01 = () => {
    // const [nfts, setNfts] = useState(todayPickData)
    const [nfts, setNfts] = useState([])

    const nft_contracts = ["0x381748c76f2b8871afbbe4578781cd24df34ae0d"]

    useLayoutEffect(() => {
        for(let contract of nft_contracts){
            let n = 0;
            setTimeout(() => {

                fetchNFTs(contract).then(response => response.json())
                .then(response => {
                    let assets = response["assets"]
                    console.log(assets);
                    // setNfts([...nfts, ...getNFTdata(assets)]);
                    setNfts([...nfts, ...getNFTdata(assets)])
                })
                .catch(err => console.error(err))

            }, 100*n + 1)

            n++
        }
    }, [])

    return (
        <div>
            <Header />
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Explore NFTs</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="#">Explore</Link></li>
                                    <li>Explore NFTs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                    
            </section>
            <TodayPicks data={nfts}/>
            <Footer />
        </div>
    );
}


export default Explore01;
