// import kv from "@vercel/kv";
import { revalidatePath } from "next/cache";
import styles from "./page.module.scss";

interface Dog {
  name: string;
  image: string;
  breed: string;
}

export default async function DogEditPage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch data
  const key = `dogs:${params.id}`;
  //   const dog = await kv.get<Dog>(key);
  let dog = {
    name: "Dog",
    image: "/mememan.webp",
    breed: "breed",
  };

  async function upDog(formData: FormData) {
    // This is a server function which you must mark with the "use server" keywords, Next.js will automatically turn this into a server side endpoint, you can access headers and cookies here as needed
    "use server";

    // Mutate data
    // await kv.set(key, {
    //   name: formData.get("title"),
    //   image: formData.get("image"),
    //   breed: formData.get("breed"),
    // });
    // dog = {
    //   name: "Dog new",
    //   image: "/mememan.webp",
    //   breed: "breed new",
    // };
    // setTimeout(() => {
    //   console.log("Delayed for 1 second.");
    // }, 1000);

    // Revalidate the page and update server components
    revalidatePath(`/dogs/${params.id}/edit`);
  }

  return (
    <div className={styles.cardBody}>
      <h2>Edit {dog?.name}</h2>

      <form action={upDog}>
        <label>Name</label>
        <input name="title" type="text" defaultValue={dog?.name} />
        <label>Image</label>
        <input name="image" type="text" defaultValue={dog?.image} />
        <label>Breed</label>
        <input name="breed" type="text" defaultValue={dog?.breed} />
        <button type="submit">Save and Continue</button>
      </form>
    </div>
  );
}
