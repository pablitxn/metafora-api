export interface IPost {
	id?: number
	title: string
	sub_title?: string
	author?: string
	src_background?: string
	alt_background?: string
	img_author?: string
	brief_header?: string
	article: string
	is_deleted?: boolean
	is_draft?: boolean
	updated_at?: Date
	created_at?: Date
}

export const fieldSpec = [
	{ field: 'id', render: true, required: false },
	{ field: 'title', render: true, required: true },
	{ field: 'subTitle', map: 'sub_title', render: true, required: false },
	{ field: 'author', required: false },
	{ field: 'srcBackground', map: 'src_background', render: false, required: false },
	{ field: 'altBackground', map: 'alt_background', render: false, required: false },
	{ field: 'imgAuthor', map: 'img_author', render: false, required: false },
	{ field: 'briefHeader', map: 'brief_header', render: false, required: false },
	{ field: 'article', render: false, required: true },
	{ field: 'isDeleted', map: 'is_deleted', render: false, required: false },
	{ field: 'isDraft', map: 'is_draft', render: false, required: false },
	{ field: 'updatedAt', map: 'updated_at', render: false, required: false },
	{ field: 'createdAt', map: 'created_at', render: false, required: false }
]
