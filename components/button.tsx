import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center font-medium bg-accent text-muted-foreground hover:bg-accent-hover hover:text-foreground transition-all cursor-pointer active:scale-95",
	{
		variants: {
			size: {
				default: "h-9 px-4 rounded-xl text-xs",
				icon: "h-9 w-9 rounded-xl text-xs",
			},
		},
		defaultVariants: {
			size: "default",
		},
	},
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
	children?: React.ReactNode;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({ className, size, children, onClick }: ButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(buttonVariants({ size, className }))}
		>
			{children}
		</button>
	);
}

export { Button, buttonVariants };
