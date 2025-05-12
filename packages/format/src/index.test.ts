import { describe, expect, it } from 'vitest';

import { formatDate } from './formatDate';

// 测试：格式化 Date 对象
it('格式化 Date 对象', () => {
	const date = new Date('2023-01-01T12:34:56');
	expect(formatDate(date)).toBe('2023-01-01 12:34:56');
});

// // 测试：格式化时间戳（数字）
// it('格式化时间戳（数字）', () => {
// 	const timestamp = 1672569296000; // 2023-01-01 12:34:56
// 	expect(formatDate(timestamp)).toBe('2023-01-01 12:34:56');
// });

// // 测试：格式化时间戳字符串
// it('格式化时间戳字符串', () => {
// 	const timestampStr = '1672569296000';
// 	expect(formatDate(timestampStr)).toBe('2023-01-01 12:34:56');
// });

// 测试：格式化日期字符串
it('格式化日期字符串', () => {
	const dateStr = '2023-01-01T12:34:56';
	expect(formatDate(dateStr)).toBe('2023-01-01 12:34:56');
});

// 测试：自定义格式
it('自定义格式', () => {
	const date = new Date('2023-01-01T12:34:56');
	expect(formatDate(date, { format: 'YYYY/MM/DD' })).toBe('2023/01/01');
});

// 测试：无效日期（字符串）
it('无效日期字符串返回 "-"', () => {
	expect(formatDate('not-a-date')).toBe('-');
});

// 测试：无效日期（数字）
it('无效数字返回 "-"', () => {
	expect(formatDate(NaN)).toBe('-');
});

// // 测试：空值、null、undefined
// describe('空值、null、undefined', () => {
// 	it('空字符串返回 "-"', () => {
// 		expect(formatDate('')).toBe('-');
// 	});
// 	it('null 返回 "-"', () => {
// 		expect(formatDate(null)).toBe('-');
// 	});
// 	it('undefined 返回 "-"', () => {
// 		expect(formatDate(undefined)).toBe('-');
// 	});
// });

// // 测试：异常捕获（模拟 dayjs 抛错）
// it('dayjs 抛异常时返回 "-"', () => {
// 	// 这里用 Proxy 模拟 dayjs 抛异常
// 	const backup = globalThis.dayjs;
// 	// 模拟 dayjs 抛异常
// 	globalThis.dayjs = () => {
// 		throw new Error('mock error');
// 	};
// 	expect(formatDate('2023-01-01')).toBe('-');
// 	// 恢复 dayjs
// 	globalThis.dayjs = backup;
// });
