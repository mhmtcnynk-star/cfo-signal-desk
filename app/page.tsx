import Dashboard from "./dashboard-client";
import {
  chatGPTSignInPath,
  chatGPTSignOutPath,
  getChatGPTUser,
} from "./chatgpt-auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getChatGPTUser();

  if (!user) {
    return (
      <main className="authShell">
        <section className="authPanel" aria-labelledby="signin-title">
          <div className="brandMark" aria-hidden="true">CFO</div>
          <p className="eyebrow">CFO Signal Desk</p>
          <h1 id="signin-title">Your morning finance brief, in under five minutes.</h1>
          <p className="authCopy">
            A private workspace for company context, daily signals, decisions,
            and follow-through.
          </p>
          <a className="primaryButton authButton" href={chatGPTSignInPath("/")}>
            Sign in with ChatGPT
          </a>
          <p className="privacyNote">
            Your dashboard is visible only after sign-in. Demo data works without
            an OpenAI API key.
          </p>
        </section>
      </main>
    );
  }

  return (
    <Dashboard
      user={{ displayName: user.displayName, email: user.email }}
      signOutPath={chatGPTSignOutPath("/")}
    />
  );
}
