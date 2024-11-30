type Props = {
	className?: string;
	children?: React.ReactNode;
};

export default function Container({ className = "", children }: Props) {
	return (
		<div
			className={`h-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 ${className}`}
		>
			{children}
		</div>
	);
}
