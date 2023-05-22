// import FollowButton from "@/components/FollowButton/FollowButton";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

interface Props {
  params: {
    id: string;
  };
}

// Since this is a dynamic path we can't export hardcoded metadata
// Instead we export a generateMetadata function to generate the metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `User profile of ${user?.name}` };
}

export default async function UserProfile({ params }: Props) {
  // Id in url will correspond with the user id in the database
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  const { name, bio, image, id } = user ?? {};

  return (
    <div>
      <h1>{name}</h1>

      <img
        width={300}
        src={image ?? "/mememan.webp"}
        alt={`${name}'s profile`}
      />

      <h3>Bio</h3>
      <p>{bio}</p>

      {/* @ts-expect-error Server Component */}
      {/* <FollowButton targetUserId={params.id} /> */}
      <button>Follow</button>
    </div>
  );
}
