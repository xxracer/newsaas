import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of known studio domains (in production, this would be checked against Firestore)
// For now, we'll allow any domain and check at runtime

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Remove www. prefix and convert to lowercase
  const domain = hostname.toLowerCase().replace('www.', '');

  // Define your main app domains (where the admin/dashboard lives)
  const mainDomains = [
    'localhost:9002',
    'localhost:3000',
    'localhost:9003',
    'localhost:9004',
    'localhost:9005',
    'waxingsetudios.com',
    'www.waxingsetudios.com',
  ];

  // Check if this is a custom studio domain
  const isMainDomain = mainDomains.includes(domain);

  // Get the pathname
  const { pathname } = request.nextUrl;

  // API routes - allow through
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Static files - allow through
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Rewrite logic:
  // - Main domain: show landing page / marketing site
  // - Studio domain: show studio's frontend
  // - /admin/* routes: only accessible from main domain or with proper auth

  if (isMainDomain) {
    // On main domain, admin routes go to admin, everything else is marketing
    if (pathname.startsWith('/admin')) {
      return NextResponse.next();
    }
    if (pathname.startsWith('/auth')) {
      return NextResponse.next();
    }
    // Marketing/landing page for waxingsetudios SaaS
    return NextResponse.next();
  } else {
    // Custom studio domain - rewrite to studio frontend
    // The [domain] folder will handle the rewrite

    // Don't rewrite API calls - they need the original path
    if (pathname.startsWith('/api/')) {
      const response = NextResponse.next();
      response.headers.set('x-studio-domain', domain);
      return response;
    }

    // Rewrite to studio version
    const url = request.nextUrl.clone();
    url.pathname = `/studio/${domain}${pathname}`;

    const response = NextResponse.rewrite(url);
    response.headers.set('x-studio-domain', domain);
    response.headers.set('x-is-studio-domain', 'true');

    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (robots.txt, sitemap.xml, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
