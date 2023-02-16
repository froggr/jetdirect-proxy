# jetdirect-proxy 

A super simple tool to proxy JetDirect print jobs.

## Features

This extension was built to allow you to develop zpl labels in GitHub Codespaces and print to your local JetDirect printer on port 9100.

When the extension is activated it opens a TCP listener on port 9001. When it received a connection it then opens up a connection with the local ZPL printer emulator which it assumes to be running at localhost:9100.

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

This extension was made to allow proxying print jobs in codespaces to a ZPL emulator. If you have any usecases feel free to open an issue or better yet for the repo, make your change, and open a pull request. 

## Extension Settings

Right now there are no settings however I'll be adding host and client port mapping settings so that you could print to a local networked JetDirect printer and not be restricted to localhost.

