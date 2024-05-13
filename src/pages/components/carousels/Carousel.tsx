import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '400px',
  width: '90%',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  margin: '0 5%',
};

const App: React.FC = () => (
  <Carousel autoplay>
    <div className='crs-content'>
      <h3 style={contentStyle}>
        <img src="https://wscdn.vn/upload/image/13-418004996-684201329.jpg?size=1920x512&fomat=webp" height={'400px'} width={'100%'} />
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img src="https://wscdn.vn/upload/image/15-1876581131-798434204.jpg?size=1920x512&fomat=webp" height={'400px'} width={'100%'}/>
      </h3>
    </div>
    <div>
      <h3 style={contentStyle}>
        <img src="https://lh3.googleusercontent.com/pw/ADCreHfLK69ILbFpKRb2cOjXT1khgi-LXCSielF5Ta5G406nyAqJYkM9bGl4-PdDWkT1njla8ElENSAiGd5zw8aCX3gkPle232SNB4UyCltCc-DyrCSGIHDQpnu2ii7g1KcOdW9TkJnJoQW78x5A_4d-SIZT=w2048-h596-s-no?authuser=0" height={'400px'} width={'100%'}/>
      </h3>
    </div>
  </Carousel>
);

export default App;