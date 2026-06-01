import { PageHeader } from "@/components/PageHeader";
import { getActorUser } from "@/lib/session";
import { ProfileView } from "@/components/profile/ProfileView";

export default async function MyProfilePage() {
  const me = await getActorUser();

  if (!me) {
    return (
      <div>
        <PageHeader title="My profile" />
        <div className="p-8">
          <div className="card p-8 text-center text-slate-500">No active user.</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="My profile" subtitle={me.email} />
      <ProfileView userId={me.id} />
    </div>
  );
}
