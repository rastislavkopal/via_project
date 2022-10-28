import React, { useEffect, useState } from 'react';
import {
  Layout, List, Typography, Image, Row, Col,
} from 'antd';
import axios from 'axios';
import { AiOutlineHeart } from 'react-icons/ai';

const { Title } = Typography;
const { Content } = Layout;

export default function Home() {
  const [facts, setFacts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const nFacts = 10;
  // const nSkip = 0;

  const factUrl = `https://catfact.ninja/facts?limit=${nFacts}&max_length=140`;
  const photosUrl = `http://shibe.online/api/cats?count=${nFacts}`;

  useEffect(() => {
    async function fetchFacts() {
      const result = await axios(
        factUrl,
      );
      setFacts(result.data.data);
    }
    async function fetchPhotos() {
      const result = await axios(
        photosUrl,
      );
      setPhotos(result.data);
    }

    fetchFacts();
    fetchPhotos();
  }, []);

  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <Title>Random cat facts!</Title>
        <List
          size="large"
          itemLayout="horizontal"
          bordered
          dataSource={facts}
          renderItem={(item, idx) => (
            <List.Item>
              <Row
                style={{ width: '100%' }}
              >
                <Col span={8}>
                  <Image
                    height={150}
                    src={photos[idx]}
                  />
                </Col>
                <Col span={12}>
                  {/* <Typography.Text>{`${idx}. `}</Typography.Text> */}
                  {
                    item.fact
                  }
                </Col>
                <Col>
                  <AiOutlineHeart />
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
    </Content>
  );
}
