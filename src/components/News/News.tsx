import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import demoImage from "../../images/demoImage.jpg";
import { useGetCryptosQuery } from "../../services/cryptoApi";

interface INews {
	simplified?: boolean;
}
const News = ({ simplified }: INews) => {
	const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
	const { data: cryptoNews } = useGetCryptoNewsQuery({
		newsCategory,
		count: simplified ? 6 : 12,
	});
	const { data } = useGetCryptosQuery(100);

	const { Text, Title } = Typography;
	const { Option } = Select;

	if (!cryptoNews?.value) return <h1>Loading ...</h1>;

	return (
		<Row gutter={[24, 24]}>
			{!simplified && (
				<Col span={24}>
					<Select
						showSearch
						className="select-news"
						placeholder="Select a Crypto"
						optionFilterProp="children"
						onChange={(value) => setNewsCategory(value)}
						filterOption={(input, option: any) =>
							option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						<Option value="Cryptocurrency">Cryptocurrency</Option>
						{data?.data?.coins.map((coin: any) => (
							<Option value={coin.name}>{coin.name}</Option>
						))}
					</Select>
				</Col>
			)}
			{cryptoNews.value.map((news: any, i: number) => (
				<Col xs={24} sm={12} lg={8} key={i}>
					<Card hoverable className="news-card">
						<a href={news.url} target="_blank" rel="noreferrer">
							<div className="news-image-container">
								<Title className="news-title" level={4}>
									{news.name}
								</Title>
								<img
									style={{ maxWidth: "200px", maxHeight: "100px" }}
									src={news?.image?.thumbnail?.contentUrl || demoImage}
									alt={news.name}
								/>
							</div>
							<p>
								{news.description.length > 100
									? `${news.description.substring(0, 100)} ...`
									: news.description}
							</p>
							<div className="provider-container">
								<div>
									<Avatar
										src={
											news.provider[0]?.image?.thumbnail?.contentUrl ||
											demoImage
										}
									/>
									<Text className="provider-name">
										{news.provider[0]?.name}
									</Text>
								</div>
								<Text>
									{moment(news.datePublished).startOf("seconds").fromNow()}
								</Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default News;
