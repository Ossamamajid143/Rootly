import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="py-20" role="status">
      <span className="sr-only">Loading page</span>
      <div className="h-4 w-24 animate-pulse rounded-full bg-[#253426]/10" />
      <div className="mt-5 h-14 max-w-xl animate-pulse rounded-2xl bg-[#253426]/10" />
      <div className="mt-4 h-6 max-w-md animate-pulse rounded-xl bg-[#253426]/10" />
    </Container>
  );
}
