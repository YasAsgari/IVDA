import { useState } from "react";

type Props = {
	description: string;
};

export default function Information({ description }: Props) {
	const [visible, setVisible] = useState(false);

	return (
		<p
			className="relative inline-block size-4 cursor-help rounded-full border border-[#007bff] bg-[#e1effe] text-center font-bold normal-case text-[#007bff]"
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
		>
			?
			<span
				className="absolute left-0 top-0 z-50 w-max max-w-36 translate-x-4 rounded-lg border border-gray-300 bg-white p-2 font-medium text-gray-600 duration-500"
				style={{
					opacity: visible ? 1 : 0,
					pointerEvents: visible ? "all" : "none",
				}}
			>
				{description}
			</span>
		</p>
	);
}
