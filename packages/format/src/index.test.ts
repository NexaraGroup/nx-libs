import { describe, expect, it } from 'vitest';

import * as format from './index';

describe('index.ts 导出聚合', () => {
	it('应正确导出 formatDate', () => {
		expect(typeof format.formatDate).toBe('function');
	});

	it('应正确导出 formatNumber', () => {
		expect(typeof format.formatNumber).toBe('function');
	});
});
