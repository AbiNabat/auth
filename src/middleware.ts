import {auth} from "@/auth";
import {authRoutes, publicRoutes} from "@/routes";
import { NextResponse} from "next/server";


export default  auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = req.auth;

    const isPublic = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    if (isPublic) {
        return NextResponse.next();
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return  NextResponse.redirect(new URL('/members', req.nextUrl.origin));
        }
        return NextResponse.next();
    }
    if(!isPublic && !isLoggedIn) {
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin));
    }
});
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
}