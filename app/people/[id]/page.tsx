import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { prisma } from "@/lib/db";
import { ProfileView } from "@/components/profile/ProfileView";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true },
  });
  if (!user) notFound();

  return (
    <div>
      <PageHeader title={user.name} subtitle={user.email}>
        <Link href="/admin" className="btn-ghost">
          ← Admin · People
        </Link>
      </PageHeader>
      <ProfileView userId={user.id} />
    </div>
  );
}
