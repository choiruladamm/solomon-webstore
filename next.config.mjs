/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.solomon.id',
			},
		],
		unoptimized: true,
	},
};

export default nextConfig;
