import Link from "next/link";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-8 py-20 text-center lg:flex-row lg:text-left">
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold leading-tight text-[#b0998a] lg:text-6xl">
            Discover, Borrow & Manage Books Easily
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-600">
            A modern library management platform where members can explore
            thousands of books, borrow them online, and manage their reading
            journey effortlessly.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/books"
              className="rounded-xl bg-[#9F5C23] px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#5B2501]"
            >
              Browse Books
            </Link>

            <Link
              href="/register"
              className="rounded-xl border-2 border-[#9F5C23] px-6 py-3 text-lg font-semibold text-[#9F5C23] transition hover:bg-[#9F5C23] hover:text-white"
            >
              Join Library
            </Link>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="mt-16 flex flex-1 justify-center lg:mt-0">
          <div className="rounded-3xl bg-white p-10 shadow-xl">
            <div className="text-8xl">📚</div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-8 py-10 md:grid-cols-4">
        {[
          ["10K+", "Books"],
          ["2K+", "Members"],
          ["500+", "Authors"],
          ["24/7", "Access"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="rounded-2xl bg-white p-8 text-center shadow"
          >
            <h2 className="text-4xl font-bold text-[#9F5C23]">{value}</h2>
            <p className="mt-2 text-gray-600">{label}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-8 py-20">
        <h2 className="mb-12 text-center text-4xl font-bold text-[#5B2501]">
          Why Choose Our Library?
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "📖",
              title: "Easy Borrowing",
              desc: "Borrow books with just a few clicks.",
            },
            {
              icon: "📅",
              title: "Track Due Dates",
              desc: "Never miss your return deadlines.",
            },
            {
              icon: "💰",
              title: "Fine Management",
              desc: "View and manage your fines easily.",
            },
            {
              icon: "🔍",
              title: "Search Books",
              desc: "Find books instantly by title or author.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-8 shadow transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-5xl">{item.icon}</div>

              <h3 className="mt-5 text-2xl font-bold text-[#5B2501]">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#9F5C23] py-20 text-center text-white">
        <h2 className="text-4xl font-bold">
          Start Your Reading Journey Today
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-100">
          Register now and explore thousands of books available in our digital
          library.
        </p>

        <Link
          href="/register"
          className="mt-8 inline-block rounded-xl bg-white px-8 py-3 font-semibold text-[#9F5C23] transition hover:bg-gray-100"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}

    </main>
  );
};

export default HomePage;