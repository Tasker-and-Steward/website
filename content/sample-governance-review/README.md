Source for `public/downloads/sample-ai-governance-review.pdf` and its cover image.

To rebuild after editing `report.html` (fonts come from `node_modules/@fontsource`):

    mkdir -p fonts && cp ../../node_modules/@fontsource/libre-caslon-text/files/libre-caslon-text-latin-{400-normal,400-italic,700-normal}.woff2 ../../node_modules/@fontsource/libre-franklin/files/libre-franklin-latin-{400,500,600,700}-normal.woff2 fonts/
    google-chrome --headless=new --no-pdf-header-footer --print-to-pdf=../../public/downloads/sample-ai-governance-review.pdf "file://$PWD/report.html"
