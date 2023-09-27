import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import { faBars } from '@fortawesome/free-solid-svg-icons'; // 'faBars' 아이콘을 가져옵니다

export default function Category() {
  return (
    <div>
      {/* TODO: 마우스 오버 or 클릭 시 카테고리 보이게 */}
      <FontAwesomeIcon icon={faBars} />
    </div>
  );
}
