import React from 'react';
import qs from 'qs'

const About = ({location}) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  })
  console.log(query)

  const detail = query.detail === 'true' // 파싱결과는 문자열이다.

  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트랍니다.</p>
      {detail && <p>추가정보를 표시합니다.</p>}
    </div>
  );
};

export default About;