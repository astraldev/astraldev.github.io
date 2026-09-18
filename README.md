# Portfolio

My personnal portfolio.

## How to update Build

Run `git subtree push --prefix dist origin gh-pages`

## Writing voice guide

The tone of voice guide is committed encrypted as `content/TONE.md.gpg`. The plain `content/TONE.md` is gitignored and excluded from the site build.

Hint: key is you period!

Decrypt it:

```bash
gpg --output content/TONE.md --decrypt content/TONE.md.gpg
```

After editing, encrypt it again:

```bash
gpg --symmetric --cipher-algo AES256 --output content/TONE.md.gpg content/TONE.md
```
