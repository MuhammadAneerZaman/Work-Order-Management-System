import { NextResponse } from "next/server";




export async function POST( request:Request ){
try {
    const {email, password} = await request.json();
    
    



} catch (error) {
    return NextResponse.json({success:false,error:"Something went wrong"},{status:500})
}
}