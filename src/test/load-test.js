import http from "k6/http";
import { check } from 'k6'

export const options = {
    iterations: 20,
    vus: 20,
    duration: '30s'
};

export default function () {
    const responses = http.batch([
        ['GET', 'https://test.k6.io', null, { tags: { ctype: 'html' } }],
        ['GET', 'https://test.k6.io/style.css', null, { tags: { ctype: 'css' } }],
        ['GET', 'https://test.k6.io/images/logo.png', null, { tags: { ctype: 'images' } }],
    ]);
    check(responses[0], {
        'main page status was 200': (res) => res.status === 200,
    });
    check(responses[1], {
        'main page status was 200': (res) => res.status === 200,
    });
    check(responses[2], {
        'main page status was 200': (res) => res.status === 200,
    });
}