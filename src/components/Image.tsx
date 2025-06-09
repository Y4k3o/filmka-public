import { ImgHTMLAttributes, useEffect, useState } from "react";

type ImageWithFallbackProps = ImgHTMLAttributes<HTMLImageElement> & {
	fallback: string;
	src?: string | null;
};

export const Image = ({ fallback, src, ...rest }: ImageWithFallbackProps) => {
	const [imgSrc, setImgSrc] = useState(() => (src ? src : fallback));

	useEffect(() => {
		if (src) setImgSrc(src);
	}, [src]);

	return (
		<img
			{...rest}
			src={imgSrc}
			onError={() => {
				if (imgSrc !== fallback) setImgSrc(fallback);
			}}
		/>
	);
};
