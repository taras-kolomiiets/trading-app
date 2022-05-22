import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import Cryptocurrencies from "../Cryptocurrencies";
import News from "../News";
import Loader from "../Loader";

const HomePage = () => {
	const { data, isFetching } = useGetCryptosQuery(10);
	const cryptoCurrency = data?.data?.stats;

	const { Title } = Typography;

	if (isFetching) return <Loader />;

	return (
		<>
			<Title level={2} className="heading">
				Global Crypto Stats
			</Title>
			<Row>
				<Col span={12}>
					<Statistic
						title="Total Cryptocurrencies"
						value={cryptoCurrency.total}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Exchanges"
						value={millify(cryptoCurrency.totalExchanges)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Market Cap"
						value={millify(cryptoCurrency.totalMarketCap)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total 24h Volume"
						value={millify(cryptoCurrency.total24hVolume)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Markets"
						value={millify(cryptoCurrency.totalMarkets)}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Coins"
						value={millify(cryptoCurrency.totalCoins)}
					/>
				</Col>
			</Row>
			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Top 10 Cryptocurrencies in the world
				</Title>
				<Title level={3} className="show-more">
					<Link to="/cryptocurrencies">Show more</Link>
				</Title>
			</div>
			<Cryptocurrencies simplified />
			<div className="home-heading-container">
				<Title level={2} className="home-title">
					Latest Crypto News
				</Title>
				<Title level={3} className="show-more">
					<Link to="/news">Show more</Link>
				</Title>
			</div>
			<News simplified />
		</>
	);
};

export default HomePage;
