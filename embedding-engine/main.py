#!/usr/bin/env python3

import typer
from constants import datasources
from services.embedding import EmbeddingService
from utils.logging import console, err_console

app = typer.Typer()


@app.command()
def embed():
    console.print(
        "[yellow]Please select datasources to embed (comma-separated numbers):[/yellow]"
    )
    for i, source in enumerate(datasources, 1):
        console.print(f"  {i}. {source}")
    console.print(f"  {len(datasources) + 1}. Exit")

    selection = typer.prompt("Enter your selection")

    try:
        selected_indices = [int(idx.strip()) for idx in selection.split(",")]
    except ValueError:
        err_console.print(
            "[red]Invalid selection. Please enter comma-separated numbers.[/red]"
        )
        raise typer.Exit(code=1)

    if len(datasources) + 1 in selected_indices:
        console.print("[yellow]Exiting embedding process.[/yellow]")
        raise typer.Exit(code=0)

    console.print("\n[bold green]Starting embedding process[/bold green]\n")
    embedding_service = EmbeddingService()

    for idx in selected_indices:
        if idx < 1 or idx > len(datasources):
            console.print(f"[red]Invalid selection: {idx}. Skipping.[/red]")
            continue

        datasource = datasources[idx - 1]

        if datasource == "Google Drive":
            console.print("🔹 [blue]Processing Google Drive documents...[/blue]")
            embedding_service.embed_google_drive_data()
        elif datasource == "GitHub":
            console.print(
                "[bold yellow]GitHub integration not implemented yet.[/bold yellow]"
            )
            # TODO: Implement GitHub integration
        elif datasource == "LinkedIn":
            console.print(
                "[bold yellow]LinkedIn integration not implemented yet.[/bold yellow]"
            )
            # TODO: Implement LinkedIn integration
        elif datasource == "Website":
            console.print(
                "[bold yellow]Website scraping not implemented yet.[/bold yellow]"
            )
            # TODO: Implement website scraping

    console.print("\n[bold green]Embedding process completed![/bold green]")


if __name__ == "__main__":
    app()
