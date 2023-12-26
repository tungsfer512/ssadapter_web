export enum EOperatorType {
	EQUAL = 'eq',
	NOT_EQUAL = 'ne',
	CONTAIN = 'contain',
	NOT_CONTAIN = 'not_contain',
	START_WITH = 'start',
	END_WITH = 'end',
	LESS_EQUAL = 'lte',
	GREAT_EQUAL = 'gte',
	LESS_THAN = 'lt',
	GREAT_THAN = 'gt',
	BETWEEN = 'between',
	NOT_BETWEEN = 'not_between',
	INCLUDE = 'in',
	NOT_INCLUDE = 'not_in',
	NULL = 'null',
	NOT_NULL = 'not_null',
}

export const OperatorLabel = {
	[EOperatorType.EQUAL]: 'Bằng',
	[EOperatorType.NOT_EQUAL]: 'Không bằng',
	[EOperatorType.CONTAIN]: 'Chứa',
	[EOperatorType.NOT_CONTAIN]: 'Không chứa',
	[EOperatorType.START_WITH]: 'Bắt đầu bằng',
	[EOperatorType.END_WITH]: 'Kết thúc bằng',
	[EOperatorType.LESS_EQUAL]: 'Nhỏ hơn hoặc bằng',
	[EOperatorType.LESS_THAN]: 'Nhỏ hơn',
	[EOperatorType.GREAT_EQUAL]: 'Lớn hơn hoặc bằng',
	[EOperatorType.GREAT_THAN]: 'Lớn hơn',
	[EOperatorType.BETWEEN]: 'Trong khoảng',
	[EOperatorType.NOT_BETWEEN]: 'Ngoài khoảng',
	[EOperatorType.INCLUDE]: 'Thuộc',
	[EOperatorType.NOT_INCLUDE]: 'Không thuộc',
	[EOperatorType.NULL]: 'Trống',
	[EOperatorType.NOT_NULL]: 'Không trống',
};