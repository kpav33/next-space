import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

export default function Home() {
  const session = getServerSession();

  // You can use redirect in combination with session data to protect your route and redirect any users that are not logged in
  // if (!session) {
  //   console.log(session);
  //   redirect("/api/auth/signin");
  //   // return <p>You must be signed in...</p>
  // }

  return (
    <div>
      <h1>Welcome to NextSpace!</h1>
      <p>
        A next-gen social media app to connect with frens inspired by MySpace
      </p>
      <p>To get started, sign up for an account</p>
    </div>
  );
}
