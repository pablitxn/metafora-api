export interface IPost {
	id?: string
	title: string
	sub_title: string
	author: string
	src_background: string
	alt_background: string
	img_author?: string
	brief_header?: string
	article: string
	is_deleted?: boolean
	is_draft?: boolean
	created_at?: Date
}
