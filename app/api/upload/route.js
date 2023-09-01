import multiparty from 'multiparty';
import { NextResponse } from 'next/server';

// export const api = {bodyParse: false}

// export async function POST(req) {
//     const form = new multiparty.Form();
//     const { fields, files } = await new Promise((resolve, reject) => {
//         form.parse(req, (err, fields, files) => {
//             if (err) reject(err);
//             resolve(fields, files);
//         });
//     });
//     console.log('length:', files);
// }

export async function POST(request) {
    const formData = await request.formData();
    const file = formData.get('file');
    console.log(file);
    return NextResponse.json('ok')
}