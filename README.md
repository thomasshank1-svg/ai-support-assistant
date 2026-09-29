# SourceDesk

SourceDesk is a local support assistant demo for AI Apps & Integration work. It searches a small knowledge base, shows source documents, and saves support tickets when the answer is not covered.

## Run

```sh
python3 server.py
```

Open `http://127.0.0.1:8101`.

## Optional AI mode

Document search works without credentials. To try live generation, set both variables before starting the server:

```sh
export OPENAI_API_KEY="your-key"
export OPENAI_MODEL="gpt-4.1-mini"
python3 server.py
```

The provider call is server-side and disabled unless both variables are present.

## What it demonstrates

- Retrieval from trusted source documents
- Optional OpenAI Responses API adapter
- Ticket creation and SQLite persistence
- Basic request validation and local security headers
- Unit-style HTTP tests

## Test

```sh
python3 -m unittest discover -s tests -v
```

This is a portfolio demo, not a production help desk.
