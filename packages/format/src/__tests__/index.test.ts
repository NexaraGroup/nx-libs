import * as format from '@nxlibs/format';
import { describe, expect, it } from 'vitest';

describe('index.ts 导出聚合', () => {
	it('应正确导出 formatDate', () => {
		expect(typeof format.formatDate).toBe('function');
	});

	it('应正确导出 formatNumber', () => {
		expect(typeof format.formatNumber).toBe('function');
	});
});
