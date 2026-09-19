---
title: Pynes
description: A classic minesweeper game for Linux, built with Python, GTK 4, and Libadwaita.
repo: https://github.com/astraldev/pynes
icon: /images/pynes.svg
version: 3.2.0
license: GPL-3.0
---

Mines for lines :)

Pynes is my take on the classic minesweeper game, made for the Linux desktop.
It's written in Python with GTK 4 and Libadwaita (through PyGObject, the Python
bindings for GTK), so it fits in with the rest of your GNOME apps.

![The Pynes game window](/images/pynes/app.png){width="560"}

## What can you do in it?

- Play on the usual board sizes: 8x8, 16x16, and 24x16.
- Set your own board size and how much of it is mines.
- Pick your own colors for the text and each kind of tile.
- Turn the animations on or off.
- Keep track of your best times on the leaderboard.

![The Pynes preferences window](/images/pynes/pref.png){width="420"}

## How did it start?

I first pushed Pynes in April 2022, and it has been rewritten a few times since
then. The latest round split the game handler into a separate state and engine,
which made the game logic a lot easier to follow.

## How do I install it?

For now, you build it from source with Meson. You'll need Python 3.10 or higher,
GTK 4, Libadwaita, and PyGObject installed first.

```bash
git clone https://github.com/astraldev/pynes
cd pynes
meson setup builddir
meson compile -C builddir
meson install -C builddir
```

Or build it as a Flatpak, if you have the GNOME SDK installed:

```bash
flatpak-builder --force-clean --user --install build-dir src/build-aux/flatpak/org.astralco.pynes.json
```

The full steps, including uninstalling, are in
[BUILD.md](https://github.com/astraldev/pynes/blob/master/BUILD.md).

## Found a bug?

[Open an issue](https://github.com/astraldev/pynes/issues/new) on GitHub, any
help is welcome. Pynes is licensed under GPL v3.
