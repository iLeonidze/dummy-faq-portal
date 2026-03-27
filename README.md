# dummy-faq-portal

A small static FAQ portal about nginx, served by nginx and packaged as a Docker image.

## What is inside

- `site/` contains the interlinked HTML pages plus shared CSS and JavaScript.
- `nginx.conf` provides the nginx runtime configuration for the container.
- `basic-auth.htpasswd` stores the demo credentials used by the protected routes.
- `Dockerfile` builds an image that serves the site on port `80`.
- `.github/workflows/docker-publish.yml` builds the image in GitHub Actions and pushes it to GitHub Container Registry on `main`.

## Local run

```bash
docker build -t dummy-faq-portal .
docker run --rm -p 8080:80 dummy-faq-portal
```

Then visit `http://127.0.0.1:8080/`.

## Main routes

- `/`
- `/faq.html`
- `/getting-started.html`
- `/operations.html`
- `/pages/configuration.html`
- `/pages/performance.html`

## Basic auth demo pages

The protected section lives under `/private/` with hardcoded credentials:

```text
username: test
password: test
```

Protected routes included in the image:

- `/private/`
- `/private/status.html`
- `/private/runbook.html`

## Container image publishing

The workflow publishes to:

```text
ghcr.io/<owner>/dummy-faq-portal
```

On pushes to `main`, the workflow emits branch, short-SHA, and `latest` tags.
On semantic version tags such as `v1.2.3`, it also emits version tags.
