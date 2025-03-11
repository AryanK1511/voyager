#!/usr/bin/env python3

import typer
from downstream.google_drive import GoogleDrive

app = typer.Typer()


@app.command()
def test():
    google_drive = GoogleDrive()
    documents = google_drive.get_documents()
    print(documents)


@app.command()
def goodbye(name: str, formal: bool = False):
    if formal:
        print(f"Goodbye Ms. {name}. Have a good day.")
    else:
        print(f"Bye {name}!")


if __name__ == "__main__":
    app()
