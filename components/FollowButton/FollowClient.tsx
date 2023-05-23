// This is a client component
"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
  targetUserId: string;
  isFollowing: boolean;
}

export default function FollowClient({ targetUserId, isFollowing }: Props) {
  const router = useRouter();
  // useTransition is a special React hook that tells us if we still have a loading state that is pending
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const follow = async () => {
    // Set isFetching to true then start the request and wait for it to finish
    setIsFetching(true);

    const res = await fetch("/api/follow", {
      method: "POST",
      body: JSON.stringify({ targetUserId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Once we have the response, the action is completed and we can set the isFetching value to false
    setIsFetching(false);

    console.log(res);

    // This lets us make a new request to the server for the route we are currently on
    // This will now once again check to see if the current user follows the target user and it will do so seamlessly without changing the state on the page
    startTransition(() => {
      // Refresh the current route:
      // - Makes a new request to the server for the route
      // - Re-fetches data requests and re-renders Server Components
      // - Sends the updated React Server Component payload to the client
      // - The client merges the payload without losing unaffected
      //   client-side React state or browser state
      router.refresh();
    });
  };

  const unfollow = async () => {
    // Same pattern used here as with the follow function
    setIsFetching(true);

    const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
      method: "DELETE",
    });

    setIsFetching(false);
    startTransition(() => router.refresh());
  };

  // If user is already following this users show an option to unfollow them, else allow them to follow them
  if (isFollowing) {
    return (
      <button onClick={unfollow}>{!isMutating ? "Unfollow" : "..."}</button>
    );
  } else {
    return <button onClick={follow}>{!isMutating ? "Follow" : "..."}</button>;
  }
}
