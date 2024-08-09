export function convertMongoDate(date: string): string {
	return new Date(date).toLocaleDateString('ru');
}
