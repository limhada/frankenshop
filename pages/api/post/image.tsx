import { NextApiRequest, NextApiResponse } from "next";

// TODO: 사용법 블로그에 정리하기

import aws from 'aws-sdk'
// npm install aws-sdk 로 설치
// 서버컴포넌트에서 aws 기능을 사용하기 위한 라이브러리

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  aws.config.update({
    // aws S3 - 셋팅용 코드
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
    region: 'ap-northeast-2', // 서울리전
    signatureVersion: 'v4',
  })

  const s3 = new aws.S3();
  const url = await s3.createPresignedPost({ 
    // createPresignedPost를 사용하면 Presigned URL 발급해줌
    Bucket: process.env.S3_BUCKET_NAME,
    Fields: { key : req.query.file }, // <- 유저가 선택한 파일명도 기재해주는게 좋음
    Expires: 30, // seconds 유효기간 초 단위로 설정 가능
    Conditions: [
      ['content-length-range', 0, 5242880], //파일용량 5MB 까지 제한
    ],
  })

  res.status(200).json(url)
}