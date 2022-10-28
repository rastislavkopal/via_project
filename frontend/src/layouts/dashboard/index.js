// import React, { useEffect, useState } from 'react';
// import {
//   Layout, Col, Row, Typography, List,
// } from 'antd';
// import CreateClaim from '../../components/claim/create';
// import CreateArticle from '../../components/article/create';
// import Claim from '../../components/claim';
// import Article from '../../components/article';
import React from 'react';
import {
  Layout, Typography,
} from 'antd';

const { Content } = Layout;
const { Title } = Typography;

export default function Dashboard() {
  // const [articleSubmited, setArticleSubmited] = useState(false);
  // const [article, setArticle] = useState({});
  // const [claims, setClaims] = useState([]);

  // useEffect(() => {}, [claims]);

  return (
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Title>My favorite facts</Title>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        List of random my fav
      </div>
    </Content>
    // <Content className="site-layout" style={{ padding: '50px 0 0 0', marginTop: 40 }}>
    //   <Row
    //     gutter={{
    //       xs: 16, sm: 16, md: 16, lg: 16,
    //     }}
    //     style={{
    //       margin: 0,
    //     }}
    //   >
    //     <Col
    //       xs={24}
    //       sm={24}
    //       md={13}
    //       lg={14}
    //       xl={14}
    //       style={{
    //         minHeight: '250px',
    //       }}
    //     >
    //       <div
    //         style={{
    //           background: (articleSubmited) ? '#fffffa' : '#9E9E9E',
    //         }}
    //       >
    //         {addArticleComponent}
    //       </div>
    //     </Col>
    //     <Col
    //       xs={24}
    //       sm={24}
    //       md={9}
    //       lg={10}
    //       xl={10}
    //       style={{
    //         minHeight: '250px',
    //       }}
    //     >
    //       <div
    //         style={{
    //           background: (articleSubmited) ? '#9E9E9E' : '#fffffa',
    //           border: '5px bold',
    //           padding: '10px 40px',
    //         }}
    //       >
    //         <Title level={5}>Add claim to article</Title>
    //         <CreateClaim
    //           articleSubmited={articleSubmited}
    //           claims={claims}
    //           setClaims={setClaims}
    //           article={article}
    //         />
    //       </div>
    //     </Col>
    //   </Row>
    //   {(articleSubmited && <Title level={3}>List of claims:</Title>)}
    //   <Row
    //     style={{
    //       margin: 0,
    //     }}
    //   >
    //     <Col xs={24} sm={24} md={13} lg={14} xl={14}>
    //       <List
    //         style={{
    //           paddingBottom: '10px',
    //         }}
    //       >
    //         {
    //  claims.map((obj) => <div key={obj._id} style={{ padding: '20px' }}><Claim {...obj} /></div>)
    //         }
    //       </List>
    //     </Col>
    //   </Row>
    // </Content>
  );
}
