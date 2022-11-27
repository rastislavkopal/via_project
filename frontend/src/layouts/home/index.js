import React, { useEffect, useState } from 'react';
import {
  Layout, List, Typography, Image, Row, Col, Button, message,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';
import { AiOutlineHeart } from 'react-icons/ai';
import useUserActions from '../../_actions/user.actions';
import authAtom from '../../_state/auth';

const { Title } = Typography;
const { Content } = Layout;

export default function Home() {
  const userActions = useUserActions();
  const [facts, setFacts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const nFacts = 25;
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  const factUrl = `https://catfact.ninja/facts?limit=${nFacts}&max_length=512`;
  const photosUrl = `http://shibe.online/api/cats?count=${nFacts}`;

  useEffect(() => {
    // redirect to home if already logged in
    if (!auth) {
      navigate('/sign-in');
    }
    async function fetchFacts() {
      const result = await axios(
        factUrl,
      );
      const shuffled = _.shuffle(result.data.data);
      setFacts(shuffled);
    }
    async function fetchPhotos() {
      const result = await axios(
        photosUrl,
      );
      setPhotos(result.data);
    }

    fetchFacts();
    fetchPhotos();
  }, [factUrl, photosUrl, auth, navigate]);

  const handleLike = (factText) => {
    userActions.saveFact(factText);
    message.info('Saved this fun fact!');
  };

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
                  <Button
                    type="primary"
                    icon={<AiOutlineHeart />}
                    onClick={() => handleLike(item.fact)}
                  >
                    Like
                  </Button>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
    </Content>
  );
}
