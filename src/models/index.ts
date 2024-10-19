export interface CategoryOfItems {
	id: string
	name: string
	items: Item[]
	[key: string]: any
}

export interface Item {
	id: string
	name: string
	size: string
	price: string
	quantity: number
	img: string
	category: {
		name: string
		[key: string]: any
	}
	description: string
	sold?: number
	[key: string]: any
}

export interface Courier {
	id: string
	phone: string
	login: string
	fullname: string
	password: string
	orders: Order[]
	createdAt: Date
	ordersLength: number | string
	[key: string]: any
}

export interface Order {
	id: string
	price: string
	deliveryFee: string
	items: Item[]
	location: string
	lat: string
	lng: string
	status: OrderStatus
	client: Client
	courier: Courier
	createdAt: Date
	clientId: string
	courierId: string
}

export interface Client {
	id: string
	phone: string
	fullname: string
	confirmation?: any
	telegramId: string
	orders: Order[]
	createdAt?: Date
}

type OrderStatus =
	| 'CREATED'
	| 'COOKING'
	| 'ONTHEWAY'
	| 'ARRIVED'
	| 'COMPLETED'
	| 'CANCELLED_BY_CLIENT'
	| 'CANCELLED_BY_COURIER'
	| 'CANCELLED_BY_SERVER'
