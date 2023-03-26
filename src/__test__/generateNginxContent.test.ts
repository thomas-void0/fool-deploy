import generateNginxContent from '../lib/generateNginxContent';

describe('generateNginxContent', () => {
  it('generate nginx content', () => {
    expect(generateNginxContent()).toMatch(`
server {
    listen       80;
    root         /usr/share/nginx/html;
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
                try_files $uri  $uri/ /index.html;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
    `);
  });
});
