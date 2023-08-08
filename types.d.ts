// Next.js 프로젝트에서 전역 객체에 _mongo 변수를 추가하고 해당 변수에 대한 타입 정보를 정의하는 데에 사용
import { MongoClient } from 'mongodb';

declare global {
  var _mongo: Promise<MongoClient> | undefined;
  /*  
  위 코드는 global 객체에 _mongo 변수를 추가하고 해당 변수의 타입을 명시적으로 정의. global 객체는 JavaScript의 전역 스코프에 있는 모든 변수에 연결되며 애플리케이션 전체에서 접근할 수 있습니다. 여기에서 미리 정의함으로써, 이전에 발생한 에러 'typeof globalThis' 형식에 인덱스 시그니처가 없으므로 요소에 암시적으로 'any' 형식이 있습니다. 를 해할 수 있었습니다.
  이 구문은 _mongo 변수를 전역 스코프에 추가하고, 그 타입을 Promise<MongoClient> 또는 undefined로 정의한다.
  이렇게 함으로써 TypeScript 컴파일러가 변수를 사용하는 코드에서 올바른 타입 정보를 가지게 됩니다.
  특히 Next.js 애플리케이션에서 많은 컴포넌트에서 공유되는 전역 객체를 설정할 때 유용합니다.
*/
}
