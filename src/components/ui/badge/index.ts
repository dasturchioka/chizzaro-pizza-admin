import { type VariantProps, cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
	'inline-flex items-center rounded-md border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:border-neutral-800 dark:focus:ring-neutral-300',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-neutral-900 text-neutral-50 shadow dark:bg-neutral-50 dark:text-neutral-900',
				secondary:
					'border-transparent bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50',
				destructive:
					'border-transparent bg-red-500 text-neutral-50 shadow dark:bg-red-900 dark:text-neutral-50',
				outline: 'text-neutral-950 bg-neutral-50 dark:text-neutral-50 dark:bg-neutral-950',
				success: 'bg-green-500 text-white dark:bg-green-700 dark:text-white border-transparent',
				warning: 'bg-yellow-500 text-white dark:bg-yellow-700 dark:text-white border-transparent',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
