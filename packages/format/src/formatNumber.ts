import BigNumber from "big.js";

export interface FormatNumberOptions {
  /**
   * 是否去除尾部的0
   * @default true
   */
  removeTrailingZeros?: boolean;

  /**
   * 是否添加千分位分隔符
   * @default true
   */
  addThousandsSeparator?: boolean;
}

const DEFAULT_NUMBER_OPTIONS: FormatNumberOptions = {
  removeTrailingZeros: true,
  addThousandsSeparator: true,
};

/**
 * 格式化数字
 * @param value - 要格式化的值，可以是数字或字符串
 * @param options - 格式化选项
 * @returns 格式化后的字符串，如果输入无效则返回'-'
 */
export function formatNumber(
  value: unknown,
  options: FormatNumberOptions = DEFAULT_NUMBER_OPTIONS,
): string {
  const mergedOptions = { ...DEFAULT_NUMBER_OPTIONS, ...options };
  const { removeTrailingZeros, addThousandsSeparator } = mergedOptions;

  // 处理数字类型
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return "-";
    }
    return formatValidNumber(value, removeTrailingZeros, addThousandsSeparator);
  }

  // 处理字符串类型
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") {
      return "-";
    }

    const parsedNumber = Number(trimmed);
    if (Number.isNaN(parsedNumber) || !Number.isFinite(parsedNumber)) {
      return "-";
    }

    return formatValidNumber(
      parsedNumber,
      removeTrailingZeros,
      addThousandsSeparator,
    );
  }

  // 其他类型返回'-'
  return "-";
}

/**
 * 格式化有效数字
 */
function formatValidNumber(
  value: number,
  removeTrailingZeros: boolean,
  addThousandsSeparator: boolean,
): string {
  try {
    // 使用Big.js处理数字，避免浮点数精度问题
    const bigValue = new BigNumber(value);
    let formatted = bigValue.toString();

    // 去除尾部的0
    if (removeTrailingZeros && formatted.includes(".")) {
      formatted = formatted.replace(/\.?0+$/, "");
    }

    // 添加千分位分隔符
    if (addThousandsSeparator) {
      const parts = formatted.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      formatted = parts.join(".");
    }

    return formatted;
  } catch (error) {
    return "-";
  }
}
