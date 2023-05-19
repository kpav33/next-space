// When a route segment is in brackets [] that means its a dynamic route parameter that we can access from the URL

// If we wanted to change caching on this page, we could export the dynamic variable with force-dynamic value to make sure that it always fetches the latest data
// export const dynamic = "force-dynamic";
// Or if we know the data is only updated occassionaly we can use the revalidate variable to update the cache every n seconds
export const revalidate = 1200; // not necessary, just for ISR demonstration

// This must corespond to the Post object that we created in the api content route
interface Post {
  title: string;
  content: string;
  slug: string;
}

export async function generateStaticParams() {
  const posts: Post[] = await fetch("http://localhost:3000/api/content").then(
    (res) => res.json()
  );

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Create local TypeScript interface for the params object, if you would want to opt out of TypeScript you could simply use the any prop for the params
interface Props {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: Props) {
  // deduped
  // When you are in a server component you will always need to use a fully qualified URL, relative URLs will not work
  const posts: Post[] = await fetch("http://localhost:3000/api/content").then(
    (res) => res.json()
  );
  // We can also control cache at the fetch level
  // For example if this data changes every time we could use the no-store option to never cache it or force-cache to always cache it
  //   const posts: Post[] = await fetch("http://localhost:3000/api/content", {
  //     cache: "",
  //   }).then((res) => res.json());

  // Exclamation mark at the end is a non-null assertion in TypeScript which tells the compiler that we know for sure that we will not have a null value here, which will prevent certain TypeScript errors in the IDE
  // Should be used sparingly, better practice would be to check for null values at run time and throw an error if you can't find the data you are looking for
  const post = posts.find((post) => post.slug === params.slug)!;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
