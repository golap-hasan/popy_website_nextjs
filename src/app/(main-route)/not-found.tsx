import Link from "next/link";
import NoData from "@/components/common/no-data/NoData";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container mx-auto">
      <NoData msg="The page you are looking for was not found." size="full" className="py-16">
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button>
              Go Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline">
              Browse Shop
            </Button>
          </Link>
        </div>
      </NoData>
    </main>
  );
}
