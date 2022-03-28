## 最近带领小伙伴给组件库增加单元测试

## 汇总一下，从0到1可使用：

```
// 用到的依赖
{
    "@types/jest": "^24.0.18",
    "@types/enzyme": "^3.10.3",
    "@types/enzyme-adapter-react-16": "^1.0.5",
    "@types/react-test-renderer": "^16.9.5",
    "babel-jest": "^27.5.1",
    "enzyme": "^3.10.0",
    "enzyme-adapter-react-16": "^1.14.0",
    "jest": "^24.9.0",
    "react-test-renderer": "^16.14.0",
    "ts-jest": "^24.0.2"
}
```

配置jest.config.js
```
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	verbose: false, // 设置console可打印出来
	setupFiles: ['./tests/setup.js'],
	transform: {
		'^.+\\.jsx?$': 'babel-jest', //这个是jest的默认配置
		'^.+\\.ts?$': 'ts-jest', //typescript转换
	},
	transformIgnorePatterns: [
		'/dist/',
		'node_modules/[^/]+?/(?!(es|node_modules)/)', // Ignore modules without es dir
	],
	unmockedModulePathPatterns: ['node_modules/react/', 'node_modules/enzyme/'],
};

```

setup.js
```
import Enzyme from 'enzyme';

// eslint-disable-next-line no-console
// console.log('Current React Version:', React.version);

import Adpater from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adpater() });
```

指令
```
"scripts": {
        "test": "jest",
    },
```
