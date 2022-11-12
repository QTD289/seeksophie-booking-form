import { RefObject, useEffect } from "react";

export const useOnClickOutside = (
	ref: RefObject<any>,
	onClickOutside: () => void
) => {
	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (ref.current && !ref.current.contains(event.target))
				onClickOutside();
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref]);
};
