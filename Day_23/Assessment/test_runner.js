const http = require('http');

const BASE_URL = 'http://localhost:3000/api/v1/courses';

function request(method, path, data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, body: body ? JSON.parse(body) : null });
                } catch (e) {
                    resolve({ status: res.statusCode, body: body });
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function runTests() {
    console.log('🔍 Starting API Verification...');

    try {
        // 1. GET All Courses
        process.stdout.write('Test 1: GET /api/v1/courses ... ');
        let res = await request('GET', '/api/v1/courses');
        if (res.status === 200 && Array.isArray(res.body)) {
            console.log('✅ PASS');
        } else {
            console.log('❌ FAIL');
            console.error('   Expected 200 OK with array, got:', res.status, res.body);
        }

        // 2. POST New Course
        process.stdout.write('Test 2: POST /api/v1/courses (Valid) ... ');
        res = await request('POST', '/api/v1/courses', { name: 'New Course', duration: '2 weeks' });
        let newId = res.body?.id;
        if (res.status === 201 && res.body.name === 'New Course') {
            console.log('✅ PASS');
        } else {
            console.log('❌ FAIL');
            console.error('   Expected 201 Created, got:', res.status, res.body);
        }

        // 3. POST Invalid Course (Validation)
        process.stdout.write('Test 3: POST /api/v1/courses (Invalid - No Name) ... ');
        res = await request('POST', '/api/v1/courses', { duration: '2 weeks' });
        if (res.status === 400 && res.body.error) {
            console.log('✅ PASS');
        } else {
            console.log('❌ FAIL');
            console.error('   Expected 400 Bad Request, got:', res.status, res.body);
        }

        // 4. PUT Update Course
        if (newId) {
            process.stdout.write('Test 4: PUT /api/v1/courses/:id ... ');
            res = await request('PUT', `/api/v1/courses/${newId}`, { name: 'Updated Course', duration: '3 weeks' });
            if (res.status === 200 && res.body.name === 'Updated Course') {
                console.log('✅ PASS');
            } else {
                console.log('❌ FAIL');
                console.error('   Expected 200 OK, got:', res.status, res.body);
            }
        }

        // 5. DELETE Course
        if (newId) {
            process.stdout.write('Test 5: DELETE /api/v1/courses/:id ... ');
            res = await request('DELETE', `/api/v1/courses/${newId}`);
            if (res.status === 200) {
                console.log('✅ PASS');
            } else {
                console.log('❌ FAIL');
                console.error('   Expected 200 OK, got:', res.status, res.body);
            }
        }

        // 6. Rate Limiting
        process.stdout.write('Test 6: Rate Limiting (Triggering limit) ... ');
        // We've made 5 requests so far (GET, POST, POST, PUT, DELETE).
        // The limit is 5 per minute. The next one SHOULD fail.

        res = await request('GET', '/api/v1/courses');
        if (res.status === 429) {
            console.log('✅ PASS');
        } else {
            // If it didn't fail, maybe we need to spam a bit more
            let hitLimit = false;
            for (let i = 0; i < 5; i++) {
                res = await request('GET', '/api/v1/courses');
                if (res.status === 429) {
                    hitLimit = true;
                    break;
                }
            }
            if (hitLimit) {
                console.log('✅ PASS (after retry)');
            } else {
                console.log('❌ FAIL');
                console.error('   Expected 429 Too Many Requests, never hit limit.');
            }
        }

    } catch (error) {
        console.error('\n⚠️ Error running tests:', error.message);
        console.error('Make sure the server is running on port 3000');
    }
}

runTests();
