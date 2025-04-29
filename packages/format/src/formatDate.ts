import dayjs from 'dayjs';

export interface FormatDateOptions {
	/**
	 * 日期格式
	 * @default "YYYY-MM-DD HH:mm:ss"
	 */
	format?: string;
}

const DEFAULT_DATE_OPTIONS: FormatDateOptions = {
	format: 'YYYY-MM-DD HH:mm:ss',
};

/**
 * 格式化日期
 * @param value - 要格式化的日期，可以是Date对象、时间戳或日期字符串
 * @param options - 格式化选项
 * @returns 格式化后的日期字符串，如果输入无效则返回'-'
 */
export function formatDate(
	value: unknown,
	options: FormatDateOptions = DEFAULT_DATE_OPTIONS,
): string {
	const mergedOptions = { ...DEFAULT_DATE_OPTIONS, ...options };
	const { format } = mergedOptions;

	try {
		// 对于字符串类型，尝试检测是否是时间戳字符串
		if (typeof value === 'string') {
			const trimmed = value.trim();
			// 如果是纯数字字符串，可能是时间戳字符串，尝试转换为数字
			if (/^\d+$/.test(trimmed)) {
				const timestamp = Number(trimmed);
				const date = dayjs(timestamp);
				if (date.isValid()) {
					return date.format(format);
				}
			}
		}

		// 处理数字类型（时间戳）或其他类型
		const date = dayjs(value as Parameters<typeof dayjs>[0]);
		if (date.isValid()) {
			return date.format(format);
		}

		return '-';
	} catch (error) {
		return '-';
	}
}
