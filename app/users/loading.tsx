// Create a file with the name loading and export a component where the JSX represents the UI that you want to show, while the data is being fetched in the main page component
// The loading UI will apply to the child components as well if they don't have any specific loading files specified, so in example of the users folder it applies both to the page.tsx file in the root users folder and to page.tsx file in the [id] subfolder
// If you would want to create a different loading UI for the [id] path, you could simply create another loading.tsx file in the [id] folder

export default function LoadingUsers() {
  return <div>Loading user data...</div>;
}
