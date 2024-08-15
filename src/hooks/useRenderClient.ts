import { useEffect, useState } from 'react';

export function useRenderClient() {
	const [isRenderClient, setIsRenderClient] = useState<boolean>(false);

	useEffect(() => {
		!isRenderClient && setIsRenderClient(true);
	}, [isRenderClient]);

	return { isRenderClient };
}
