import { Container } from "@/components/ui/container";

interface AnnouncementBarProps {
  message?: string;
}

export function AnnouncementBar({
  message = "Plant-powered wellness",
}: AnnouncementBarProps) {
  return (
    <div className="bg-forest text-background">
      <Container className="flex min-h-9 items-center justify-center py-2">
        <p className="text-center text-xs font-semibold tracking-wide sm:text-sm">
          {message}
        </p>
      </Container>
    </div>
  );
}
