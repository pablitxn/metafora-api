type Limit = number | null
type Offset = number | null

export const getPaginationParams = (query: any) => {
	let limit: Limit
	let offset: Offset
	if (query.offset === undefined) offset = null
	if (query.limit === undefined) limit = null

	if (query.offset !== undefined) {
		offset = parseInt(query.offset)
	}
	if (query.limit !== undefined) {
		limit = parseInt(query.limit)
	}

	return {
		limit,
		offset
	}
}
