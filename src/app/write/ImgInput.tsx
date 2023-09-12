'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"


export default function Write() {

  const [createURL, setCreateURL] = useState('')
  const [file, setFile] = useState<File>(); // 이미지 파일 상태 추가
  
    return (
      <div className="p-20">
      <h4>글작성</h4>
          <input type="file" accept="image/*"
            onChange={ async(e)=>{
              let file = e.target.files?.[0]
              if(file) {
                setFile(file)
                const blob = new Blob([file], { type: file.type });
                const url = URL.createObjectURL(blob);
                setCreateURL(url)
              }
              
            }}
          />
          <img src={createURL}/>
          <button type="submit">글작성버튼</button>
      </div>
    ) 
}