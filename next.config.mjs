/** @type {import('next').NextConfig} */
const nextConfig = {
	poweredByHeader: false,
	optimizeFonts: false,
	env: {
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
		NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:4000/api/:path*',
			},
			{
				source: '/uploads/:path*',
				destination: 'http://localhost:4000/uploads/:path*',
			},
		];
	},
};

export default nextConfig;
