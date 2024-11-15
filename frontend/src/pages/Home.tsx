const features = [
  {
    name: "☁️ Secure Cloud Environment",
    description:
      "Leverage droplets, Docker containers, or other secure mechanisms for a robust and isolated cloud ecosystem.",
  },
  {
    name: "🌐 Immutable Data & Availability",
    description:
      "All data is securely stored on the blockchain, ensuring openness, immutability, and continuous availability.",
  },
  {
    name: "🤝 Open Community x DAO",
    description:
      "An open-source community governed by a DAO, driving innovation and collaboration through decentralized systems.",
  },
  {
    name: "♻️ Carbon Reduction Program",
    description:
      "We reduce e-waste by utilizing idle computers, turning them into efficient cloud nodes to help combat electronic waste.",
  },
];

export function Home() {
  // useEffect(() => {
  //   const _user = JSON.parse(
  //     localStorage.getItem("ming_authenticated_user") || "{}"
  //   );
  //   if (_user.email) return navigate("/dashboard");
  // }, []);



  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl gap-x-8 gap-y-8 px-4 py-2 sm:px-6 sm:py-8 lg:max-w-7xl flex flex-col xl:flex-row items-center">
        <div className="flex-1">
          <div>
            <img
              alt="Ming"
              width={100}
              height={20}
              className="mb-4"
              src="https://ik.imagekit.io/lexy/Ming/Screenshot%202024-08-22%20174630.png?updatedAt=1724363207670"
            />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Distributed, Secure, & Open-Source Cloud
            </h2>
          </div>
          <p className="mt-4 text-gray-500">
            Empowering idle devices to create secure and efficient cloud
            environments through Web3 and decentralized architecture.
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-y-7 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-2">
                <dt className="font-semibold text-gray-900">{feature.name}</dt>
                <dd className="mt-1 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex-1">
          <img
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            src="https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-[100%] h-[35em] object-cover md:w-[100vw]"
          />
        </div>
      </div>
    </div>
  );
}
