import Image from "next/image";

const features = [
  { name: "☁️ Secure Cloud Environment", description: "Environment powered by different droplets, docker container, or whichever mechanism is secured." },
  {
    name: "🌐 Immutable Data & Availability",
    description:
      "Data related to Ming will be openly available & secured utilizing blockchain technology.",
  },
  { name: "🤝 Open Community x DAO", description: 'We are trying build an open community powered by DAO and distributed architecture system.' },
  { name: "♻️ Carbon Reduction Program", description: "We welcome every kind of idle personal computers, but mostly the one that contributes to Electronic Waste." },
];

export default function Landing() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl gap-x-8 gap-y-8 px-4 py-2 sm:px-6 sm:py-8 lg:max-w-7xl flex flex-col xl:flex-row items-center">
        <div className="flex-1">
          <div>
            <Image
              alt="Ming"
              width={100}
              height={20}
              className="mb-4"
              src="https://ik.imagekit.io/lexy/Ming/Screenshot%202024-08-22%20174630.png?updatedAt=1724363207670"
            />
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Building distributed system for Open Source Cloud.
            </h2>
          </div>
          <p className="mt-4 text-gray-500">
            We are trying to provide a platform that empowers incentivizing unused computer
            devices as secure and efficient cloud environments through
            distributed system powered by web3.
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
