import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Ensure OpenAPI JSON files are available at runtime for copy-markdown / llms routes
    outputFileTracingIncludes: {
      '/[lang]/llms.mdx/[[...slug]]': ['./openapi/generated/**/*'],
      '/[lang]/llms-full.txt': ['./openapi/generated/**/*'],
    },
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        // newapi.pro domains
        'docs.newapi.pro',
        'newapi.pro',
        'api.gravitex.ai',
        // newapi.ai domains
        'docs.newapi.ai',
        'newapi.ai',
        'www.newapi.ai',
        // Vercel preview
        'gravitex-api-docs-v1.vercel.app',
      ],
    },
  },
  async headers() {
    return [
      {
        // Apply charset to HTML pages
        source: '/:lang(en|zh|ja)/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/html; charset=utf-8',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/:lang/docs/:path*.mdx',
        destination: '/:lang/llms.mdx/:path*',
      },
    ];
  },
};

export default withMDX(config);
