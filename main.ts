import { tourneyAt } from "./lib/ssbu/mod.ts";

if (import.meta.main) {
  main();
}

function main() {
  Deno.serve(handleRequest);
}

function handleRequest(request: Request): Response {
  const url = new URL(request.url);
  switch (url.pathname) {
    case "/": {
      const requestDate = new Date();
      const tourneyA = tourneyAt(requestDate);
      const tourneyB = tourneyAt(requestDate, 1);
      return renderPageResponse({
        date: requestDate.toISOString(),
        current: {
          name: tourneyA.name,
          startDate: tourneyA.startDate.toISOString(),
        },
        next: {
          name: tourneyB.name,
          startDate: tourneyB.startDate.toISOString(),
        },
      });
    }

    default: {
      return new Response("Not found", { status: 404 });
    }
  }
}

interface PageProps {
  date: string;
  current: OnlineTourneyProps;
  next: OnlineTourneyProps;
}

interface OnlineTourneyProps {
  name: string;
  startDate: string;
}

function renderOnlineTourneyHTML(props: OnlineTourneyProps) {
  return `<p>Name: ${props.name}</p>
<p>Start date: ${props.startDate}</p>`;
}

function renderPageHTML(props: PageProps) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Super Smash Bros. Ultimate | Online Tourney</title>
    </head>
    <body>
      <h1>Super Smash Bros. Ultimate | Online Tourney</h1>
      <p>Current date: ${props.date}</p>
      <h2>Current tourney</h2>
      ${renderOnlineTourneyHTML(props.current)}
      <h2>Next tourney</h2>
      ${renderOnlineTourneyHTML(props.next)}
    </body>
  </html>`;
}

function renderPageResponse(props: PageProps) {
  return new Response(
    renderPageHTML(props),
    {
      headers: { "content-type": "text/html;charset=UTF-8" },
    },
  );
}
