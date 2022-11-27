import React, { useEffect, useState } from 'react';
import {
  Layout, Typography, List, Col, Row, Image,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import useFetchWrapper from '../../_helpers/fetch_wrapper';
import authAtom from '../../_state/auth';

const { Content } = Layout;
const { Title } = Typography;

export default function Dashboard() {
  const fetchWrapper = useFetchWrapper();
  const [facts, setFacts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  const photosUrl = 'http://shibe.online/api/cats?count=100';

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
    async function fetchMyAPI() {
      const res = await fetchWrapper.get(`${process.env.REACT_APP_API_BASE}/v1/facts`);
      setFacts(res);
    }
    async function fetchPhotos() {
      const result = await axios(
        photosUrl,
      );
      setPhotos(result.data);
    }

    fetchPhotos();
    fetchMyAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Title>My favorite facts</Title>
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
                  item.text
                }
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </Content>
  );
}
