import { Duration } from "./deps.ts";
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
      const duration = new Duration(
        tourneyB.startDate.getTime() - requestDate.getTime(),
      );
      const remainingTime = duration.toDescriptiveString();
      const discordTime = toDiscordTime(tourneyB.startDate);
      return renderPageResponse({
        date: requestDate.toUTCString(),
        remainingTime,
        // Escape the Discord time.
        discordTime: discordTime.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
        current: {
          name: tourneyA.name,
          startDate: tourneyA.startDate.toUTCString(),
        },
        next: {
          name: tourneyB.name,
          startDate: tourneyB.startDate.toUTCString(),
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
  remainingTime: string;
  discordTime: string;
  current: OnlineTourneyProps;
  next: OnlineTourneyProps;
}

interface OnlineTourneyProps {
  name: string;
  startDate: string;
}

function renderOnlineTourneyHTML(props: OnlineTourneyProps) {
  return `<p><b>Name</b>: ${props.name}</p>
<p><b>Start date</b>: <time datetime="${props.startDate}">${props.startDate}</time></p>`;
}

function renderPageHTML(props: PageProps) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Super Smash Bros. Ultimate | Online Tourney</title>
      <meta name="robots" content="index,follow">
      <meta name="googlebot" content="index,follow">
      <meta property="og:title" content="Super Smash Bros. Ultimate | Online Tourney">
      <meta property="og:description" content="Super Smash Bros. Ultimate | Online Tourney - ${props.remainingTime} remaining time until the next ${props.next.name} tourney.">
      <meta property="og:type" content="website">
      <meta property="og:image" content="https://ssb.wiki.gallery/images/5/5e/SSBU_Panoramic.png">

      <style>
        img {
          width: 100%;
        }
      </style>
    </head>
    <body>
      <h1>Super Smash Bros. Ultimate | Online Tourney</h1>

      <p><b>Current date</b>: <time datetime="${props.date}">${props.date}</time></p>

      <h2>Current tourney</h2>
      ${renderOnlineTourneyHTML(props.current)}

      <h2>Next tourney</h2>
      ${renderOnlineTourneyHTML(props.next)}
      <p><b>Begins</b>: ${props.remainingTime}</p>
      <p><b>Discord time</b>: <code>${props.discordTime}</code></p>

      <a href="https://www.ssbwiki.com/Online_Tourney">
        <img src="https://ssb.wiki.gallery/images/5/5e/SSBU_Panoramic.png" alt="Super Smash Bros. Ultimate everyone is here" />
      </a>

      <footer>
        <p>Source code: <a href="https://github.com/EthanThatOneKid/ssbu_online_tourney">etok.codes/ssbu_online_tourney</a>!</p>
      </footer>

      <script src="https://ethanthatonekid.github.io/dropin-minimal-css/switcher.js" type="text/javascript"></script>
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

function toDiscordTime(date: Date): string {
  return `<t:${~~(date.getTime() * 0.001)}:R>`;
}
