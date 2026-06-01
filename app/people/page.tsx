import { redirect } from "next/navigation";

// People administration moved under the Admin module.
export default function PeopleIndex() {
  redirect("/admin");
}
