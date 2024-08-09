import { JwtPayload, jwtDecode } from 'jwt-decode';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface DecodedToken extends JwtPayload {
	_id: string;
	isAdmin: boolean;
}

export function middleware(request: NextRequest) {
	const token = request.cookies.get('accessToken')?.value;
	const url = request.nextUrl.clone();

	const userRole = checkUserRole(token);

	if (
		(url.pathname.startsWith('/manage') && userRole !== 'admin') ||
		(url.pathname.startsWith('/profile') && userRole === '')
	) {
		url.pathname = '/404';
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

function checkUserRole(token: string | undefined): string {
	if (!token) return '';

	const decoded = jwtDecode<DecodedToken>(token);

	if (decoded._id && decoded.isAdmin) return 'admin';
	else if (decoded._id) return 'user';
	else {
		return '';
	}
}

export const config = {
	matcher: ['/manage/:path*', '/profile/:path*'],
};
