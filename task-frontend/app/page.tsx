import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b">
        <h1 className="text-xl font-semibold">TaskFlow</h1>
        <div className="space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 border rounded"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Organize Your Work.
          <br />
          Stay Focused.
        </h2>

        <p className="text-gray-600 max-w-2xl mb-8">
          A secure and simple task management platform
          built with modern architecture. Track tasks,
          filter by status, search instantly, and stay productive.
        </p>

        <div className="flex gap-4">
          <Link
            href="/register"
            className="px-6 py-3 bg-black text-white rounded"
          >
            Start Free
          </Link>

          <Link
            href="/login"
            className="px-6 py-3 border rounded"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-lg font-semibold mb-3">
              Secure Authentication
            </h3>
            <p className="text-gray-600">
              JWT-based authentication with access and refresh
              tokens ensures protected and scalable APIs.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-lg font-semibold mb-3">
              Smart Task Filtering
            </h3>
            <p className="text-gray-600">
              Search by title, filter by status, and
              paginate results for efficient task tracking.
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-lg font-semibold mb-3">
              Built with Modern Stack
            </h3>
            <p className="text-gray-600">
              Next.js, TypeScript, Prisma, PostgreSQL —
              engineered for reliability and performance.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to boost productivity?
        </h2>
        <p className="text-gray-600 mb-8">
          Create your account and start managing tasks today.
        </p>

        <Link
          href="/register"
          className="px-8 py-4 bg-black text-white rounded text-lg"
        >
          Create Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} TaskFlow. All rights reserved.
      </footer>
    </main>
  );
}