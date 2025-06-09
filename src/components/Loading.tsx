import { cn } from "@/lib/utils";

const Loading = ({ className }: { className?: string }) => {
	return (
		<div className={cn("flex justify-center items-center min-h-[600px] w-full", className)}>
			<div className="text-5xl font-logo font-bold text-primary">Filmka</div>
		</div>
	);
};

export default Loading;
