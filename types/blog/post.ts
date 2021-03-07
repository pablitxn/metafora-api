export interface IPost {
	id?: number
	title: string
	subTitle?: string
	author?: string
	srcBackground?: string
	altBackground?: string
	imgAuthor?: string
	briefHeader?: string
	article: string
	isDeleted?: boolean
	isDraft?: boolean
	updatedAt?: Date
	createdAt?: Date
}
