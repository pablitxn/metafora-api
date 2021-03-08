// const CustomError = require('../util/CustomError')

const modelsMap = {}

class Model {
	fieldSpec: any
	private __constructor: string
	id: any
	createdAt: any
	validate: any
	render: any
	constructor(fieldSpec, fields) {
		this.__constructor = this.constructor.name
		this.isNew = this.isNew.bind(this)
		this.inflate = this.inflate.bind(this)
		this.validate = this.validate.bind(this)
		this.render = this.render.bind(this)

		this.fieldSpec = fieldSpec
		fieldSpec.forEach((spec) => {
			spec.map = spec.map || spec.field
			spec.render = spec.render || false
			spec.required = spec.required || false
		})

		this.inflate(fields)
	}

	// Keep a map of model classes in memory that we can use to
	// deserialize models using their __constructor property
	// static register(Model) {
	// 	modelsMap[Model.name] = Model
	// }

	isNew() {
		return !this.id
	}

	inflate(fields) {
		this.id = fields.id
		this.createdAt = fields.created_at

		this.fieldSpec.forEach((spec) => {
			const newVal = fields[spec.map]
			this[spec.field] = newVal
		})

		return this
	}

	static uninflate(record) {
		record.fieldSpec.forEach((spec) => {
			record[spec.map] = record[spec.field]
		})
	}

	// validate(silent = false) {
	// 	//Check for missing fields that are required
	// 	let errors = this.fieldSpec
	// 		.filter((s) => s.required && (this[s.field] === undefined || this[s.field] === ''))
	// 		.map((s) => ({ field: s.map, message: 'is missing' }))

	// 	//Check for fields that are invalid types
	// 	this.fieldSpec
	// 		.filter(
	// 			(s) =>
	// 				!(s.required && this[s.field] === '') &&
	// 				this[s.field] !== undefined &&
	// 				this[s.field] !== null &&
	// 				((s.type && this[s.field].constructor.name !== s.type) ||
	// 					(s.type === 'Number' && isNaN(this[s.field])) ||
	// 					(s.type === 'String' && this[s.field] === '' && s.isNotEmptyString !== false))
	// 		)
	// 		.map((s) => ({ field: s.map, message: 'is invalid' }))
	// 		.forEach((e) => errors.push(e))

	// 	if (this.id !== undefined && isNaN(this.id)) {
	// 		errors.push({ field: 'id', message: 'is invalid' })
	// 	}

	// 	if (!silent && errors.length > 0) throw CustomError.validationError(errors)

	// 	return errors
	// }

	// async populatePath() {
	// 	return this
	// }

	// async populate(...fields) {
	// 	await Promise.all(fields.map((field) => this.populatePath(field)))
	// 	return this
	// }

	// render(options = {}) {
	// 	let fields = {}
	// 	options.exclude = options.exclude || []

	// 	if (!this.isNew() && !options.exclude.includes('id')) {
	// 		fields.id = this.id
	// 	}

	// 	this.fieldSpec
	// 		.filter((s) => s.render)
	// 		.forEach((spec) => {
	// 			const val = this[spec.field]
	// 			if (val != undefined && !options.exclude.includes(spec.field)) {
	// 				if (Array.isArray(val)) {
	// 					fields[spec.map] = val.map((m) => (m.render ? m.render() : m))
	// 				} else {
	// 					fields[spec.map] = val.render ? val.render() : val
	// 				}
	// 			}
	// 		})

	// 	return fields
	// }

	// Recurse through a model and deserialize it using its saved constructor prop
	// Necessary because serializing obliterates its methods (such as render())
	// static modelify(record) {
	// 	// recursively apply to all members of this, depth-first
	// 	if (record instanceof Object) {
	// 		if (record instanceof Array) {
	// 			record.forEach((v, i) => {
	// 				record[i] = Model.modelify(v)
	// 			})
	// 		} else {
	// 			for (let prop in record) {
	// 				record[prop] = Model.modelify(record[prop])
	// 			}

	// 			if (!!record.__constructor) {
	// 				Model.uninflate(record)
	// 				record = Reflect.construct(modelsMap[record.__constructor], [record])
	// 			}
	// 		}
	// 	}
	// 	return record
	// }
}

export default Model
