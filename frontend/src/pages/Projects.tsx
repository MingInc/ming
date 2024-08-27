export default function Projects() {
  return (
    <div className="mx-auto max-w-7xl container">
      <div className="my-8">
        <p className="text-2xl font-medium">Let's build something new.</p>
        <p className="text-sm text-gray-600">
          To deploy a new Project, import an existing Git Repository or get
          started with one of our Templates.
        </p>
      </div>

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="border p-3 px-4 rounded-md">
            <p className="text-sm font-medium">Import Git Repository</p>
        </div>
        <div className="border p-3 px-4 rounded-md">
        <div className="items-center flex justify-between">
        <p className="text-sm font-medium">Clone Template</p>
        <button className="flex items-center gap-1 text-sm">Framework <i className="ri-arrow-down-s-line"></i></button>
        </div>
        </div>
      </div>
    </div>
  );
}
