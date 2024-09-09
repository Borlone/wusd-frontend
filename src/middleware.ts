import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
   // handle the authorization in here
   const isAuthenticated = false;

   if (isAuthenticated && request.nextUrl.pathname.startsWith('/sign-in')) {
      return NextResponse.redirect(new URL('/', request.url));
   }

   if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ['/missions', '/sign-in'],
};
