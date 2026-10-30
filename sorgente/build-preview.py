# Genera l'anteprima: sito.html (il sito con CSS, font, logo e JS incorporati; foto e video
# restano file in assets/img e assets/video, da pubblicare accanto)
# e anteprima.html (selettore Desktop / Mobile che mostra sito.html).
# Uso: python3 build-preview.py <cartella-progetto> <cartella-output>
import base64, re, sys, pathlib
src = pathlib.Path(sys.argv[1]); out = pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
def b64(p, mime): return f"data:{mime};base64," + base64.b64encode((src/p).read_bytes()).decode()
def css_file(name):
    c = (src/f'assets/css/{name}.css').read_text()
    return re.sub(r'url\("\.\./fonts/([^"]+\.woff2)"\)', lambda m: f'url("{b64("assets/fonts/"+m.group(1), "font/woff2")}")', c)

html = (src/'index.html').read_text()
css = "\n".join(css_file(n) for n in ['tokens', 'typography', 'bracco', 'site'])
html = re.sub(r'(<link rel="stylesheet" href="assets/css/[^"]+">\n?)+', '<style>\n' + css.replace('\\', '\\\\') + '</style>\n', html)
html = re.sub(r'<link rel="icon"[^>]*>\n?', '', html)
html = re.sub(r'<script src="(assets/js/[^"]+)"></script>', lambda m: '<script>\n' + (src/m.group(1)).read_text() + '</script>', html)
html = html.replace('<script>\n', '<script>window.BRACCO_PREVIEW=true;\n', 1)
html = re.sub(r'src="(assets/logo/[^"]+\.svg)"', lambda m: f'src="{b64(m.group(1), "image/svg+xml")}"', html)
(out/'sito.html').write_text(html)

sans = "\n".join(f'@font-face{{font-family:"Bracco Sans";src:url("{b64(f"assets/fonts/BraccoSans-{w}.woff2", "font/woff2")}") format("woff2");font-weight:{n};font-display:swap}}'
                 for w, n in [('Regular', 400), ('Medium', 500), ('SemiBold', 600)])
page = (src/'anteprima.html').read_text()
page = page.replace('/*{{TOKENS}}*/', (src/'assets/css/tokens.css').read_text() + sans)
page = page.replace('{{MARK}}', b64('assets/logo/bracco-mark.svg', 'image/svg+xml'))
(out/'anteprima.html').write_text(page)
print('ok', len(html), len(page))
